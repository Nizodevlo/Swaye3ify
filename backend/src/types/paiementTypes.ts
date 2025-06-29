import { IInscriptionModelSchema } from '../models/inscriptionModel';

export enum EPaiementStatus {
  pending = 'PENDING',
  completed = 'COMPLETED',
  failed = 'FAILED',
  refunded = 'REFUNDED',
}

export enum EPaiementMethod {
  creditCard = 'CREDITCARD',
  cash = 'CASH',
}

export interface IPaiment {
  amount: number;
  status: EPaiementStatus;
  method: EPaiementMethod;
  inscription: IInscriptionModelSchema['_id'];
}
