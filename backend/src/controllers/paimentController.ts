import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Paiment } from '../models/paiementModel';
import ApiResponse from '../utils/apiResponse';
import ApiError from '../utils/apiError';

export const getPaiments = asyncHandler(async (req: Request, res: Response) => {
  const paiments = await Paiment.find();
  res.status(200).send(new ApiResponse(200, paiments, 'Paiments fetched successfully'));
  return;
});

export const getPaimentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = await Paiment.findById(id);
  if (!existing) {
    res.status(404).send(new ApiError(404, 'Paiment not found'));
    return;
  }
  res.status(200).send(new ApiResponse(200, { existing }, 'Paiment fetched successfully'));
});

export const addPaiment = asyncHandler(async (req: Request, res: Response) => {
  const { amount, status, method, inscriptionID } = req.body;

  if (!amount || !status || !method || !inscriptionID) {
    res.status(400).send(new ApiError(403, 'All fields are required!'));
    return;
  }

  const existing = await Paiment.findOne({ amount, status, method, inscriptionID });

  if (existing) {
    res.status(409).send(new ApiError(409, 'Paiment already exists'));
    return;
  }

  const newPaiment = new Paiment({
    amount,
    status,
    method,
    inscriptionID,
  });

  await newPaiment.save();

  res.status(200).send(new ApiResponse(200, { newPaiment }, 'Paiment successfully created'));
});

export const updatePaiment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await Paiment.findById(id);

  if (!existing) {
    res.status(404).send(new ApiError(404, 'Paiment not found'));
    return;
  }

  const updatedPaiment = await Paiment.findByIdAndUpdate(id, { ...req.body }, { new: true });

  res.status(200).send(new ApiResponse(200, { updatedPaiment }, 'Paiment updated successfully'));
});

export const deletePaiment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = await Paiment.findById(id);

  if (!existing) {
    res.status(404).send(new ApiError(401, 'Paiment not found'));
    return;
  }

  await Paiment.findByIdAndDelete(id);
  res.status(200).send(new ApiResponse(200, {}, 'Paiment deleted successfully'));
});
