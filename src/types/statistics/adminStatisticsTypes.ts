/**
 * Admin Statistics Types
 *
 * This file contains type definitions for admin-only statistics and analytics.
 * These types are used by the admin dashboard to monitor platform-wide metrics,
 * account health, content performance, and cross-account comparisons.
 */

/**
 * Platform-wide overview statistics
 * Provides high-level metrics about the entire platform
 *
 * @interface PlatformOverviewStats
 */
export interface PlatformOverviewStats {
  /** Total number of registered accounts on the platform */
  totalAccounts: number;

  /** Number of accounts that have had activity in the last 30 days */
  activeAccounts: number;

  /** Total number of profiles across all accounts */
  totalProfiles: number;

  /** Total number of unique shows tracked across all accounts */
  totalShows: number;

  /** Total number of unique movies tracked across all accounts */
  totalMovies: number;

  /** Total number of episodes watched across all accounts */
  totalEpisodesWatched: number;

  /** Total number of movies watched across all accounts */
  totalMoviesWatched: number;

  /** Estimated total hours of content watched across the platform */
  totalHoursWatched: number;

  /** Average number of profiles per account */
  averageProfilesPerAccount: number;

  /** Average episodes watched per active account */
  averageEpisodesPerAccount: number;
}

/**
 * Platform growth and activity trends over time
 *
 * @interface PlatformTrendsStats
 */
export interface PlatformTrendsStats {
  /** Number of days analyzed for trends */
  periodDays: number;

  /** New accounts created during the period */
  newAccountsInPeriod: number;

  /** Episodes watched during the period */
  episodesWatchedInPeriod: number;

  /** Movies watched during the period */
  moviesWatchedInPeriod: number;

  /** Percentage change in daily active users compared to previous period */
  dailyActiveUsersTrend: number;

  /** Percentage change in watch activity compared to previous period */
  watchActivityTrend: number;

  /** Daily activity breakdown */
  dailyActivity: Array<{
    /** Date of activity (ISO 8601 format) */
    date: string;
    /** Number of active accounts on this day */
    activeAccounts: number;
    /** Episodes watched on this day */
    episodesWatched: number;
    /** Movies watched on this day */
    moviesWatched: number;
  }>;
}

/**
 * Account ranking entry for comparison purposes
 *
 * @interface AccountRankingEntry
 */
export interface AccountRankingEntry {
  /** Account ID */
  accountId: number;

  /** Account email (for admin identification) */
  accountEmail: string;

  /** Account name */
  accountName: string;

  /** Number of profiles in the account */
  profileCount: number;

  /** Total episodes watched by this account */
  totalEpisodesWatched: number;

  /** Total movies watched by this account */
  totalMoviesWatched: number;

  /** Estimated total hours watched */
  totalHoursWatched: number;

  /** Engagement score (0-100) */
  engagementScore: number;

  /** Last activity date (ISO 8601 format) */
  lastActivityDate: string | null;
}

/**
 * Account rankings by various metrics
 *
 * @interface AccountRankingStats
 */
export interface AccountRankingStats {
  /** Metric used for ranking */
  rankingMetric: 'episodesWatched' | 'moviesWatched' | 'hoursWatched' | 'engagement';

  /** Number of accounts in ranking */
  totalAccounts: number;

  /** Ranked list of accounts */
  rankings: AccountRankingEntry[];
}

/**
 * Health metrics for a single account
 *
 * @interface AccountHealthMetrics
 */
export interface AccountHealthMetrics {
  /** Account ID */
  accountId: number;

  /** Account email */
  accountEmail: string;

  /** Engagement score (0-100) based on watch activity and recency */
  engagementScore: number;

  /** Number of days since last activity */
  daysSinceLastActivity: number;

  /** Whether the account is considered at risk of churning */
  isAtRisk: boolean;

  /** Risk level: low, medium, high */
  riskLevel: 'low' | 'medium' | 'high';

  /** Total episodes watched by account */
  totalEpisodesWatched: number;

  /** Episodes watched in last 30 days */
  recentEpisodesWatched: number;

  /** Account created date (ISO 8601 format) */
  accountCreatedAt: string;

  /** Last activity date (ISO 8601 format) */
  lastActivityDate: string | null;

  /** Number of profiles in the account */
  profileCount: number;

  /** Whether email is verified */
  emailVerified: boolean;
}

/**
 * Collection of all account health metrics
 *
 * @interface AccountHealthStats
 */
export interface AccountHealthStats {
  /** Total number of accounts analyzed */
  totalAccounts: number;

  /** Number of active accounts (activity in last 30 days) */
  activeAccounts: number;

  /** Number of inactive accounts (no activity in last 30 days) */
  inactiveAccounts: number;

  /** Number of accounts at risk of churning */
  atRiskAccounts: number;

  /** Average engagement score across all accounts */
  averageEngagementScore: number;

  /** Breakdown by risk level */
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };

  /** List of accounts with health metrics */
  accounts: AccountHealthMetrics[];
}

/**
 * Content popularity entry
 *
 * @interface ContentPopularityEntry
 */
export interface ContentPopularityEntry {
  /** Content ID (show ID or movie ID) */
  contentId: number;

  /** Content title */
  title: string;

  /** Content type */
  contentType: 'show' | 'movie';

  /** Number of accounts with this content */
  accountCount: number;

  /** Number of profiles with this content */
  profileCount: number;

  /** Total watch count (episodes for shows, views for movies) */
  totalWatchCount: number;

  /** Completion rate percentage (0-100) */
  completionRate: number;

  /** Average rating (if available) */
  averageRating?: number;

  /** Release year */
  releaseYear?: number;
}

/**
 * Platform-wide content popularity statistics
 *
 * @interface ContentPopularityStats
 */
export interface ContentPopularityStats {
  /** Content type filter applied */
  contentType: 'show' | 'movie' | 'all';

  /** Number of results returned */
  resultCount: number;

  /** Most popular content items */
  popularContent: ContentPopularityEntry[];
}

/**
 * Trending content entry
 *
 * @interface TrendingContentEntry
 */
export interface TrendingContentEntry {
  /** Content ID */
  contentId: number;

  /** Content title */
  title: string;

  /** Content type */
  contentType: 'show' | 'movie';

  /** Number of new accounts/profiles adding this content in the period */
  newAdditions: number;

  /** Number of watches in the period */
  recentWatchCount: number;

  /** Percentage change in watch activity compared to previous period */
  trendPercentage: number;

  /** Trend direction */
  trendDirection: 'rising' | 'stable' | 'falling';
}

/**
 * Trending content statistics
 *
 * @interface TrendingContentStats
 */
export interface TrendingContentStats {
  /** Number of days analyzed */
  periodDays: number;

  /** Number of trending items */
  resultCount: number;

  /** List of trending content */
  trendingContent: TrendingContentEntry[];
}

/**
 * Detailed engagement metrics for specific content
 *
 * @interface ContentEngagementStats
 */
export interface ContentEngagementStats {
  /** Content ID */
  contentId: number;

  /** Content title */
  title: string;

  /** Content type */
  contentType: 'show' | 'movie';

  /** Total number of accounts with this content */
  totalAccounts: number;

  /** Total number of profiles with this content */
  totalProfiles: number;

  /** Number of profiles that completed the content */
  completedProfiles: number;

  /** Number of profiles currently watching */
  watchingProfiles: number;

  /** Number of profiles that haven't started */
  notStartedProfiles: number;

  /** Number of profiles that abandoned (started but haven't watched in 30+ days) */
  abandonedProfiles: number;

  /** Completion rate percentage */
  completionRate: number;

  /** Abandonment rate percentage */
  abandonmentRate: number;

  /** Average days to complete (for completed profiles) */
  averageDaysToComplete: number;

  /** Average watch progress percentage across all profiles */
  averageProgress: number;
}

/**
 * Comprehensive admin statistics response
 * Combines multiple admin-level statistics for dashboard overview
 *
 * @interface AdminDashboardStats
 */
export interface AdminDashboardStats {
  /** Platform overview metrics */
  platformOverview: PlatformOverviewStats;

  /** Recent trends (last 30 days by default) */
  recentTrends: PlatformTrendsStats;

  /** Account health summary */
  accountHealth: {
    totalAccounts: number;
    activeAccounts: number;
    atRiskAccounts: number;
    averageEngagementScore: number;
  };

  /** Top content summary */
  topContent: {
    topShows: ContentPopularityEntry[];
    topMovies: ContentPopularityEntry[];
  };
}
