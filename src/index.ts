import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { swaggerUI } from '@hono/swagger-ui';
import songsRouter from './routes/songs';
import artistsRouter from './routes/artists';
import lyricsRouter from './routes/lyrics';
import searchRouter from './routes/search';
import suggestionsRouter from './routes/suggestions';
import adminRouter from './routes/admin';
import { Env } from './models/Song';
import { APP_AUTHOR, APP_VERSION } from './metadata';
import { generateOpenAPISpec } from '../doc/openapi.spec';
import { dashboardHTML } from './views/dashboard';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());
app.use('*', logger());
// Remove this line: app.use('/*', serveStatic({ root: './public' }));

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
      '/Songs': {
        'All Songs': '/api/v1/songs',
        'Search Song By ID': '/api/v1/songs/{song_id}'
      },
      '/Artists': {
        'All Artists': '/api/v1/artists',
        'Search Artist By ID': '/api/v1/artists/{artist_id}'
      },
      '/Lyrics': {
        'Search Lyrics By ID': '/api/v1/lyrics/{lyric_id}'
      },
      '/Search': {
        'Search': '/api/v1/search'
      },
      '/Suggestions': {
        'Submit Song Suggestion': 'POST /api/v1/suggestions',
        'Check Suggestion Status': '/api/v1/suggestions/{id}/status'
      },
      '/Admin': {
        'Get Pending Suggestions': '/api/v1/admin/suggestions',
        'Approve Suggestion': 'POST /api/v1/admin/suggestions/{id}/approve',
        'Reject Suggestion': 'POST /api/v1/admin/suggestions/{id}/reject',
        'Get Stats': '/api/v1/admin/stats'
      }
    },
    HealthChecks: {
      Root: '/health',
      Songs: '/api/v1/songs/health',
      Artists: '/api/v1/artists/health',
      Lyrics: '/api/v1/lyrics/health',
      Search: '/api/v1/search/health',
      Suggestions: '/api/v1/suggestions/health',
      Admin: '/api/v1/admin/health'
    },
    Documentation: {
      'Swagger UI': '/docs',
      'OpenAPI JSON': '/docs/openapi.json',
      'Dashboard': '/dashboard.html'  // Add this
    }
  });
});

// List of API Routers
app.route('/api/v1/songs', songsRouter);
app.route('/api/v1/artists', artistsRouter);
app.route('/api/v1/lyrics', lyricsRouter);
app.route('/api/v1/search', searchRouter);
app.route('/api/v1/suggestions', suggestionsRouter);
app.route('/api/v1/admin', adminRouter);

// OpenAPI Doc routes
app.get('/docs/openapi.json', (c) => {
  return c.json(generateOpenAPISpec());
});

app.get('/docs', swaggerUI({ url: '/docs/openapi.json' }));

app.get('/dashboard.html', (c) => {
  return c.html(dashboardHTML);
});

app.get('/dashboard', (c) => {
  return c.redirect('/dashboard.html');
});

app.get('/api/v1/dashboard', (c) => {
  return c.redirect('/dashboard.html');
});

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      status: 404,
      code: `${c.req.path} not found`,
      message: 'URI is not defined',
      details: `${c.req.path} URI does not exist`,
      path: c.req.path,
      timestamp: new Date().toISOString().slice(0, 19),
    },
    404
  );
});

// Error handler
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json(
    {
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      details: err.message,
      path: c.req.path,
      timestamp: new Date().toISOString().slice(0, 19),
    },
    500
  );
});

export default app;