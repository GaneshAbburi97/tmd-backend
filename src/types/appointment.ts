export interface AppointmentPayload {
  providerName: string;
  providerSpecialty: string;
  appointmentAt: string;
  reason: string;
  notes?: string | null;
}
