import { Router } from "express";
import { getAllGrades } from "../controllers/gradeController";

const gradeRouter = Router();

gradeRouter.get('/', getAllGrades);

export default gradeRouter;