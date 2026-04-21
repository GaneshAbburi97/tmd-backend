import crypto from 'crypto';
import request from 'supertest';
import { createApp } from '../server';

const app = createApp();
const sessionId = 'test-session';
const csrf = crypto.createHmac('sha256', process.env.CSRF_SECRET!).update(sessionId).digest('hex');

describe('Auth API', () => {
  it('returns 400 for invalid register payload', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .set('x-session-id', sessionId)
      .set('x-csrf-token', csrf)
      .send({ email: 'bad-email', password: 'weak' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('returns 400 for invalid login payload', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('x-session-id', sessionId)
      .set('x-csrf-token', csrf)
      .send({ email: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
