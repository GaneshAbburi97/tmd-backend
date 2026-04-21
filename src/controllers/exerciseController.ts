import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import {
  getExerciseById,
  getExerciseProgress,
  getExercises,
  getRecommendedExercises,
  logExerciseCompletion
} from '../services/exerciseService';

export const listExercises = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getExercises() });
};

export const exerciseDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getExerciseById(req.params.id) });
};

export const completeExercise = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const completion = await logExerciseCompletion(req.user!.id, req.body);
  res.status(201).json({ success: true, data: completion });
};

export const exerciseProgress = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getExerciseProgress(req.user!.id) });
};

export const recommendedExercises = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getRecommendedExercises(req.user!.id) });
};
