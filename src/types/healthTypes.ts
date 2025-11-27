export interface DBQueryStats {
  query: string;
  count: number;
  avgTime: number;
  maxTime: number;
  totalTime: number;
}

export interface DBPoolStats {
  totalConnections: number;
  activeConnections: number;
  freeConnections: number;
}

/**
 * Represents a single DB query execution in the call history.
 */
export interface DBQueryCallHistory {
  /**
   * Timestamp when the query was executed
   */
  timestamp: number;
  /**
   * Execution time in milliseconds
   */
  executionTime: number;
  /**
   * Whether the query succeeded or failed
   */
  success: boolean;
  /**
   * Error message if the query failed
   */
  error?: string;
  /**
   * Optional endpoint that triggered the query (e.g., API route)
   */
  endpoint?: string;
  /**
   * Optional user ID associated with the query
   */
  userId?: number;
  /**
   * Optional result count (number of rows returned)
   */
  resultCount?: number;
}

export type ArchiveLogStatus = 'started' | 'completed' | 'failed'

/**
 * Interface for archive log entry row
 */
export interface ArchiveLogEntry {
  id: number;
  archiveDate: Date;
  startedAt: Date;
  completedAt: Date | null;
  status: ArchiveLogStatus;
  metricsArchived: number;
  queriesProcessed: number;
  errorMessage: string | null;
}

/**
 * Interface for a query daily summary
 */
export interface DailySummary  {
  archiveDate: Date;
  totalExecutions: number;
  avgDurationInMillis: number;
  minDurationInMillis: number;
  maxDurationInMillis: number;
  p95DurationInMillis: number | null;
}

/**
 * Interface for slowest queries result
 */
export interface SlowestQuery  {
  queryHash: string;
  queryTemplate: string;
  totalExecutions: number;
  avgDurationInMillis: number;
  maxDurationInMillis: number;
}

export interface ArchiveStatistics {
  totalQueries: number;
  totalExecutions: number;
  avgDuration: number;
  slowestQuery: string | null;
  dateRange: { start: Date; end: Date };
}

export interface QueryPerformanceOverview {
  realtime: {
        queryStats: DBQueryStats[];
    };
    historical: {
        statistics: ArchiveStatistics;
        slowestQueries: SlowestQuery[];
        archiveLogs: ArchiveLogEntry[];
    };
}
