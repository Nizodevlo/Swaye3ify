import { z } from 'zod';
import { Day } from '../types/sessionTypes';

const dayEnumValues = Object.values(Day) as [string, ...string[]];

const objectIdRegex = /^[a-f\d]{24}$/i;

export const sessionSchema = z.object({
  day: z.enum(dayEnumValues),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Start time must be in HH:mm format'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'End time must be in HH:mm format'),
  coursId: z.string().regex(objectIdRegex, { message: 'coursId must be a valid MongoDB ObjectId' }),
  salleId: z.string().regex(objectIdRegex, { message: 'salleId must be a valid MongoDB ObjectId' }),
  // salleId: z.string().uuid({ message: 'salleId must be a valid UUID' }),
});

export const sessionUpdateSchema = sessionSchema.partial();

// export const sessionIdParamSchema = z.object({
//   id: z.string().regex(objectIdRegex, { message: 'coursId must be a valid MongoDB ObjectId' }),
// });
