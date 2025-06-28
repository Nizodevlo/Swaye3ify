import { Router } from "express";
import { createCour, deleteCour, getAllCours, updateCour } from "../controllers/courController";
import validateRequest from "../middlewares/validate";
import { courUpdateValidationSchema, courValidationSchema } from "../validations/courValidation"

const courRouter = Router();

courRouter.post('/', validateRequest(courValidationSchema), createCour);
courRouter.put('/:courId', validateRequest(courUpdateValidationSchema), updateCour);
courRouter.delete('/:courId', deleteCour);

courRouter.get('/', getAllCours);

export default courRouter;