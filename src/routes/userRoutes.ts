import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import { getPreferences, getProfile, updatePreferences, updateProfile } from '../controllers/userController';

const router = Router();
router.use(authMiddleware);

router.get('/profile', asyncHandler(getProfile));
router.put('/profile', asyncHandler(updateProfile));
router.get('/preferences', asyncHandler(getPreferences));
router.put('/preferences', asyncHandler(updatePreferences));

export default router;
