import { Router } from "express";
import { getAllGrades } from "../controllers/gradeController";
import { getAllSubject } from "../controllers/subjectController";

const subjectRouter = Router();

subjectRouter.get('/', getAllSubject);

export default subjectRouter;