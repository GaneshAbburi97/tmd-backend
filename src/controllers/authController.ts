import { Request, Response } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
  requestPasswordReset,
  resetPassword,
  verifyEmail
} from '../services/authService';
import { AuthenticatedRequest } from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
  const result = await registerUser(req.body);
  res.status(201).json({
    success: true,
    message: 'Registration successful. Verify email to activate account.',
    data: { id: result.user.id, email: result.user.email, verificationToken: result.verificationToken }
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { accessToken, refreshToken, user } = await loginUser(req.body);
  res.json({ success: true, data: { accessToken, refreshToken, user } });
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const tokens = await refreshUserToken(req.body.refreshToken);
  res.json({ success: true, data: tokens });
};

export const logout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await logoutUser(req.user!.id);
  res.json({ success: true, message: 'Logged out successfully' });
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  await requestPasswordReset(req.body.email);
  res.json({ success: true, message: 'If account exists, reset instructions were sent.' });
};

export const resetPasswordWithToken = async (req: Request, res: Response): Promise<void> => {
  await resetPassword(req.body.token, req.body.password);
  res.json({ success: true, message: 'Password reset successful' });
};

export const verifyEmailToken = async (req: Request, res: Response): Promise<void> => {
  await verifyEmail(req.body.token);
  res.json({ success: true, message: 'Email verified successfully' });
};
