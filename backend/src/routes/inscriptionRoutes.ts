import { Router } from "express";
import { createInscription, deleteInscription, getAllInscriptions, updateInscription } from "../controllers/inscriptionController";
import validateRequest from "../middlewares/validate";
import { inscriptionUpdateValidationSchema, inscriptionValidationSchema } from "../validations/inscriptionValidation"

const inscriptionRouter = Router();

inscriptionRouter.post('/', validateRequest(inscriptionValidationSchema), createInscription);
inscriptionRouter.put('/:inscriptionId', validateRequest(inscriptionUpdateValidationSchema), updateInscription);
inscriptionRouter.delete('/:inscriptionId', deleteInscription);

inscriptionRouter.get('/', getAllInscriptions);

export default inscriptionRouter;