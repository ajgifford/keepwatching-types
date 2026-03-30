import { ContentReference } from './contentTypes';
import { RecentUpcomingEpisode } from './episodeTypes';

/**
 * Response type for the calendar content endpoint.
 * Contains episodes and movie references for a given date range.
 */
export interface CalendarContentResponse {
  episodes: RecentUpcomingEpisode[];
  movies: ContentReference[];
}
