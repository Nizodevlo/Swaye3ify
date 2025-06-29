import mongoose, { Document, model, Schema } from 'mongoose';
import { EPaiementMethod, EPaiementStatus, IPaiment } from '../types/paiementTypes';

interface IPaimentModelSchema extends IPaiment, Document {}

const paiementschema = new Schema<IPaimentModelSchema>(
  {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(EPaiementStatus),
      required: true,
    },
    method: {
      type: String,
      enum: Object.values(EPaiementMethod),
      required: true,
    },
    inscription: {
      type: mongoose.Types.ObjectId,
      ref: 'Inscription',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Paiment = model<IPaimentModelSchema>('Paiment', paiementschema);

export { Paiment, IPaimentModelSchema };
