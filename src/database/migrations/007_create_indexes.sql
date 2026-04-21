CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  entity VARCHAR(100) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pain_user_recorded_at ON pain_records(user_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_mood_user_recorded_at ON mood_records(user_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_user_appointment_at ON appointments(user_id, appointment_at DESC);
CREATE INDEX IF NOT EXISTS idx_exercise_completions_user_completed_at ON exercise_completions(user_id, completed_at DESC);
