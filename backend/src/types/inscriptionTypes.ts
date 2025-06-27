import { ICourModelSchema } from "../models/courModel";
import { IStudentModelSchema } from "../models/studentModel";

export interface IInscription {
    student: IStudentModelSchema['_id'];
    cour: ICourModelSchema['_id'];
    dateInscription: Date;
}