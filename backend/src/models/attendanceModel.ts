import mongoose, { Document, model, Schema } from 'mongoose';
import { EAttendanceStatus, IAttendanceRecord } from '../types/attendanceTypes';

interface IAttendanceModelSchema extends IAttendanceRecord, Document {}

const attendanceSchema = new Schema<IAttendanceModelSchema>(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    // TODO: make sure to add sessionId here
    status: {
      type: String,
      enum: EAttendanceStatus,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = model<IAttendanceModelSchema>('Attendance', attendanceSchema);

export { Attendance, IAttendanceModelSchema };
