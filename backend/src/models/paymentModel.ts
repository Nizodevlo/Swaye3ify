import mongoose, { Document, model, Schema } from 'mongoose';
import { EPaymentStatus, IPayment } from '../types/paymentTypes';

interface IPaymentModelSchema extends IPayment, Document {}

const paymentSchema = new Schema<IPaymentModelSchema>(
  {
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: EPaymentStatus,
      default: EPaymentStatus.PENDING,
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = model<IPaymentModelSchema>('Payment', paymentSchema);

export { Payment, IPaymentModelSchema };
