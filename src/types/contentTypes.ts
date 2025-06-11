/**
 * Lightweight reference interface for content that contains only essential
 * identification information. Used in contexts where full data is not
 * needed, such as lists, recommendations, cross-references, or API responses
 * that need to minimize payload size.
 *
 * This interface is particularly useful for operations like recent/upcoming
 * content lists, search results, or when referencing content that has been
 * removed from a user's collection.
 *
 * @interface ContentReference
 * @example
 * ```typescript
 * const tmdbRef: ContentReference = {
 *   id: 1,
 *   tmdbId: 1399,
 *   title: "Game of Thrones"
 *   releaseDate: "2022-03-04"
 * };
 *
 * // Used for removed references
 * const removedContentRef: ContentReference = {
 *   id: 15,
 *   tmdbId: 1396,
 *   title: "Breaking Bad"
 *   releaseDate: "2018-03-04"
 * };
 *
 *  * // Used in recommendation lists
 * const recentMovies: ContentReference[] = [
 *   { id: 1, title: "Inception", tmdbId: 27205, releaseDate: "2015-06-04" },
 *   { id: 2, title: "The Matrix", tmdbId: 603, releaseDate: "2001-01-20" },
 *   { id: 3, title: "Interstellar", tmdbId: 157336, releaseDate: "2018-11-01" }
 * ];
 * ```
 */
export interface ContentReference {
  /** Unique identifier for the content */
  id: number;

  /** TMDB identifier for external API operations */
  tmdbId: number;

  /** Display title of the content */
  title: string;

  /** Release date in ISO format (YYYY-MM-DD) */
  releaseDate: string;
}
