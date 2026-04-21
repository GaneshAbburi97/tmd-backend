import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface ApiError extends Error {
  status?: number;
  details?: unknown;
}
