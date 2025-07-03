import { Router } from 'express';
import {
  deleteUser,
  // getAllParents,
  // getAllStaff,
  // getAllStudents,
  login,
  logout,
  refreshToken,
  register,
  updateUser,
} from '../controllers/authController';
import validateRequest from '../middlewares/validate';
import { authUpdateValidationSchema, authValidationSchema } from '../validations/authValidation';
import authenticate from '../middlewares/authenticate';

const authRouter = Router();

// Auth Part

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/refreshToken', refreshToken);

// CRUD part
authRouter.put('/:userId', /* authenticate */ updateUser);
authRouter.delete('/:userId', /* authenticate */ deleteUser);

export default authRouter;
