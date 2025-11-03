export interface Artist {
  ID: number;
  ArtistID: string;
  ArtistName: string;
  ArtistNameSinhala?: string;
}

// DTO for artist
export interface ArtistResponse {
  success: boolean;
  data?: Artist | Artist[];
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