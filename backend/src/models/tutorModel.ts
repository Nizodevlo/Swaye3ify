import mongoose, { Document, model, Schema } from 'mongoose';
import { ITutor } from '../types/tutorTypes';

// Extend ITutor with Mongoose Document properties for the schema
interface ITutorModelSchema extends ITutor, Document {}

// Define the Tutor Schema
const tutorSchema = new Schema<ITutorModelSchema>(
  {
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
      unique: true, // Email should be unique for each tutor
    },
    phoneNumber: {
      type: String, // Including phone number as it was in the student model
    },
    subject: {
      type: String,
      required: true, // e.g., "Mathematics"
    },
    experience: {
      type: String, // e.g., "8+ years"
    },
    rating: {
      type: Number, // e.g., 4.9
      default: 0,
    },
    students: {
      type: Number, // e.g., 125
      default: 0,
    },
    courses: {
      type: Number, // e.g., 8
      default: 0,
    },
    joinedDate: {
      type: Date, // e.g., "1/15/2020"
      default: Date.now, // Default to current date if not provided
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the Tutor model
const Tutor = model<ITutorModelSchema>('Tutor', tutorSchema);

export { Tutor, ITutorModelSchema };
