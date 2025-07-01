import { Session } from '../models/sessionModel';
import { Request, Response } from 'express';
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getSessions = asyncHandler(async (req: Request, res: Response) => {
  const sessions = await Session.find();
  res.status(200).send(new ApiResponse(200, sessions, 'Sessions fetched successfully'));
  return;
});

export const getSessionById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = await Session.findById(id);
  if (!existing) {
    res.status(404).send(new ApiError(404, 'Session not found'));
    return;
  }
  res.status(200).send(new ApiResponse(200, { existing }, 'Session fetched successfully'));
});

export const addSession = asyncHandler(async (req: Request, res: Response) => {
  const { day, startTime, endTime, coursId, salleId } = req.body;

  if (!day || !startTime || !endTime || !coursId || !salleId) {
    res.status(400).send(new ApiError(403, 'All fields are required!'));
    return;
  }

  const existing = await Session.findOne({ day, startTime, endTime, coursId, salleId });
  if (existing) {
    res.status(409).send(new ApiError(409, 'Session already exists!'));
    return;
  }

  const newSession = new Session({
    day,
    startTime,
    endTime,
    coursId,
    salleId,
  });

  await newSession.save();

  res.status(201).send(new ApiResponse(201, { newSession }, 'Session successfully created'));
});

export const updateSession = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await Session.findById(id);

  if (!existing) {
    res.status(404).send(new ApiError(401, 'Session not found'));
    return;
  }

  const updatedSession = await Session.findByIdAndUpdate(id, { ...req.body }, { new: true });

  res.status(200).send(new ApiResponse(200, { updatedSession }, 'Session updated successfully'));
});

export const deleteSession = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = await Session.findById(id);

  if (!existing) {
    res.status(404).send(new ApiError(404, 'Session not found'));
    return;
  }

  await Session.findByIdAndDelete(id);

  res.status(200).send(new ApiResponse(200, {}, 'Session deleted successfully'));
});
