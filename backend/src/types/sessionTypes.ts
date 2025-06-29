import { ICourModelSchema } from '../models/courModel';

// 1. Define the enum
export enum Day {
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
  day: Day;
  startTime: string;
  endTime: string;
  coursId: ICourModelSchema['_id'];
  salleId: ISalleModelSchema['_id'];
}
