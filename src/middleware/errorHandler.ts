import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../types';
import { env } from '../config/environment';

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
};

export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction): void => {
  const status = err.status ?? 500;
  res.status(status).json({
    success: false,
    message: status === 500 && env.isProduction ? 'Something went wrong' : err.message,
    ...(env.isProduction ? {} : { details: err.details, stack: err.stack })
  });
};
