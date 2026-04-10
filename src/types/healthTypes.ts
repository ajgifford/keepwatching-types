/**
 * Aggregate performance statistics for a specific database query pattern.
 * Captured in real-time by the query monitoring layer and used to identify
 * slow or high-frequency queries.
 *
 * @interface DBQueryStats
 * @example
 * ```typescript
 * const stats: DBQueryStats = {
 *   query: "SELECT * FROM episodes WHERE show_id = ?",
 *   count: 1420,
 *   avgTime: 3.2,
 *   maxTime: 45.8,
 *   totalTime: 4544
 * };
 * ```
 */
export interface DBQueryStats {
  /** The SQL query template (parameters replaced with placeholders) */
  query: string;

  /** Total number of times this query has been executed */
  count: number;

  /** Average execution time in milliseconds */
  avgTime: number;

  /** Maximum execution time observed in milliseconds */
  maxTime: number;

  /** Cumulative execution time in milliseconds across all executions */
  totalTime: number;
}

/**
 * Current snapshot of the database connection pool state.
 * Used to monitor connection utilization and detect pool exhaustion.
 *
 * @interface DBPoolStats
 * @example
 * ```typescript
 * const poolStats: DBPoolStats = {
 *   totalConnections: 10,
 *   activeConnections: 3,
 *   freeConnections: 7
 * };
 * ```
 */
export interface DBPoolStats {
  /** Total number of connections in the pool (active + free) */
  totalConnections: number;

  /** Number of connections currently executing a query */
  activeConnections: number;

  /** Number of idle connections available for new queries */
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
   * Optional account ID associated with the query
   */
  accountId?: number;
   /**
   * Optional profile ID associated with the query
   */
  profileId?: number;
  /**
   * Optional content object associated with the query
   */
  content?: {
    id: number;
    type: 'show' | 'movie' | 'episode' | 'season' | 'person';
  }
  /**
   * Optional result count (number of rows returned)
   */
  resultCount?: number;
}

/**
 * Status of a performance archive operation.
 *
 * - `started`: The archive job has begun but not yet finished
 * - `completed`: The archive job finished successfully
 * - `failed`: The archive job encountered an error and did not complete
 *
 * @type {ArchiveLogStatus}
 */
export type ArchiveLogStatus = 'started' | 'completed' | 'failed'

/**
 * Represents a single row in the performance archive log.
 * Tracks the outcome of each archive operation for auditing and debugging.
 *
 * @interface ArchiveLogEntry
 * @example
 * ```typescript
 * const logEntry: ArchiveLogEntry = {
 *   id: 42,
 *   archiveDate: new Date("2024-01-15"),
 *   startedAt: new Date("2024-01-15T06:00:00Z"),
 *   completedAt: new Date("2024-01-15T06:00:45Z"),
 *   status: 'completed',
 *   metricsArchived: 1500,
 *   queriesProcessed: 320,
 *   errorMessage: null
 * };
 * ```
 */
export interface ArchiveLogEntry {
  /** Unique identifier for this archive log entry */
  id: number;

  /** The calendar date for which metrics were archived */
  archiveDate: Date;

  /** Timestamp when the archive operation began */
  startedAt: Date;

  /** Timestamp when the archive operation finished, or null if still running or failed before completion */
  completedAt: Date | null;

  /** Outcome of the archive operation */
  status: ArchiveLogStatus;

  /** Number of metric records written to the archive */
  metricsArchived: number;

  /** Number of distinct query patterns processed during the archive */
  queriesProcessed: number;

  /** Error message if the operation failed, or null on success */
  errorMessage: string | null;
}

/**
 * Aggregated execution statistics for all queries executed on a specific day.
 * Sourced from the performance archive and used for historical trend analysis.
 *
 * @interface DailySummary
 * @example
 * ```typescript
 * const summary: DailySummary = {
 *   archiveDate: new Date("2024-01-15"),
 *   totalExecutions: 48200,
 *   avgDurationInMillis: 3.8,
 *   minDurationInMillis: 0.4,
 *   maxDurationInMillis: 312,
 *   p95DurationInMillis: 18.5
 * };
 * ```
 */
export interface DailySummary {
  /** The calendar date this summary covers */
  archiveDate: Date;

  /** Total number of query executions on this date */
  totalExecutions: number;

  /** Average query duration in milliseconds */
  avgDurationInMillis: number;

  /** Minimum query duration observed in milliseconds */
  minDurationInMillis: number;

  /** Maximum query duration observed in milliseconds */
  maxDurationInMillis: number;

  /** 95th percentile query duration in milliseconds, or null if insufficient data */
  p95DurationInMillis: number | null;
}

/**
 * Summary of a query pattern ranked by average duration.
 * Used to surface the slowest queries for performance optimization.
 *
 * @interface SlowestQuery
 * @example
 * ```typescript
 * const slowQuery: SlowestQuery = {
 *   queryHash: "a3f1c2d4",
 *   queryTemplate: "SELECT * FROM episodes WHERE show_id = ? AND season_id = ?",
 *   totalExecutions: 8420,
 *   avgDurationInMillis: 42.3,
 *   maxDurationInMillis: 890
 * };
 * ```
 */
export interface SlowestQuery {
  /** Hash uniquely identifying this query pattern */
  queryHash: string;

  /** Normalized query template with parameters replaced by placeholders */
  queryTemplate: string;

  /** Total number of executions of this query pattern in the archive */
  totalExecutions: number;

  /** Average execution duration in milliseconds */
  avgDurationInMillis: number;

  /** Maximum execution duration observed in milliseconds */
  maxDurationInMillis: number;
}

/**
 * Aggregate statistics derived from the archived query performance data.
 * Summarizes historical query behavior across the configured date range.
 *
 * @interface ArchiveStatistics
 * @example
 * ```typescript
 * const archiveStats: ArchiveStatistics = {
 *   totalQueries: 250,
 *   totalExecutions: 1_450_000,
 *   avgDuration: 4.8,
 *   slowestQuery: "SELECT * FROM watch_history WHERE profile_id = ?",
 *   dateRange: { start: new Date("2024-01-01"), end: new Date("2024-01-31") }
 * };
 * ```
 */
export interface ArchiveStatistics {
  /** Total number of distinct query patterns in the archive */
  totalQueries: number;

  /** Total number of query executions across all patterns */
  totalExecutions: number;

  /** Average query duration in milliseconds across all archived executions */
  avgDuration: number;

  /** Template of the single slowest query observed, or null if no data */
  slowestQuery: string | null;

  /** Date range covered by this archive statistics summary */
  dateRange: { start: Date; end: Date };
}

/**
 * Combined real-time and historical query performance data for the admin dashboard.
 * Provides a unified view of current in-memory metrics alongside archived historical records.
 *
 * @interface QueryPerformanceOverview
 * @example
 * ```typescript
 * const overview: QueryPerformanceOverview = {
 *   realtime: {
 *     queryStats: [{ query: "SELECT ...", count: 100, avgTime: 3.2, maxTime: 45, totalTime: 320 }]
 *   },
 *   historical: {
 *     statistics: { totalQueries: 250, totalExecutions: 1450000, avgDuration: 4.8, slowestQuery: null, dateRange: { start: new Date(), end: new Date() } },
 *     slowestQueries: [],
 *     archiveLogs: []
 *   }
 * };
 * ```
 */
export interface QueryPerformanceOverview {
  /** Live in-memory query statistics collected since the last service restart */
  realtime: {
    /** Array of per-query aggregate statistics */
    queryStats: DBQueryStats[];
  };

  /** Historical statistics sourced from the performance archive */
  historical: {
    /** Aggregate statistics across all archived query data */
    statistics: ArchiveStatistics;
    /** Queries ranked by average duration (slowest first) */
    slowestQueries: SlowestQuery[];
    /** Log of past archive operations */
    archiveLogs: ArchiveLogEntry[];
  };
}

/**
 * Monthly performance summary for a specific query pattern.
 * Provides percentile-based duration statistics aggregated at the monthly level
 * for long-term performance trend analysis.
 *
 * @interface MonthlyPerformanceSummary
 * @example
 * ```typescript
 * const monthlySummary: MonthlyPerformanceSummary = {
 *   year: 2024,
 *   month: 1,
 *   queryHash: "a3f1c2d4",
 *   queryTemplate: "SELECT * FROM episodes WHERE show_id = ?",
 *   totalExecutions: 210000,
 *   avgDurationInMillis: 4.1,
 *   minDurationInMillis: 0.3,
 *   maxDurationInMillis: 950,
 *   p50DurationInMillis: 2.8,
 *   p95DurationInMillis: 18.5,
 *   p99DurationInMillis: 120
 * };
 * ```
 */
export interface MonthlyPerformanceSummary {
  /** Calendar year (e.g., 2024) */
  year: number;

  /** Calendar month (1–12) */
  month: number;

  /** Hash uniquely identifying the query pattern */
  queryHash: string;

  /** Normalized query template with parameters replaced by placeholders */
  queryTemplate: string;

  /** Total number of executions of this query during the month */
  totalExecutions: number;

  /** Average execution duration in milliseconds */
  avgDurationInMillis: number;

  /** Minimum execution duration observed in milliseconds */
  minDurationInMillis: number;

  /** Maximum execution duration observed in milliseconds */
  maxDurationInMillis: number;

  /** Median (50th percentile) execution duration in milliseconds, or null if insufficient data */
  p50DurationInMillis: number | null;

  /** 95th percentile execution duration in milliseconds, or null if insufficient data */
  p95DurationInMillis: number | null;

  /** 99th percentile execution duration in milliseconds, or null if insufficient data */
  p99DurationInMillis: number | null;
}
