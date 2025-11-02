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

/**
 * Statistics for binge-watching behavior patterns.
 * Identifies sessions where multiple episodes are watched in short succession.
 *
 * @interface BingeWatchingStats
 * @example
 * ```typescript
 * const bingeStats: BingeWatchingStats = {
 *   bingeSessionCount: 15,
 *   averageEpisodesPerBinge: 4.5,
 *   longestBingeSession: {
 *     showTitle: "Breaking Bad",
 *     episodeCount: 8,
 *     date: "2024-01-15"
 *   },
 *   topBingedShows: [
 *     { showId: 1, showTitle: "The Office", bingeSessionCount: 5 },
 *     { showId: 2, showTitle: "Friends", bingeSessionCount: 3 }
 *   ]
 * };
 * ```
 */
export interface BingeWatchingStats {
  /** Number of binge sessions (3+ episodes within 24 hours) */
  bingeSessionCount: number;

  /** Average number of episodes per binge session */
  averageEpisodesPerBinge: number;

  /** Details of the longest binge session */
  longestBingeSession: {
    /** Title of the show that was binge-watched */
    showTitle: string;
    /** Number of episodes watched in the session */
    episodeCount: number;
    /** Date when the binge session occurred (ISO 8601 format) */
    date: string;
  };

  /** Shows that are binge-watched most frequently */
  topBingedShows: Array<{
    /** Unique identifier for the show */
    showId: number;
    /** Display title of the show */
    showTitle: string;
    /** Number of binge sessions for this show */
    bingeSessionCount: number;
  }>;
}

/**
 * Statistics tracking consistency of viewing habits through streaks.
 * Monitors consecutive days with watching activity.
 *
 * @interface WatchStreakStats
 * @example
 * ```typescript
 * const streakStats: WatchStreakStats = {
 *   currentStreak: 5,
 *   longestStreak: 21,
 *   currentStreakStartDate: "2024-01-10",
 *   longestStreakPeriod: {
 *     startDate: "2023-12-01",
 *     endDate: "2023-12-21",
 *     days: 21
 *   },
 *   streaksOver7Days: 3,
 *   averageStreakLength: 6.5
 * };
 * ```
 */
export interface WatchStreakStats {
  /** Current number of consecutive days with watching activity */
  currentStreak: number;

  /** Longest streak of consecutive days with watching activity */
  longestStreak: number;

  /** Start date of the current streak (ISO 8601 format) */
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
 * Statistics tracking how long content sits before being watched and completion rates.
 * Provides insights into viewing patterns and backlog management.
 *
 * @interface TimeToWatchStats
 * @example
 * ```typescript
 * const timeStats: TimeToWatchStats = {
 *   averageDaysToStartShow: 12.5,
 *   averageDaysToCompleteShow: 45.2,
 *   fastestCompletions: [
 *     { showId: 1, showTitle: "Breaking Bad", daysToComplete: 7 },
 *     { showId: 2, showTitle: "The Office", daysToComplete: 14 }
 *   ],
 *   backlogAging: {
 *     unwatchedOver30Days: 5,
 *     unwatchedOver90Days: 3,
 *     unwatchedOver365Days: 1
 *   }
 * };
 * ```
 */
export interface TimeToWatchStats {
  /** Average number of days between adding a show and watching the first episode */
  averageDaysToStartShow: number;

  /** Average number of days from first episode watched to last episode watched */
  averageDaysToCompleteShow: number;

  /** Shows completed in the shortest time periods */
  fastestCompletions: Array<{
    /** Unique identifier for the show */
    showId: number;
    /** Display title of the show */
    showTitle: string;
    /** Number of days taken to complete the show */
    daysToComplete: number;
  }>;

  /** Breakdown of unwatched content by age */
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
 * Statistics analyzing viewing patterns by season and month.
 * Helps identify when users are most active in their viewing habits.
 *
 * @interface SeasonalViewingStats
 * @example
 * ```typescript
 * const seasonalStats: SeasonalViewingStats = {
 *   viewingByMonth: {
 *     "January": 45,
 *     "February": 38,
 *     "March": 52
 *   },
 *   viewingBySeason: {
 *     spring: 120,
 *     summer: 95,
 *     fall: 110,
 *     winter: 130
 *   },
 *   peakViewingMonth: "December",
 *   slowestViewingMonth: "July"
 * };
 * ```
 */
export interface SeasonalViewingStats {
  /** Number of episodes watched per month (month name as key) */
  viewingByMonth: Record<string, number>;

  /** Number of episodes watched per season */
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
 * Comprehensive milestone and achievement statistics.
 * Tracks viewing milestones and provides achievement system.
 *
 * @interface MilestoneStats
 * @example
 * ```typescript
 * const milestones: MilestoneStats = {
 *   totalEpisodesWatched: 856,
 *   totalMoviesWatched: 32,
 *   totalHoursWatched: 642,
 *   profileCreatedAt: '2023-01-15T10:30:00Z',
 *   firstEpisodeWatchedAt: '2023-01-20T14:25:00Z',
 *   firstMovieWatchedAt: '2023-02-01T19:15:00Z',
 *   milestones: [
 *     { type: 'episodes', threshold: 1000, achieved: false, progress: 85.6 },
 *     { type: 'movies', threshold: 50, achieved: false, progress: 64 },
 *     { type: 'hours', threshold: 1000, achieved: false, progress: 64.2 }
 *   ],
 *   recentAchievements: [
 *     { description: '500 Episodes Watched', achievedDate: '2024-01-15' }
 *   ]
 * };
 * ```
 */
export interface MilestoneStats {
  /** Total number of episodes watched across all shows */
  totalEpisodesWatched: number;
  /** Total number of movies watched */
  totalMoviesWatched: number;
  /** Estimated total hours watched based on runtime */
  totalHoursWatched: number;
  /** Date when the profile was created (ISO 8601 format) */
  profileCreatedAt?: string;
  /** Date when the first episode was watched (ISO 8601 format) */
  firstEpisodeWatchedAt?: string;
  /** Date when the first movie was watched (ISO 8601 format) */
  firstMovieWatchedAt?: string;
  /** Array of milestone tracking information */
  milestones: Milestone[];
  /** Recent achievements unlocked */
  recentAchievements: Achievement[];
}

export const MILESTONE_THRESHOLDS = {
  episodes: [100, 500, 1000, 5000],
  movies: [25, 50, 100, 500],
  hours: [100, 500, 1000, 5000],
};

/**
 * Statistics analyzing the depth and characteristics of content in a profile.
 * Provides insights into preferences for content length, release years, and maturity ratings.
 *
 * @interface ContentDepthStats
 * @example
 * ```typescript
 * const depthStats: ContentDepthStats = {
 *   averageEpisodeCountPerShow: 42.5,
 *   averageMovieRuntime: 118,
 *   releaseYearDistribution: {
 *     "2020-2024": 45,
 *     "2015-2019": 32,
 *     "2010-2014": 18,
 *     "2000-2009": 12,
 *     "Before 2000": 8
 *   },
 *   contentMaturityDistribution: {
 *     "TV-MA": 25,
 *     "TV-14": 35,
 *     "TV-PG": 20,
 *     "R": 15,
 *     "PG-13": 30
 *   }
 * };
 * ```
 */
export interface ContentDepthStats {
  /** Average number of episodes per show in the profile */
  averageEpisodeCountPerShow: number;

  /** Average runtime in minutes for movies in the profile */
  averageMovieRuntime: number;

  /** Distribution of content by release year ranges */
  releaseYearDistribution: Record<string, number>;

  /** Distribution of content by maturity rating (TV-MA, R, PG-13, etc.) */
  contentMaturityDistribution: Record<string, number>;
}

/**
 * Statistics analyzing content discovery and addition patterns.
 * Provides insights into how actively users are discovering and adding new content.
 *
 * @interface ContentDiscoveryStats
 * @example
 * ```typescript
 * const discoveryStats: ContentDiscoveryStats = {
 *   daysSinceLastContentAdded: 3,
 *   contentAdditionRate: {
 *     showsPerMonth: 4.5,
 *     moviesPerMonth: 8.2
 *   },
 *   watchToAddRatio: {
 *     shows: 0.85,
 *     movies: 1.2
 *   }
 * };
 * ```
 */
export interface ContentDiscoveryStats {
  /** Number of days since the last show or movie was added */
  daysSinceLastContentAdded: number;

  /** Rate at which content is being added */
  contentAdditionRate: {
    /** Average number of shows added per month */
    showsPerMonth: number;
    /** Average number of movies added per month */
    moviesPerMonth: number;
  };

  /** Ratio of content watched to content added (values > 1 mean backlog is shrinking) */
  watchToAddRatio: {
    /** Watch-to-add ratio for shows */
    shows: number;
    /** Watch-to-add ratio for movies */
    movies: number;
  };
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

/**
 * Statistics analyzing content abandonment risk and patterns.
 * Identifies shows that may be abandoned and calculates abandonment rates.
 *
 * @interface AbandonmentRiskStats
 * @example
 * ```typescript
 * const abandonmentStats: AbandonmentRiskStats = {
 *   showsAtRisk: [
 *     {
 *       showId: 123,
 *       showTitle: "The Walking Dead",
 *       daysSinceLastWatch: 45,
 *       unwatchedEpisodes: 23,
 *       status: "WATCHING"
 *     }
 *   ],
 *   showAbandonmentRate: 18.5
 * };
 * ```
 */
export interface AbandonmentRiskStats {
  /** Shows marked as "WATCHING" but haven't progressed in 30+ days */
  showsAtRisk: AbandonmentRiskShow[];

  /** Percentage of shows started but not finished (excluding currently airing) */
  showAbandonmentRate: number;
}

/**
 * Statistics about unaired content awaiting release.
 *
 * @interface UnairedContentStats
 * @example
 * ```typescript
 * const unairedStats: UnairedContentStats = {
 *   unairedShowCount: 5,
 *   unairedSeasonCount: 8,
 *   unairedMovieCount: 12,
 *   unairedEpisodeCount: 45
 * };
 * ```
 */
export interface UnairedContentStats {
  /** Number of shows with unaired episodes */
  unairedShowCount: number;

  /** Number of seasons that haven't aired yet */
  unairedSeasonCount: number;

  /** Number of movies that haven't been released yet */
  unairedMovieCount: number;

  /** Total number of unaired episodes across all shows */
  unairedEpisodeCount: number;
}
