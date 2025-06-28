import { Router } from "express";
import { createCour, deleteCour, getAllCours, updateCour } from "../controllers/courController";

const courRouter = Router();

courRouter.post('/', createCour);
courRouter.put('/:courId', updateCour);
courRouter.delete('/:courId', deleteCour);

courRouter.get('/', getAllCours);

export default courRouter;