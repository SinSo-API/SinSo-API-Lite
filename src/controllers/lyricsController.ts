import { Context } from 'hono';
import { APP_VERSION } from '../metadata';
import { Lyric, Env, LyricResponse } from '../models/Lyrics';

export class LyricsController{
    static checkHealth(c: Context<{ Bindings: Env }>){
        return c.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            environment: 'Production',
            version: APP_VERSION
        });
    }

    static async getLyricByID(c: Context<{Bindings: Env}>){
        try {
            const lyricId = c.req.param('id');

            const lyrics = await c.env.sinso_api_db.prepare(
                `SELECT * FROM Lyrics l WHERE l.LyricID = ?`
            ).bind(lyricId).first<Lyric>();

            if(!lyrics){
                return c.json({
                    success:false,
                    message: 'Lyrics not found'
                }, 404);
            }

            const response: LyricResponse = {
                success: true,
                data: lyrics
            };

            return c.json(response, 200);
        } catch (error) {
            return c.json({
                success: false,
                message: 'Error fetching lyrics',
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 500);
        }
    }
}