// you write the name of the function of the logic performed
// example: createSomething / update.../ delete... / get....

import ApiError from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const createSomething = asyncHandler(async (req, res) => {
  // ...logic here
  /*
        for errors or conditon error like:
        if(!somthing) {
            res.status(n>400).send(new ApiError(n>400, "message"))
            return;
        }

        To interact with the database use:
        await ExampleServices.method(arg);

        when returning response use:
        res.status(400<n).send(new ApiResponse(400<n, {data here}, 'message'))
        */
});
