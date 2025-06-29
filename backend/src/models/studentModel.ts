import mongoose, { Document, model, Schema } from 'mongoose';
import { IStudent } from '../types/studentTypes';

interface IStudentModelSchema extends IStudent, Document {}

const studentSchema = new Schema<IStudentModelSchema>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        tpye: String,
    },
    grade: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Grade",
    }
}, {
    timestamps: true,
});

const Student = model<IStudentModelSchema>('Student', studentSchema);

export { Student, IStudentModelSchema};