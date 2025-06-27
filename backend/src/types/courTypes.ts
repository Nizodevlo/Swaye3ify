import { IUserModelSchema } from "../models/authModel";
import { IGradeModelSchema } from "../models/gradeModel";

export interface ICour {
    courName: string;
    prix: number;
    teacher: IUserModelSchema['_id'];
    subject: IUserModelSchema['_id'];
    grade: IGradeModelSchema['_id'];
}