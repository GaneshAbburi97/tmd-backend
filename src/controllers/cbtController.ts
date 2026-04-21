import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { getModuleById, getModules, getUserCBTProgress, logModuleProgress } from '../services/cbtService';

export const listModules = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getModules() });
};

export const moduleDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getModuleById(req.params.id) });
};

export const logProgress = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.status(201).json({ success: true, data: await logModuleProgress(req.user!.id, req.body) });
};

export const getProgress = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getUserCBTProgress(req.user!.id) });
};
