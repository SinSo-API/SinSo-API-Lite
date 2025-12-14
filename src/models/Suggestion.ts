export interface Suggestion {
  id?: number;
  title: string;
  artist: string;
  album?: string | null;
  year?: number | null;
  lyrics: string;
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
  album?: string;
  year?: number;
  lyrics: string;
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