import { Router } from "express";
import validateRequest from "../middlewares/validate";
import { studentUpdateValidationSchema, studentValidationSchema } from "../validations/studentValidation"
import { createStudent, deleteStudent, getAllStudents, updateStudent } from "../controllers/studentController";

const studentRouter = Router();

studentRouter.post('/', validateRequest(studentValidationSchema), createStudent);
studentRouter.put('/:studentId', validateRequest(studentUpdateValidationSchema), updateStudent);
studentRouter.delete('/:studentId', deleteStudent);

studentRouter.get('/', getAllStudents);

export default studentRouter;