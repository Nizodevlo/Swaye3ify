export enum ERole {
  ADMIN = 'admin',
  SECRETAIRE = 'secretaire',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: ERole;
  refreshToken: string;
}
