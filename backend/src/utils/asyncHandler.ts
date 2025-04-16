import { RequestHandler, Request, Response, NextFunction } from 'express';

export const asyncHandler = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// export const asyncHandler = (
//   handler: (req: Request, res: Response, next: NextFunction) => Promise<any> | void
// ) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await handler(req, res, next); // safely await
//     } catch (err) {
//       next(err);
//     }
//   };
// };
