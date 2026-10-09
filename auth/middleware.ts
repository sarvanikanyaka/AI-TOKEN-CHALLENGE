// Express middleware skeleton for protected routes
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './service';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'missing_authorization' });
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const result = await verifyToken(token);
  if (!result.ok) return res.status(401).json({ error: 'invalid_token' });
  // attach user info
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.user = result.payload;
  return next();
}
