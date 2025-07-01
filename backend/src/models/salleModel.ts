import { Document, model, Schema } from 'mongoose';
import { Isalle } from '../types/salleTypes';
interface IsallemodelSchema extends Isalle, Document {}

const salleSchema = new Schema<IsallemodelSchema>({
  salleName: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
    // unique: true,
  },
});
const Salle = model<IsallemodelSchema>('Salle', salleSchema);
export { Salle, IsallemodelSchema };
