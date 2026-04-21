import { Router } from 'express';
import {
  completeExercise,
  exerciseDetails,
  exerciseProgress,
  listExercises,
  recommendedExercises
} from '../controllers/exerciseController';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validation';
import { exerciseCompletionSchema } from '../utils/validators';

const router = Router();
router.use(authMiddleware);

router.get('/', asyncHandler(listExercises));
router.get('/progress', asyncHandler(exerciseProgress));
router.get('/recommended', asyncHandler(recommendedExercises));
router.get('/:id', asyncHandler(exerciseDetails));
router.post('/complete', validateBody(exerciseCompletionSchema), asyncHandler(completeExercise));

export default router;
