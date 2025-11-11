export interface Lyric{
    ID: number;
    LyricID: string;
    SongID: string;
    LyricContent: string;
    LyricContentSinhala: string;
}

// DTO for lyrics
export interface LyricResponse{
    success: boolean;
    data?: Lyric;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface Env {
  sinso_api_db: D1Database;
}