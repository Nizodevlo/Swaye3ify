import mongoose, { Document, model, Schema } from 'mongoose';
import { Iattendance } from '../types/attendanceTypes';

interface IAttendanceModelSchema extends Iattendance, Document {}

const attendanceSchema = new Schema<IAttendanceModelSchema>(
  {
    status: {
      type: String,
      required: true,
    },
    sessionId: {
      type: mongoose.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    inscriptionId: {
      type: mongoose.Types.ObjectId,
      ref: 'Inscription',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = model<IAttendanceModelSchema>('Attendance', attendanceSchema);

export { Attendance, IAttendanceModelSchema };
