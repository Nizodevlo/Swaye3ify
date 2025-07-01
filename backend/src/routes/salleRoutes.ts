import { Router } from "express";
import { createSalle, deleteSalle, getAllSalles, updateSalle } from "../controllers/salleController";
import validateRequest from "../middlewares/validate";
import { salleUpdateValidationSchema, salleValidationSchema } from "../validations/salleValidation";

const salleRouter = Router();

salleRouter.post('/', validateRequest(salleValidationSchema), createSalle);
salleRouter.put('/:salleId', validateRequest(salleUpdateValidationSchema), updateSalle);
salleRouter.delete('/:salleId', deleteSalle);

salleRouter.get('/', getAllSalles);

export default salleRouter;