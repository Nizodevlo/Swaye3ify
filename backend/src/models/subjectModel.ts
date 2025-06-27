import { Document, model, Schema } from 'mongoose';
import { ISubject } from '../types/subjectTypes';

interface ISubjectModelSchema extends ISubject, Document {}

const subjectSchema = new Schema<ISubjectModelSchema>({
  subjectName: {
    type: String,
    required: true,
  },
});

const Subject = model<ISubjectModelSchema>('Subject', subjectSchema);

export { Subject, ISubjectModelSchema };
