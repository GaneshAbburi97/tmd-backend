CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pain_user_recorded_at ON pain_records(user_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_mood_user_recorded_at ON mood_records(user_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_user_appointment_at ON appointments(user_id, appointment_at DESC);
CREATE INDEX IF NOT EXISTS idx_exercise_completions_user_completed_at ON exercise_completions(user_id, completed_at DESC);
