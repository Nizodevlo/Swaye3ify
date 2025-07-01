import { z } from 'zod';
import { Status } from '../types/attendanceTypes';

const statusEnumValues = Object.values(Status) as [string, ...string[]];

const objectIdRegex = /^[a-f\d]{24}$/i;

export const attendanceSchema = z.object({
  status: z.enum(statusEnumValues),
  // sessionId: z.string().uuid({ message: 'sessionId must be a valid UUID' }),
  sessionId: z
    .string()
    .regex(objectIdRegex, { message: 'sessionId must be a valid MongoDB ObjectId' }),
  inscriptionId: z
    .string()
    .regex(objectIdRegex, { message: 'inscriptionId must be a valid MongoDB ObjectId' }),
});

export const attendanceUpdateSchema = attendanceSchema.partial();
