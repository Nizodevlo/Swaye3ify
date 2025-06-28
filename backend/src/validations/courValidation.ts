import * as z from 'zod';


const courValidationSchema = z.object({
    courName: z.string(),
    prix: z.number(),
    teacher: z.string(),
    subject: z.string(),
    grade: z.string(),
});

const courUpdateValidationSchema = courValidationSchema.partial();

export { courValidationSchema, courUpdateValidationSchema };
