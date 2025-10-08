/**
 * Base log entry structure shared across all log types.
 * Contains common fields present in every log entry.
 *
 * @interface LogEntry
 * @example
 * ```typescript
 * const logEntry: LogEntry = {
 *   timestamp: '2025-01-08T10:27:00Z',
 *   service: LogService.APP,
 *   message: 'User successfully authenticated',
 *   level: LogLevel.INFO,
 *   version: '1.2.3',
 *   logFile: 'app-2025-01-08.log'
 * };
 * ```
 */
export interface LogEntry {
  /** ISO 8601 timestamp when the log was generated */
  timestamp: string;
  /** Service that generated the log */
  service: LogService;
  /** Human-readable log message */
  message: string;
  /** Severity level of the log entry */
  level: LogLevel;
  /** Version of the service that generated the log (optional) */
  version?: string;
  /** Name of the log file where this entry is stored (optional) */
  logFile?: string;
}

/**
 * Application log entry with detailed request/response context.
 * Used for logging application-level events with rich metadata about HTTP operations.
 *
 * @interface AppLogEntry
 * @extends {LogEntry}
 * @example
 * ```typescript
 * const appLog: AppLogEntry = {
 *   timestamp: '2025-01-08T10:30:00Z',
 *   service: LogService.APP,
 *   message: 'Movie added to watchlist',
 *   level: LogLevel.INFO,
 *   logId: 'req-abc-123',
 *   request: {
 *     url: '/api/movies/500/watchlist',
 *     method: 'POST',
 *     body: { profileId: 15 },
 *     params: { id: '500' },
 *     query: {}
 *   },
 *   response: {
 *     statusCode: 200,
 *     body: '{"success": true}'
 *   }
 * };
 * ```
 */
export interface AppLogEntry extends LogEntry {
  /** Unique identifier for this log entry/request */
  logId: string;
  /** HTTP request details associated with this log (optional) */
  request?: {
    /** Request URL path */
    url?: string;
    /** HTTP method (GET, POST, PUT, DELETE, etc.) */
    method?: string;
    /** Request body data */
    body?: object;
    /** URL path parameters */
    params?: object;
    /** URL query string parameters */
    query?: object;
  };
  /** HTTP response details associated with this log (optional) */
  response?: {
    /** HTTP status code returned */
    statusCode?: number;
    /** Response body as string */
    body?: string;
  };
}

/**
 * Nginx web server log entry.
 * Captures HTTP request/response details from Nginx access logs.
 *
 * @interface NginxLogEntry
 * @extends {LogEntry}
 * @example
 * ```typescript
 * const nginxLog: NginxLogEntry = {
 *   timestamp: '2025-01-08T10:35:00Z',
 *   service: LogService.NGINX,
 *   message: 'GET /api/movies/500 200',
 *   level: LogLevel.INFO,
 *   remoteAddr: '192.168.1.100',
 *   remoteUser: '-',
 *   request: 'GET /api/movies/500 HTTP/1.1',
 *   status: 200,
 *   bytesSent: 1024,
 *   httpReferer: 'https://keepwatching.com/browse',
 *   httpUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
 *   gzipRatio: '2.5'
 * };
 * ```
 */
export interface NginxLogEntry extends LogEntry {
  /** IP address of the client making the request */
  remoteAddr: string;
  /** Authenticated user name (or '-' if not authenticated) */
  remoteUser: string;
  /** Full HTTP request line (method, URI, protocol) */
  request: string;
  /** HTTP status code returned */
  status: number;
  /** Number of bytes sent in the response */
  bytesSent: number;
  /** HTTP referer header (page that linked to this request) */
  httpReferer: string;
  /** User agent string identifying the client */
  httpUserAgent: string;
  /** Gzip compression ratio applied to response (optional) */
  gzipRatio?: string;
}

/**
 * Error log entry with stack trace and error details.
 * Used for logging application errors and exceptions with full diagnostic information.
 *
 * @interface ErrorLogEntry
 * @extends {LogEntry}
 * @example
 * ```typescript
 * const errorLog: ErrorLogEntry = {
 *   timestamp: '2025-01-08T10:40:00Z',
 *   service: LogService.APP,
 *   message: 'Database connection failed',
 *   level: LogLevel.ERROR,
 *   stack: [
 *     'Error: Connection timeout',
 *     '  at Database.connect (db.ts:45)',
 *     '  at startServer (server.ts:12)'
 *   ],
 *   fullText: 'Error: Connection timeout at Database.connect (db.ts:45) at startServer (server.ts:12)',
 *   details: 'Failed to connect to database after 3 retry attempts'
 * };
 * ```
 */
export interface ErrorLogEntry extends LogEntry {
  /** Stack trace lines as an array of strings */
  stack: string[];
  /** Complete error message including full stack trace as a single string */
  fullText: string;
  /** Additional error details or context (optional) */
  details?: string;
}

/**
 * Filter criteria for querying log entries.
 * All fields are optional to allow flexible filtering.
 *
 * @interface LogFilter
 * @example
 * ```typescript
 * // Filter for app errors in the last hour
 * const filter: LogFilter = {
 *   service: 'App',
 *   level: 'ERROR',
 *   startDate: '2025-01-08T09:40:00Z',
 *   endDate: '2025-01-08T10:40:00Z',
 *   limit: 100
 * };
 *
 * // Search logs with specific term
 * const searchFilter: LogFilter = {
 *   searchTerm: 'database',
 *   limit: 50
 * };
 * ```
 */
export interface LogFilter {
  /** Filter by service name */
  service?: string;
  /** Filter by log level */
  level?: string;
  /** Start of time range (inclusive, null for no start limit) */
  startDate?: string | null;
  /** End of time range (inclusive, null for no end limit) */
  endDate?: string | null;
  /** Search term to find in log messages (partial match) */
  searchTerm?: string;
  /** Maximum number of results to return */
  limit?: number;
}

/**
 * Log severity levels following standard logging conventions.
 * Used to categorize log entries by importance and urgency.
 *
 * @enum {string}
 * @example
 * ```typescript
 * const level = LogLevel.ERROR;
 * const infoLevel = LogLevel.INFO;
 * ```
 */
export enum LogLevel {
  /** Informational messages about normal operations */
  INFO = 'info',
  /** Warning messages about potential issues */
  WARN = 'warn',
  /** Error messages about failures */
  ERROR = 'error',
}

/**
 * Services that generate logs in the KeepWatching ecosystem.
 * Identifies the source system for log entries.
 *
 * @enum {string}
 * @example
 * ```typescript
 * const service = LogService.APP;
 * const nginxService = LogService.NGINX;
 * ```
 */
export enum LogService {
  /** Main application service */
  APP = 'App',
  /** Nginx web server */
  NGINX = 'nginx',
  /** Browser console standard output */
  CONSOLE = 'Console',
  /** Browser console error output */
  CONSOLE_ERROR = 'Console-Error',
  /** System-level logs */
  SYSTEM = 'system',
}

/**
 * Type alias for LogLevel enum keys.
 * Provides a type-safe way to reference log levels.
 *
 * @type {LogLevelType}
 * @example
 * ```typescript
 * const level: LogLevelType = 'INFO';
 * const errorLevel: LogLevelType = 'ERROR';
 * ```
 */
export type LogLevelType = keyof typeof LogLevel;

/**
 * Type alias for LogService enum keys.
 * Provides a type-safe way to reference log services.
 *
 * @type {LogServiceType}
 * @example
 * ```typescript
 * const service: LogServiceType = 'APP';
 * const nginxService: LogServiceType = 'NGINX';
 * ```
 */
export type LogServiceType = keyof typeof LogService;
