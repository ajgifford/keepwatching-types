/**
 * A single entry in a profile's watch history, covering both episodes and movies.
 * Each entry represents one watch event, so rewatched content produces multiple entries
 * distinguished by `watchNumber`.
 *
 * @interface WatchHistoryItem
 * @example
 * ```typescript
 * const historyItem: WatchHistoryItem = {
 *   historyId: 1001,
 *   contentType: 'episode',
 *   contentId: 5042,
 *   title: "Pilot",
 *   parentTitle: "Breaking Bad",
 *   seasonNumber: 1,
 *   episodeNumber: 1,
 *   posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   watchedAt: "2024-01-15T20:30:00Z",
 *   watchNumber: 1,
 *   isPriorWatch: false,
 *   runtime: 58
 * };
 * ```
 */
export interface WatchHistoryItem {
  /** Unique row ID from the watch history table */
  historyId: number;

  /** Whether this entry represents an episode or a movie */
  contentType: 'episode' | 'movie';

  /** ID of the episode or movie */
  contentId: number;

  /** Episode title for episodes, or movie title for movies */
  title: string;

  /** Show title for episodes; null for movies */
  parentTitle: string | null;

  /** Season number for episodes; null for movies */
  seasonNumber: number | null;

  /** Episode number within the season for episodes; null for movies */
  episodeNumber: number | null;

  /** Poster image URL for the content */
  posterImage: string;

  /** ISO timestamp of when the content was watched */
  watchedAt: string;

  /** Watch cycle number — 1 for the first watch, 2 for the first rewatch, and so on */
  watchNumber: number;

  /** True when this entry was logged as a prior (air-date-aligned) watch rather than a live watch */
  isPriorWatch: boolean;

  /** Content runtime in minutes */
  runtime: number;
}

/**
 * Paginated response for watch history queries.
 * Provides a page of history items along with total count metadata for pagination controls.
 *
 * @interface WatchHistoryResponse
 * @example
 * ```typescript
 * const historyResponse: WatchHistoryResponse = {
 *   items: [
 *     {
 *       historyId: 1001,
 *       contentType: 'episode',
 *       contentId: 5042,
 *       title: "Pilot",
 *       parentTitle: "Breaking Bad",
 *       seasonNumber: 1,
 *       episodeNumber: 1,
 *       posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *       watchedAt: "2024-01-15T20:30:00Z",
 *       watchNumber: 1,
 *       isPriorWatch: false,
 *       runtime: 58
 *     }
 *   ],
 *   totalCount: 342,
 *   page: 1,
 *   pageSize: 20
 * };
 * ```
 */
export interface WatchHistoryResponse {
  /** Array of watch history items for the current page */
  items: WatchHistoryItem[];

  /** Total number of history entries across all pages */
  totalCount: number;

  /** Current page number (1-based indexing) */
  page: number;

  /** Maximum number of items returned per page */
  pageSize: number;
}
