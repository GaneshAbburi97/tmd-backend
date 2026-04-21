import { Router } from 'express';
import {
  cancelAppointmentHandler,
  createAppointmentHandler,
  getAppointmentHandler,
  listAppointmentsHandler,
  setReminderHandler,
  updateAppointmentHandler
} from '../controllers/appointmentController';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validation';
import { appointmentSchema } from '../utils/validators';

const router = Router();
router.use(authMiddleware);

router.post('/', validateBody(appointmentSchema), asyncHandler(createAppointmentHandler));
router.get('/', asyncHandler(listAppointmentsHandler));
router.get('/:id', asyncHandler(getAppointmentHandler));
router.put('/:id', validateBody(appointmentSchema), asyncHandler(updateAppointmentHandler));
router.delete('/:id', asyncHandler(cancelAppointmentHandler));
router.post('/:id/reminder', asyncHandler(setReminderHandler));

export default router;
