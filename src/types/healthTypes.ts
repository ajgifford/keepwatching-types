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
