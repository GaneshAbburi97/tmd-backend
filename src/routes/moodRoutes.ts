import { Router } from 'express';
import { createMood, moodAnalytics, moodHistory } from '../controllers/moodController';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validation';
import { moodSchema } from '../utils/validators';

const router = Router();
router.use(authMiddleware);

router.post('/', validateBody(moodSchema), asyncHandler(createMood));
router.get('/', asyncHandler(moodHistory));
router.get('/analytics', asyncHandler(moodAnalytics));

export default router;
