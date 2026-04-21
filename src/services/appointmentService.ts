import { Appointment } from '../models';

export const createAppointment = async (
  userId: string,
  input: {
    providerName: string;
    providerSpecialty: string;
    appointmentAt: Date;
    reason: string;
    notes?: string | null;
  }
): Promise<Appointment> => Appointment.create({ ...input, userId });

export const listAppointments = async (userId: string): Promise<Appointment[]> =>
  Appointment.findAll({ where: { userId }, order: [['appointmentAt', 'ASC']] });

export const getAppointment = async (id: string, userId: string): Promise<Appointment> => {
  const appointment = await Appointment.findOne({ where: { id, userId } });
  if (!appointment) {
    throw Object.assign(new Error('Appointment not found'), { status: 404 });
  }
  return appointment;
};

export const updateAppointment = async (id: string, userId: string, input: Partial<Appointment>): Promise<Appointment> => {
  const appointment = await getAppointment(id, userId);
  await appointment.update(input);
  return appointment;
};

export const deleteAppointment = async (id: string, userId: string): Promise<void> => {
  const appointment = await getAppointment(id, userId);
  appointment.status = 'cancelled';
  await appointment.save();
};

export const setReminder = async (id: string, userId: string, minutesBefore: number): Promise<Appointment> => {
  const appointment = await getAppointment(id, userId);
  appointment.reminderMinutesBefore = minutesBefore;
  await appointment.save();
  return appointment;
};
