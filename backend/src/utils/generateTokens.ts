import jwt from 'jsonwebtoken';
import { ERole } from '../types/authTypes';

const generateToken = (secret: string, userId: string, role: ERole): string => {
  const token = jwt.sign({ userId, role }, secret);
  return token;
};

export default generateToken;
