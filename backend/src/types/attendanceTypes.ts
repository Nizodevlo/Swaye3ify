import { IUserModelSchema } from '../models/authModel';

export enum EAttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
}

export interface IAttendanceRecord {
  studentId: IUserModelSchema['_id'];
  // TODO: add sessionId here
  date: Date;
  status: EAttendanceStatus;
}


