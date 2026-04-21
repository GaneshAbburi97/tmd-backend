import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from '../config/environment';

export const logger = pino({ level: env.logLevel });
export const requestLogger = pinoHttp({ logger });
