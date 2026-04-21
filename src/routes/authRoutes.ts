import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validation';
import {
  forgotPassword,
  login,
  logout,
  refreshToken,
  register,
  resetPasswordWithToken,
  verifyEmailToken
} from '../controllers/authController';
import { authSchemas } from '../utils/validators';

const router = Router();

router.post('/register', validateBody(authSchemas.register), asyncHandler(register));
router.post('/login', validateBody(authSchemas.login), asyncHandler(login));
router.post('/refresh-token', validateBody(authSchemas.refreshToken), asyncHandler(refreshToken));
router.post('/logout', authMiddleware, asyncHandler(logout));
router.post('/forgot-password', validateBody(authSchemas.forgotPassword), asyncHandler(forgotPassword));
router.post('/reset-password', validateBody(authSchemas.resetPassword), asyncHandler(resetPasswordWithToken));
router.post('/verify-email', validateBody(authSchemas.verifyEmail), asyncHandler(verifyEmailToken));

export default router;
