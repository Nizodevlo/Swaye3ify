import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import { Cour } from "../models/courModel";
import mongoose from "mongoose";

export const createCour = asyncHandler(async (req, res) => {

    const { courName } = req.body;
    

    const existingCour = await Cour.findOne({ courName });

    console.log("Existing :", existingCour)

    if(existingCour) {
        res.status(400).send(new ApiError(400, 'Cour already exists ❌'));
        return;
    }

    const newCour = new Cour({
        ...req.body,
        prix: parseInt(req.body.prix),
        teacher: new mongoose.Types.ObjectId('5ae4cedafe51b99a8ff1b022'),
        subject: new mongoose.Types.ObjectId(req.body.subject),
        grade: new mongoose.Types.ObjectId(req.body.grade),
    });

    await newCour.save();

    res.status(201).send(
        new ApiResponse(201, { newCour }, 'Cour created successfully ✅')
    );
});

export const updateCour = asyncHandler(async (req, res) => {
    const { courId } = req.params;

    const existingCour = await Cour.findById(courId);

    if(!existingCour) {
        res.status(404).send(
            new ApiError(401, 'Cour not found ❌')
        );
        return;
    }

    const updatedCour = await Cour.findByIdAndUpdate(
        courId,
        { ...req.body
            ,prix: parseInt(req.body.prix),
        teacher: new mongoose.Types.ObjectId('5ae4cedafe51b99a8ff1b022'),
        subject: new mongoose.Types.ObjectId(req.body.subject),
        grade: new mongoose.Types.ObjectId(req.body.grade) }
    );

    res.status(200).send(
        new ApiResponse(200, { updatedCour }, 'Cour updated successfully ✅')
    );
});

export const deleteCour = asyncHandler(async (req, res) => {
    const { courId } = req.params;

    const existingCour = await Cour.findById(courId);

    if(!existingCour) {
        res.status(404).send(
            new ApiError(401, 'Cour not found ❌')
        );
        return;
    }

    await Cour.findByIdAndDelete(courId);

    res.status(200).send(
        new ApiResponse(200, {}, 'Cour deleted successfully ❌')
    );
});

export const getAllCours = asyncHandler(async (req, res) => {
    const cours = await Cour.find();

    res.status(200).send(
        new ApiResponse(200, { cours }, 'Cours retrieved successfully ✅')
    );
});