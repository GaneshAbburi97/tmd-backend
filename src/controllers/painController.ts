import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import {
  createPainRecord,
  deletePainRecord,
  getPainRecord,
  listPainRecords,
  painSummary,
  painTrends,
  updatePainRecord
} from '../services/painService';

export const createPain = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const record = await createPainRecord(req.user!.id, req.body);
  res.status(201).json({ success: true, data: record });
};

export const getPainList = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const result = await listPainRecords(req.user!.id, page, limit);
  res.json({ success: true, data: result });
};

export const getPainById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const record = await getPainRecord(req.params.id, req.user!.id);
  res.json({ success: true, data: record });
};

export const updatePain = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const record = await updatePainRecord(req.params.id, req.user!.id, req.body);
  res.json({ success: true, data: record });
};

export const removePain = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await deletePainRecord(req.params.id, req.user!.id);
  res.status(204).send();
};

export const getPainSummary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await painSummary(req.user!.id) });
};

export const getPainTrends = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const days = Number(req.query.days || 30);
  res.json({ success: true, data: await painTrends(req.user!.id, days) });
};
