import { asyncHandler } from '../utils/asyncHandler'; // Assuming this utility exists
import ApiError from '../utils/apiError'; // Assuming this utility exists
import ApiResponse from '../utils/apiResponse'; // Assuming this utility exists
import { Tutor } from '../models/tutorModel';
import mongoose from 'mongoose'; // Mongoose is needed for ObjectId if you were referencing, but not directly for this model

// Handler for creating a new tutor
export const createTutor = asyncHandler(async (req, res) => {
  const { email, joinedDate } = req.body;

  // Check if a tutor with the given email already exists
  const existingTutor = await Tutor.findOne({ email });

  if (existingTutor) {
    // If tutor exists, send a 400 Bad Request error
    res.status(400).send(new ApiError(400, 'Tutor with this email already exists ❌'));
    return;
  }

  // Create a new Tutor instance with the request body data
  const newTutor = new Tutor({
    ...req.body,
    // Convert joinedDate string to Date object if provided
    joinedDate: joinedDate ? new Date(joinedDate) : undefined,
  });

  // Save the new tutor to the database
  await newTutor.save();

  // Send a success response
  res.status(201).send(new ApiResponse(201, { newTutor }, 'Tutor created successfully ✅'));
});

// Handler for updating an existing tutor
export const updateTutor = asyncHandler(async (req, res) => {
  const { tutorId } = req.params; // Get tutor ID from request parameters
  const { joinedDate } = req.body;

  // Find the tutor by ID to check if it exists
  const existingTutor = await Tutor.findById(tutorId);

  if (!existingTutor) {
    // If tutor not found, send a 404 Not Found error
    res.status(404).send(new ApiError(404, 'Tutor not found ❌'));
    return;
  }

  // Prepare update data, converting joinedDate if present
  const updateData = { ...req.body };
  if (joinedDate) {
    updateData.joinedDate = new Date(joinedDate);
  }

  // Find and update the tutor by ID, returning the updated document
  // `new: true` returns the document after update was applied
  const updatedTutor = await Tutor.findByIdAndUpdate(tutorId, updateData, { new: true });

  // Send a success response with the updated tutor
  res.status(200).send(new ApiResponse(200, { updatedTutor }, 'Tutor updated successfully ✅'));
});

// Handler for deleting a tutor
export const deleteTutor = asyncHandler(async (req, res) => {
  const { tutorId } = req.params; // Get tutor ID from request parameters

  // Find the tutor by ID to check if it exists
  const existingTutor = await Tutor.findById(tutorId);

  if (!existingTutor) {
    // If tutor not found, send a 404 Not Found error
    res.status(404).send(new ApiError(404, 'Tutor not found ❌'));
    return;
  }

  // Find and delete the tutor by ID
  await Tutor.findByIdAndDelete(tutorId);

  // Send a success response
  res.status(200).send(new ApiResponse(200, {}, 'Tutor deleted successfully ❌'));
});

// Handler for getting all tutors
export const getAllTutors = asyncHandler(async (req, res) => {
  // Retrieve all tutors from the database
  const tutors = await Tutor.find();

  // Send a success response with the list of tutors
  res.status(200).send(new ApiResponse(200, { tutors }, 'Tutors retrieved successfully ✅'));
});

// Handler for getting a single tutor by ID (added for completeness)
export const getTutorById = asyncHandler(async (req, res) => {
  const { tutorId } = req.params;

  const tutor = await Tutor.findById(tutorId);

  if (!tutor) {
    res.status(404).send(new ApiError(404, 'Tutor not found ❌'));
    return;
  }

  res.status(200).send(new ApiResponse(200, { tutor }, 'Tutor retrieved successfully ✅'));
});
