import { Router } from 'express';
import {
  bulkCreateAttendance,
  createAttendance,
  deleteAttendance,
  getAllAttendances,
  updateAttendance,
  updateAttendanceStatus,
} from '../controllers/attendanceController';

const attendanceRouter = Router();

attendanceRouter.post('/', createAttendance);
attendanceRouter.post('/bulk', bulkCreateAttendance);
attendanceRouter.put('/:attendanceId', updateAttendance);
attendanceRouter.patch('/:attendanceId', updateAttendanceStatus);
attendanceRouter.delete('/:attendanceId', deleteAttendance);

attendanceRouter.get('/', getAllAttendances);
// TODO: add get attendance by session

export default attendanceRouter;
