import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { env } from '../config/environment';

const CSRF_SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const sign = (sessionId: string): string =>
  crypto.createHmac('sha256', env.csrfSecret).update(sessionId).digest('hex');

export const issueCsrfToken = (req: Request, res: Response, next: NextFunction): void => {
  const sessionKey = (req.headers['x-session-id'] as string) || req.ip || 'anonymous';
  res.setHeader('x-csrf-token', sign(sessionKey));
  next();
};

export const csrfProtection = (req: Request, _res: Response, next: NextFunction): void => {
  if (CSRF_SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  const sessionKey = (req.headers['x-session-id'] as string) || req.ip || 'anonymous';
  const token = req.headers['x-csrf-token'];

  if (typeof token !== 'string' || token !== sign(sessionKey)) {
    const err = new Error('Invalid CSRF token') as Error & { status?: number };
    err.status = 403;
    throw err;
  }

  next();
};
