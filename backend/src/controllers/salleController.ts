import { asyncHandler } from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { Salle } from '../models/salleModel';

export const createSalle = asyncHandler(async (req, res) => {
  const { salleName } = req.body;

  const existingSalle = await Salle.findOne({ salleName });

  if (existingSalle) {
    res.status(400).send(new ApiError(400, 'Salle already exists ❌'));
    return;
  }

  const newSalle = new Salle({
    ...req.body,
    // capacity: new mongoose.Types.ObjectId(req.body.capacity),
  });

  await newSalle.save();

  res.status(201).send(new ApiResponse(201, { salle: newSalle }, 'Salle created successfully ✅'));
});

export const updateSalle = asyncHandler(async (req, res) => {
  const { salleId } = req.params;

  const existingSalle = await Salle.findById(salleId);

  if (!existingSalle) {
    res.status(404).send(new ApiError(401, 'salle not found ❌'));
    return;
  }

  const updatedSalle = await Salle.findByIdAndUpdate(salleId, { ...req.body });

  res.status(200).send(new ApiResponse(200, { updatedSalle }, 'Salle updated successfully ✅'));
});

export const deleteSalle = asyncHandler(async (req, res) => {
  const { salleId } = req.params;

  const existingSalle = await Salle.findById(salleId);

  if (!existingSalle) {
    res.status(404).send(new ApiError(401, 'Salle not found ❌'));
    return;
  }

  await Salle.findByIdAndDelete(salleId);

  res.status(200).send(new ApiResponse(200, {}, 'Salle deleted successfully ❌'));
});

export const getAllSalles = asyncHandler(async (req, res) => {
  const salles = await Salle.find();

  res.status(200).send(new ApiResponse(200, { salles }, 'Salles retrieved successfully ✅'));
});
