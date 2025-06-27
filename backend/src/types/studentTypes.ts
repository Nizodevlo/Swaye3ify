import { IGradeModelSchema } from "../models/gradeModel";

export interface IStudent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  grade: IGradeModelSchema['_id'];
}