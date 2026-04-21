CREATE TABLE IF NOT EXISTS mood_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  mood_level INTEGER NOT NULL CHECK (mood_level BETWEEN 1 AND 10),
  stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
  anxiety_level INTEGER NOT NULL CHECK (anxiety_level BETWEEN 1 AND 10),
  notes TEXT,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
