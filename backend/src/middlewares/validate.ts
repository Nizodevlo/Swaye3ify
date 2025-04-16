import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.format();
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: formatted,
      });
    }

    // Attach validated data to request if you want
    req.body = result.data;
    next();
  };
};
