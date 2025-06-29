import { Router } from 'express';
import validateRequest from '../middlewares/validate';
import { sessionIdParamSchema, sessionSchema } from '../validations/sessionValidation';
import {
  addSession,
  getSessionById,
  getSessions,
  updateSession,
} from '../controllers/sessionController';

const sessionRouter = Router();

sessionRouter.get('/', getSessions);
sessionRouter.get('/:id', validateRequest(sessionIdParamSchema), getSessionById);
sessionRouter.post('/', validateRequest(sessionSchema), addSession);
sessionRouter.put('/:id', validateRequest(sessionSchema), updateSession);
sessionRouter.delete('/:id', validateRequest(sessionIdParamSchema), updateSession);

export default sessionRouter;
