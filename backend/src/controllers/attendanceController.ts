import { Attendance } from '../models/attendanceModel';
import { Request, Response } from 'express';
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';


export const getAttendances = asyncHandler(async (req: Request, res: Response) => {
  const attendances = await Attendance.find();
  res.status(200).send(new ApiResponse(200, attendances, 'Attendances fetched successfully'));
  return;
});

export const getAttendanceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = await Attendance.findById(id);
  if (!existing) {
    res.status(404).send(new ApiError(404, 'Attendance not found'));
    return;
  }
  res.status(200).send(new ApiResponse(200, { existing }, 'Attendance fetched successfully'));
});

export const addAttendance = asyncHandler(async (req: Request, res: Response) => {
  const { status, sessionId, inscriptionId } = req.body;

  if (!status || !sessionId || !inscriptionId) {
    res.status(400).send(new ApiError(403, 'All fields are required!'));
    return;
  }

  const existing = await Attendance.findOne({ status, sessionId, inscriptionId });
  if (existing) {
    res.status(409).send(new ApiError(403, 'Attendance already exists!'));
    return;
  }

  const newAttendance = new Attendance({
    status,
    sessionId,
    inscriptionId,
  });

  await newAttendance.save();

  res.status(201).send(new ApiResponse(201, { newAttendance }, 'Attendance successfully created'));
});

export const updateAttendance = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  const existing = await Attendance.findById(id);

  if (!existing) {
    res.status(404).send(new ApiError(401, 'Attendance not found'));
    return;
  }

  const updateAttendance = await Attendance.findByIdAndUpdate(id, { ...req.body }, { new: true });

  res
    .status(200)
    .send(new ApiResponse(200, { updateAttendance }, 'Attendance updated successfully'));
});

export const deleteAttendance = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = await Attendance.findById(id);

  if (!existing) {
    res.status(404).send(new ApiError(404, 'Attendance not found'));
    return;
  }

  await Attendance.findByIdAndDelete(id);

  res.status(200).send(new ApiResponse(200, {}, 'Attendance deleted successfully'));
});
