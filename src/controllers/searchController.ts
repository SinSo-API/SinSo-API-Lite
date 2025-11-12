import { Context } from 'hono';
import { Env } from '../models/Search';
import { APP_VERSION } from '../metadata';

export class SearchController{
    static checkHealth(c: Context<{ Bindings: Env }>){
        return c.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            environment: 'Production',
            version: APP_VERSION
        });
    }

    static async searchSongs(c: Context<{ Bindings: Env }>) {
        try {
            const query = c.req.query();
            const all = query.all;
            const artist = query.artist;
            const title = query.title;
            const lyrics = query.lyrics;
            const page = parseInt(query.page || "1");
            const limit = Math.min(parseInt(query.limit || "10"), 100);
            const sortBy = query.sortBy || "ViewCount";
            const sortOrder =
            query.sortOrder?.toLowerCase() === "asc" ? "ASC" : "DESC";

            if (!all && !artist && !title && !lyrics) {
            return c.json({
                success: false,
                message: "No search parameters provided.",
                'Available Search Parameters': {
                all: "Search by song title, artist name, or lyrics (Sinhala or English). Example: ?all=love",
                artist: "Search by artist name (Sinhala or English). Example: ?artist=Sunil",
                title: "Search by song title (Sinhala or English). Example: ?title=Amma",
                lyrics: "Search by lyrics content (Sinhala or English). Example: ?lyrics=සුන්දර",
                pagination: {
                    page: "Current page number (default: 1)",
                    limit: "Number of items per page (default: 10, max: 100)",
                },
                sorting: {
                    sortBy: "Field to sort by (default: ViewCount)",
                    sortOrder: "Sort order (asc or desc, default: desc)",
                },
                exampleQuery: "/api/search?all=love&page=1&limit=10&sortBy=ViewCount&sortOrder=desc",
                },
            });
            }

            let baseQuery = `
            FROM Songs s
            LEFT JOIN Artists a ON s.ArtistID = a.ArtistID
            LEFT JOIN Lyrics l ON s.SongID = l.SongID
            WHERE 1=1
            `;

            const params: any[] = [];

            if (all) {
            baseQuery += `
                AND (
                s.SongName LIKE ?
                OR s.SongNameSinhala LIKE ?
                OR a.ArtistName LIKE ?
                OR a.ArtistNameSinhala LIKE ?
                OR l.LyricContent LIKE ?
                OR l.LyricContentSinhala LIKE ?
                )
            `;
            const likeAll = `%${all}%`;
            params.push(likeAll, likeAll, likeAll, likeAll, likeAll, likeAll);
            }

            if (artist) {
            baseQuery += `
                AND (a.ArtistName LIKE ? OR a.ArtistNameSinhala LIKE ?)
            `;
            const likeArtist = `%${artist}%`;
            params.push(likeArtist, likeArtist);
            }

            if (title) {
            baseQuery += `
                AND (s.SongName LIKE ? OR s.SongNameSinhala LIKE ?)
            `;
            const likeTitle = `%${title}%`;
            params.push(likeTitle, likeTitle);
            }

            if (lyrics) {
            baseQuery += `
                AND (l.LyricContent LIKE ? OR l.LyricContentSinhala LIKE ?)
            `;
            const likeLyrics = `%${lyrics}%`;
            params.push(likeLyrics, likeLyrics);
            }

            const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
            const totalResult = await c.env.sinso_api_db
            .prepare(countQuery)
            .bind(...params)
            .first();
            const total = totalResult?.total || 0;
            const totalPages = Math.ceil(total / limit);

            const dataQuery = `
            SELECT 
                s.SongID,
                s.SongName,
                s.SongNameSinhala,
                s.Duration,
                s.ReleaseYear,
                s.Composer,
                s.Lyricist,
                s.ViewCount,
                a.ArtistID,
                a.ArtistName,
                a.ArtistNameSinhala,
                l.LyricID,
                l.LyricContent,
                l.LyricContentSinhala
            ${baseQuery}
            ORDER BY s.${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `;

            const offset = (page - 1) * limit;
            const results = await c.env.sinso_api_db
            .prepare(dataQuery)
            .bind(...params, limit, offset)
            .all();

            return c.json({
            success: true,
            data: results.results,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
            });
        } catch (error) {
            console.error("Error searching songs:", error);
            return c.json({ success: false, error: "Internal Server Error" }, 500);
        }
    }
}