/**
 * Discriminator type for content that can be added to a watchlist.
 *
 * @type {WatchlistContentType}
 * @example
 * ```typescript
 * const showEntry: WatchlistContentType = 'show';
 * const movieEntry: WatchlistContentType = 'movie';
 * ```
 */
import { WatchStatus } from './watchStatusTypes';

export type WatchlistContentType = 'show' | 'movie';

/**
 * Persisted watchlist record as stored in the database.
 * Represents the raw entry for a single show or movie on a profile's watchlist,
 * without the display fields needed to render a card.
 *
 * @interface WatchlistEntry
 * @example
 * ```typescript
 * const entry: WatchlistEntry = {
 *   id: 12,
 *   profileId: 42,
 *   contentType: 'show',
 *   contentId: 101,
 *   priority: 1,
 *   addedAt: "2024-06-01T12:00:00Z"
 * };
 * ```
 */
export interface WatchlistEntry {
  /** Unique identifier for this watchlist record */
  id: number;

  /** ID of the profile that owns this watchlist entry */
  profileId: number;

  /** Whether the content on this watchlist entry is a show or movie */
  contentType: WatchlistContentType;

  /** ID of the show or movie saved to the watchlist */
  contentId: number;

  /** Display order position; lower values appear first (1-based) */
  priority: number;

  /** ISO timestamp when this entry was added to the watchlist */
  addedAt: string;
}

/**
 * Watchlist entry enriched with display fields needed to render a watchlist card.
 * Extends WatchlistEntry with title, imagery, genre metadata, and show-specific
 * availability signals.
 *
 * @interface WatchlistItem
 * @extends WatchlistEntry
 * @example
 * ```typescript
 * const item: WatchlistItem = {
 *   id: 12,
 *   profileId: 42,
 *   contentType: 'show',
 *   contentId: 101,
 *   priority: 1,
 *   addedAt: "2024-06-01T12:00:00Z",
 *   title: "Breaking Bad",
 *   posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   genres: "Drama,Crime,Thriller",
 *   streamingServices: "Netflix",
 *   runtime: 47,
 *   currentWatchStatus: WatchStatus.NOT_WATCHED
 * };
 * ```
 */
export interface WatchlistItem extends WatchlistEntry {
  /** Display title of the show or movie */
  title: string;

  /** Poster image URL for display */
  posterImage: string;

  /** Comma-separated list of genre names associated with the content */
  genres: string;

  /** Comma-separated list of streaming services where the content is available */
  streamingServices: string;

  /** Average episode runtime in minutes for shows, or movie runtime for movies; null if unknown */
  runtime: number | null;

  /** Profile's current watch status for this content; used to flag entries that are no longer NOT_WATCHED */
  currentWatchStatus: WatchStatus;
}

/**
 * API response wrapper for a profile's watchlist.
 * Returns the full ordered list of enriched watchlist items.
 *
 * @interface WatchlistResponse
 * @example
 * ```typescript
 * const response: WatchlistResponse = {
 *   message: "Watchlist retrieved successfully",
 *   watchlist: [
 *     {
 *       id: 12,
 *       profileId: 42,
 *       contentType: 'show',
 *       contentId: 101,
 *       priority: 1,
 *       addedAt: "2024-06-01T12:00:00Z",
 *       title: "Breaking Bad",
 *       posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *       genres: "Drama,Crime,Thriller",
 *       streamingServices: "Netflix",
 *       runtime: 47,
 *       currentWatchStatus: WatchStatus.NOT_WATCHED
 *     }
 *   ]
 * };
 * ```
 */
export interface WatchlistResponse {
  /** Human-readable status message from the API */
  message: string;

  /** Ordered array of enriched watchlist items for the requested profile */
  watchlist: WatchlistItem[];
}

/**
 * Request payload for bulk-updating the priority order of watchlist entries.
 * Send the full desired ordering; the server replaces all existing priorities
 * atomically so no entries are left with stale values.
 *
 * @interface UpdateWatchlistPrioritiesRequest
 * @example
 * ```typescript
 * // Move entry 12 to position 1 and entry 7 to position 2
 * const request: UpdateWatchlistPrioritiesRequest = {
 *   priorities: [
 *     { id: 12, priority: 1 },
 *     { id: 7, priority: 2 }
 *   ]
 * };
 * ```
 */
export interface UpdateWatchlistPrioritiesRequest {
  /** Array of watchlist entry IDs paired with their new priority values */
  priorities: Array<{ id: number; priority: number }>;
}
