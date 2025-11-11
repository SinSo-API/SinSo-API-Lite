import { Context } from 'hono';
import { 
  Song,
  SongResponse,
  Env,
  fullSongResponse,
  fullSong
} from '../models/Song';
import { APP_VERSION } from '../metadata';

export class SongsController {
  static checkHealth(c: Context<{ Bindings: Env }>){
    return c.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: 'Production',
        version: APP_VERSION
      });
  }

  // /api/v1/songs -> get all songs 
  static async getAllSongs(c: Context<{ Bindings: Env }>) {
    try {
      const query = c.req.query();
      const page = parseInt(query.page || '1');
      const limit = parseInt(query.limit || '10');
      const artistId = query.artistId;
      const releaseYear = query.releaseYear ? parseInt(query.releaseYear) : undefined;
      const search = query.search;
      const sortBy = query.sortBy || 'ViewCount';
      const sortOrder = query.sortOrder || 'desc';

      let sql = 'SELECT * FROM Songs WHERE 1=1';
      const params: any[] = [];

      // Filter by artist
      if (artistId) {
        sql += ' AND ArtistID = ?';
        params.push(artistId);
      }

      // Filter by release year
      if (releaseYear) {
        sql += ' AND ReleaseYear = ?';
        params.push(releaseYear);
      }

      // search
      if (search) {
        sql += ' AND (SongName LIKE ? OR SongNameSinhala LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      // total count
      const countResult = await c.env.sinso_api_db.prepare(
        sql.replace('SELECT *', 'SELECT COUNT(*) as total')
      ).bind(...params).first<{ total: number }>();
      
      const total = countResult?.total || 0;

      // sorting
      sql += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;

      // pagination
      const offset = (page - 1) * limit;
      sql += ' LIMIT ? OFFSET ?';
      params.push(limit, offset);

      const result = await c.env.sinso_api_db.prepare(sql).bind(...params).all<Song>();

      const response: SongResponse = {
        success: true,
        data: result.results || [],
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };

      return c.json(response, 200);
    } catch (error) {
      return c.json({
        success: false,
        message: 'Error fetching songs',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 500);
    }
  }

  // search song by ID
  static async getSongByID(c: Context<{Bindings: Env}>){
    try {
      const songId = c.req.param('id');

      const song = await c.env.sinso_api_db.prepare(
      `SELECT 
          s.ID,
          s.SongID,
          s.SongName,
          s.SongNameSinhala,
          s.ArtistID,
          s.Duration,
          s.ReleaseYear,
          s.Composer,
          s.Lyricist,
          s.ViewCount,
          l.LyricContent AS LyricsContent,
          l.LyricContentSinhala AS LyricsContentSinhala
      FROM Songs s
      LEFT JOIN Lyrics l ON l.SongID = s.SongID
      WHERE s.SongID = ?`
      ).bind(songId).first<fullSong>();

      if (!song) {
        return c.json({
          success: false,
          message: 'Song not found'
        }, 404);
      }

      const response: fullSongResponse = {
        success: true,
        data: song
      };

      await c.env.sinso_api_db.prepare(
        `UPDATE Songs SET ViewCount = ViewCount + 1 WHERE SongID = ?`
      ).bind(songId).run();

      return c.json(response, 200);
    } catch (error) {
      return c.json({
        success: false,
        message: 'Error fetching song',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 500);
    }
  }
}