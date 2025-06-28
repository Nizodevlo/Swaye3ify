import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import { Student } from "../models/studentModel";
import mongoose from "mongoose";

export const createStudent = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const existingStudent = await Student.findOne({ email });

    if(existingStudent) {
        res.status(400).send(new ApiError(400, 'Cour already exists ❌'));
        return;
    }

    const newStudent = new Student({
        ...req.body,
        grade: new mongoose.Types.ObjectId(req.body.grade),
    });

    await newStudent.save();

    res.status(201).send(
        new ApiResponse(201, { newStudent }, 'Student created successfully ✅')
    );
});

export const updateStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const existingStudent = await Student.findById(studentId);

    if(!existingStudent) {
        res.status(404).send(
            new ApiError(401, 'Student not found ❌')
        );
        return;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { ...req.body }
    );

    res.status(200).send(
        new ApiResponse(200, { updatedStudent }, 'Student updated successfully ✅')
    );
});

export const deleteStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const existingStudent = await Student.findById(studentId);

    if(!existingStudent) {
        res.status(404).send(
            new ApiError(401, 'Student not found ❌')
        );
        return;
    }

    await Student.findByIdAndDelete(studentId);

    res.status(200).send(
        new ApiResponse(200, {}, 'Student deleted successfully ❌')
    );
});

export const getAllStudents = asyncHandler(async (req, res) => {
    const Students = await Student.find();

    res.status(200).send(
        new ApiResponse(200, { Students }, 'Students retrieved successfully ✅')
    );
});