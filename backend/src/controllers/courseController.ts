import { isValidObjectId } from 'mongoose';
import { Course } from '../models/courseModel';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';

export const getController = asyncHandler(async (req: Request, res: Response) => {
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

export const getByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ msg: 'The ID is not valid!' });
    return;
  }

  const course = await Course.findById(id);

  if (course) {
    res.status(200).json({ course });
  } else {
    res.status(404).json({ msg: 'No course was found By ID!' });
  }
});

export const createController = asyncHandler(async (req: Request, res: Response) => {
  const { nom, description, price, grade, subject } = req.body;

  if (!nom || !description || !price || !grade || !subject) {
    res.status(400).json({ msg: 'All fields are required!' });
    return;
  }

  if (!isValidObjectId(grade) || !isValidObjectId(subject)) {
    res.status(400).json({ msg: 'Invalid grade or subject!' });
    return;
  }

  const foundGrade = await Grade.findById(grade);
  const foundSubject = await Subject.findById(subject);

  if (!foundGrade || !foundSubject) {
    res.status(404).json({ msg: 'Grade or Subject not found.' });
    return;
  }

  const newCourse = Course.create({ nom, description, price, grade, subject });

  res.status(200).json({ course: newCourse });
});

export const updateController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nom, description, price, grade, subject } = req.body;

  if (!nom || !description || !price || !grade || !subject) {
    res.status(400).json({ msg: 'All fields are required!' });
    return;
  }

  if (!isValidObjectId(id) || !isValidObjectId(grade) || !isValidObjectId(subject)) {
    res.status(400).json({ msg: 'Invalid grade or subject or ID!' });
    return;
  }

  const foundGrade = await Grade.findById(grade);
  const foundSubject = await Subject.findById(subject);

  if (!foundGrade || !foundSubject) {
    res.status(404).json({ msg: 'Grade or Subject not found.' });
    return;
  }

  const updateCourse = await Course.findByIdAndUpdate(
    id,
    { nom, description, price, grade, subject },
    { new: true, runValidators: true } // new: true returns updated doc
  );

  if (!updateCourse) {
    res.status(404).json({ msg: 'Course not found.' });
    return;
  }

  res.status(200).json({ course: updateCourse });
});

export const deleteController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ msg: 'Invalid ID!' });
    return;
  }

  const deleteCourse = await Course.findByIdAndDelete(id);

  if (!deleteCourse) {
    res.status(404).json({ msg: 'Course not found.' });
    return;
  }

  res.status(200).json({ msg: 'Course deleted successfully.', course: deleteCourse });
});

export const softDeleteController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ msg: 'Invalid ID!' });
    return;
  }

  const course = await Course.findById(id);

  if (!course) {
    res.status(404).json({ msg: 'Course not found.' });
    return;
  }

  if (course.deletedAt) {
    res.status(400).json({ msg: 'Course already deleted.' });
    return;
  }

  course.deletedAt = new Date();
  await course.save();

  res.status(200).json({ msg: 'Course soft-deleted.', course });
});
