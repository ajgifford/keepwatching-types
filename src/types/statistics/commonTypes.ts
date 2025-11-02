import { WatchStatus } from '../watchStatusTypes';

/**
 * Statistics response for show-related metrics and analytics.
 * Provides comprehensive insights into show watching patterns, genre preferences,
 * and service distribution for a user profile or account.
 *
 * @interface ShowStatisticsResponse
 * @example
 * ```typescript
 * const showStats: ShowStatisticsResponse = {
 *   total: 25,
 *   watchStatusCounts: {
 *     unaired: 3,
 *     watched: 8,
 *     watching: 5,
 *     notWatched: 10,
 *     upToDate: 2
 *   },
 *   genreDistribution: {
 *     "Drama": 12,
 *     "Comedy": 8,
 *     "Action": 8
 *   },
 *   serviceDistribution: {
 *     "Netflix": 15,
 *     "Disney+": 6,
 *     "HBO Max": 7
 *   },
 *   watchProgress: 68.5
 * };
 * ```
 */
export interface ShowStatisticsResponse {
  /** Total number of shows in the user's library */
  total: number;

  /** Count of shows by watch status category */
  watchStatusCounts: {
    /** Number of unaired shows */
    unaired: number;
    /** Number of completely watched shows */
    watched: number;
    /** Number of shows currently being watched */
    watching: number;
    /** Number of shows not yet started */
    notWatched: number;
    /** Number of shows that are up to date with latest episodes */
    upToDate: number;
  };

  /** Distribution of shows by genre with count for each genre */
  genreDistribution: Record<string, number>;

  /** Distribution of shows by streaming service with count for each service */
  serviceDistribution: Record<string, number>;

  /** Overall watch progress percentage (0-100) across all shows */
  watchProgress: number;
}

/**
 * Individual show progress information containing detailed viewing metrics.
 * Tracks completion status and progress for a specific show in a user's library.
 *
 * @interface ShowProgress
 * @example
 * ```typescript
 * const showProgress: ShowProgress = {
 *   showId: 12345,
 *   title: "Breaking Bad",
 *   status: WatchStatus.WATCHED,
 *   totalEpisodes: 62,
 *   watchedEpisodes: 62,
 *   percentComplete: 100
 * };
 * ```
 */
export interface ShowProgress {
  /** Unique identifier for the show */
  showId: number;

  /** Display title of the show */
  title: string;

  /** Current watch status of the show */
  status: WatchStatus;

  /** Total number of episodes in the show */
  totalEpisodes: number;

  /** Number of episodes the user has watched */
  watchedEpisodes: number;

  /** Completion percentage (0-100) for this show */
  percentComplete: number;
}

/**
 * Statistics response for movie-related metrics and analytics.
 * Provides insights into movie watching patterns, genre preferences,
 * and service distribution for a user profile or account.
 *
 * @interface MovieStatisticsResponse
 * @example
 * ```typescript
 * const movieStats: MovieStatisticsResponse = {
 *   movieReferences: [
 *     { id: 1, title: "Inception", tmdbId: 27205 },
 *     { id: 2, title: "The Matrix", tmdbId: 603 }
 *   ],
 *   total: 45,
 *   watchStatusCounts: {
 *     unaired: 5,
 *     watched: 32,
 *     notWatched: 13
 *   },
 *   genreDistribution: {
 *     "Action": 18,
 *     "Drama": 14,
 *     "Comedy": 12,
 *     "Sci-Fi": 9
 *   },
 *   serviceDistribution: {
 *     "Netflix": 22,
 *     "Amazon Prime": 15,
 *     "Disney+": 13
 *   },
 *   watchProgress: 71.1
 * };
 * ```
 */
export interface MovieStatisticsResponse {
  /** Array of movie references in the user's library */
  movieReferences: Array<{ id: number; title: string; tmdbId: number }>;

  /** Total number of movies in the user's library */
  total: number;

  /** Count of movies by watch status (unaired, watched or not watched) */
  watchStatusCounts: {
    /** Number of movies that have not yet been released */
    unaired: number;
    /** Number of movies that have been watched */
    watched: number;
    /** Number of movies not yet watched */
    notWatched: number;
  };

  /** Distribution of movies by genre with count for each genre */
  genreDistribution: Record<string, number>;

  /** Distribution of movies by streaming service with count for each service */
  serviceDistribution: Record<string, number>;

  /** Overall watch progress percentage (0-100) across all movies */
  watchProgress: number;
}

/**
 * Daily activity entry tracking episodes and shows watched on a specific date.
 *
 * @interface DailyActivity
 */
export interface DailyActivity {
  /** Date of the activity (ISO 8601 format) */
  date: string;

  /** Number of episodes watched on this date */
  episodesWatched: number;

  /** Number of unique shows watched on this date */
  showsWatched: number;
}

/**
 * Weekly activity entry tracking episodes watched in a specific week.
 *
 * @interface WeeklyActivity
 */
export interface WeeklyActivity {
  /** Start date of the week (ISO 8601 format) */
  weekStart: string;

  /** Number of episodes watched during this week */
  episodesWatched: number;
}

/**
 * Monthly activity entry tracking episodes and movies watched in a specific month.
 *
 * @interface MonthlyActivity
 */
export interface MonthlyActivity {
  /** Month identifier (e.g., "2024-01" for January 2024) */
  month: string;

  /** Number of episodes watched during this month */
  episodesWatched: number;

  /** Number of movies watched during this month */
  moviesWatched: number;
}

/**
 * Individual milestone tracking information.
 *
 * @interface Milestone
 */
export interface Milestone {
  /** Type of milestone (episodes, movies, or hours) */
  type: 'episodes' | 'movies' | 'hours';
  /** Threshold value for achieving this milestone */
  threshold: number;
  /** Whether this milestone has been achieved */
  achieved: boolean;
  /** Progress percentage towards the next milestone (0-100) */
  progress: number;
}

/**
 * Achievement that has been unlocked.
 *
 * @interface Achievement
 */
export interface Achievement {
  /** Description of the achievement */
  description: string;
  /** Date when the achievement was unlocked (ISO 8601 format) */
  achievedDate: string;
}

/**
 * Individual show at risk of being abandoned.
 *
 * @interface AbandonmentRiskShow
 */
export interface AbandonmentRiskShow {
  /** Unique identifier for the show */
  showId: number;

  /** Display title of the show */
  showTitle: string;

  /** Number of days since last episode was watched */
  daysSinceLastWatch: number;

  /** Number of unwatched episodes available */
  unwatchedEpisodes: number;

  /** Current watch status */
  status: string;
}
