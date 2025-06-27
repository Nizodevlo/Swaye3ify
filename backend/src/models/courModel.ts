import mongoose, { Document, model, Schema } from 'mongoose';
import { ICour } from '../types/courTypes';

interface ICourModelSchema extends ICour, Document {}

const courSchema = new Schema<ICourModelSchema>({
    courName: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    grade: {
        type: mongoose.Types.ObjectId,
        ref: "Grade",
        required: true,
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: "Subject",
        required: true,
    }
}, {
    timestamps: true,
});

const Cour = model<ICourModelSchema>('Cour', courSchema);

export { Cour, ICourModelSchema};