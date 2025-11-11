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
              schema: { type: 'string', default: 'ViewCount' }
            },
            {
              name: 'sortOrder',
              in: 'query',
              description: 'Sort order (asc/desc)',
              required: false,
              schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' }
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
                        items: { $ref: '#/components/schemas/Song' }
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
      '/api/v1/songs/{id}': {
        get: {
          tags: ['Songs'],
          summary: 'Get song by ID',
          description: 'Get the details of a specific song including lyrics using the SongID. Increments the ViewCount.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Song ID (example: SNG-0000025)',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Song retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/FullSong' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Song not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      message: { type: 'string', example: 'Song not found' }
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
                  schema: { $ref: '#/components/schemas/HealthCheck' }
                }
              }
            }
          }
        }
      },
      '/api/v1/artists': {
        get: {
          tags: ['Artists'],
          summary: 'Get all artists',
          description: 'Get a paginated list of all artists with optional filters',
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
              name: 'search',
              in: 'query',
              description: 'Search in artist names (English or Sinhala)',
              required: false,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Artists retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Artist' }
                      },
                      pagination: {
                        type: 'object',
                        properties: {
                          page: { type: 'number', example: 1 },
                          limit: { type: 'number', example: 10 },
                          total: { type: 'number', example: 50 },
                          totalPages: { type: 'number', example: 5 }
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
      '/api/v1/artists/{id}': {
        get: {
          tags: ['Artists'],
          summary: 'Get artist by ID',
          description: 'Get full artist information including all their songs',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Artist ID (example: ART-00001)',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Artist retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/FullArtist' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Artist not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      message: { type: 'string', example: 'Artist not found' }
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
      '/api/v1/artists/health': {
        get: {
          tags: ['Artists'],
          summary: 'Check artists service health',
          description: 'Health check endpoint for the artists service',
          responses: {
            '200': {
              description: 'Service is healthy',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/HealthCheck' }
                }
              }
            }
          }
        }
      },
      '/api/v1/lyrics/{id}': {
        get: {
          tags: ['Lyrics'],
          summary: 'Get lyrics by ID',
          description: 'Get the lyrics for a specific song using the LyricID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Lyric ID (example: LYR-0000025)',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Lyrics retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/Lyric' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Lyrics not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      message: { type: 'string', example: 'Lyrics not found' }
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
      '/api/v1/lyrics/health': {
        get: {
          tags: ['Lyrics'],
          summary: 'Check lyrics service health',
          description: 'Health check endpoint for the lyrics service',
          responses: {
            '200': {
              description: 'Service is healthy',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/HealthCheck' }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Song: {
          type: 'object',
          properties: {
            ID: { type: 'number', example: 1 },
            SongID: { type: 'string', example: 'SNG-00001' },
            SongName: { type: 'string', example: 'Beautiful Song' },
            SongNameSinhala: { type: 'string', example: 'ලස්සන ගීතය' },
            ArtistID: { type: 'string', example: 'ART-00001' },
            Duration: { type: 'number', example: 240 },
            ReleaseYear: { type: 'number', example: 2024 },
            Composer: { type: 'string', example: 'John Doe' },
            Lyricist: { type: 'string', example: 'Jane Smith' },
            ViewCount: { type: 'number', example: 1000 }
          }
        },
        FullSong: {
          type: 'object',
          properties: {
            ID: { type: 'number', example: 1 },
            SongID: { type: 'string', example: 'SNG-00001' },
            SongName: { type: 'string', example: 'Beautiful Song' },
            SongNameSinhala: { type: 'string', example: 'ලස්සන ගීතය' },
            ArtistID: { type: 'string', example: 'ART-00001' },
            ArtistName: { type: 'string', example: 'John Doe' },
            ArtistNameSinhala: { type: 'string', example: 'ජෝන් ඩෝ' },
            Duration: { type: 'number', example: 240 },
            ReleaseYear: { type: 'number', example: 2024 },
            Composer: { type: 'string', example: 'John Doe' },
            Lyricist: { type: 'string', example: 'Jane Smith' },
            LyricsContent: { type: 'string', example: 'Full lyrics in English...' },
            LyricsContentSinhala: { type: 'string', example: 'සම්පූර්ණ ගී පද...' },
            ViewCount: { type: 'number', example: 1000 }
          }
        },
        Artist: {
          type: 'object',
          properties: {
            ID: { type: 'number', example: 1 },
            ArtistID: { type: 'string', example: 'ART-00001' },
            ArtistName: { type: 'string', example: 'John Doe' },
            ArtistNameSinhala: { type: 'string', example: 'ජෝන් ඩෝ' }
          }
        },
        FullArtist: {
          type: 'object',
          properties: {
            ArtistID: { type: 'string', example: 'ART-00001' },
            ArtistName: { type: 'string', example: 'John Doe' },
            ArtistNameSinhala: { type: 'string', example: 'ජොන් ඩෝ' },
            Songs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  SongID: { type: 'string', example: 'SNG-00001' },
                  SongName: { type: 'string', example: 'Beautiful Song' },
                  SongNameSinhala: { type: 'string', example: 'ලස්සන ගීතය' },
                  ViewCount: { type: 'number', example: 1000 }
                }
              }
            }
          }
        },
        Lyric: {
          type: 'object',
          properties: {
            ID: { type: 'number', example: 1 },
            LyricID: { type: 'string', example: 'LYR-00001' },
            SongID: { type: 'string', example: 'SNG-00001' },
            LyricContent: { type: 'string', example: 'Full lyrics in English...' },
            LyricContentSinhala: { type: 'string', example: 'සම්පූර්ණ ගී පද...' }
          }
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'OK' },
            timestamp: { type: 'string', example: '2025-11-08T10:30:00.000Z' },
            environment: { type: 'string', example: 'Production' },
            version: { type: 'string', example: '1.0.0' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            error: { type: 'string', example: 'Detailed error information' }
          }
        }
      }
    }
  };
};