import { Router } from 'express';
import { getDays } from '../controllers/sessionController';

const dayRouter = Router();

dayRouter.get('/', getDays);

export default dayRouter;
