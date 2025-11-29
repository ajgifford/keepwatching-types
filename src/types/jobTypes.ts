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

export interface JobStatus {
  lastRunTime: string | null;
  lastRunStatus: string | null;
  isRunning: boolean;
  nextRunTime: string | null;
  cronExpression: string;
}

export interface JobStatusResponse {
  showsUpdate: JobStatus;
  moviesUpdate: JobStatus;
  peopleUpdate: JobStatus;
  emailDigest: JobStatus;
  performanceArchive: JobStatus;
}