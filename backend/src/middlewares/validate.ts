import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validateRequest =
  (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ // Removed 'return' here
        errors: result.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
        message: "Validation failed.",
      });
      // Important: Ensure no further code is executed in THIS middleware after sending the response.
      // If you had more code after the `if` block that should NOT run on failure, you'd put a `return;`
      // statement on its own line after `res.status(400).json(...)`.
      // However, since your next lines are `req.body = result.data;` and `next();`,
      // which should only run on success, the logical flow is already correct.
      // The error was purely TypeScript's interpretation of the *explicit* return type.
      return; // <-- Keep this return to exit the middleware function
    }

    req.body = result.data;
    next();
  };

export default validateRequest;