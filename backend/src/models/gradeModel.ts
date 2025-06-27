import { Document, model, Schema } from 'mongoose';
import { ECycle, IGrade } from '../types/gradeTypes';

interface IGradeModelSchema extends IGrade, Document {}

const gradeSchema = new Schema<IGradeModelSchema>(
  {
    gradeName: {
      type: String,
      required: true,
      unique: true,
    },
    cycle: {
      type: String,
      enum: ECycle,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Grade = model<IGradeModelSchema>('Grade', gradeSchema);

export { Grade, IGradeModelSchema };
