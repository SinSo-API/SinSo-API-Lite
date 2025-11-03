import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import songsRouter from './routes/songs';
import { Env } from './models/Song';
import { APP_AUTHOR, APP_VERSION } from './metadata';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());
app.use('*', logger());

// Endpoint to check the current health of the API.
app.get('/health', (c) => {
  return c.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: 'Production',
    version: APP_VERSION
  });
});

// Root
app.get('/', (c) => {
  return c.json({
    Name: 'SinSo API Lite',
    Description: 'Welcome to SinSo API Lite !!!',
    Version: APP_VERSION,
    Author: APP_AUTHOR,
    Endpoints: {
      '/Songs' : {
        'All Songs': '/api/v1/songs'
      }
    },
    HealthChecks: {
        Root: '/health',
        Songs: '/api/v1/songs/health'
      }
  });
});

// List of API Routers
app.route('/api/v1/songs', songsRouter);

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    message: 'Route not found',
    path: c.req.path
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({
    success: false,
    message: 'Internal server error',
    error: err.message
  }, 500);
});

export default app;