export interface ExerciseCompletionPayload {
  exerciseId: string;
  durationMinutes: number;
  notes?: string | null;
}
