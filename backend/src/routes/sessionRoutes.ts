import { Router } from 'express';
import validateRequest from '../middlewares/validate';
import { sessionSchema, sessionUpdateSchema } from '../validations/sessionValidation';
import {
  addSession,
  deleteSession,
  getSessionById,
  getSessions,
  updateSession,
} from '../controllers/sessionController';

const sessionRouter = Router();

sessionRouter.get('/', getSessions);
sessionRouter.get('/:id', getSessionById);
sessionRouter.post('/', validateRequest(sessionSchema), addSession);
sessionRouter.put('/:id', validateRequest(sessionUpdateSchema), updateSession);
sessionRouter.delete('/:id', deleteSession);

export default sessionRouter;
