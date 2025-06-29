import mongoose, { Document, model, Schema } from 'mongoose';
import { ISession } from '../types/sessionTypes';

interface ISessionModelSchema extends ISession, Document {}

const sessionSchema = new Schema<ISessionModelSchema>(
  {
    day: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    coursId: {
      type: mongoose.Types.ObjectId,
      ref: 'Cour',
      required: true,
    },
    // salleId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Salle',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Session = model<ISessionModelSchema>('Session', sessionSchema);

export { Session, ISessionModelSchema };
