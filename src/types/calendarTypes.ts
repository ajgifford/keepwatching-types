import { ContentReference } from './contentTypes';
import { RecentUpcomingEpisode } from './episodeTypes';

/**
 * Response type for the calendar content endpoint.
 * Contains all episodes and movies relevant to a specific profile within a given date range,
 * enabling calendar views that surface upcoming and recently aired content.
 *
 * @interface CalendarContentResponse
 * @example
 * ```typescript
 * const calendarContent: CalendarContentResponse = {
 *   episodes: [
 *     {
 *       profileId: 5,
 *       showId: 10,
 *       showName: "Breaking Bad",
 *       streamingServices: "Netflix",
 *       network: "AMC",
 *       episodeTitle: "Ozymandias",
 *       airDate: "2024-01-20",
 *       runtime: 47,
 *       episodeNumber: 14,
 *       seasonNumber: 5,
 *       episodeStillImage: "https://image.tmdb.org/t/p/w500/still.jpg"
 *     }
 *   ],
 *   movies: [
 *     {
 *       id: 1,
 *       tmdbId: 27205,
 *       title: "Inception",
 *       releaseDate: "2010-07-16"
 *     }
 *   ]
 * };
 * ```
 */
export interface CalendarContentResponse {
  /** Episodes airing within the requested date range for the profile */
  episodes: RecentUpcomingEpisode[];

  /** Movies releasing within the requested date range for the profile */
  movies: ContentReference[];
}
