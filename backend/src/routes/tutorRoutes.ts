import { Router } from 'express';
import validateRequest from '../middlewares/validate'; // Assuming this middleware exists
import { tutorUpdateValidationSchema, tutorValidationSchema } from '../validations/tutorValidation';
import {
  createTutor,
  deleteTutor,
  getAllTutors,
  getTutorById,
  updateTutor,
} from '../controllers/tutorController';

const tutorRouter = Router();

// Route to create a new tutor
tutorRouter.post('/', validateRequest(tutorValidationSchema), createTutor);

// Route to update an existing tutor by ID
tutorRouter.put('/:tutorId', validateRequest(tutorUpdateValidationSchema), updateTutor);

// Route to delete a tutor by ID
tutorRouter.delete('/:tutorId', deleteTutor);

// Route to get all tutors
tutorRouter.get('/', getAllTutors);

// Route to get a single tutor by ID (added for completeness)
tutorRouter.get('/:tutorId', getTutorById);

export default tutorRouter;
