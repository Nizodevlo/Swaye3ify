import { Router } from 'express';
import {
  deleteController,
  createController,
  getByIdController,
  getController,
  updateController,
} from '../controllers/courseController';

const courseRouter = Router();

courseRouter.get('/', getController);
courseRouter.get('/:id', getByIdController);
courseRouter.post('/', createController);
courseRouter.put('/:id', updateController);
courseRouter.delete('/:id', deleteController);

export default courseRouter;
