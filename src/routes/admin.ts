import { Hono } from 'hono';
import { Env } from '../models/Suggestion';
import { SuggestionsService } from '../services/suggestionsService';
import { adminAuth } from '../middleware/adminAuth';
import { SuggestionRejectInput } from '../models/Suggestion';

const adminRouter = new Hono<{ Bindings: Env }>();

// Apply admin authentication to all routes
adminRouter.use('/*', adminAuth);

// Health check
adminRouter.get('/health', (c) => {
  return c.json({
    status: 'OK',
    service: 'admin',
    timestamp: new Date().toISOString()
  });
});

// Get all suggestions (with optional status filter)
adminRouter.get('/suggestions', async (c) => {
  try {
    const status = c.req.query('status') || 'pending';

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return c.json(
        {
          status: 400,
          code: 'INVALID_STATUS',
          message: 'Invalid status parameter',
          details: 'Status must be one of: pending, approved, rejected',
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        400
      );
    }

    const service = new SuggestionsService(c.env.sinso_api_db);
    const suggestions = await service.getAllSuggestions(status);

    return c.json({
      status: 200,
      code: 'SUCCESS',
      count: suggestions.length,
      data: suggestions,
      timestamp: new Date().toISOString().slice(0, 19)
    });
  } catch (error) {
    console.error('Fetch suggestions error:', error);
    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch suggestions',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

// Get specific suggestion by ID
adminRouter.get('/suggestions/:id', async (c) => {
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
    const suggestion = await service.getSuggestionById(id);

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
    console.error('Fetch suggestion error:', error);
    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch suggestion',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

// Approve suggestion
adminRouter.post('/suggestions/:id/approve', async (c) => {
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
    const result = await service.approveSuggestion(id);

    return c.json({
      status: 200,
      code: 'SUGGESTION_APPROVED',
      message: 'Suggestion approved and song added successfully',
      data: {
        suggestion_id: id,
        song_id: result.songId,
        lyric_id: result.lyricId,
        title: result.suggestion.title,
        artist: result.suggestion.artist
      },
      timestamp: new Date().toISOString().slice(0, 19)
    });
  } catch (error) {
    console.error('Approval error:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      return c.json(
        {
          status: 404,
          code: 'SUGGESTION_NOT_FOUND',
          message: 'Suggestion not found or already processed',
          details: error.message,
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        404
      );
    }

    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to approve suggestion',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

// Reject suggestion
adminRouter.post('/suggestions/:id/reject', async (c) => {
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

    const body = await c.req.json<SuggestionRejectInput>().catch(() => ({}));
    const { reason } = body;

    const service = new SuggestionsService(c.env.sinso_api_db);
    await service.rejectSuggestion(id, reason);

    return c.json({
      status: 200,
      code: 'SUGGESTION_REJECTED',
      message: 'Suggestion rejected successfully',
      data: {
        suggestion_id: id,
        status: 'rejected',
        reason: reason || null
      },
      timestamp: new Date().toISOString().slice(0, 19)
    });
  } catch (error) {
    console.error('Rejection error:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      return c.json(
        {
          status: 404,
          code: 'SUGGESTION_NOT_FOUND',
          message: 'Suggestion not found',
          details: error.message,
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        404
      );
    }

    if (error instanceof Error && error.message.includes('already processed')) {
      return c.json(
        {
          status: 400,
          code: 'ALREADY_PROCESSED',
          message: 'Suggestion already processed',
          details: error.message,
          path: c.req.path,
          timestamp: new Date().toISOString().slice(0, 19)
        },
        400
      );
    }

    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to reject suggestion',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

// Delete suggestion permanently
adminRouter.delete('/suggestions/:id', async (c) => {
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
    const deleted = await service.deleteSuggestion(id);

    if (!deleted) {
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
      code: 'SUGGESTION_DELETED',
      message: 'Suggestion deleted permanently',
      data: {
        suggestion_id: id
      },
      timestamp: new Date().toISOString().slice(0, 19)
    });
  } catch (error) {
    console.error('Delete error:', error);
    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete suggestion',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

// Get admin statistics
adminRouter.get('/stats', async (c) => {
  try {
    const service = new SuggestionsService(c.env.sinso_api_db);
    const stats = await service.getStats();

    return c.json({
      status: 200,
      code: 'SUCCESS',
      data: stats,
      timestamp: new Date().toISOString().slice(0, 19)
    });
  } catch (error) {
    console.error('Stats error:', error);
    return c.json(
      {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch statistics',
        details: error instanceof Error ? error.message : 'Unknown error',
        path: c.req.path,
        timestamp: new Date().toISOString().slice(0, 19)
      },
      500
    );
  }
});

export default adminRouter;