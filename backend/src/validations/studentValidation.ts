import * as z from 'zod';


const studentValidationSchema = z.object({
  firstName: z.string().min(2, 'first name must be at least 2 characters long'),
  lastName: z.string().min(2, 'last name must be at least 2 characters long'),
  email: z.string().email('Email must be valid'),
  phoneNumber: z.string(),
});

const studentUpdateValidationSchema = studentValidationSchema.partial();

export { studentValidationSchema, studentUpdateValidationSchema };
