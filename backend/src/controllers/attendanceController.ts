import { Attendance } from '../models/attendanceModel';
import { IAttendanceRecord } from '../types/attendanceTypes';
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const createAttendance = asyncHandler(async (req, res) => {
  const newAttendance = new Attendance({
    ...req.body,
  });

  await newAttendance.save();
  res
    .status(201)
    .send(new ApiResponse(200, { newAttendance }, 'Attendance created successfully ✅'));
});

export const bulkCreateAttendance = asyncHandler(async (req, res) => {
  const attendances = req.body.attendances.map(
    (attendance: IAttendanceRecord) => new Attendance(attendance)
  );
  await Attendance.insertMany(attendances);
  res.status(201).send(new ApiResponse(200, { attendances }, 'Attendance created successfully ✅'));
});

export const updateAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;

  const existingAttendance = await Attendance.findById(attendanceId);

  if (!existingAttendance) {
    res.status(404).send(new ApiError(404, 'Attendance not found ❌'));
    return;
  }

  const updatedAttendance = await Attendance.findByIdAndUpdate(
    attendanceId,
    { ...req.body },
    { new: true }
  );

  res
    .status(200)
    .send(new ApiResponse(200, { updatedAttendance }, 'Attendance updated successfully ✅'));
});

export const updateAttendanceStatus = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;

  const existingAttendance = await Attendance.findById(attendanceId);

  if (!existingAttendance) {
    res.status(404).send(new ApiError(404, 'Attendance not found ❌'));
    return;
  }

  const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, {
    status: req.body.status,
  });

  res
    .status(200)
    .send(new ApiResponse(200, { updatedAttendance }, 'Attendance status updated successfully ✅'));
});

export const deleteAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;

  const existingAttendance = await Attendance.findById(attendanceId);

  if (!existingAttendance) {
    res.status(404).send(new ApiError(404, 'Attendance not found ❌'));
    return;
  }

  await Attendance.findByIdAndDelete(attendanceId);

  res.status(200).send(new ApiResponse(200, {}, 'Attendance deleted successfully ✅'));
});

export const getAllAttendances = asyncHandler(async (req, res) => {
  const attendances = await Attendance.find().populate('studentId');

  res
    .status(200)
    .send(new ApiResponse(200, { attendances }, 'Attendances fetched successfully ✅'));
});

// TODO: add getSessionAttendances function to get all attendances for a specific session
