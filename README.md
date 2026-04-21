# TMD Backend API

Production-ready Node.js + Express + TypeScript API for TMD management features including authentication, pain tracking, exercises, CBT modules, mood tracking, appointments, and analytics.

## Tech Stack

- Node.js 18+
- Express.js v4
- TypeScript
- PostgreSQL
- Sequelize ORM
- JWT + bcrypt authentication
- Joi validation
- Pino logging
- Jest + Supertest
- Swagger/OpenAPI (`/api-docs`)

## Setup

```bash
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

Server: `http://localhost:3000`
Health: `GET /health`
Docs: `GET /api-docs`

## Docker

```bash
docker-compose up --build
```

## Environment Variables

See `.env.example` for all required values.

## Authentication Guide

1. `POST /api/auth/register`
2. `POST /api/auth/verify-email`
3. `POST /api/auth/login`
4. Include bearer token in `Authorization: Bearer <token>`
5. Use `POST /api/auth/refresh-token` when access token expires

## Endpoint Summary

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh-token`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/verify-email`

### Users
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/preferences`
- `PUT /api/users/preferences`

### Pain
- `POST /api/pain`
- `GET /api/pain`
- `GET /api/pain/:id`
- `PUT /api/pain/:id`
- `DELETE /api/pain/:id`
- `GET /api/pain/analytics/summary`
- `GET /api/pain/analytics/trends`

### Exercises
- `GET /api/exercises`
- `GET /api/exercises/:id`
- `POST /api/exercises/complete`
- `GET /api/exercises/progress`
- `GET /api/exercises/recommended`

### CBT
- `GET /api/cbt/modules`
- `GET /api/cbt/modules/:id`
- `POST /api/cbt/progress`
- `GET /api/cbt/progress`

### Mood
- `POST /api/mood`
- `GET /api/mood`
- `GET /api/mood/analytics`

### Appointments
- `POST /api/appointments`
- `GET /api/appointments`
- `GET /api/appointments/:id`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`
- `POST /api/appointments/:id/reminder`

### Analytics
- `GET /api/analytics/dashboard`
- `GET /api/analytics/pain-trends`
- `GET /api/analytics/exercise-stats`
- `GET /api/analytics/mood-correlation`
- `GET /api/analytics/report`
- `POST /api/analytics/export`

## Security Features

- Helmet security headers
- CORS controls
- Rate limiting (`100` requests / `15` minutes / IP)
- JWT auth middleware
- Password hashing (`bcrypt` salt rounds `10`)
- CSRF token validation (`x-session-id` + `x-csrf-token`)
- Input validation for all write endpoints

## Testing

```bash
npm test
```

## Deployment Notes

- Set `NODE_ENV=production`
- Use HTTPS at the reverse proxy/load balancer
- Configure production PostgreSQL connection pooling
- Provide secure JWT and CSRF secrets via environment variables
