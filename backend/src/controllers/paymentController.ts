import mongoose from 'mongoose';
import { User } from '../models/authModel';
import { Payment } from '../models/paymentModel';
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const createPayment = asyncHandler(async (req, res) => {
  const { studentId } = req.body;

  const existingStudent = await User.findOne({ _id: studentId });

  if (!existingStudent) {
    res.status(404).send(new ApiError(404, 'Student not found ❌'));
  }

  const newPayment = new Payment({
    ...req.body,
    student: new mongoose.Types.ObjectId(studentId),
  });

  await newPayment.save();

  res.status(201).send(new ApiResponse(201, { newPayment }, 'Payment created successfully ✅'));
});

export const updatePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const { studentId } = req.body;

  const existingPayment = await Payment.findById(paymentId);
  const existingStudent = await User.findOne({ _id: studentId });

  if (!existingStudent) {
    res.status(404).send(new ApiError(404, 'Student not found ❌'));
    return;
  }

  if (!existingPayment) {
    res.status(404).send(new ApiError(404, 'Payment not found ❌'));
    return;
  }

  const updatedPayment = await Payment.findByIdAndUpdate(paymentId, {
    ...req.body,
    student: new mongoose.Types.ObjectId(studentId),
  });

  res.status(200).send(new ApiResponse(200, { updatedPayment }, 'Payment updated successfully ✅'));
});

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const { paymentStatus } = req.body;

  const existingPayment = await Payment.findById(paymentId);

  if (!existingPayment) {
    res.status(404).send(new ApiError(404, 'Payment not found ❌'));
    return;
  }

  existingPayment.status = paymentStatus;

  await existingPayment.save();

  res.status(200).send(new ApiResponse(200, {}, 'Payment status updated successfully ✅'));
});

export const deletePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const existingPayment = await Payment.findById(paymentId);

  if (!existingPayment) {
    res.status(404).send(new ApiError(404, 'Payment not found ❌'));
    return;
  }

  const deletedPayment = await Payment.findByIdAndDelete(paymentId);

  res.status(200).send(new ApiResponse(200, { deletedPayment }, 'Payment deleted successfully ✅'));
});

export const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();

  res.status(200).send(new ApiResponse(200, { payments }, 'Payments retrieved successfully ✅'));
});
