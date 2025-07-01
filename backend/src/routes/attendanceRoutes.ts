import { Router } from 'express';
import validateRequest from '../middlewares/validate';
import { attendanceSchema, attendanceUpdateSchema } from '../validations/attendanceValidation';
import {
  addAttendance,
  deleteAttendance,
  getAttendanceById,
  getAttendances,
  updateAttendance,
} from '../controllers/attendanceController';

const attendanceRouter = Router();

attendanceRouter.get('/', getAttendances);
attendanceRouter.get('/:id', getAttendanceById);
attendanceRouter.post('/', validateRequest(attendanceSchema), addAttendance);
attendanceRouter.put('/:id', validateRequest(attendanceUpdateSchema), updateAttendance);
attendanceRouter.delete('/:id', deleteAttendance);

export default attendanceRouter;
