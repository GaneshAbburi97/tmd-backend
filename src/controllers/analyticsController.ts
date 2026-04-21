import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import {
  exportUserData,
  generateHealthReport,
  getDashboardSummary,
  getExerciseStats,
  getMoodPainCorrelation,
  getPainTrendAnalytics
} from '../services/analyticsService';

export const dashboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getDashboardSummary(req.user!.id) });
};

export const painTrends = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getPainTrendAnalytics(req.user!.id) });
};

export const exerciseStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getExerciseStats(req.user!.id) });
};

export const moodCorrelation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getMoodPainCorrelation(req.user!.id) });
};

export const report = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await generateHealthReport(req.user!.id) });
};

export const exportData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await exportUserData(req.user!.id) });
};
