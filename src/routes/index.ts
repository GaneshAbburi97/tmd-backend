import { Router } from 'express';
import analyticsRoutes from './analyticsRoutes';
import appointmentRoutes from './appointmentRoutes';
import authRoutes from './authRoutes';
import cbtRoutes from './cbtRoutes';
import exerciseRoutes from './exerciseRoutes';
import moodRoutes from './moodRoutes';
import painRoutes from './painRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/pain', painRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/cbt', cbtRoutes);
router.use('/mood', moodRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
