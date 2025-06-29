import { z } from 'zod';
import { Day } from '../types/sessionTypes';

const dayEnumValues = Object.values(Day) as [string, ...string[]];

export const sessionSchema = z.object({
  day: z.enum(dayEnumValues),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, 'Start time must be in HH:mm:ss format'),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, 'End time must be in HH:mm:ss format'),
  coursId: z.string().uuid({ message: 'coursId must be a valid UUID' }),
  salleId: z.string().uuid({ message: 'salleId must be a valid UUID' }),
});

export const sessionIdParamSchema = z.object({
  id: z.string().uuid({ message: 'Invalid session ID format' }),
});
