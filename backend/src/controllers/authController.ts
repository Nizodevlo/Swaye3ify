import jwt from 'jsonwebtoken';
import { User } from '../models/authModel';
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import generateToken from '../utils/generateTokens';
import { ERole } from '../types/authTypes';

// variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

// Auth part

export const register = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).send(new ApiError(400, 'User already exists ❌'));
    return;
  }

  const newUser = new User({
    ...req.body,
  });

  await newUser.save();

  res.status(201).send(new ApiResponse(201, { newUser }, 'User successfully created ✅'));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(404).send(new ApiError(404, 'User not found ❌'));
    return;
  }

  const isMatchedPassword = await existingUser.comparePassword(password);

  if (!isMatchedPassword) {
    res.status(401).send(new ApiError(403, 'Invalid credentials ❌'));
    return;
  }

  const accessToken = generateToken(
    ACCESS_TOKEN_SECRET,
    existingUser._id as string,
    existingUser.role
  );

  const refreshToken = generateToken(
    REFRESH_TOKEN_SECRET,
    existingUser._id as string,
    existingUser.role
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  existingUser.refreshToken = refreshToken;

  await existingUser.save();

  res.status(200).send(new ApiResponse(200, { accessToken }, 'User logged in successfully ✅'));
});

export const logout = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(404).send(new ApiError(404, 'User not found ❌'));
    return;
  }

  res.cookie('refreshToken', '', { maxAge: 0 });

  existingUser.refreshToken = '';

  await existingUser.save();

  res.status(200).send(new ApiResponse(200, {}, 'User logged out successfully ✅'));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies['refreshToken'];

  if (!refreshToken) {
    res.status(401).send(new ApiError(401, 'Refresh token not provided ❌'));
    return;
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', async (error, decoded) => {
    if (error) {
      res.status(403).send(new ApiError(403, 'Invalid or expired refresh token ❌'));
      return;
    }

    const existingUser = await User.findById(decoded.userID);

    if (!existingUser) {
      res.status(404).send(new ApiError(404, 'User not found ❌'));
      return;
    }

    if (existingUser.refreshToken !== refreshToken) {
      res.status(403).send(new ApiError(403, 'Refresh token does not match stored token ❌'));
      return;
    }

    const userId: string = (existingUser._id as any).toString();

    const accessToken = generateToken(ACCESS_TOKEN_SECRET, userId, existingUser.role);

    res
      .status(200)
      .send(new ApiResponse(200, { accessToken }, 'Access token refreshed successfully 👍'));
  });
});

// CRUD for staff

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    res.status(404).send(new ApiError(404, 'User not found ❌'));
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, { ...req.body });

  res.status(200).send(new ApiResponse(200, { updatedUser }, 'User updated successfuly ✅'));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    res.status(404).send(new ApiError(404, 'User not found ❌'));
    return;
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  res.status(200).send(new ApiResponse(200, { deletedUser }, 'User deleted successfuly ✅'));
});

export const getAllStaff = asyncHandler(async (req, res) => {
  const staff = await User.find({
    role: {
      $nin: ['student', 'parent'],
    },
  });

  res.status(200).send(new ApiResponse(200, { staff }, 'Staff retrieved successfully ✅'));
});

export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.find({ role: ERole.STUDENT });

  res.status(200).send(new ApiResponse(200, { students }, 'Students retrieved successfully ✅'));
});

export const getAllParents = asyncHandler(async (req, res) => {
  const parents = await User.find({ role: ERole.PARENT });

  res.status(200).send(new ApiResponse(200, { parents }, 'Students retrieved successfully ✅'));
});
