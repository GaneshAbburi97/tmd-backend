import { Router } from 'express';
import { getProgress, listModules, logProgress, moduleDetails } from '../controllers/cbtController';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validation';
import { cbtProgressSchema } from '../utils/validators';

const router = Router();
router.use(authMiddleware);

router.get('/modules', asyncHandler(listModules));
router.get('/modules/:id', asyncHandler(moduleDetails));
router.post('/progress', validateBody(cbtProgressSchema), asyncHandler(logProgress));
router.get('/progress', asyncHandler(getProgress));

export default router;
