import { Example } from '../models/exampleModel';
import { asyncHandler } from '../utils/asyncHandler';

export const createController = asyncHandler(async (req, res) => {
  // you can use model here
  const example = await Example.find();
});
