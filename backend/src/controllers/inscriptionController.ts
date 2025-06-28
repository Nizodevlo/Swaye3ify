import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import { Inscription } from "../models/inscriptionModel"

export const createInscription = asyncHandler(async (req, res) => {
    const { student, cour } = req.body;

    const existingInscription = await Inscription.findOne({ student, cour });

    if(existingInscription) {
        res.status(400).send(
            new ApiError(400, 'Inscription already exists ❌')
        );
        return;
    }

    const newInscription = new Inscription({
        ...req.body,
        student: new mongoose.Types.ObjectId(req.body.student),
        cour: new mongoose.Types.ObjectId(req.body.cour),
    });

    await newInscription.save();

    res.status(201).send(
        new ApiResponse(201, { newInscription }, 'Inscription create successfully ✅')
    );
});

export const updateInscription = asyncHandler(async (req, res) => {
    const { inscriptionId } = req.params;

    const existingInscription = await Inscription.findById(inscriptionId);

    if(!existingInscription) {
        res.status(404).send(
            new ApiError(401, 'Inscription not found ❌')
        );
        return;
    }

    const updatedInscription = await Inscription.findByIdAndUpdate(
        inscriptionId,
        { 
            ...req.body,
            student: new mongoose.Types.ObjectId(req.body.student),
            cour: new mongoose.Types.ObjectId(req.body.cour),
        }
    );

    res.status(200).send(
        new ApiResponse(200, { updatedInscription }, 'Cour updated successfully ✅')
    );
});

export const deleteInscription = asyncHandler(async (req, res) => {
    const { inscriptionId } = req.params;

    const existingInscription = await Inscription.findById(inscriptionId);

    if(!existingInscription) {
        res.status(404).send(
            new ApiError(401, 'Inscription not found ❌')
        );
        return;
    }

    await Inscription.findByIdAndDelete(inscriptionId);

    res.status(200).send(
        new ApiResponse(200, {}, 'Inscription deleted successfully ✅')
    );
});

export const getAllInscriptions = asyncHandler(async (req, res) => {
    const inscriptions = await Inscription.find();

    res.status(200).send(
        new ApiResponse(200, { inscriptions }, 'Inscriptions retrieved successfully ✅')
    );
});