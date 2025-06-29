import { z } from 'zod';
import { EPaiementMethod, EPaiementStatus } from '../types/paiementTypes';

const paimentStatusEnumValues = Object.values(EPaiementStatus) as [string, ...string[]];
const paimentMethodEnumValues = Object.values(EPaiementMethod) as [string, ...string[]];

const objectIdRegex = /^[a-f\d]{24}$/i;

export const paimentSchema = z.object({
  amount: z.number(),
  status: z.enum(paimentStatusEnumValues),
  method: z.enum(paimentMethodEnumValues),
  inscriptionID: z
    .string()
    .regex(objectIdRegex, { message: 'inscriptionId must be a valid MongoDB ObjectId' }),
});

export const paimentUpdateSchema = paimentSchema.partial();
