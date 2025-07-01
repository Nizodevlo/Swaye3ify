import { Subject } from '../models/subjectModel';
import ApiResponse from '../utils/apiResponse';
import { asyncHandler } from './../../../backend/src/utils/asyncHandler';


export const getAllSubject = asyncHandler( async (_, res) => {
    const subjects = await Subject.find();

    res.status(200).send(
        new ApiResponse(200, { subjects }, 'Subjects retrieved successfully ✅')
    );
});