import request from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Pain API', () => {
  it('requires auth for pain list', async () => {
    const response = await request(app).get('/api/pain');
    expect(response.status).toBe(401);
  });

  it('requires auth for pain analytics', async () => {
    const response = await request(app).get('/api/pain/analytics/summary');
    expect(response.status).toBe(401);
  });
});
