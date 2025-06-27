[< Back](../README.md)

# Log Types Documentation

This module provides TypeScript type definitions for logging and monitoring operations in the KeepWatching application.
It handles application logs, web server logs, error tracking, and log filtering for debugging and analytics purposes.

## Overview

The log types module defines interfaces for:

- Application logging with request/response tracking
- Web server (Nginx) access logging
- Error logging with stack traces
- Log filtering and search operations
- Different log levels and service categorization

## Core Interfaces

### `LogEntry`

The foundational interface for all log entries in the system. Provides basic structure for logging across different
services and components.

**Properties:**

- `timestamp: string` - ISO timestamp of when the log entry was created
- `service: LogService` - Which service generated this log entry
- `message: string` - Human-readable log message
- `level: LogLevel` - Severity level of the log entry
- `version?: string` - Optional version of the service that generated the log
- `logFile?: string` - Optional source log file name

**Usage Example:**

```typescript
const logEntry: LogEntry = {
  timestamp: '2024-01-15T10:30:00.123Z',
  service: LogService.APP,
  message: 'User authentication successful',
  level: LogLevel.INFO,
  version: '1.2.3',
  logFile: 'auth.log',
};
```

### `AppLogEntry`

Extended log entry specifically for application-level logging that includes HTTP request and response details. This
interface captures comprehensive information about API operations and user interactions.

**Additional Properties:**

- `logId: string` - Unique identifier for correlating related log entries
- `request?: object` - Optional HTTP request details
  - `url?: string` - Request URL
  - `method?: string` - HTTP method (GET, POST, etc.)
  - `body?: object` - Request body data
  - `params?: object` - URL parameters
  - `query?: object` - Query string parameters
- `response?: object` - Optional HTTP response details
  - `statusCode?: number` - HTTP status code
  - `body?: string` - Response body (as string)

**Key Features:**

- **Request Correlation**: Track complete request/response cycles
- **API Monitoring**: Monitor endpoint performance and usage
- **Debugging Support**: Detailed context for troubleshooting
- **Audit Trail**: Comprehensive logging for compliance

**Usage Example:**

```typescript
const appLogEntry: AppLogEntry = {
  timestamp: '2024-01-15T10:30:00.123Z',
  service: LogService.APP,
  message: 'Profile updated successfully',
  level: LogLevel.INFO,
  logId: 'req_12345_profile_update',
  request: {
    url: '/api/v1/profiles/123',
    method: 'PUT',
    body: { name: 'Updated Name' },
    params: { id: '123' },
    query: { include: 'shows' },
  },
  response: {
    statusCode: 200,
    body: '{"message": "Profile updated successfully"}',
  },
};
```

### `NginxLogEntry`

Specialized log entry for Nginx web server access logs that captures standard web server metrics and request details.

**Properties:**

- `remoteAddr: string` - Client IP address
- `remoteUser: string` - Authenticated user (if any)
- `request: string` - Full HTTP request line
- `status: number` - HTTP response status code
- `bytesSent: number` - Number of bytes sent to client
- `httpReferer: string` - HTTP referer header
- `httpUserAgent: string` - User agent string
- `gzipRatio?: string` - Optional compression ratio (if gzip enabled)

**Key Features:**

- **Traffic Analysis**: Monitor website traffic patterns
- **Performance Metrics**: Track response sizes and speeds
- **Security Monitoring**: Identify suspicious access patterns
- **User Analytics**: Understand user behavior and preferences

**Usage Example:**

```typescript
const nginxLogEntry: NginxLogEntry = {
  timestamp: '2024-01-15T10:30:00.123Z',
  service: LogService.NGINX,
  message: 'GET /api/v1/shows 200',
  level: LogLevel.INFO,
  remoteAddr: '192.168.1.100',
  remoteUser: '-',
  request: 'GET /api/v1/shows HTTP/1.1',
  status: 200,
  bytesSent: 2048,
  httpReferer: 'https://keepwatching.app/dashboard',
  httpUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  gzipRatio: '2.3',
};
```

### `ErrorLogEntry`

Specialized log entry for error tracking that includes stack traces and detailed error information for debugging and
monitoring.

**Additional Properties:**

- `stack: string[]` - Array of stack trace lines
- `fullText: string` - Complete error text
- `details?: string` - Optional additional error details or context

**Key Features:**

- **Error Tracking**: Comprehensive error information
- **Stack Traces**: Full call stack for debugging
- **Error Analytics**: Pattern recognition and trending
- **Alert Integration**: Support for error monitoring systems

**Usage Example:**

```typescript
const errorLogEntry: ErrorLogEntry = {
  timestamp: '2024-01-15T10:30:00.123Z',
  service: LogService.APP,
  message: 'Database connection failed',
  level: LogLevel.ERROR,
  stack: [
    'Error: Connection timeout',
    '    at Database.connect (/app/src/database.js:42:15)',
    '    at ProfileService.getProfile (/app/src/services/profile.js:28:23)',
    '    at ProfileController.getProfile (/app/src/controllers/profile.js:15:12)',
  ],
  fullText: 'Error: Connection timeout\n    at Database.connect...',
  details: 'Connection pool exhausted after 30 seconds',
};
```

## Enumerations

### `LogLevel`

Defines the severity levels for log entries, following standard logging practices.

**Values:**

- `INFO = 'info'` - Informational messages about normal operation
- `WARN = 'warn'` - Warning messages about potential issues
- `ERROR = 'error'` - Error messages indicating failures

**Usage Example:**

```typescript
// Categorize logs by severity
function logMessage(message: string, level: LogLevel): void {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    service: LogService.APP,
    message,
    level,
  };

  switch (level) {
    case LogLevel.ERROR:
      console.error(logEntry);
      break;
    case LogLevel.WARN:
      console.warn(logEntry);
      break;
    case LogLevel.INFO:
    default:
      console.log(logEntry);
      break;
  }
}
```

### `LogService`

Identifies which service or component generated the log entry.

**Values:**

- `APP = 'App'` - Main application logs
- `NGINX = 'nginx'` - Web server logs
- `CONSOLE = 'Console'` - Console output logs
- `CONSOLE_ERROR = 'Console-Error'` - Console error logs
- `SYSTEM = 'system'` - System-level logs

**Usage Example:**

```typescript
// Service-specific logging
function createLogEntry(service: LogService, message: string): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    service,
    message,
    level: LogLevel.INFO,
  };
}

const appLog = createLogEntry(LogService.APP, 'User login successful');
const nginxLog = createLogEntry(LogService.NGINX, 'Request processed');
const systemLog = createLogEntry(LogService.SYSTEM, 'Service started');
```

## Filtering and Search

### `LogFilter`

Interface for filtering and searching log entries with flexible criteria.

**Properties:**

- `service?: string` - Filter by service name
- `level?: string` - Filter by log level
- `startDate?: string | null` - Start date for time range filtering
- `endDate?: string | null` - End date for time range filtering
- `searchTerm?: string` - Text search in log messages
- `limit?: number` - Maximum number of results to return

**Usage Example:**

```typescript
const logFilter: LogFilter = {
  service: 'App',
  level: 'error',
  startDate: '2024-01-15T00:00:00Z',
  endDate: '2024-01-15T23:59:59Z',
  searchTerm: 'database',
  limit: 100,
};

async function searchLogs(filter: LogFilter): Promise<LogEntry[]> {
  let query = buildLogQuery();

  if (filter.service) {
    query = query.where('service', filter.service);
  }

  if (filter.level) {
    query = query.where('level', filter.level);
  }

  if (filter.startDate) {
    query = query.where('timestamp', '>=', filter.startDate);
  }

  if (filter.endDate) {
    query = query.where('timestamp', '<=', filter.endDate);
  }

  if (filter.searchTerm) {
    query = query.where('message', 'like', `%${filter.searchTerm}%`);
  }

  if (filter.limit) {
    query = query.limit(filter.limit);
  }

  return await query.orderBy('timestamp', 'desc');
}
```

## Type Aliases

### `LogLevelType` and `LogServiceType`

Type aliases for enum keys, useful for type-safe operations and validation.

```typescript
type LogLevelType = keyof typeof LogLevel;
type LogServiceType = keyof typeof LogService;

// Usage in validation functions
function isValidLogLevel(level: string): level is LogLevelType {
  return Object.keys(LogLevel).includes(level);
}

function isValidLogService(service: string): service is LogServiceType {
  return Object.keys(LogService).includes(service);
}
```

## Real-World Usage Examples

### Application Logging Service

```typescript
import { AppLogEntry, LogLevel, LogService } from '@ajgifford/keepwatching-types';

class ApplicationLogger {
  private generateLogId(): string {
    return `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  logRequest(request: any, response: any, message: string, level: LogLevel = LogLevel.INFO): AppLogEntry {
    const logEntry: AppLogEntry = {
      timestamp: new Date().toISOString(),
      service: LogService.APP,
      message,
      level,
      logId: this.generateLogId(),
      request: {
        url: request.url,
        method: request.method,
        body: request.body,
        params: request.params,
        query: request.query,
      },
      response: {
        statusCode: response.statusCode,
        body: typeof response.body === 'string' ? response.body : JSON.stringify(response.body),
      },
    };

    this.writeLog(logEntry);
    return logEntry;
  }

  logError(error: Error, context?: any): ErrorLogEntry {
    const errorLog: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      service: LogService.APP,
      message: error.message,
      level: LogLevel.ERROR,
      stack: error.stack ? error.stack.split('\n') : [],
      fullText: error.toString(),
      details: context ? JSON.stringify(context) : undefined,
    };

    this.writeLog(errorLog);
    return errorLog;
  }

  private writeLog(logEntry: LogEntry): void {
    // Implementation for writing logs to storage
    console.log(JSON.stringify(logEntry));
  }
}
```

### Log Analysis Service

```typescript
import { LogEntry, LogFilter, LogLevel } from '@ajgifford/keepwatching-types';

class LogAnalysisService {
  async getErrorTrends(days: number = 7): Promise<{ date: string; count: number }[]> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const filter: LogFilter = {
      level: LogLevel.ERROR,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    const errorLogs = await this.searchLogs(filter);

    // Group by date
    const trends = this.groupLogsByDate(errorLogs);
    return trends;
  }

  async getTopErrors(limit: number = 10): Promise<{ message: string; count: number }[]> {
    const filter: LogFilter = {
      level: LogLevel.ERROR,
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
      limit: 1000,
    };

    const errorLogs = await this.searchLogs(filter);

    // Count occurrences by message
    const messageCounts = new Map<string, number>();
    errorLogs.forEach((log) => {
      const count = messageCounts.get(log.message) || 0;
      messageCounts.set(log.message, count + 1);
    });

    // Sort and limit
    return Array.from(messageCounts.entries())
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  async getServiceHealth(): Promise<{ service: string; errorRate: number }[]> {
    const services = Object.values(LogService);
    const results = [];

    for (const service of services) {
      const totalLogs = await this.countLogs({ service });
      const errorLogs = await this.countLogs({ service, level: LogLevel.ERROR });

      const errorRate = totalLogs > 0 ? (errorLogs / totalLogs) * 100 : 0;
      results.push({ service, errorRate });
    }

    return results;
  }

  private async searchLogs(filter: LogFilter): Promise<LogEntry[]> {
    // Implementation for searching logs
    return [];
  }

  private async countLogs(filter: Partial<LogFilter>): Promise<number> {
    // Implementation for counting logs
    return 0;
  }

  private groupLogsByDate(logs: LogEntry[]): { date: string; count: number }[] {
    const grouped = new Map<string, number>();

    logs.forEach((log) => {
      const date = log.timestamp.split('T')[0]; // Get date part
      const count = grouped.get(date) || 0;
      grouped.set(date, count + 1);
    });

    return Array.from(grouped.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}
```

## Performance Considerations

### Log Retention Strategy

```typescript
class LogRetentionService {
  async cleanupOldLogs(): Promise<void> {
    const retentionPeriods = {
      [LogLevel.INFO]: 30, // days
      [LogLevel.WARN]: 90,
      [LogLevel.ERROR]: 365,
    };

    for (const [level, days] of Object.entries(retentionPeriods)) {
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      await this.deleteLogs({
        level,
        endDate: cutoffDate.toISOString(),
      });
    }
  }

  private async deleteLogs(filter: LogFilter): Promise<void> {
    // Implementation for deleting old logs
  }
}
```

### Efficient Log Storage

```typescript
interface LogStorageConfig {
  batchSize: number;
  flushInterval: number;
  maxMemoryLogs: number;
}

class LogBuffer {
  private buffer: LogEntry[] = [];
  private config: LogStorageConfig;

  constructor(config: LogStorageConfig) {
    this.config = config;
    this.startFlushTimer();
  }

  add(logEntry: LogEntry): void {
    this.buffer.push(logEntry);

    if (this.buffer.length >= this.config.batchSize) {
      this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const logsToFlush = this.buffer.splice(0, this.config.batchSize);
    await this.writeLogs(logsToFlush);
  }

  private startFlushTimer(): void {
    setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  private async writeLogs(logs: LogEntry[]): Promise<void> {
    // Implementation for batch writing logs
  }
}
```

## Dependencies

This module has no external dependencies and provides the foundation for:

- Application monitoring and debugging
- Error tracking and alerting systems
- Performance analytics and reporting
- Compliance and audit logging

## Best Practices

1. **Structured Logging**: Always use consistent log structure for easier analysis
2. **Log Levels**: Use appropriate log levels to manage noise and important information
3. **Sensitive Data**: Never log sensitive information like passwords or tokens
4. **Performance**: Use batching and asynchronous logging to avoid performance impact
5. **Retention**: Implement log retention policies based on compliance requirements
6. **Correlation**: Use correlation IDs to track requests across services
7. **Monitoring**: Set up alerts for error patterns and performance issues

## Security Considerations

### Data Sanitization

```typescript
function sanitizeLogData(data: any): any {
  const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'creditCard'];

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }

  return sanitized;
}

// Usage in logging
const appLogEntry: AppLogEntry = {
  timestamp: new Date().toISOString(),
  service: LogService.APP,
  message: 'User registration attempt',
  level: LogLevel.INFO,
  logId: generateLogId(),
  request: {
    url: '/api/v1/register',
    method: 'POST',
    body: sanitizeLogData(request.body), // Remove sensitive data
  },
};
```

### Access Control

```typescript
// Implement role-based log access
interface LogAccessPolicy {
  canViewLogs(userRole: string, logLevel: LogLevel): boolean;
  canSearchLogs(userRole: string): boolean;
  canExportLogs(userRole: string): boolean;
}

class LogSecurityService implements LogAccessPolicy {
  canViewLogs(userRole: string, logLevel: LogLevel): boolean {
    switch (userRole) {
      case 'admin':
        return true;
      case 'developer':
        return [LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR].includes(logLevel);
      case 'support':
        return [LogLevel.INFO, LogLevel.WARN].includes(logLevel);
      default:
        return false;
    }
  }

  canSearchLogs(userRole: string): boolean {
    return ['admin', 'developer'].includes(userRole);
  }

  canExportLogs(userRole: string): boolean {
    return userRole === 'admin';
  }
}
```

## Common Anti-Patterns to Avoid

### Over-Logging

```typescript
// ❌ Don't: Log every minor operation
function processData(data: any[]) {
  logger.info("Starting data processing");
  for (let i = 0; i < data.length; i++) {
    logger.info(`Processing item ${i}`); // Too verbose
    // ... processing logic
    logger.info(`Completed item ${i}`); // Unnecessary
  }
  logger.info("Data processing complete");
}

// ✅ Do: Log important milestones
function processData(data: any[]) {
  logger.info(`Starting data processing for ${data.length} items`);
  // ... processing logic
  logger.info(`Data processing complete: ${data.length} items processed`);
}
```

### Inconsistent Log Formats

```typescript
// ❌ Don't: Use inconsistent message formats
logger.info('User John logged in');
logger.info('LOGIN: user=jane, success=true');
logger.info('Authentication successful for user: bob');

// ✅ Do: Use consistent structured format
logger.info('User authentication', {
  action: 'login',
  user: 'john',
  success: true,
});
```

### Logging Sensitive Information

```typescript
// ❌ Don't: Log sensitive data
logger.info('User login attempt', {
  username: 'john',
  password: 'secret123', // Never log passwords!
});

// ✅ Do: Log safe information only
logger.info('User login attempt', {
  username: 'john',
  hasPassword: true,
  attempt: 1,
});
```

## Related Types

- **Service Health Types** (`serviceHealthTypes.ts`) - For service status monitoring
- **Response Types** (`responseTypes.ts`) - For API response logging
- **Statistics Types** (`statisticsTypes.ts`) - For log analytics and reporting

## Migration from Legacy Logging

If migrating from a legacy logging system:

### Legacy Format

```typescript
// Old logging approach
console.log(`[${new Date()}] INFO: User login - ${username}`);
console.error(`[${new Date()}] ERROR: ${error.message}`);
```

### New Structured Format

```typescript
// New typed logging approach
const logger = new ApplicationLogger();

logger.logRequest(request, response, 'User login successful', LogLevel.INFO);
logger.logError(error, { context: 'user_authentication' });
```

### Gradual Migration Strategy

```typescript
// Support both during transition
class HybridLogger {
  logLegacy(level: string, message: string): void {
    // Convert legacy format to new structure
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      service: LogService.APP,
      message,
      level: this.convertLegacyLevel(level),
    };

    this.writeLog(logEntry);
  }

  logStructured(logEntry: LogEntry): void {
    this.writeLog(logEntry);
  }

  private convertLegacyLevel(level: string): LogLevel {
    switch (level.toLowerCase()) {
      case 'error':
        return LogLevel.ERROR;
      case 'warn':
      case 'warning':
        return LogLevel.WARN;
      default:
        return LogLevel.INFO;
    }
  }

  private writeLog(logEntry: LogEntry): void {
    // Implementation
  }
}
```
