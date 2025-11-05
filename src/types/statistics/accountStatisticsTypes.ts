import {
  DailyActivity,
  MonthlyActivity,
  MovieStatisticsResponse,
  ShowStatisticsResponse,
  WeeklyActivity,
} from './commonTypes';

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
 * Account-level watching velocity statistics.
 * Aggregates viewing pace and patterns across all profiles.
 *
 * @interface AccountWatchingVelocityStats
 */
export interface AccountWatchingVelocityStats {
  /** Average number of episodes watched per week across all profiles */
  episodesPerWeek: number;

  /** Average number of episodes watched per month across all profiles */
  episodesPerMonth: number;

  /** Average number of episodes watched per day across all profiles */
  averageEpisodesPerDay: number;

  /** Day of the week with most viewing activity across all profiles */
  mostActiveDay: string;

  /** Hour of the day (0-23) with most viewing activity across all profiles */
  mostActiveHour: number;

  /** Trend direction comparing recent period to previous period */
  velocityTrend: 'increasing' | 'decreasing' | 'stable';
}

/**
 * Account-level activity timeline.
 * Combines activity data across all profiles.
 *
 * @interface AccountActivityTimeline
 */
export interface AccountActivityTimeline {
  /** Daily activity breakdown across all profiles */
  dailyActivity: DailyActivity[];

  /** Weekly activity breakdown across all profiles */
  weeklyActivity: WeeklyActivity[];

  /** Monthly activity breakdown across all profiles */
  monthlyActivity: MonthlyActivity[];
}

/**
 * Account-level binge-watching statistics.
 * Aggregates binge sessions across all profiles.
 *
 * @interface AccountBingeWatchingStats
 */
export interface AccountBingeWatchingStats {
  /** Total number of binge sessions (3+ episodes within 24 hours) across all profiles */
  bingeSessionCount: number;

  /** Average number of episodes per binge session across all profiles */
  averageEpisodesPerBinge: number;

  /** Details of the longest binge session across all profiles */
  longestBingeSession: {
    /** Profile name where the longest binge occurred */
    profileName: string;
    /** Title of the show that was binge-watched */
    showTitle: string;
    /** Number of episodes watched in the session */
    episodeCount: number;
    /** Date when the binge session occurred (ISO 8601 format) */
    date: string;
  };

  /** Shows that are binge-watched most frequently across all profiles */
  topBingedShows: Array<{
    /** Unique identifier for the show */
    showId: number;
    /** Display title of the show */
    showTitle: string;
    /** Number of binge sessions for this show across all profiles */
    bingeSessionCount: number;
  }>;
}

/**
 * Account-level watch streak statistics.
 * Tracks the longest and most consistent viewing patterns across all profiles.
 *
 * @interface AccountWatchStreakStats
 */
export interface AccountWatchStreakStats {
  /** Current account-wide streak (consecutive days with any profile activity) */
  currentStreak: number;

  /** Longest account-wide streak of consecutive days with activity */
  longestStreak: number;

  /** Start date of the current account streak (ISO 8601 format) */
  currentStreakStartDate: string;

  /** Details of the longest streak period */
  longestStreakPeriod: {
    /** Start date of the longest streak (ISO 8601 format) */
    startDate: string;
    /** End date of the longest streak (ISO 8601 format) */
    endDate: string;
    /** Duration of the longest streak in days */
    days: number;
  };

  /** Number of streaks that lasted 7 or more days */
  streaksOver7Days: number;

  /** Average length of all streaks in days */
  averageStreakLength: number;
}

/**
 * Account-level time-to-watch statistics.
 * Aggregates viewing completion patterns across all profiles.
 *
 * @interface AccountTimeToWatchStats
 */
export interface AccountTimeToWatchStats {
  /** Average number of days between adding a show and watching the first episode */
  averageDaysToStartShow: number;

  /** Average number of days from first episode watched to last episode watched */
  averageDaysToCompleteShow: number;

  /** Shows completed in the shortest time periods across all profiles */
  fastestCompletions: Array<{
    /** Profile name where the show was completed */
    profileName: string;
    /** Unique identifier for the show */
    showId: number;
    /** Display title of the show */
    showTitle: string;
    /** Number of days taken to complete the show */
    daysToComplete: number;
  }>;

  /** Breakdown of unwatched content by age across all profiles */
  backlogAging: {
    /** Number of shows added over 30 days ago but not yet started */
    unwatchedOver30Days: number;
    /** Number of shows added over 90 days ago but not yet started */
    unwatchedOver90Days: number;
    /** Number of shows added over 365 days ago but not yet started */
    unwatchedOver365Days: number;
  };
}

/**
 * Account-level seasonal viewing statistics.
 * Aggregates viewing patterns by season and month across all profiles.
 *
 * @interface AccountSeasonalViewingStats
 */
export interface AccountSeasonalViewingStats {
  /** Number of episodes watched per month (month name as key) across all profiles */
  viewingByMonth: Record<string, number>;

  /** Number of episodes watched per season across all profiles */
  viewingBySeason: {
    /** Episodes watched in spring (March, April, May) */
    spring: number;
    /** Episodes watched in summer (June, July, August) */
    summer: number;
    /** Episodes watched in fall (September, October, November) */
    fall: number;
    /** Episodes watched in winter (December, January, February) */
    winter: number;
  };

  /** Month with the highest number of episodes watched */
  peakViewingMonth: string;

  /** Month with the lowest number of episodes watched */
  slowestViewingMonth: string;
}

/**
 * Account-level content depth statistics.
 * Aggregates content characteristics across all profiles.
 *
 * @interface AccountContentDepthStats
 */
export interface AccountContentDepthStats {
  /** Average number of episodes per show across all profiles */
  averageEpisodeCountPerShow: number;

  /** Average runtime in minutes for movies across all profiles */
  averageMovieRuntime: number;

  /** Distribution of content by release year ranges across all profiles */
  releaseYearDistribution: Record<string, number>;

  /** Distribution of content by maturity rating across all profiles */
  contentMaturityDistribution: Record<string, number>;
}

/**
 * Account-level content discovery statistics.
 * Aggregates content addition patterns across all profiles.
 *
 * @interface AccountContentDiscoveryStats
 */
export interface AccountContentDiscoveryStats {
  /** Number of days since the last show or movie was added to any profile */
  daysSinceLastContentAdded: number;

  /** Rate at which content is being added across all profiles */
  contentAdditionRate: {
    /** Average number of shows added per month across all profiles */
    showsPerMonth: number;
    /** Average number of movies added per month across all profiles */
    moviesPerMonth: number;
  };

  /** Ratio of content watched to content added across all profiles */
  watchToAddRatio: {
    /** Watch-to-add ratio for shows */
    shows: number;
    /** Watch-to-add ratio for movies */
    movies: number;
  };
}

/**
 * Account-level unaired content statistics.
 * Aggregates unaired content counts across all profiles.
 *
 * @interface AccountUnairedContentStats
 */
export interface AccountUnairedContentStats {
  /** Number of shows with unaired episodes across all profiles */
  unairedShowCount: number;

  /** Number of seasons that haven't aired yet across all profiles */
  unairedSeasonCount: number;

  /** Number of movies that haven't been released yet across all profiles */
  unairedMovieCount: number;

  /** Total number of unaired episodes across all profiles */
  unairedEpisodeCount: number;
}

/**
 * Individual profile metrics for comparison within an account
 *
 * @interface ProfileComparisonDetail
 */
export interface ProfileComparisonDetail {
  /** Profile ID */
  profileId: number;

  /** Profile name */
  profileName: string;

  /** Total shows in this profile */
  totalShows: number;

  /** Total movies in this profile */
  totalMovies: number;

  /** Total episodes watched */
  episodesWatched: number;

  /** Total movies watched */
  moviesWatched: number;

  /** Estimated total hours watched */
  totalHoursWatched: number;

  /** Watch progress percentage for shows (0-100) */
  showWatchProgress: number;

  /** Watch progress percentage for movies (0-100) */
  movieWatchProgress: number;

  /** Top 3 favorite genres by watch count */
  topGenres: Array<{ genre: string; count: number }>;

  /** Top 3 streaming services by content count */
  topServices: Array<{ service: string; count: number }>;

  /** Average episodes watched per week */
  episodesPerWeek: number;

  /** Most active day of the week */
  mostActiveDay: string;

  /** Last activity date (ISO 8601 format) */
  lastActivityDate: string | null;

  /** Number of shows currently watching */
  currentlyWatchingCount: number;

  /** Number of shows completed */
  completedShowsCount: number;
}

/**
 * Profile comparison statistics for an account
 * Allows users to compare viewing habits across their profiles
 *
 * @interface ProfileComparisonStats
 */
export interface ProfileComparisonStats {
  /** Account ID */
  accountId: number;

  /** Total number of profiles in the account */
  profileCount: number;

  /** Detailed metrics for each profile */
  profiles: ProfileComparisonDetail[];

  /** Account-wide summary */
  accountSummary: {
    /** Total unique shows across all profiles */
    totalUniqueShows: number;
    /** Total unique movies across all profiles */
    totalUniqueMovies: number;
    /** Most watched show across all profiles */
    mostWatchedShow: { showId: number; title: string; watchCount: number } | null;
    /** Most watched movie across all profiles */
    mostWatchedMovie: { movieId: number; title: string; watchCount: number } | null;
  };
}
