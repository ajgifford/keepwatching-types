/**
 * Enum containing all possible watch status values across the application
 * Serves as the single source of truth for watch status values
 */
export enum WatchStatus {
  NOT_WATCHED = 'NOT_WATCHED',
  WATCHING = 'WATCHING',
  WATCHED = 'WATCHED',
  UP_TO_DATE = 'UP_TO_DATE',
}

/**
 * Base type that includes all possible watch statuses
 * This is used mainly for type checking and as a foundation for more specific types
 */
export type WatchStatusType = keyof typeof WatchStatus;

/**
 * Status type for content that supports all watch statuses (Shows and Seasons)
 * These can have progressive status like UP_TO_DATE for ongoing series
 */
export type FullWatchStatusType = WatchStatusType;

/**
 * Status type for content that can only be completely watched or not (Movies, Episodes)
 * Binary watch status - either watched or not watched
 */
export type BinaryWatchStatusType = Extract<WatchStatusType, 'NOT_WATCHED' | 'WATCHED'>;

/**
 * Helper type guard to check if a given status is valid for binary watch status (Movies)
 * @param status The status to check
 * @returns True if the status is valid for movies
 */
export function isBinaryWatchStatus(status: WatchStatusType): status is BinaryWatchStatusType {
  return status === WatchStatus.NOT_WATCHED || status === WatchStatus.WATCHED;
}

/**
 * Helper type guard to check if a given status is valid for full watch status (Shows/Seasons)
 * @param status The status to check
 * @returns True if the status is valid for shows and seasons
 */
export function isFullWatchStatus(status: WatchStatusType): status is FullWatchStatusType {
  return Object.values(WatchStatus).includes(status as WatchStatus);
}

/**
 * Helper function to get the default status for a content type
 * @param contentType The type of content
 * @returns The default status for the content type
 */
export function getDefaultStatus(_contentType: 'show' | 'season' | 'episode' | 'movie'): WatchStatusType {
  return WatchStatus.NOT_WATCHED;
}
