import { Request, Response, NextFunction } from 'express';
import { createError } from './errorHandler.js';

export interface AuthRequest extends Request {
  isAdmin?: boolean;
}

/**
 * Basic Auth middleware for admin routes
 * Uses ADMIN_USERNAME and ADMIN_PASSWORD from environment variables
 */
export const basicAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    throw createError('Authentication required', 401);
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUsername && password === adminPassword) {
    req.isAdmin = true;
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    throw createError('Invalid credentials', 401);
  }
};

/**
 * Optional: JWT-based authentication (for future enhancement)
 */
export const jwtAuth = (_req: AuthRequest, _res: Response, next: NextFunction): void => {
  // Placeholder for JWT auth implementation
  // Can be enabled by setting USE_JWT=true in env
  next();
};
