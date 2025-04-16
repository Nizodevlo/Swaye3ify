import * as z from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const authValidationSchema = z.object({
  fullname: z.string().min(8, 'Full name must be at least 8 characters long'),
  email: z.string().email('Email must be valid'),
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
