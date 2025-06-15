import { BaseResponse } from './responseTypes';

/**
 * Represents a single search or discovery result from the content database.
 * Contains essential metadata about a piece of media content including identification,
 * description, and popularity metrics.
 *
 * @interface DiscoverAndSearchResult
 * @example
 * ```typescript
 * const searchResult: DiscoverAndSearchResult = {
 *   id: "12345",
 *   title: "Breaking Bad",
 *   genres: ["Drama", "Crime", "Thriller"],
 *   premiered: "2008-01-20",
 *   summary: "A chemistry teacher turned methamphetamine manufacturer...",
 *   image: "https://example.com/breaking-bad-poster.jpg",
 *   rating: 9.5,
 *   popularity: 95.8
 * };
 * ```
 */
export interface DiscoverAndSearchResult {
  /** Unique identifier for the content item*/
  id: string;

  /** Display title of the content */
  title: string;

  /** Array of genre names associated with the content */
  genres: string[];

  /** Release or premiere date in ISO format (YYYY-MM-DD) */
  premiered: string;

  /** Brief description or synopsis of the content */
  summary: string;

  /** URL to the content's poster or promotional image */
  image: string;

  /** Content rating score (typically 0-10 scale) */
  rating: number;

  /**
   * Popularity metric for the content (optional)
   * Higher values indicate more popular content
   */
  popularity?: number;
}

/**
 * API response wrapper for search and discovery operations.
 * Extends BaseResponse to include paginated search results with metadata
 * about the total results and current page position.
 *
 * @interface DiscoverAndSearchResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const searchResponse: DiscoverAndSearchResponse = {
 *   message: "Search completed successfully",
 *   results: [
 *     {
 *       id: "tv-12345",
 *       title: "Breaking Bad",
 *       genres: ["Drama", "Crime"],
 *       premiered: "2008-01-20",
 *       summary: "A chemistry teacher turned meth manufacturer...",
 *       image: "https://example.com/poster.jpg",
 *       rating: 9.5,
 *       popularity: 95.8
 *     }
 *   ],
 *   totalResults: 147,
 *   totalPages: 15,
 *   currentPage: 1
 * };
 * ```
 */
export interface DiscoverAndSearchResponse extends BaseResponse {
  /** Array of search/discovery results for the current page */
  results: DiscoverAndSearchResult[];

  /** Total number of results available across all pages */
  totalResults: number;

  /** Total number of pages available for pagination */
  totalPages: number;

  /** Current page number (1-based indexing) */
  currentPage: number;
}

/**
 * Enumeration of supported media types for search and discovery operations.
 * Maps to external API values (e.g., TMDB API) for consistent media type identification.
 *
 * @enum MediaType
 * @example
 * ```typescript
 * // Using in search requests
 * const searchMovies = (query: string) => {
 *   return searchContent(query, MediaType.MOVIE);
 * };
 *
 * const searchShows = (query: string) => {
 *   return searchContent(query, MediaType.SHOW);
 * };
 *
 * // Type checking
 * if (mediaType === MediaType.SHOW) {
 *   // Handle TV show specific logic
 * }
 * ```
 */
export enum MediaType {
  /** Television shows and series */
  SHOW = 'tv',

  /** Movies and films */
  MOVIE = 'movie',
}
