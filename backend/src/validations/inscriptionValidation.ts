import * as z from 'zod';


const inscriptionValidationSchema = z.object({
  student: z.string(),
  cour: z.string(),
  dateInscription: z.date(),
});

const inscriptionUpdateValidationSchema = inscriptionValidationSchema.partial();

export { inscriptionValidationSchema, inscriptionUpdateValidationSchema };
