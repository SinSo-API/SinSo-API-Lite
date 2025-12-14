import { Hono } from 'hono';
import { Env } from '../models/Suggestion';
import { SuggestionsService } from '../services/suggestionsService';
import { SuggestionCreateInput } from '../models/Suggestion';

const suggestionsRouter = new Hono<{ Bindings: Env }>();

// Health check
suggestionsRouter.get('/health', (c) => {
  return c.json({
    status: 'OK',
    service: 'suggestions',
    timestamp: new Date().toISOString()
  });
});

// Submit a new song suggestion
suggestionsRouter.post('/', async (c) => {
  try {
    const body = await c.req.json<SuggestionCreateInput>();
    const { title, artist, album, year, lyrics, submitter_name, submitter_email } = body;

    // Validation
    if (!title || !artist || !lyrics) {
      return c.json(
        {
          status: 400,
          code: 'VALIDATION_ERROR',
          message: 'Missing required fields',
          details: 'title, artist, and lyrics are required fields',
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        400
      );
    }

    if (lyrics.length < 10) {
      return c.json(
        {
          status: 400,
          code: 'VALIDATION_ERROR',
          message: 'Lyrics too short',
          details: 'Lyrics must be at least 10 characters long',
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        400
      );
    }

    const service = new SuggestionsService(c.env.sinso_api_db);
    const result = await service.createSuggestion({
      title,
      artist,
      album,
      year,
      lyrics,
      submitter_name,
      submitter_email
    });

    return c.json(
      {
        status: 201,
        code: 'SUGGESTION_CREATED',
        message: 'Song suggestion submitted successfully',
        data: {
          suggestion_id: result.id,
          title: result.suggestion.title,
          artist: result.suggestion.artist,
          status: result.suggestion.status
        },
        timestamp: new Date().toISOString().slice(0, 19)
      },
      201
    );
  } catch (error) {
    console.error('Suggestion creation error:', error);
    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to submit suggestion',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

// Get suggestion status by ID
suggestionsRouter.get('/:id/status', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    if (isNaN(id)) {
      return c.json(
        {
          status: 400,
          code: 'INVALID_ID',
          message: 'Invalid suggestion ID',
          details: 'Suggestion ID must be a valid number',
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        400
      );
    }

    const service = new SuggestionsService(c.env.sinso_api_db);
    const suggestion = await service.getSuggestionStatus(id);

    if (!suggestion) {
      return c.json(
        {
          status: 404,
          code: 'SUGGESTION_NOT_FOUND',
          message: 'Suggestion not found',
          details: `No suggestion found with ID ${id}`,
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        404
      );
    }

    return c.json({
      status: 200,
      code: 'SUCCESS',
      data: suggestion,
      timestamp: new Date().toISOString().slice(0, 19)
    });
  } catch (error) {
    console.error('Status check error:', error);
    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch suggestion status',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

export default suggestionsRouter;