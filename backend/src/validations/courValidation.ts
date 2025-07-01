import * as z from 'zod';


const courValidationSchema = z.object({
    courName: z.string(),
    teacher: z.string(),
    grade: z.string(),
    subject: z.string(),
    prix: z.number(),
});

const courUpdateValidationSchema = courValidationSchema.partial();

export { courValidationSchema, courUpdateValidationSchema };
