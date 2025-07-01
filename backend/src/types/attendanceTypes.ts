import { IInscriptionModelSchema } from '../models/inscriptionModel';
import { ISessionModelSchema } from '../models/sessionModel';

export enum Status {
  PRESENT = 'Present',
  ABSENT = 'Absent',
}
export interface Iattendance {
  status: Status;
  sessionId: ISessionModelSchema['_id'];
  inscriptionId: IInscriptionModelSchema['_id'];
}
