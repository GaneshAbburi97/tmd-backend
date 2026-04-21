import { Router } from 'express';
import { dashboard, exerciseStats, exportData, moodCorrelation, painTrends, report } from '../controllers/analyticsController';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware);

router.get('/dashboard', asyncHandler(dashboard));
router.get('/pain-trends', asyncHandler(painTrends));
router.get('/exercise-stats', asyncHandler(exerciseStats));
router.get('/mood-correlation', asyncHandler(moodCorrelation));
router.get('/report', asyncHandler(report));
router.post('/export', asyncHandler(exportData));

export default router;
