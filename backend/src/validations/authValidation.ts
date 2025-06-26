import * as z from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const authValidationSchema = z.object({
  firstName: z.string().min(2, 'first name must be at least 2 characters long'),
  lastName: z.string().min(2, 'last name must be at least 2 characters long'),
  email: z.string().email('Email must be valid'),
  phoneNumber: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .refine(
      (val) => passwordRegex.test(val),
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const authUpdateValidationSchema = authValidationSchema.partial();

export { authValidationSchema, authUpdateValidationSchema };
