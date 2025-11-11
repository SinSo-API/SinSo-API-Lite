import {Context} from 'hono';
import { Artist, artistFullInfo, ArtistResponse, Env, fullArtistInfoResponse } from '../models/Artist';
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

    static async getArtistByID(c: Context<{ Bindings: Env }>) {
        try {
            const artistId = c.req.param('id');

            const rows = await c.env.sinso_api_db.prepare(
            `SELECT 
                a.ID AS ArtistTableID,
                a.ArtistID,
                a.ArtistName,
                a.ArtistNameSinhala,
                s.SongID,
                s.SongName,
                s.SongNameSinhala,
                s.ViewCount
            FROM Artists a
            LEFT JOIN Songs s ON s.ArtistID = a.ArtistID
            WHERE a.ArtistID = ?
            ORDER BY s.ReleaseYear DESC`
            ).bind(artistId).all();

            if (!rows.results.length) {
            return c.json({ success: false, message: 'Artist not found' }, 404);
            }

            const artist = {
            ArtistID: rows.results[0].ArtistID,
            ArtistName: rows.results[0].ArtistName,
            ArtistNameSinhala: rows.results[0].ArtistNameSinhala,
            Songs: rows.results
                .filter(r => r.SongID !== null)
                .map(r => ({
                SongID: r.SongID,
                SongName: r.SongName,
                SongNameSinhala: r.SongNameSinhala,
                ViewCount: r.ViewCount
                }))
            };

            const response: fullArtistInfoResponse = {
            success: true,
            data: artist
            };

            return c.json(response, 200);
        } catch (error) {
            return c.json(
            {
                success: false,
                message: 'Error fetching Artist',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            500
            );
        }
    }
}