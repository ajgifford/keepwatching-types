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
 * Base response wrapper for all admin statistics endpoints
 */
export interface AdminStatsResponse<T> {
  /** Success message */
  message: string;
  /** The actual statistics data */
  results: T;
}

/**
 * Response type for GET /api/v1/admin/statistics/platform/overview
 */
export type PlatformOverviewResponse = AdminStatsResponse<PlatformOverviewStats>;

/**
 * Response type for GET /api/v1/admin/statistics/platform/trends
 */
export type PlatformTrendsResponse = AdminStatsResponse<PlatformTrendsStats>;

/**
 * Response type for GET /api/v1/admin/statistics/accounts/health
 */
export type AccountHealthMetricsResponse = AdminStatsResponse<AccountHealthStats>;

/**
 * Response type for GET /api/v1/admin/statistics/accounts/:accountId/health
 */
export type AccountHealthResponse = AdminStatsResponse<AccountHealthMetrics>;

/**
 * Response type for GET /api/v1/admin/statistics/accounts/rankings
 */
export type AccountRankingsResponse = AdminStatsResponse<AccountRankingStats>;

/**
 * Response type for GET /api/v1/admin/statistics/content/popular
 */
export type ContentPopularityResponse = AdminStatsResponse<ContentPopularityStats>;

/**
 * Response type for GET /api/v1/admin/statistics/content/trending
 */
export type TrendingContentResponse = AdminStatsResponse<TrendingContentStats>;

/**
 * Response type for GET /api/v1/admin/statistics/content/:contentId/engagement
 */
export type ContentEngagementResponse = AdminStatsResponse<ContentEngagementStats>;

/**
 * Response type for GET /api/v1/admin/statistics/dashboard
 */
export type AdminDashboardResponse = AdminStatsResponse<AdminDashboardStats>;
