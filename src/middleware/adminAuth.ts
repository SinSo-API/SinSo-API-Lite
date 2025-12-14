import { Context, Next } from 'hono';
import { Env } from '../models/Suggestion';

export const adminAuth = async (c: Context<{ Bindings: Env }>, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.json(
      {
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Authorization header required',
        details: 'Please provide a valid Bearer token in the Authorization header',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      401
    );
  }

  const token = authHeader.replace('Bearer ', '').trim();

  if (!token || token !== c.env.ADMIN_API_KEY) {
    return c.json(
      {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Invalid or missing API key',
        details: 'The provided API key is not valid',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      403
    );
  }

  await next();
};