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
      },
      '/api/v1/search': {
        get: {
          tags: ['Search'],
          summary: 'Search songs',
          description: 'Search for songs across title, artist name, and lyrics content. Supports Sinhala and English text.',
          parameters: [
            {
              name: 'all',
              in: 'query',
              description: 'Search across song title, artist name, and lyrics (Sinhala or English)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'artist',
              in: 'query',
              description: 'Search by artist name (Sinhala or English)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'title',
              in: 'query',
              description: 'Search by song title (Sinhala or English)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'lyrics',
              in: 'query',
              description: 'Search by lyrics content (Sinhala or English)',
              required: false,
              schema: { type: 'string' }
            },
            {
              name: 'page',
              in: 'query',
              description: 'Page number',
              required: false,
              schema: { type: 'string', example: '1', default: '1' }
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Items per page (max: 100)',
              required: false,
              schema: { type: 'string', example: '10', default: '10' }
            },
            {
              name: 'sortBy',
              in: 'query',
              description: 'Sort field',
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
              description: 'Search results retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/SearchResult' }
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
            '400': {
              description: 'No search parameters provided',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      message: { type: 'string', example: 'No search parameters provided.' }
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
      '/api/v1/search/health': {
        get: {
          tags: ['Search'],
          summary: 'Check search service health',
          description: 'Health check endpoint for the search service',
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
      '/api/v1/suggestions': {
        post: {
          tags: ['Suggestions'],
          summary: 'Submit a new song suggestion',
          description: 'Submit a song suggestion for review. All fields with Sinhala must use Sinhala unicode.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuggestionCreateInput' }
              }
            }
          },
          responses: {
            '201': {
              description: 'Suggestion created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 201 },
                      code: { type: 'string', example: 'SUGGESTION_CREATED' },
                      message: { type: 'string', example: 'Song suggestion submitted successfully' },
                      data: {
                        type: 'object',
                        properties: {
                          suggestion_id: { type: 'number', example: 1 },
                          title: { type: 'string', example: 'Sanda Tharu Mal' },
                          artist: { type: 'string', example: 'Nanda Malani' },
                          status: { type: 'string', example: 'pending' }
                        }
                      },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
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
      '/api/v1/suggestions/{id}/status': {
        get: {
          tags: ['Suggestions'],
          summary: 'Check suggestion status',
          description: 'Get the current status of a submitted suggestion',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Suggestion ID',
              required: true,
              schema: { type: 'integer', example: 1 }
            }
          ],
          responses: {
            '200': {
              description: 'Suggestion status retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 200 },
                      code: { type: 'string', example: 'SUCCESS' },
                      data: { $ref: '#/components/schemas/SuggestionStatus' },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Suggestion not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/api/v1/suggestions/health': {
        get: {
          tags: ['Suggestions'],
          summary: 'Check suggestions service health',
          description: 'Health check endpoint for the suggestions service',
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
      '/api/v1/admin/suggestions': {
        get: {
          tags: ['Admin'],
          summary: 'Get all suggestions (Admin only)',
          description: 'Retrieve suggestions filtered by status. Requires admin API key.',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'status',
              in: 'query',
              description: 'Filter by status',
              required: false,
              schema: { type: 'string', enum: ['pending', 'approved', 'rejected'], default: 'pending' }
            }
          ],
          responses: {
            '200': {
              description: 'Suggestions retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 200 },
                      code: { type: 'string', example: 'SUCCESS' },
                      count: { type: 'number', example: 5 },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Suggestion' }
                      },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized - Missing or invalid API key',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/api/v1/admin/suggestions/{id}': {
        get: {
          tags: ['Admin'],
          summary: 'Get specific suggestion (Admin only)',
          description: 'Retrieve detailed information about a specific suggestion',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Suggestion ID',
              required: true,
              schema: { type: 'integer', example: 1 }
            }
          ],
          responses: {
            '200': {
              description: 'Suggestion retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 200 },
                      code: { type: 'string', example: 'SUCCESS' },
                      data: { $ref: '#/components/schemas/Suggestion' },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Suggestion not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Admin'],
          summary: 'Delete suggestion permanently (Admin only)',
          description: 'Permanently delete a suggestion from the database',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Suggestion ID',
              required: true,
              schema: { type: 'integer', example: 1 }
            }
          ],
          responses: {
            '200': {
              description: 'Suggestion deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 200 },
                      code: { type: 'string', example: 'SUGGESTION_DELETED' },
                      message: { type: 'string', example: 'Suggestion deleted permanently' },
                      data: {
                        type: 'object',
                        properties: {
                          suggestion_id: { type: 'number', example: 1 }
                        }
                      },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Suggestion not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/api/v1/admin/suggestions/{id}/approve': {
        post: {
          tags: ['Admin'],
          summary: 'Approve suggestion (Admin only)',
          description: 'Approve a suggestion and add it to the main song database',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Suggestion ID',
              required: true,
              schema: { type: 'integer', example: 1 }
            }
          ],
          responses: {
            '200': {
              description: 'Suggestion approved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 200 },
                      code: { type: 'string', example: 'SUGGESTION_APPROVED' },
                      message: { type: 'string', example: 'Suggestion approved and song added successfully' },
                      data: {
                        type: 'object',
                        properties: {
                          suggestion_id: { type: 'number', example: 1 },
                          song_id: { type: 'number', example: 123 },
                          lyric_id: { type: 'number', example: 456 },
                          title: { type: 'string', example: 'Sanda Tharu Mal' },
                          artist: { type: 'string', example: 'Nanda Malani' }
                        }
                      },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Suggestion not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/api/v1/admin/suggestions/{id}/reject': {
        post: {
          tags: ['Admin'],
          summary: 'Reject suggestion (Admin only)',
          description: 'Reject a suggestion with an optional reason',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Suggestion ID',
              required: true,
              schema: { type: 'integer', example: 1 }
            }
          ],
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    reason: { 
                      type: 'string', 
                      example: 'Lyrics are incomplete or incorrect',
                      description: 'Optional reason for rejection'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Suggestion rejected successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 200 },
                      code: { type: 'string', example: 'SUGGESTION_REJECTED' },
                      message: { type: 'string', example: 'Suggestion rejected successfully' },
                      data: {
                        type: 'object',
                        properties: {
                          suggestion_id: { type: 'number', example: 1 },
                          status: { type: 'string', example: 'rejected' },
                          reason: { type: 'string', example: 'Lyrics are incomplete or incorrect', nullable: true }
                        }
                      },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Suggestion not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/api/v1/admin/stats': {
        get: {
          tags: ['Admin'],
          summary: 'Get admin statistics (Admin only)',
          description: 'Get statistics about suggestions and system data',
          security: [{ BearerAuth: [] }],
          responses: {
            '200': {
              description: 'Statistics retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number', example: 200 },
                      code: { type: 'string', example: 'SUCCESS' },
                      data: {
                        type: 'object',
                        properties: {
                          pending: { type: 'number', example: 10 },
                          approved: { type: 'number', example: 45 },
                          rejected: { type: 'number', example: 5 },
                          total: { type: 'number', example: 60 }
                        }
                      },
                      timestamp: { type: 'string', example: '2026-01-04T12:00:00' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/v1/admin/health': {
        get: {
          tags: ['Admin'],
          summary: 'Check admin service health',
          description: 'Health check endpoint for the admin service',
          security: [{ BearerAuth: [] }],
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
            ArtistNameSinhala: { type: 'string', example: 'ජෝන් ඩෝ' },
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
        SearchResult: {
          type: 'object',
          properties: {
            SongID: { 
              type: 'string', 
              example: 'SNG-00001',
              description: 'Unique identifier for the song'
            },
            SongName: { 
              type: 'string', 
              example: 'Beautiful Song',
              description: 'Song title in English'
            },
            SongNameSinhala: { 
              type: 'string', 
              example: 'ලස්සන ගීතය',
              description: 'Song title in Sinhala'
            },
            Duration: { 
              type: 'number', 
              example: 240,
              description: 'Song duration in seconds'
            },
            ReleaseYear: { 
              type: 'number', 
              example: 2024,
              description: 'Year the song was released'
            },
            Composer: { 
              type: 'string', 
              example: 'John Doe',
              description: 'Name of the music composer'
            },
            Lyricist: { 
              type: 'string', 
              example: 'Jane Smith',
              description: 'Name of the lyricist'
            },
            ViewCount: { 
              type: 'number', 
              example: 1000,
              description: 'Number of times the song has been viewed'
            },
            ArtistID: { 
              type: 'string', 
              example: 'ART-00001',
              description: 'Unique identifier for the artist'
            },
            ArtistName: { 
              type: 'string', 
              example: 'John Doe',
              description: 'Artist name in English'
            },
            ArtistNameSinhala: { 
              type: 'string', 
              example: 'ජෝන් ඩෝ',
              description: 'Artist name in Sinhala'
            },
            LyricID: { 
              type: 'string', 
              example: 'LYR-00001',
              description: 'Unique identifier for the lyrics'
            },
            LyricContent: { 
              type: 'string', 
              example: 'Full lyrics in English...',
              description: 'Complete lyrics content in English'
            },
            LyricContentSinhala: { 
              type: 'string', 
              example: 'සම්පූර්ණ ගී පද...',
              description: 'Complete lyrics content in Sinhala'
            }
          },
          description: 'Search result combining song, artist, and lyrics information'
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
        },
        SuggestionCreateInput: {
          type: 'object',
          required: ['title', 'title_sinhala', 'artist', 'artist_sinhala', 'lyrics', 'lyrics_sinhala'],
          properties: {
            title: { 
              type: 'string', 
              example: 'Sanda Tharu Mal',
              description: 'Song name in English (Required)'
            },
            title_sinhala: { 
              type: 'string', 
              example: 'සඳ තරු මල්',
              description: 'Song name in Sinhala unicode only (Required)'
            },
            artist: { 
              type: 'string', 
              example: 'Nanda Malani',
              description: 'Artist name in English (Required)'
            },
            artist_sinhala: { 
              type: 'string', 
              example: 'නන්දා මාලනී',
              description: 'Artist name in Sinhala unicode only (Required)'
            },
            lyrics: { 
              type: 'string', 
              example: 'Mal mal mal pipenne\nTharu tharu ahase',
              description: 'Lyrics in English/transliteration (Required)'
            },
            lyrics_sinhala: { 
              type: 'string', 
              example: 'මල් මල් මල් පිපෙන්නේ\nතරු තරු අහසේ',
              description: 'Lyrics in Sinhala unicode only (Required)'
            },
            duration: { 
              type: 'number', 
              example: 240,
              description: 'Duration in seconds (Optional)'
            },
            year: { 
              type: 'number', 
              example: 2020,
              description: 'Release year (Optional)'
            },
            composer: { 
              type: 'string', 
              example: 'Composer Name',
              description: 'Name of the composer (Optional)'
            },
            lyricist: { 
              type: 'string', 
              example: 'Lyricist Name',
              description: 'Name of the lyricist (Optional)'
            }
          }
        },
        Suggestion: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'Sanda Tharu Mal' },
            title_sinhala: { type: 'string', example: 'සඳ තරු මල්' },
            artist: { type: 'string', example: 'Nanda Malani' },
            artist_sinhala: { type: 'string', example: 'නන්දා මාලනී' },
            lyrics: { type: 'string', example: 'Mal mal mal pipenne\nTharu tharu ahase' },
            lyrics_sinhala: { type: 'string', example: 'මල් මල් මල් පිපෙන්නේ\nතරු තරු අහසේ' },
            duration: { type: 'number', example: 240, nullable: true },
            year: { type: 'number', example: 2020, nullable: true },
            composer: { type: 'string', example: 'Composer Name', nullable: true },
            lyricist: { type: 'string', example: 'Lyricist Name', nullable: true },
            status: { 
              type: 'string', 
              enum: ['pending', 'approved', 'rejected'],
              example: 'pending' 
            },
            rejection_reason: { type: 'string', example: 'Lyrics incomplete', nullable: true },
            created_at: { type: 'string', example: '2026-01-04T12:00:00' },
            reviewed_at: { type: 'string', example: '2026-01-05T14:30:00', nullable: true }
          }
        },
        SuggestionStatus: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'Sanda Tharu Mal' },
            artist: { type: 'string', example: 'Nanda Malani' },
            status: { 
              type: 'string', 
              enum: ['pending', 'approved', 'rejected'],
              example: 'pending' 
            },
            submitted_at: { type: 'string', example: '2026-01-04T12:00:00' },
            reviewed_at: { type: 'string', example: '2026-01-05T14:30:00', nullable: true }
          }
        }
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'API Key',
          description: 'Admin API key authentication. Use format: Bearer YOUR_ADMIN_API_KEY'
        }
      }
    }
  };
};