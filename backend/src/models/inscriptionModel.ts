import mongoose, { Document, model, Schema } from 'mongoose';
import { IInscription } from '../types/inscriptionTypes';

interface IInscriptionModelSchema extends IInscription, Document {}

const inscriptionSchema = new Schema<IInscriptionModelSchema>({
    student: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    cour: {
        type: mongoose.Types.ObjectId,
        ref: "Cour",
        required: true,
    },
    dateInscription: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

const Inscription = model<IInscriptionModelSchema>('Inscription', inscriptionSchema);

export { Inscription, IInscriptionModelSchema };