import { Router } from 'express';
import {
  addPaiment,
  deletePaiment,
  getPaimentById,
  getPaiments,
  updatePaiment,
} from '../controllers/paimentController';
import validateRequest from '../middlewares/validate';
import { paimentSchema, paimentUpdateSchema } from '../validations/paimentValidation';

const paimentRouter = Router();

paimentRouter.get('/', getPaiments);
paimentRouter.get('/:id', getPaimentById);
paimentRouter.post('/', validateRequest(paimentSchema), addPaiment);
paimentRouter.put('/:id', validateRequest(paimentUpdateSchema), updatePaiment);
paimentRouter.delete('/:id', deletePaiment);

export default paimentRouter;
