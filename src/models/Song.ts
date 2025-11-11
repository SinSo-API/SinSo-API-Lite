export interface Song {
  ID: number;
  SongID: string;
  SongName: string;
  SongNameSinhala?: string;
  ArtistID: string;
  Duration?: number;
  ReleaseYear?: number;
  Composer?: string;
  Lyricist?: string;
  ViewCount: number;
}

export interface fullSong{
  ID: number;
  SongID: string;
  SongName: string;
  SongNameSinhala?: string;
  ArtistID: string;
  Duration?: number;
  ReleaseYear?: number;
  Composer?: string;
  Lyricist?: string;
  LyricsContent?: string;
  LyricsContentSinhala?:string;
  ViewCount: number;
}

// Data Transfer Objects (DTO)
export interface SongResponse {
  success: boolean;
  data?: Song | Song[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// DTO for search song by ID
export interface fullSongResponse{
  success: boolean;
  data?: Song;
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
