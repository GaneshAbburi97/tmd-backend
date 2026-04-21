import cors from 'cors';
import { env } from '../config/environment';

export const corsMiddleware = cors({
  origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',').map((o) => o.trim()),
  credentials: true
});
