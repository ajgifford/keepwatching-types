/**
 * Enum containing all possible watch status values across the application
 * Serves as the single source of truth for watch status values
 */
export enum WatchStatus {
  UNAIRED = 'UNAIRED',
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
 * Simple status type for content that can only be unaired, watched or not watched (Movies, Episodes)
 */
export type SimpleWatchStatusType = Extract<WatchStatusType, 'UNAIRED' | 'NOT_WATCHED' | 'WATCHED'>;

/**
 * Helper type guard to check if a given status is valid for simple watch statuses (Episodes & Movies)
 * @param status The status to check
 * @returns True if the status is valid for episodes or movies
 */
export function isSimpleWatchStatus(status: WatchStatusType): status is SimpleWatchStatusType {
  return status === WatchStatus.UNAIRED || status === WatchStatus.NOT_WATCHED || status === WatchStatus.WATCHED;
}

/**
 * Helper type guard to check if a given status is a valid watch status for Shows or Seasons
 * @param status The status to check
 * @returns True if the status is valid for shows and seasons
 */
export function isWatchStatus(status: WatchStatusType): status is WatchStatusType {
  return Object.values(WatchStatus).includes(status as WatchStatus);
}

/**
 * Helper to convert a watch status type to the given status
 * @param input The input to convert
 * @returns the converted status
 */
export function parseStatusFromInput(input: WatchStatusType): WatchStatus {
  if (Object.values(WatchStatus).includes(input as WatchStatus)) {
    return input as WatchStatus;
  }
  throw new Error(`Invalid WatchStatus: ${input}`);
}

/**
 * Helper function to get the default status for a content type
 * @param contentType The type of content
 * @returns The default status for the content type
 */
export function getDefaultStatus(_contentType: 'show' | 'season' | 'episode' | 'movie'): WatchStatus {
  return WatchStatus.NOT_WATCHED;
}
