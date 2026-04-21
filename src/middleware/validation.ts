import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => (req: Request, _res: Response, next: NextFunction): void => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const err = new Error('Validation error') as Error & { status?: number; details?: unknown };
    err.status = 400;
    err.details = error.details.map((d) => d.message);
    throw err;
  }
  req.body = value;
  next();
};
