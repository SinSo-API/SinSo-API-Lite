import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { swaggerUI } from '@hono/swagger-ui';
import songsRouter from './routes/songs';
import artistsRouter from './routes/artists';
import lyricsRouter from './routes/lyrics';
import { Env } from './models/Song';
import { APP_AUTHOR, APP_VERSION } from './metadata';
import { generateOpenAPISpec } from '../doc/openapi.spec';

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
        'All Songs': '/api/v1/songs',
        'Search Song By ID': '/api/v1/songs/{song_id}'
      },
      '/Artists' : {
        'All Artists': '/api/v1/artists',
        'Search Artist By ID': '/api/v1/songs/{artist_id}'
      },
      '/Lyrics' : {
        'Search Lyrics By ID': '/api/v1/lyrics/{lyric_id}'
      }
    },
    HealthChecks: {
        Root: '/health',
        Songs: '/api/v1/songs/health',
        Artists: '/api/v1/artists/health',
        Lyrics: '/api/v1/lyrics/health',
    },
    Documentation: {
      'Swagger UI': '/docs',
      'OpenAPI JSON': '/docs/openapi.json'
    }
  });
});

// List of API Routers
app.route('/api/v1/songs', songsRouter);
app.route('/api/v1/artists', artistsRouter);
app.route('/api/v1/lyrics', lyricsRouter);

// OpenAPI Doc routes
app.get('/docs/openapi.json', (c) => {
  return c.json(generateOpenAPISpec());
});
app.get('/docs', swaggerUI({ url: '/docs/openapi.json' }));


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