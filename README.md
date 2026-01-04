# SinSo API Lite

A lightweight Sinhala song lyrics API built with [Hono.js](https://hono.dev/) and deployed on Cloudflare Workers. This API allows users to search for Sinhala songs, artists, lyrics, and submit song suggestions for community contribution.

## Features

- **Songs & Artists** - Browse and search Sinhala songs and artists
- **Lyrics** - Get complete song lyrics by ID
- **Search** - Powerful search functionality across songs
- **User Suggestions** - Community-driven song submissions
- **Admin Panel** - Manage and moderate song suggestions
- **API Documentation** - Interactive Swagger UI
- **Fast & Scalable** - Built on Cloudflare Workers edge network

---

## API Endpoints

Base URL: `https://sinso.vishalrashmika.com/api/v1`

### Songs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/songs` | Get all songs | No |
| `GET` | `/songs/:id` | Get song by ID | No |
| `GET` | `/songs/health` | Health check | No |

**Example:**
```bash
GET /api/v1/songs
GET /api/v1/songs/123
```

---

### Artists

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/artists` | Get all artists | No |
| `GET` | `/artists/:id` | Get artist by ID | No |
| `GET` | `/artists/health` | Health check | No |

**Example:**
```bash
GET /api/v1/artists
GET /api/v1/artists/456
```

---

### Lyrics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/lyrics/:id` | Get lyrics by ID | No |
| `GET` | `/lyrics/health` | Health check | No |

**Example:**
```bash
GET /api/v1/lyrics/789
```

---

### Search

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/search?q={query}` | Search songs by title/artist | No |
| `GET` | `/search/health` | Health check | No |

**Example:**
```bash
GET /api/v1/search?q=සඳ
```

---

### Suggestions (Public)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/suggestions` | Submit a new song suggestion | No |
| `GET` | `/suggestions/:id/status` | Check suggestion status | No |
| `GET` | `/suggestions/health` | Health check | No |

**Required Fields:**
- **Song Name** * - Song name in English
- **Song Name (Sinhala)** * - Song name in Sinhala unicode only
- **Artist Name** * - Artist name in English
- **Artist Name (Sinhala)** * - Artist name in Sinhala unicode only
- **Lyrics** * - Song lyrics in English/transliteration
- **Lyrics (Sinhala)** * - Song lyrics in Sinhala unicode only

**Optional Fields:**
- **Duration** - Duration in seconds
- **Release Year** - Year the song was released
- **Composer** - Name of the composer
- **Lyricist** - Name of the lyricist

**Submit Suggestion Example:**
```bash
POST /api/v1/suggestions
Content-Type: application/json

{
  "title": "Sanda Tharu Mal",
  "title_sinhala": "සඳ තරු මල්",
  "artist": "Nanda Malani",
  "artist_sinhala": "නන්දා මාලනී",
  "lyrics": "Mal mal mal pipenne\nTharu tharu ahase",
  "lyrics_sinhala": "මල් මල් මල් පිපෙන්නේ\nතරු තරු අහසේ",
  "duration": 240,
  "year": 2020,
  "composer": "Composer Name",
  "lyricist": "Lyricist Name"
}
```

**Response:**
```json
{
  "status": 201,
  "code": "SUGGESTION_CREATED",
  "message": "Song suggestion submitted successfully",
  "data": {
    "suggestion_id": 1,
    "title": "Sanda Tharu Mal",
    "artist": "Nanda Malani",
    "status": "pending"
  }
}
```

---

### Admin (Requires Authorization)

All admin endpoints require `Authorization: Bearer YOUR_ADMIN_API_KEY` header.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/admin/suggestions?status={pending\|approved\|rejected}` | Get suggestions by status | Yes |
| `GET` | `/admin/suggestions/:id` | Get specific suggestion | Yes |
| `POST` | `/admin/suggestions/:id/approve` | Approve suggestion | Yes |
| `POST` | `/admin/suggestions/:id/reject` | Reject suggestion with reason | Yes |
| `DELETE` | `/admin/suggestions/:id` | Delete suggestion permanently | Yes |
| `GET` | `/admin/stats` | Get admin statistics | Yes |
| `GET` | `/admin/health` | Health check | Yes |

**Approve Suggestion:**
```bash
POST /api/v1/admin/suggestions/1/approve
Authorization: Bearer YOUR_ADMIN_API_KEY
```

**Reject Suggestion:**
```bash
POST /api/v1/admin/suggestions/1/reject
Authorization: Bearer YOUR_ADMIN_API_KEY
Content-Type: application/json

{
  "reason": "Lyrics are incomplete or incorrect"
}
```

**Get Statistics:**
```bash
GET /api/v1/admin/stats
Authorization: Bearer YOUR_ADMIN_API_KEY
```

---

## Documentation

- **Swagger UI**: `/docs`
- **OpenAPI Spec**: `/docs/openapi.json`
- **API Root**: `/` (Shows all available endpoints)
- **Health Check**: `/health`

---

### Tech Stack

- **Framework**: [Hono.js](https://hono.dev/) - Ultra-fast web framework
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **Language**: TypeScript
- **API Docs**: Swagger UI / OpenAPI 3.0

---

## API Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "status": 200,
  "code": "SUCCESS",
  "data": { ... },
  "timestamp": "2026-01-04T12:00:00"
}
```

**Error Response:**
```json
{
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Invalid request",
  "details": "Detailed error message",
  "path": "/api/v1/endpoint",
  "timestamp": "2026-01-04T12:00:00"
}
```

---

## Testing

### Test User Submission Flow

**1. Submit a suggestion:**
```bash
curl -X POST http://localhost:8787/api/v1/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Song",
    "artist": "Test Artist",
    "lyrics": "Test lyrics content here..."
  }'
```

**2. Check status (note the ID from step 1):**
```bash
curl http://localhost:8787/api/v1/suggestions/1/status
```

**3. Admin: View pending suggestions:**
```bash
curl http://localhost:8787/api/v1/admin/suggestions?status=pending \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"
```

**4. Admin: Approve or reject:**
```bash
curl -X POST http://localhost:8787/api/v1/admin/suggestions/1/approve \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"
```

---

## Security

- Admin endpoints are protected with API key authentication
- CORS enabled for cross-origin requests
- Input validation on all endpoints
- SQL injection protection via parameterized queries

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Feel free to:
1. Submit song suggestions via the API
2. Report bugs or issues
3. Submit pull requests

---

## Contact

For questions or support, please open an issue on GitHub.

---

## Lyrics Copyright & Legal Notice

**Important:** All song lyrics provided through this API are the intellectual property of their respective artists, composers, lyricists, and music publishers. SinSo-API does not claim ownership of any lyrical content.

### Copyright Information

- All copyrights belong to the original artists and creators
- Lyrics are provided for educational, research, and non-commercial purposes
- Commercial use of lyrics may require proper licensing from copyright holders
- Users are responsible for ensuring compliance with applicable copyright laws

### Usage Guidelines

- Please respect the intellectual property rights of artists and creators
- Consider this API as a tool for promoting Sinhala music and culture
- For commercial applications, seek appropriate permissions from copyright owners
- Give proper attribution to artists when displaying lyrics

**Disclaimer:** SinSo-API serves as a platform to make Sinhala lyrics more accessible while respecting the creative rights of all artists and music industry stakeholders.

---

**Made with love for the Sinhala music community**