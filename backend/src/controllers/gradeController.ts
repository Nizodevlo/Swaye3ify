import { Grade } from "../models/gradeModel";
import ApiResponse from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllGrades = asyncHandler( async (_, res) => {
    const grades = await Grade.find();

    res.status(200).send(
        new ApiResponse(200, { grades }, 'Grades retrieved successfully ✅')
    );
});