import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().min(16).required(),
  JWT_REFRESH_SECRET: Joi.string().min(16).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('24h'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: Joi.number().default(100),
  CORS_ORIGIN: Joi.string().default('*'),
  LOG_LEVEL: Joi.string().default('info'),
  EMAIL_FROM: Joi.string().email().default('no-reply@tmd.com'),
  APP_BASE_URL: Joi.string().uri().default('http://localhost:3000'),
  CSRF_SECRET: Joi.string().min(16).required()
}).unknown(true);

const { value, error } = schema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Environment validation failed: ${error.message}`);
}

export const env = {
  nodeEnv: value.NODE_ENV as string,
  isProduction: value.NODE_ENV === 'production',
  port: Number(value.PORT),
  databaseUrl: value.DATABASE_URL as string,
  jwtAccessSecret: value.JWT_ACCESS_SECRET as string,
  jwtRefreshSecret: value.JWT_REFRESH_SECRET as string,
  jwtAccessExpiresIn: value.JWT_ACCESS_EXPIRES_IN as string,
  jwtRefreshExpiresIn: value.JWT_REFRESH_EXPIRES_IN as string,
  rateLimitWindowMs: Number(value.RATE_LIMIT_WINDOW_MS),
  rateLimitMax: Number(value.RATE_LIMIT_MAX),
  corsOrigin: value.CORS_ORIGIN as string,
  logLevel: value.LOG_LEVEL as string,
  emailFrom: value.EMAIL_FROM as string,
  appBaseUrl: value.APP_BASE_URL as string,
  csrfSecret: value.CSRF_SECRET as string
};
