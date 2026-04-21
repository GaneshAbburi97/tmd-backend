import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment';

export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export const generateAccessToken = (payload: AuthTokenPayload): string =>
  jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtAccessExpiresIn as jwt.SignOptions['expiresIn'] });

export const generateRefreshToken = (payload: AuthTokenPayload): string =>
  jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn as jwt.SignOptions['expiresIn'] });

export const verifyAccessToken = (token: string): AuthTokenPayload =>
  jwt.verify(token, env.jwtAccessSecret) as AuthTokenPayload;

export const verifyRefreshToken = (token: string): AuthTokenPayload =>
  jwt.verify(token, env.jwtRefreshSecret) as AuthTokenPayload;

export const generateRandomToken = (): string => crypto.randomBytes(32).toString('hex');
export const hashToken = (value: string): string => crypto.createHash('sha256').update(value).digest('hex');
