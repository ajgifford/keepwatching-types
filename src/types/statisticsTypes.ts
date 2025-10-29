import { MovieReference } from './movieTypes';
import { WatchStatus } from './watchStatusTypes';

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
 * Comprehensive watch progress response for a user profile.
 * Aggregates viewing progress across all shows with individual show breakdowns.
 *
 * @interface ProfileWatchProgressResponse
 * @example
 * ```typescript
 * const progressResponse: ProfileWatchProgressResponse = {
 *   totalEpisodes: 1247,
 *   watchedEpisodes: 856,
 *   overallProgress: 68.6,
 *   showsProgress: [
 *     {
 *       showId: 1,
 *       title: "The Office",
 *       status: WatchStatus.WATCHED,
 *       totalEpisodes: 201,
 *       watchedEpisodes: 201,
 *       percentComplete: 100
 *     },
 *     {
 *       showId: 2,
 *       title: "Stranger Things",
 *       status: WatchStatus.WATCHING,
 *       totalEpisodes: 42,
 *       watchedEpisodes: 25,
 *       percentComplete: 59.5
 *     }
 *   ]
 * };
 * ```
 */
export interface ProfileWatchProgressResponse {
  /** Total number of episodes across all shows in the profile */
  totalEpisodes: number;

  /** Total number of episodes watched across all shows */
  watchedEpisodes: number;

  /** Total number of episodes that have not yet aired across all shows */
  unairedEpisodes: number;

  /** Overall completion percentage (0-100) across all shows */
  overallProgress: number;

  /** Array of individual show progress details */
  showsProgress: ShowProgress[];
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
  movieReferences: MovieReference[];

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
 * Comprehensive statistics response for a user profile.
 * Combines show statistics, movie statistics, and episode progress
 * to provide a complete view of a user's viewing habits and preferences.
 *
 * @interface ProfileStatisticsResponse
 * @example
 * ```typescript
 * const profileStats: ProfileStatisticsResponse = {
 *   profileId: 123,
 *   profileName: "John's Profile",
 *   showStatistics: {
 *     total: 25,
 *     watchStatusCounts: { unaired: 2, watched: 8, watching: 5, notWatched: 10, upToDate: 2 },
 *     genreDistribution: { "Drama": 12, "Comedy": 8 },
 *     serviceDistribution: { "Netflix": 15, "Disney+": 6 },
 *     watchProgress: 68.5
 *   },
 *   movieStatistics: {
 *     movieReferences: [{ id: 1, title: "Inception", tmdbId: 27205 }],
 *     total: 45,
 *     watchStatusCounts: { unaired: 5, watched: 32, notWatched: 13 },
 *     genreDistribution: { "Action": 18, "Drama": 12 },
 *     serviceDistribution: { "Netflix": 20, "Amazon Prime": 15 },
 *     watchProgress: 71.1
 *   },
 *   episodeWatchProgress: {
 *     totalEpisodes: 1247,
 *     watchedEpisodes: 856,
 *     overallProgress: 68.6,
 *     showsProgress: []
 *   }
 * };
 * ```
 */
export interface ProfileStatisticsResponse {
  /** ID of the profile these statistics belong to (optional for anonymous stats) */
  profileId?: number;

  /** Name of the profile these statistics belong to (optional for anonymous stats) */
  profileName?: string;

  /** Comprehensive show-related statistics and metrics */
  showStatistics: ShowStatisticsResponse;

  /** Comprehensive movie-related statistics and metrics */
  movieStatistics: MovieStatisticsResponse;

  /** Detailed episode watching progress across all shows */
  episodeWatchProgress: ProfileWatchProgressResponse;
}

/**
 * Content count summary for unique shows and movies across an account.
 * Used to track the total unique content available regardless of profile assignments.
 *
 * @interface UniqueContentCounts
 * @example
 * ```typescript
 * const contentCounts: UniqueContentCounts = {
 *   showCount: 150,
 *   movieCount: 300
 * };
 * ```
 */
export interface UniqueContentCounts {
  /** Total number of unique shows across all profiles in the account */
  showCount: number;

  /** Total number of unique movies across all profiles in the account */
  movieCount: number;
}

/**
 * Episode progress aggregation at the account level.
 * Provides viewing metrics across all profiles within an account.
 *
 * @interface AccountEpisodeProgress
 * @example
 * ```typescript
 * const accountProgress: AccountEpisodeProgress = {
 *   totalEpisodes: 5000,
 *   watchedEpisodes: 3200,
 *   watchProgress: 64.0
 * };
 * ```
 */
export interface AccountEpisodeProgress {
  /** Total number of episodes across all profiles in the account */
  totalEpisodes: number;

  /** Total number of episodes watched across all profiles */
  watchedEpisodes: number;

  /** Overall watch progress percentage (0-100) for the entire account */
  watchProgress: number;
}

/**
 * Comprehensive statistics response for an entire account.
 * Aggregates data across all profiles to provide account-wide insights
 * and metrics for content consumption patterns.
 *
 * @interface AccountStatisticsResponse
 * @example
 * ```typescript
 * const accountStats: AccountStatisticsResponse = {
 *   profileCount: 4,
 *   uniqueContent: {
 *     showCount: 150,
 *     movieCount: 300
 *   },
 *   showStatistics: {
 *     total: 125,
 *     watchStatusCounts: { unaired: 3, watched: 45, watching: 25, notWatched: 40, upToDate: 15 },
 *     genreDistribution: { "Drama": 50, "Comedy": 35, "Action": 25 },
 *     serviceDistribution: { "Netflix": 60, "Disney+": 30, "HBO Max": 20 },
 *     watchProgress: 72.5
 *   },
 *   movieStatistics: {
 *     movieReferences: [],
 *     total: 280,
 *     watchStatusCounts: { unaired: 10, watched: 180, notWatched: 100 },
 *     genreDistribution: { "Action": 80, "Drama": 60, "Comedy": 50 },
 *     serviceDistribution: { "Netflix": 120, "Amazon Prime": 80, "Disney+": 50 },
 *     watchProgress: 64.3
 *   },
 *   episodeStatistics: {
 *     totalEpisodes: 8000,
 *     watchedEpisodes: 5600,
 *     watchProgress: 70.0
 *   }
 * };
 * ```
 */
export interface AccountStatisticsResponse {
  /** Total number of profiles in the account */
  profileCount: number;

  /** Summary of unique content counts across the account */
  uniqueContent: UniqueContentCounts;

  /** Aggregated show statistics across all profiles */
  showStatistics: ShowStatisticsResponse;

  /** Aggregated movie statistics across all profiles */
  movieStatistics: MovieStatisticsResponse;

  /** Aggregated episode progress across all profiles */
  episodeStatistics: AccountEpisodeProgress;
}

/**
 * Watching velocity statistics tracking viewing pace and patterns.
 * Provides insights into how quickly and consistently a user watches content.
 *
 * @interface WatchingVelocityStats
 * @example
 * ```typescript
 * const velocity: WatchingVelocityStats = {
 *   episodesPerWeek: 14.5,
 *   episodesPerMonth: 62,
 *   averageEpisodesPerDay: 2.1,
 *   mostActiveDay: "Saturday",
 *   mostActiveHour: 20,
 *   velocityTrend: "increasing"
 * };
 * ```
 */
export interface WatchingVelocityStats {
  /** Average number of episodes watched per week */
  episodesPerWeek: number;

  /** Average number of episodes watched per month */
  episodesPerMonth: number;

  /** Average number of episodes watched per day */
  averageEpisodesPerDay: number;

  /** Day of the week with most viewing activity */
  mostActiveDay: string;

  /** Hour of the day (0-23) with most viewing activity */
  mostActiveHour: number;

  /** Trend direction comparing recent period to previous period */
  velocityTrend: 'increasing' | 'decreasing' | 'stable';
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
 * Comprehensive timeline of watching activity across different time periods.
 * Provides detailed historical data for activity visualization and analysis.
 *
 * @interface WatchingActivityTimeline
 * @example
 * ```typescript
 * const timeline: WatchingActivityTimeline = {
 *   dailyActivity: [
 *     { date: "2024-01-15", episodesWatched: 3, showsWatched: 2 },
 *     { date: "2024-01-16", episodesWatched: 5, showsWatched: 1 }
 *   ],
 *   weeklyActivity: [
 *     { weekStart: "2024-01-14", episodesWatched: 21 }
 *   ],
 *   monthlyActivity: [
 *     { month: "2024-01", episodesWatched: 85, moviesWatched: 12 }
 *   ]
 * };
 * ```
 */
export interface WatchingActivityTimeline {
  /** Daily activity breakdown */
  dailyActivity: DailyActivity[];

  /** Weekly activity breakdown */
  weeklyActivity: WeeklyActivity[];

  /** Monthly activity breakdown */
  monthlyActivity: MonthlyActivity[];
}
