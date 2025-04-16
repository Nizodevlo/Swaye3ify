import { IUserModelSchema } from '../models/authModel';

export enum EPaymentStatus {
  PENDING = 'pending',
  PAID = 'piad',
  OVERDUE = 'overdue',
  ERROR = 'error',
}

export interface IPayment {
  amount: number;
  paymentDate: Date;
  status: EPaymentStatus;
  student: IUserModelSchema['_id'];
  // TODO: add course here
}
