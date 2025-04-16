import { Router } from 'express';
import { createController } from './../controllers/exampleController';


const exampleRouter = Router();

exampleRouter.get('/', createController);

// add the other endpoint

export default exampleRouter;
