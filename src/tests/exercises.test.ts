import request from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Exercise API', () => {
  it('requires auth for exercise listing', async () => {
    const response = await request(app).get('/api/exercises');
    expect(response.status).toBe(401);
  });

  it('returns health endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
