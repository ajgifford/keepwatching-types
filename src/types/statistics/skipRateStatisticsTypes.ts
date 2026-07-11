/**
 * A show with one or more seasons marked as skipped by a profile.
 *
 * @interface SkippedShow
 * @example
 * ```typescript
 * const skippedShow: SkippedShow = {
 *   showId: 101,
 *   showTitle: "Grey's Anatomy",
 *   skippedSeasonCount: 3
 * };
 * ```
 */
export interface SkippedShow {
  /** Unique identifier for the show */
  showId: number;

  /** Display title of the show */
  showTitle: string;

  /** Number of seasons of this show marked SKIPPED */
  skippedSeasonCount: number;
}

/**
 * Skip-rate statistics for a single profile.
 * Tracks how many of a profile's tracked seasons have been intentionally
 * skipped and surfaces the shows with the most skipped seasons.
 *
 * @interface ProfileSkipRateStats
 * @example
 * ```typescript
 * const stats: ProfileSkipRateStats = {
 *   totalSeasonsTracked: 42,
 *   totalSeasonsSkipped: 5,
 *   skipRate: 11.9,
 *   mostSkippedShows: [{ showId: 101, showTitle: "Grey's Anatomy", skippedSeasonCount: 3 }]
 * };
 * ```
 */
export interface ProfileSkipRateStats {
  /** Total number of seasons this profile has a watch status for */
  totalSeasonsTracked: number;

  /** Total number of those seasons marked SKIPPED */
  totalSeasonsSkipped: number;

  /** Percentage of tracked seasons that are SKIPPED (0 when totalSeasonsTracked is 0) */
  skipRate: number;

  /** Shows with the most skipped seasons, sorted descending by skippedSeasonCount */
  mostSkippedShows: SkippedShow[];
}

/**
 * Skip-rate statistics aggregated across all profiles in an account.
 * Provides a platform-wide view of skip behavior and includes the profile
 * name alongside each entry for attribution.
 *
 * @interface AccountSkipRateStats
 * @example
 * ```typescript
 * const stats: AccountSkipRateStats = {
 *   totalSeasonsTracked: 120,
 *   totalSeasonsSkipped: 14,
 *   skipRate: 11.7,
 *   mostSkippedShows: [{ showId: 101, showTitle: "Grey's Anatomy", skippedSeasonCount: 3, profileName: "Alice" }]
 * };
 * ```
 */
export interface AccountSkipRateStats {
  /** Total number of seasons tracked across all profiles in the account */
  totalSeasonsTracked: number;

  /** Total number of those seasons marked SKIPPED */
  totalSeasonsSkipped: number;

  /** Percentage of tracked seasons that are SKIPPED (0 when totalSeasonsTracked is 0) */
  skipRate: number;

  /** Shows with the most skipped seasons across all profiles, each attributed to a profile by name */
  mostSkippedShows: Array<SkippedShow & { profileName: string }>;
}
