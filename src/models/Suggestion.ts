export interface Suggestion {
  id?: number;
  title: string;
  artist: string;
  songNameSinhala?: string | null;
  artistNameSinhala?: string | null;
  album?: string | null;
  year?: number | null;
  lyrics: string;
  lyricContentSinhala?: string | null;
  duration?: number | null;
  composer?: string | null;
  lyricist?: string | null;
  submitter_name?: string | null;
  submitter_email?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string | null;
  created_at?: string;
  reviewed_at?: string | null;
}

export interface SuggestionCreateInput {
  title: string;
  artist: string;
  title_sinhala?: string;
  artist_sinhala?: string;
  album?: string;
  year?: number;
  lyrics: string;
  lyrics_sinhala?: string;
  duration?: number;
  composer?: string;
  lyricist?: string;
  submitter_name?: string;
  submitter_email?: string;
}

export interface SuggestionRejectInput {
  reason?: string;
}

export interface Env {
  sinso_api_db: D1Database;
  ADMIN_API_KEY: string;
}