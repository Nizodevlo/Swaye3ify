import { User } from '../models/authModel';
import ApiError from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';
import jwt from 'jsonwebtoken';

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).send(new ApiError(401, 'Access token required'));
    return; // Ensure we stop execution here
  }

  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    res.status(401).send(new ApiError(401, 'Access token required'));
    return;
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    res.status(500).send(new ApiError(500, 'Access token secret not configured'));
    return;
  }

  jwt.verify(accessToken, secret, async (error, decoded) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        res
          .status(401)
          .send(new ApiError(401, 'Access token has expired. Please log in again. ❌'));
        return;
      }
      res.status(403).send(new ApiError(403, 'Invalid access token ❌'));
      return;
    }

    if (!decoded) {
      res.status(403).send(new ApiError(403, 'Invalid or expired access token ❌'));
      return;
    }

    const user = await User.findById((decoded as { userID: string }).userID);

    if (!user) {
      res.status(404).send(new ApiError(404, 'User not found ❌'));
      return;
    }

    req.user = user;
    next();
  });
});

export default authenticate;
