import { Types } from 'mongoose';

export interface ICourse {
  nom: string;
  description: string;
  price: number;
  grade: Types.ObjectId;
  subject: Types.ObjectId;
  deletedAt: Date;
}
