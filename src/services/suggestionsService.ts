import { Suggestion, SuggestionCreateInput } from '../models/Suggestion';

export class SuggestionsService {
  constructor(private db: D1Database) {}

  async createSuggestion(input: SuggestionCreateInput): Promise<{ id: number; suggestion: Suggestion }> {
    const result = await this.db
      .prepare(
        `INSERT INTO pending_suggestions 
         (title, artist, album, year, lyrics, submitter_name, submitter_email, status, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))`
      )
      .bind(
        input.title,
        input.artist,
        input.album || null,
        input.year || null,
        input.lyrics,
        input.submitter_name || null,
        input.submitter_email || null
      )
      .run();

    const suggestionId = result.meta.last_row_id as number;

    return {
      id: suggestionId,
      suggestion: {
        id: suggestionId,
        title: input.title,
        artist: input.artist,
        album: input.album || null,
        year: input.year || null,
        lyrics: input.lyrics,
        submitter_name: input.submitter_name || null,
        submitter_email: input.submitter_email || null,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    };
  }

  async getSuggestionStatus(id: number): Promise<Suggestion | null> {
    const suggestion = await this.db
      .prepare(
        `SELECT id, title, artist, status, created_at, reviewed_at 
         FROM pending_suggestions 
         WHERE id = ?`
      )
      .bind(id)
      .first<Suggestion>();

    return suggestion || null;
  }

  async getAllSuggestions(status: string = 'pending'): Promise<Suggestion[]> {
    const { results } = await this.db
      .prepare(
        `SELECT id, title, artist, album, year, lyrics, 
                submitter_name, submitter_email, status, created_at, reviewed_at, rejection_reason 
         FROM pending_suggestions 
         WHERE status = ?
         ORDER BY created_at DESC`
      )
      .bind(status)
      .all<Suggestion>();

    return results;
  }

  async getSuggestionById(id: number): Promise<Suggestion | null> {
    const suggestion = await this.db
      .prepare(`SELECT * FROM pending_suggestions WHERE id = ?`)
      .bind(id)
      .first<Suggestion>();

    return suggestion || null;
  }

  async approveSuggestion(id: number): Promise<{ songId: string; lyricId: string; suggestion: Suggestion }> {
    // Get the suggestion
    const suggestion = await this.db
      .prepare(`SELECT * FROM pending_suggestions WHERE id = ? AND status = 'pending'`)
      .bind(id)
      .first<Suggestion>();

    if (!suggestion) {
      throw new Error('Suggestion not found or already processed');
    }

    // Step 1: Check if artist exists, if not create new artist
    const artistNameToSearch = suggestion.artistNameSinhala || suggestion.artist;
    let artist = await this.db
      .prepare(`SELECT ArtistID FROM Artists WHERE ArtistName = ? OR ArtistNameSinhala = ?`)
      .bind(suggestion.artist, artistNameToSearch)
      .first<{ ArtistID: string }>();

    let artistId: string;

    if (!artist) {
      // Insert artist - ID and ArtistID are auto-generated
      await this.db
        .prepare(
          `INSERT INTO Artists (ArtistName, ArtistNameSinhala) 
           VALUES (?, ?)`
        )
        .bind(
          suggestion.artist, 
          suggestion.artistNameSinhala || suggestion.artist
        )
        .run();
      
      // Get the generated ArtistID
      const newArtist = await this.db
        .prepare(`SELECT ArtistID FROM Artists WHERE ArtistName = ?`)
        .bind(suggestion.artist)
        .first<{ ArtistID: string }>();
      
      artistId = newArtist!.ArtistID;
    } else {
      artistId = artist.ArtistID;
    }

    // Step 2: Insert into Songs table (ID and SongID are auto-generated)
    await this.db
      .prepare(
        `INSERT INTO Songs (SongName, SongNameSinhala, ArtistID, Duration, ReleaseYear, Composer, Lyricist, ViewCount) 
         VALUES (?, ?, ?, ?, ?, ?, ?, 0)`
      )
      .bind(
        suggestion.title,
        suggestion.songNameSinhala || suggestion.title,
        artistId,
        suggestion.duration || null,
        suggestion.year || null,
        suggestion.composer || suggestion.artist,
        suggestion.lyricist || suggestion.artist
      )
      .run();

    // Get the generated SongID
    const newSong = await this.db
      .prepare(`SELECT SongID FROM Songs WHERE SongName = ? AND ArtistID = ? ORDER BY ID DESC LIMIT 1`)
      .bind(suggestion.title, artistId)
      .first<{ SongID: string }>();
    
    const songId = newSong!.SongID;

    // Step 3: Insert into Lyrics table (ID and LyricID are auto-generated)
    await this.db
      .prepare(
        `INSERT INTO Lyrics (SongID, LyricContent, LyricContentSinhala) 
         VALUES (?, ?, ?)`
      )
      .bind(
        songId,
        suggestion.lyrics,
        suggestion.lyricContentSinhala || suggestion.lyrics
      )
      .run();

    // Get the generated LyricID
    const newLyric = await this.db
      .prepare(`SELECT LyricID FROM Lyrics WHERE SongID = ? ORDER BY ID DESC LIMIT 1`)
      .bind(songId)
      .first<{ LyricID: string }>();
    
    const lyricId = newLyric!.LyricID;

    // Step 4: Insert into ArtistSongs junction table
    await this.db
      .prepare(
        `INSERT INTO ArtistSongs (ArtistID, SongID, IsPrimary) 
         VALUES (?, ?, 1)`
      )
      .bind(artistId, songId)
      .run();

    // Step 5: Update suggestion status
    await this.db
      .prepare(
        `UPDATE pending_suggestions 
         SET status = 'approved', reviewed_at = datetime('now') 
         WHERE id = ?`
      )
      .bind(id)
      .run();

    return { songId, lyricId, suggestion };
  }

  async rejectSuggestion(id: number, reason?: string): Promise<Suggestion> {
    // Check if suggestion exists and is pending
    const suggestion = await this.db
      .prepare(`SELECT id, status FROM pending_suggestions WHERE id = ?`)
      .bind(id)
      .first<Suggestion>();

    if (!suggestion) {
      throw new Error('Suggestion not found');
    }

    if (suggestion.status !== 'pending') {
      throw new Error('Suggestion already processed');
    }

    // Update suggestion status
    await this.db
      .prepare(
        `UPDATE pending_suggestions 
         SET status = 'rejected', reviewed_at = datetime('now'), rejection_reason = ?
         WHERE id = ?`
      )
      .bind(reason || null, id)
      .run();

    return { ...suggestion, status: 'rejected', rejection_reason: reason || null };
  }

  async deleteSuggestion(id: number): Promise<boolean> {
    const result = await this.db
      .prepare(`DELETE FROM pending_suggestions WHERE id = ?`)
      .bind(id)
      .run();

    return result.meta.changes > 0;
  }

  async getStats(): Promise<{
    total_songs: number;
    pending_suggestions: number;
    approved_suggestions: number;
    rejected_suggestions: number;
  }> {
    const totalSongs = await this.db.prepare(`SELECT COUNT(*) as count FROM Songs`).first<{ count: number }>();

    const pendingSuggestions = await this.db
      .prepare(`SELECT COUNT(*) as count FROM pending_suggestions WHERE status = 'pending'`)
      .first<{ count: number }>();

    const approvedSuggestions = await this.db
      .prepare(`SELECT COUNT(*) as count FROM pending_suggestions WHERE status = 'approved'`)
      .first<{ count: number }>();

    const rejectedSuggestions = await this.db
      .prepare(`SELECT COUNT(*) as count FROM pending_suggestions WHERE status = 'rejected'`)
      .first<{ count: number }>();

    return {
      total_songs: totalSongs?.count || 0,
      pending_suggestions: pendingSuggestions?.count || 0,
      approved_suggestions: approvedSuggestions?.count || 0,
      rejected_suggestions: rejectedSuggestions?.count || 0
    };
  }
}