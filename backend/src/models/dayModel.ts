import { Document, model, Schema } from 'mongoose';
import { IDay } from '../types/sessionTypes';

interface IDayModelSchema extends IDay, Document {}

const daySchema = new Schema<IDayModelSchema>(
  {
    day: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Day = model<IDayModelSchema>('Day', daySchema);

export { Day, IDayModelSchema };
