import {Context} from 'hono';
import { Artist, ArtistResponse, Env } from '../models/Artist';
import { APP_VERSION } from '../metadata';

export class ArtistsController {
    static checkHealth(c: Context<{ Bindings: Env }>){
        return c.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            environment: 'Production',
            version: APP_VERSION
        })
    }

    static async getAllArtists(c: Context<{ Bindings: Env }>){
        try {
            const query = c.req.query();

            const page = parseInt(query.page || '1');
            const limit = parseInt(query.limit || '10');
            const artistId = query.artistId;
            const search = query.search;
            
            let sql = 'SELECT * FROM Artists WHERE 1=1';
            const params: any[] = [];
            
            // search for a artist by ID.
            if (artistId) {
              sql += ' AND ArtistID = ?';
              params.push(artistId);
            }

            // search
            if (search) {
                sql += ' AND (ArtistName LIKE ? OR ArtistNameSinhala LIKE ?)';
                params.push(`%${search}%`, `%${search}%`);
            }

            // total count
            const countResult = await c.env.sinso_api_db.prepare(
                sql.replace('SELECT *', 'SELECT COUNT(*) as total')
            ).bind(...params).first<{ total: number }>();
            
            const total = countResult?.total || 0;
            
            // pagination
            const offset = (page - 1) * limit;
            sql += ' LIMIT ? OFFSET ?';
            params.push(limit, offset);

            const result = await c.env.sinso_api_db.prepare(sql).bind(...params).all<Artist>();
            
            const response: ArtistResponse = {
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
        }
        catch (error){
            return c.json({
                success: false,
                message: 'Error fetching artist',
                error: error instanceof Error ? error.message : 'unknown error'
            }, 500)
        }
    }
}