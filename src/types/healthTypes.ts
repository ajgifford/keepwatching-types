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
}
