import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { createMoodRecord, getMoodAnalytics, getMoodHistory } from '../services/moodService';

export const createMood = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.status(201).json({ success: true, data: await createMoodRecord(req.user!.id, req.body) });
};

export const moodHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getMoodHistory(req.user!.id) });
};

export const moodAnalytics = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getMoodAnalytics(req.user!.id) });
};
