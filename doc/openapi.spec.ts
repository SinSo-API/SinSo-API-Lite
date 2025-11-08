import { openAPIConfig } from './openapi.config';

export const generateOpenAPISpec = () => {
  return {
    ...openAPIConfig,
    paths: {
      '/api/v1/songs': {
        get: {
          tags: ['Songs'],
          summary: 'Get all songs',
          description: 'Get a paginated list of all songs with optional filters',
          parameters: [
            {
              name: 'page',
              in: 'query',
              description: 'Page number',
              required: false,
              schema: { type: 'string', example: '1' }
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Items per page',
              required: false,
              schema: { type: 'string', example: '10' }
            },
            {
              name: 'artistId',
              in: 'query',
              description: 'Filter by artist ID (example: ART-00001)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'releaseYear',
              in: 'query',
              description: 'Filter by release year (example: 2024)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'search',
              in: 'query',
              description: 'Search in song names (example: love)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'sortBy',
              in: 'query',
              description: 'Sort field (example: ViewCount)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'sortOrder',
              in: 'query',
              description: 'Sort order (example: asc/desc)',
              required: false,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Songs retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { type: 'object' }
                      },
                      pagination: {
                        type: 'object',
                        properties: {
                          page: { type: 'number', example: 1 },
                          limit: { type: 'number', example: 10 },
                          total: { type: 'number', example: 100 },
                          totalPages: { type: 'number', example: 10 }
                        }
                      }
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/api/v1/songs/health': {
        get: {
          tags: ['Songs'],
          summary: 'Check songs service health',
          description: 'Health check endpoint for the songs service',
          responses: {
            '200': {
              description: 'Service is healthy',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'OK' },
                      timestamp: { type: 'string', example: '2025-11-08T10:30:00.000Z' },
                      environment: { type: 'string', example: 'Production' },
                      version: { type: 'string', example: '1.0.0' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'number', example: 404 },
            code: { type: 'string', example: 'SONG_NOT_FOUND' },
            message: { type: 'string', example: 'Song not found' },
            details: { type: 'string', example: 'Song with ID SNG-9999999 does not exist' },
            path: { type: 'string', example: '/api/v1/songs/SNG-9999999' },
            timestamp: { type: 'string', example: '2025-11-08T10:30:00' }
          }
        }
      }
    }
  };
};