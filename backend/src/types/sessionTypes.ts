import { ICourModelSchema } from '../models/courModel';
import { IsallemodelSchema } from '../models/salleModel';

// 1. Define the enum
export enum EDay {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

// 2. Define the interface using the enum
export interface ISession {
  day: EDay;
  startTime: string;
  endTime: string;
  coursId: ICourModelSchema['_id'];
  salleId: IsallemodelSchema['_id'];
}

export interface IDay {
  day: EDay;
}
