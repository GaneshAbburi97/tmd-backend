# TMD Backend API

Base URL: `/api`

## Authentication
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-email`

## Users
- `GET /users/profile`
- `PUT /users/profile`
- `GET /users/preferences`
- `PUT /users/preferences`

## Pain
- `POST /pain`
- `GET /pain`
- `GET /pain/:id`
- `PUT /pain/:id`
- `DELETE /pain/:id`
- `GET /pain/analytics/summary`
- `GET /pain/analytics/trends`

## Exercises
- `GET /exercises`
- `GET /exercises/:id`
- `POST /exercises/complete`
- `GET /exercises/progress`
- `GET /exercises/recommended`

## CBT
- `GET /cbt/modules`
- `GET /cbt/modules/:id`
- `POST /cbt/progress`
- `GET /cbt/progress`

## Mood
- `POST /mood`
- `GET /mood`
- `GET /mood/analytics`

## Appointments
- `POST /appointments`
- `GET /appointments`
- `GET /appointments/:id`
- `PUT /appointments/:id`
- `DELETE /appointments/:id`
- `POST /appointments/:id/reminder`

## Analytics
- `GET /analytics/dashboard`
- `GET /analytics/pain-trends`
- `GET /analytics/exercise-stats`
- `GET /analytics/mood-correlation`
- `GET /analytics/report`
- `POST /analytics/export`

For complete request/response schemas, use the OpenAPI spec at `GET /api-docs`.
