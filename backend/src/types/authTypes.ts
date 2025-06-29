export enum ERole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: ERole;
  password: string;
  refreshToken?: string;
}
