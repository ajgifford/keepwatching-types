/**
 * A single entry in a profile's watch history, covering both episodes and movies.
 */
export interface WatchHistoryItem {
  /** Row ID from the history table */
  historyId: number;
  /** Whether this entry is an episode or a movie */
  contentType: 'episode' | 'movie';
  /** ID of the episode or movie */
  contentId: number;
  /** Episode title or movie title */
  title: string;
  /** Show title for episodes; null for movies */
  parentTitle: string | null;
  /** Season number for episodes; null for movies */
  seasonNumber: number | null;
  /** Episode number for episodes; null for movies */
  episodeNumber: number | null;
  /** Poster image path */
  posterImage: string;
  /** ISO timestamp of when the content was watched */
  watchedAt: string;
  /** 1 = first watch, 2 = first rewatch, etc. */
  watchNumber: number;
  /** True when this entry was logged as a prior (air-date-aligned) watch */
  isPriorWatch: boolean;
  /** Runtime in minutes */
  runtime: number;
}

/**
 * Paginated watch history response.
 */
export interface WatchHistoryResponse {
  items: WatchHistoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}
