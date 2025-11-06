import {
  AccountActivityTimeline,
  AccountBingeWatchingStats,
  AccountContentDepthStats,
  AccountContentDiscoveryStats,
  AccountSeasonalViewingStats,
  AccountTimeToWatchStats,
  AccountUnairedContentStats,
  AccountWatchStreakStats,
  AccountWatchingVelocityStats,
  ProfileComparisonStats,
} from './accountStatisticsTypes';
import { AbandonmentRiskStats, MilestoneStats } from './commonTypes';
import {
  BingeWatchingStats,
  ContentDepthStats,
  ContentDiscoveryStats,
  SeasonalViewingStats,
  TimeToWatchStats,
  UnairedContentStats,
  WatchStreakStats,
  WatchingActivityTimeline,
  WatchingVelocityStats,
} from './profileStatisticsTypes';

/**
 * Container for all account-level enhanced statistics.
 * Groups all additional statistics beyond the base AccountStatisticsResponse.
 * All fields are optional to support partial data loading.
 *
 * @interface AccountEnhancedStatistics
 * @example
 * ```typescript
 * const enhanced: AccountEnhancedStatistics = {
 *   velocity: { episodesPerWeek: 14.5, ... },
 *   timeline: { dailyActivity: [...], ... },
 *   milestones: { totalEpisodesWatched: 500, ... }
 * };
 * ```
 */
export interface AccountEnhancedStatistics {
  /** Watching velocity statistics (viewing pace and patterns) */
  velocity?: AccountWatchingVelocityStats | null;

  /** Activity timeline (daily, weekly, monthly breakdowns) */
  timeline?: AccountActivityTimeline | null;

  /** Binge-watching statistics and patterns */
  binge?: AccountBingeWatchingStats | null;

  /** Watch streak statistics (consecutive viewing days) */
  streak?: AccountWatchStreakStats | null;

  /** Time-to-watch statistics (completion patterns) */
  timeToWatch?: AccountTimeToWatchStats | null;

  /** Seasonal viewing statistics (patterns by month/season) */
  seasonal?: AccountSeasonalViewingStats | null;

  /** Milestone and achievement statistics */
  milestones?: MilestoneStats | null;

  /** Content depth statistics (episode counts, runtimes, etc.) */
  contentDepth?: AccountContentDepthStats | null;

  /** Content discovery statistics (addition patterns) */
  contentDiscovery?: AccountContentDiscoveryStats | null;

  /** Abandonment risk statistics (shows at risk of being dropped) */
  abandonmentRisk?: AbandonmentRiskStats | null;

  /** Unaired content statistics (upcoming shows/movies) */
  unairedContent?: AccountUnairedContentStats | null;

  /** Profile comparison statistics (multi-profile accounts) */
  profileComparison?: ProfileComparisonStats | null;
}

/**
 * Container for all profile-level enhanced statistics.
 * Groups all additional statistics beyond the base ProfileStatisticsResponse.
 * All fields are optional to support partial data loading.
 *
 * @interface ProfileEnhancedStatistics
 * @example
 * ```typescript
 * const enhanced: ProfileEnhancedStatistics = {
 *   velocity: { episodesPerWeek: 12.3, ... },
 *   timeline: { dailyActivity: [...], ... },
 *   milestones: { totalEpisodesWatched: 234, ... }
 * };
 * ```
 */
export interface ProfileEnhancedStatistics {
  /** Watching velocity statistics (viewing pace and patterns) */
  velocity?: WatchingVelocityStats | null;

  /** Activity timeline (daily, weekly, monthly breakdowns) */
  timeline?: WatchingActivityTimeline | null;

  /** Binge-watching statistics and patterns */
  binge?: BingeWatchingStats | null;

  /** Watch streak statistics (consecutive viewing days) */
  streak?: WatchStreakStats | null;

  /** Time-to-watch statistics (completion patterns) */
  timeToWatch?: TimeToWatchStats | null;

  /** Seasonal viewing statistics (patterns by month/season) */
  seasonal?: SeasonalViewingStats | null;

  /** Milestone and achievement statistics */
  milestones?: MilestoneStats | null;

  /** Content depth statistics (episode counts, runtimes, etc.) */
  contentDepth?: ContentDepthStats | null;

  /** Content discovery statistics (addition patterns) */
  contentDiscovery?: ContentDiscoveryStats | null;

  /** Abandonment risk statistics (shows at risk of being dropped) */
  abandonmentRisk?: AbandonmentRiskStats | null;

  /** Unaired content statistics (upcoming shows/movies) */
  unairedContent?: UnairedContentStats | null;
}
