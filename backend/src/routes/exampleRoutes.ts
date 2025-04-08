import { Router } from 'express';
import { createSomething } from '../controllers/exampleController';

const exampleRouter = Router();

exampleRouter.get('/', createSomething);

// add the other endpoint

export default exampleRouter;
