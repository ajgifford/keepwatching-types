/**
 * Valid job names for manual execution and schedule updates
 */
export type JobName = 'showsUpdate' | 'moviesUpdate' | 'peopleUpdate' | 'emailDigest' | 'performanceArchive';

/**
 * Event types for completed jobs
 */
export type CompletedJobEventType = 'shows' | 'movies' | 'people' | 'email' | 'performance-archive';

/**
 * Completed job event structure
 */
export interface CompletedJobEvent {
  type: CompletedJobEventType;
  message: string;
  timestamp: string;
}