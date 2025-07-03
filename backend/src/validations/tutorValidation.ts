import * as z from 'zod';

// Validation schema for creating a new tutor
const tutorValidationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
  email: z.string().email('Email must be valid'),
  phoneNumber: z.string().min(10, 'Phone number must be 10 numbers').optional().or(z.literal('')), // Optional and can be empty string
  subject: z.string().min(2, 'Subject must be at least 2 characters long'),
  experience: z.string().optional().or(z.literal('')), // Optional
  rating: z.number().min(0).max(5).optional(), // Optional, rating between 0 and 5
  students: z.number().min(0).optional(), // Optional, non-negative
  courses: z.number().min(0).optional(), // Optional, non-negative
  joinedDate: z.string().datetime().optional(), // Optional, expects ISO date string
});

// Validation schema for updating an existing tutor (all fields are optional)
const tutorUpdateValidationSchema = tutorValidationSchema.partial();

export { tutorValidationSchema, tutorUpdateValidationSchema };
