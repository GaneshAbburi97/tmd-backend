import { Router } from 'express';
import {
  createPain,
  getPainById,
  getPainList,
  getPainSummary,
  getPainTrends,
  removePain,
  updatePain
} from '../controllers/painController';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validation';
import { painSchema } from '../utils/validators';

const router = Router();
router.use(authMiddleware);

router.get('/analytics/summary', asyncHandler(getPainSummary));
router.get('/analytics/trends', asyncHandler(getPainTrends));
router.post('/', validateBody(painSchema), asyncHandler(createPain));
router.get('/', asyncHandler(getPainList));
router.get('/:id', asyncHandler(getPainById));
router.put('/:id', validateBody(painSchema), asyncHandler(updatePain));
router.delete('/:id', asyncHandler(removePain));

export default router;
