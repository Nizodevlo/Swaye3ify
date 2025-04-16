import { Document, model, Schema } from 'mongoose';
import { ICourse } from '../types/courseTypes';

interface ICourseModelSchema extends ICourse, Document {}

const courseSchema = new Schema<ICourseModelSchema>({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  grade: {
    type: Schema.Types.ObjectId,
    ref: 'Grade',
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  deletedAt: { type: Date, default: null }, // 🆕 Soft delete field
});

const Course = model('Course', courseSchema);

export { Course, ICourseModelSchema };
