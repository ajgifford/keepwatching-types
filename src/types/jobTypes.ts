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

/**
 * Current operational status of a single background job.
 * Provides scheduling, execution state, and last-run outcome information
 * for monitoring and manual job management.
 *
 * @interface JobStatus
 * @example
 * ```typescript
 * const status: JobStatus = {
 *   lastRunTime: "2024-01-15T03:00:00Z",
 *   lastRunStatus: "success",
 *   isRunning: false,
 *   nextRunTime: "2024-01-16T03:00:00Z",
 *   cronExpression: "0 3 * * *"
 * };
 * ```
 */
export interface JobStatus {
  /** ISO timestamp of the most recent execution, or null if the job has never run */
  lastRunTime: string | null;

  /** Result of the most recent execution (e.g., "success", "failed"), or null if never run */
  lastRunStatus: string | null;

  /** Whether the job is currently executing */
  isRunning: boolean;

  /** ISO timestamp of the next scheduled execution, or null if not scheduled */
  nextRunTime: string | null;

  /** Cron expression defining the job's schedule */
  cronExpression: string;

  /** For batch jobs: the next batch index that will run on manual execution (0-11 for people update) */
  currentBatch?: number;
}

/**
 * Snapshot of the status for all registered background jobs.
 * Returned by the job status endpoint to give a complete view of the
 * scheduler's current state.
 *
 * @interface JobStatusResponse
 * @example
 * ```typescript
 * const response: JobStatusResponse = {
 *   showsUpdate: { lastRunTime: "2024-01-15T03:00:00Z", lastRunStatus: "success", isRunning: false, nextRunTime: "2024-01-16T03:00:00Z", cronExpression: "0 3 * * *" },
 *   moviesUpdate: { lastRunTime: "2024-01-15T04:00:00Z", lastRunStatus: "success", isRunning: false, nextRunTime: "2024-01-16T04:00:00Z", cronExpression: "0 4 * * *" },
 *   peopleUpdate: { lastRunTime: "2024-01-15T05:00:00Z", lastRunStatus: "success", isRunning: false, nextRunTime: "2024-01-16T05:00:00Z", cronExpression: "0 5 * * *" },
 *   emailDigest:  { lastRunTime: "2024-01-15T07:00:00Z", lastRunStatus: "success", isRunning: false, nextRunTime: "2024-01-22T07:00:00Z", cronExpression: "0 7 * * 1" },
 *   performanceArchive: { lastRunTime: "2024-01-15T06:00:00Z", lastRunStatus: "success", isRunning: false, nextRunTime: "2024-01-16T06:00:00Z", cronExpression: "0 6 * * *" }
 * };
 * ```
 */
export interface JobStatusResponse {
  /** Status of the nightly TV show metadata update job */
  showsUpdate: JobStatus;

  /** Status of the nightly movie metadata update job */
  moviesUpdate: JobStatus;

  /** Status of the nightly people (cast and crew) metadata update job */
  peopleUpdate: JobStatus;

  /** Status of the weekly email digest delivery job */
  emailDigest: JobStatus;

  /** Status of the daily query performance archive job */
  performanceArchive: JobStatus;
}
