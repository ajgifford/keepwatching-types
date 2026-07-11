import { WatchlistContentType } from '../watchlistTypes';

/**
 * A watchlist item paired with how long it has been sitting in the queue.
 *
 * @interface QueuedItemAge
 * @example
 * ```typescript
 * const item: QueuedItemAge = {
 *   contentId: 101,
 *   contentType: 'show',
 *   title: "Severance",
 *   daysInQueue: 42
 * };
 * ```
 */
export interface QueuedItemAge {
  /** ID of the show or movie */
  contentId: number;

  /** Whether the queued item is a show or movie */
  contentType: WatchlistContentType;

  /** Display title of the show or movie */
  title: string;

  /** Number of days this item has been sitting in the watchlist */
  daysInQueue: number;
}

/**
 * Watchlist usage statistics for a single profile.
 * Tracks how effectively a profile's watchlist queue converts into
 * finished content versus abandoned/removed entries, and how long
 * items sit in the queue before a decision is made.
 *
 * @interface ProfileWatchlistUsageStats
 * @example
 * ```typescript
 * const stats: ProfileWatchlistUsageStats = {
 *   currentlyQueuedCount: 8,
 *   averageCurrentQueueDays: 12.4,
 *   totalAdded: 25,
 *   totalRemoved: 17,
 *   completedCount: 11,
 *   abandonedCount: 6,
 *   completionRate: 64.7,
 *   averageDaysToCompletion: 9.2,
 *   longestQueuedItems: [{ contentId: 101, contentType: 'show', title: "Severance", daysInQueue: 42 }]
 * };
 * ```
 */
export interface ProfileWatchlistUsageStats {
  /** Number of items currently sitting in the watchlist */
  currentlyQueuedCount: number;

  /** Average number of days currently-queued items have been in the watchlist */
  averageCurrentQueueDays: number;

  /** Total number of items ever added to the watchlist */
  totalAdded: number;

  /** Total number of items ever removed from the watchlist */
  totalRemoved: number;

  /** Number of removed items whose watch status was WATCHED or UP_TO_DATE at removal time */
  completedCount: number;

  /** Number of removed items whose watch status was NOT_WATCHED or WATCHING at removal time */
  abandonedCount: number;

  /** Percentage of removed items that were completed rather than abandoned (0 when totalRemoved is 0) */
  completionRate: number;

  /** Average days between adding and completing an item; null if no items have been completed yet */
  averageDaysToCompletion: number | null;

  /** The items that have been sitting in the queue the longest, sorted descending by daysInQueue */
  longestQueuedItems: QueuedItemAge[];
}

/**
 * Watchlist usage statistics aggregated across all profiles in an account.
 * Mirrors {@link ProfileWatchlistUsageStats}, with each queued-item entry
 * attributed to a profile by name.
 *
 * @interface AccountWatchlistUsageStats
 * @example
 * ```typescript
 * const stats: AccountWatchlistUsageStats = {
 *   currentlyQueuedCount: 15,
 *   averageCurrentQueueDays: 10.1,
 *   totalAdded: 60,
 *   totalRemoved: 45,
 *   completedCount: 30,
 *   abandonedCount: 15,
 *   completionRate: 66.7,
 *   averageDaysToCompletion: 8.5,
 *   longestQueuedItems: [{ contentId: 101, contentType: 'show', title: "Severance", daysInQueue: 42, profileName: "Alice" }]
 * };
 * ```
 */
export interface AccountWatchlistUsageStats {
  /** Number of items currently sitting in the watchlist across all profiles */
  currentlyQueuedCount: number;

  /** Average number of days currently-queued items have been in the watchlist */
  averageCurrentQueueDays: number;

  /** Total number of items ever added to the watchlist across all profiles */
  totalAdded: number;

  /** Total number of items ever removed from the watchlist across all profiles */
  totalRemoved: number;

  /** Number of removed items whose watch status was WATCHED or UP_TO_DATE at removal time */
  completedCount: number;

  /** Number of removed items whose watch status was NOT_WATCHED or WATCHING at removal time */
  abandonedCount: number;

  /** Percentage of removed items that were completed rather than abandoned (0 when totalRemoved is 0) */
  completionRate: number;

  /** Average days between adding and completing an item; null if no items have been completed yet */
  averageDaysToCompletion: number | null;

  /** The items that have been sitting in the queue the longest across all profiles, each attributed to a profile by name */
  longestQueuedItems: Array<QueuedItemAge & { profileName: string }>;
}
