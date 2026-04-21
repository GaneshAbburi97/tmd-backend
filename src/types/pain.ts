export interface PainPayload {
  intensity: number;
  location: string;
  triggers: string;
  notes?: string | null;
}
