/**
 * Type of period a recap covers.
 *
 * @typedef RecapPeriodType
 */
export type RecapPeriodType = 'month' | 'year';

/**
 * One bucket of a recap's activity breakdown, used to render a heatmap-style visualization.
 *
 * @interface RecapActivityBucket
 */
export interface RecapActivityBucket {
  /** Day of month (1-31) for a monthly recap's breakdown, or calendar month (1-12) for a yearly recap's */
  period: number;

  /** Episodes watched in this bucket */
  episodesWatched: number;
}

/**
 * A shareable "year/month in review" recap for a profile, aggregating watch activity
 * within a specific calendar period (not a rolling window).
 *
 * @interface ProfileRecapResponse
 * @example
 * ```typescript
 * const recap: ProfileRecapResponse = {
 *   profileId: 42,
 *   period: 'year',
 *   year: 2026,
 *   startDate: '2026-01-01',
 *   endDate: '2026-12-31',
 *   hoursWatched: 312,
 *   episodesWatched: 540,
 *   moviesWatched: 28,
 *   topGenres: [{ genre: 'Drama', count: 120 }],
 *   topShow: { showId: 7, title: 'Breaking Bad', episodesWatched: 62 },
 *   topMovie: { movieId: 3, title: 'Inception' },
 *   longestStreak: { days: 14, startDate: '2026-07-01', endDate: '2026-07-14' },
 *   busiestBingeDay: { date: '2026-07-04', episodesWatched: 11 },
 *   firstWatchDate: '2026-01-03',
 *   activityBreakdown: [{ period: 1, episodesWatched: 0 }, { period: 2, episodesWatched: 3 }]
 * };
 * ```
 */
export interface ProfileRecapResponse {
  /** ID of the profile this recap belongs to */
  profileId: number;

  /** Whether this recap covers a calendar month or a calendar year */
  period: RecapPeriodType;

  /** Calendar year covered by this recap */
  year: number;

  /** Calendar month (1-12) covered by this recap; present only when period is 'month' */
  month?: number;

  /** First date of the period (ISO 8601 date) */
  startDate: string;

  /** Last date of the period (ISO 8601 date) */
  endDate: string;

  /** Total hours watched (episodes + movies) within the period */
  hoursWatched: number;

  /** Total episodes watched within the period */
  episodesWatched: number;

  /** Total movies watched within the period */
  moviesWatched: number;

  /** Most-watched genres within the period, ordered by count descending */
  topGenres: { genre: string; count: number }[];

  /** Show with the most episodes watched within the period, or null if none watched */
  topShow: { showId: number; title: string; episodesWatched: number } | null;

  /** Most notable movie watched within the period, or null if none watched */
  topMovie: { movieId: number; title: string } | null;

  /** Longest consecutive-day watch streak within the period, or null if no streak occurred */
  longestStreak: { days: number; startDate: string; endDate: string } | null;

  /** Date with the most episodes watched within the period, or null if no activity */
  busiestBingeDay: { date: string; episodesWatched: number } | null;

  /** Date of the first episode or movie watched within the period, or null if no activity */
  firstWatchDate: string | null;

  /**
   * Episode-watching activity broken into calendar buckets across the whole period - one entry
   * per day for a monthly recap, one entry per month for a yearly recap. Always fully populated
   * (zero-activity buckets included) so it can be rendered as a fixed-size grid.
   */
  activityBreakdown: RecapActivityBucket[];
}

/**
 * Index of calendar periods that have watch activity for a profile, used to bound
 * recap navigation so the UI never attempts to show an empty period.
 *
 * @interface AvailableRecapPeriods
 * @example
 * ```typescript
 * const available: AvailableRecapPeriods = {
 *   years: [2025, 2026],
 *   months: [{ year: 2026, month: 6 }, { year: 2026, month: 7 }]
 * };
 * ```
 */
export interface AvailableRecapPeriods {
  /** Calendar years with at least one watched episode or movie */
  years: number[];

  /** Calendar (year, month) pairs with at least one watched episode or movie */
  months: { year: number; month: number }[];
}
