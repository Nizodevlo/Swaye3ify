import { IUser } from './../../../backend/src/types/authTypes';
export interface IStudent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  grade: string;
}

export interface IStudentResponse extends IStudent {
    _id: string
}

// State
export interface IStudentState {
    students: IStudentResponse[];
}

export interface IStudentActions {
    addStudent: (data: IStudent) => Promise<void>;
    editStudent: (data: IStudent, studentId: string) => Promise<void>;
    removeStudent: (studentId: string) => Promise<void>;
    getAllStudents: () => Promise<void>;
}