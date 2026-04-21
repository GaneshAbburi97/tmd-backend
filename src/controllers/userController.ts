import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import {
  getUserPreferences,
  getUserProfile,
  updateUserPreferences,
  updateUserProfile
} from '../services/userService';

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = await getUserProfile(req.user!.id);
  res.json({ success: true, data: user });
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = await updateUserProfile(req.user!.id, req.body);
  res.json({ success: true, data: user });
};

export const getPreferences = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const prefs = await getUserPreferences(req.user!.id);
  res.json({ success: true, data: prefs });
};

export const updatePreferences = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const prefs = await updateUserPreferences(req.user!.id, req.body);
  res.json({ success: true, data: prefs });
};
