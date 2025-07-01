import * as z from 'zod';

const salleValidationSchema = z.object({
    salleName: z.string(),
    capacity: z.number(),
});

const salleUpdateValidationSchema = salleValidationSchema.partial();

export { salleValidationSchema, salleUpdateValidationSchema };