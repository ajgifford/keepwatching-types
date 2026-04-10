/**
 * Admin Statistics Response Types
 *
 * This file contains response wrapper types for admin statistics API endpoints.
 * All admin endpoints return data in the format: { message: string, results: T }
 */
import {
  AccountHealthMetrics,
  AccountHealthStats,
  AccountRankingStats,
  AdminDashboardStats,
  ContentEngagementStats,
  ContentPopularityStats,
  PlatformOverviewStats,
  PlatformTrendsStats,
  TrendingContentStats,
} from './adminStatisticsTypes';

/**
 * Generic base response wrapper for all admin statistics endpoints.
 * Provides a standardized envelope with a human-readable message and the
 * typed statistics payload.
 *
 * @interface AdminStatsResponse
 * @template T The specific statistics type returned by the endpoint
 * @example
 * ```typescript
 * const response: AdminStatsResponse<PlatformOverviewStats> = {
 *   message: "Platform overview retrieved successfully",
 *   results: { totalAccounts: 1200, activeAccounts: 850, ... }
 * };
 * ```
 */
export interface AdminStatsResponse<T> {
  /** Human-readable message describing the result of the API operation */
  message: string;

  /** The statistics data returned by the endpoint */
  results: T;
}

/**
 * Response type for `GET /api/v1/admin/statistics/platform/overview`.
 * Returns high-level platform-wide metrics.
 */
export type PlatformOverviewResponse = AdminStatsResponse<PlatformOverviewStats>;

/**
 * Response type for `GET /api/v1/admin/statistics/platform/trends`.
 * Returns platform growth and activity trends over a configurable period.
 */
export type PlatformTrendsResponse = AdminStatsResponse<PlatformTrendsStats>;

/**
 * Response type for `GET /api/v1/admin/statistics/accounts/health`.
 * Returns health metrics for all accounts, including at-risk account identification.
 */
export type AccountHealthMetricsResponse = AdminStatsResponse<AccountHealthStats>;

/**
 * Response type for `GET /api/v1/admin/statistics/accounts/:accountId/health`.
 * Returns health metrics for a single account.
 */
export type AccountHealthResponse = AdminStatsResponse<AccountHealthMetrics>;

/**
 * Response type for `GET /api/v1/admin/statistics/accounts/rankings`.
 * Returns accounts ranked by a specified engagement or watch metric.
 */
export type AccountRankingsResponse = AdminStatsResponse<AccountRankingStats>;

/**
 * Response type for `GET /api/v1/admin/statistics/content/popular`.
 * Returns the most favorited or watched content across the platform.
 */
export type ContentPopularityResponse = AdminStatsResponse<ContentPopularityStats>;

/**
 * Response type for `GET /api/v1/admin/statistics/content/trending`.
 * Returns content whose watch activity has increased most over the recent period.
 */
export type TrendingContentResponse = AdminStatsResponse<TrendingContentStats>;

/**
 * Response type for `GET /api/v1/admin/statistics/content/:contentId/engagement`.
 * Returns detailed engagement metrics for a specific show or movie.
 */
export type ContentEngagementResponse = AdminStatsResponse<ContentEngagementStats>;

/**
 * Response type for `GET /api/v1/admin/statistics/dashboard`.
 * Returns a combined overview suitable for the admin dashboard landing page.
 */
export type AdminDashboardResponse = AdminStatsResponse<AdminDashboardStats>;
