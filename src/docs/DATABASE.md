# Database Schema

The API uses PostgreSQL with SQL migrations in `src/database/migrations`.

## Core Tables
- `users`
- `pain_records`
- `exercises`
- `exercise_completions`
- `cbt_modules`
- `cbt_progress`
- `mood_records`
- `appointments`
- `audit_logs`

## Notes
- UUID primary keys are generated with `uuid-ossp`.
- Foreign keys enforce user ownership for tracking tables.
- Indexes are defined in `009_create_indexes.sql` for query-heavy paths.
