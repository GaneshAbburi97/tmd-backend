import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  listAppointments,
  setReminder,
  updateAppointment
} from '../services/appointmentService';

export const createAppointmentHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.status(201).json({ success: true, data: await createAppointment(req.user!.id, req.body) });
};

export const listAppointmentsHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await listAppointments(req.user!.id) });
};

export const getAppointmentHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await getAppointment(req.params.id, req.user!.id) });
};

export const updateAppointmentHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: await updateAppointment(req.params.id, req.user!.id, req.body) });
};

export const cancelAppointmentHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await deleteAppointment(req.params.id, req.user!.id);
  res.status(204).send();
};

export const setReminderHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const reminderMinutesBefore = Number(req.body.reminderMinutesBefore || 30);
  res.json({ success: true, data: await setReminder(req.params.id, req.user!.id, reminderMinutesBefore) });
};
