export interface LogEntry {
  timestamp: string;
  service: LogService;
  message: string;
  level: LogLevel;
  version?: string;
  logFile?: string;
}

export interface AppLogEntry extends LogEntry {
  logId: string;
  request?: {
    url?: string;
    method?: string;
    body?: object;
    params?: object;
    query?: object;
  };
  response?: {
    statusCode?: number;
    body?: string;
  };
}

export interface NginxLogEntry extends LogEntry {
  remoteAddr: string;
  remoteUser: string;
  request: string;
  status: number;
  bytesSent: number;
  httpReferer: string;
  httpUserAgent: string;
  gzipRatio?: string;
}

export interface ErrorLogEntry extends LogEntry {
  stack: string[];
  fullText: string;
  details?: string;
}

export interface LogFilter {
  service?: string;
  level?: string;
  startDate?: string | null;
  endDate?: string | null;
  searchTerm?: string;
  limit?: number;
}

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export enum LogService {
  APP = 'App',
  NGINX = 'nginx',
  CONSOLE = 'Console',
  CONSOLE_ERROR = 'Console-Error',
  SYSTEM = 'system',
}

export type LogLevelType = keyof typeof LogLevel;
export type LogServiceType = keyof typeof LogService;
