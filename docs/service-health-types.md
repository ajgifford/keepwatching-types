[< Back](../README.md)

# Service Health Types Documentation

This module provides TypeScript type definitions for service health monitoring and status tracking in the KeepWatching
application. It handles service availability, performance metrics, and health check operations for system monitoring and
observability.

## Overview

The service health types module defines interfaces for:

- Service health status monitoring
- Performance metrics tracking (uptime, memory, CPU)
- Service status enumeration and type safety
- Health check responses and monitoring data

## Core Interfaces

### `ServiceHealth`

The primary interface for representing the health status and performance metrics of a service in the KeepWatching
ecosystem.

**Properties:**

- `name: string` - Human-readable name of the service
- `status: ServiceStatus` - Current operational status of the service
- `uptime: string` - Duration the service has been running
- `memory: string` - Current memory usage information
- `cpu: string` - Current CPU usage information

**Key Features:**

- **Status Tracking**: Monitor service availability and operational state
- **Performance Metrics**: Track resource usage and performance indicators
- **Human-Readable**: Formatted strings for display in dashboards
- **Standardized**: Consistent format across all services

**Usage Example:**

```typescript
const serviceHealth: ServiceHealth = {
  name: 'KeepWatching API',
  status: ServiceStatus.RUNNING,
  uptime: '5d 12h 34m',
  memory: '512MB / 1GB (51%)',
  cpu: '15%',
};

// Database service example
const dbServiceHealth: ServiceHealth = {
  name: 'PostgreSQL Database',
  status: ServiceStatus.RUNNING,
  uptime: '12d 8h 22m',
  memory: '2.1GB / 4GB (52%)',
  cpu: '8%',
};

// Service experiencing issues
const problematicService: ServiceHealth = {
  name: 'Redis Cache',
  status: ServiceStatus.ERROR,
  uptime: '0d 0h 5m',
  memory: 'Unknown',
  cpu: 'Unknown',
};
```

## Enumerations

### `ServiceStatus`

Enumeration defining the possible operational states of a service.

**Values:**

- `RUNNING = 'running'` - Service is operational and functioning normally
- `STOPPED = 'stopped'` - Service is intentionally stopped or not running
- `ERROR = 'error'` - Service is experiencing errors or failures

**Key Features:**

- **Clear States**: Unambiguous service status representation
- **String Values**: Human-readable status values for logging and display
- **Extensible**: Can be extended with additional states if needed

**Usage Example:**

```typescript
// Check service status
function getStatusColor(status: ServiceStatus): string {
  switch (status) {
    case ServiceStatus.RUNNING:
      return 'green';
    case ServiceStatus.STOPPED:
      return 'yellow';
    case ServiceStatus.ERROR:
      return 'red';
    default:
      return 'gray';
  }
}

// Service status validation
function isServiceHealthy(health: ServiceHealth): boolean {
  return health.status === ServiceStatus.RUNNING;
}

// Filter services by status
function getRunningServices(services: ServiceHealth[]): ServiceHealth[] {
  return services.filter((service) => service.status === ServiceStatus.RUNNING);
}

// Get problematic services
function getProblematicServices(services: ServiceHealth[]): ServiceHealth[] {
  return services.filter(
    (service) => service.status === ServiceStatus.ERROR || service.status === ServiceStatus.STOPPED,
  );
}
```

## Type Aliases

### `ServiceStatusesType`

Type alias for service status enum keys, useful for type-safe operations and validation.

```typescript
type ServiceStatusesType = keyof typeof ServiceStatus;

// Usage in validation functions
function isValidServiceStatus(status: string): status is ServiceStatusesType {
  return Object.keys(ServiceStatus).includes(status);
}

// Convert string to enum value
function parseServiceStatus(status: string): ServiceStatus | null {
  if (isValidServiceStatus(status)) {
    return ServiceStatus[status];
  }
  return null;
}
```

## Best Practices

### 1. Consistent Health Check Implementation

```typescript
// Standard health check endpoint pattern
interface HealthCheckResponse {
  status: ServiceStatus;
  timestamp: string;
  version?: string;
  dependencies?: {
    [key: string]: ServiceStatus;
  };
}

app.get('/health', async (req, res) => {
  try {
    // Check critical dependencies
    const dbStatus = await checkDatabaseConnection();
    const redisStatus = await checkRedisConnection();

    const allHealthy = dbStatus === ServiceStatus.RUNNING && redisStatus === ServiceStatus.RUNNING;

    const response: HealthCheckResponse = {
      status: allHealthy ? ServiceStatus.RUNNING : ServiceStatus.ERROR,
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION,
      dependencies: {
        database: dbStatus,
        redis: redisStatus,
      },
    };

    const statusCode = allHealthy ? 200 : 503;
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(503).json({
      status: ServiceStatus.ERROR,
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});
```

### 2. Graceful Degradation

```typescript
class ResilientHealthChecker {
  async checkServiceWithFallback(
    serviceName: string,
    primaryCheck: () => Promise<ServiceHealth>,
  ): Promise<ServiceHealth> {
    try {
      return await Promise.race([
        primaryCheck(),
        this.createTimeoutPromise(5000), // 5 second timeout
      ]);
    } catch (error) {
      console.warn(`Health check failed for ${serviceName}:`, error);

      // Return degraded status instead of complete failure
      return {
        name: serviceName,
        status: ServiceStatus.ERROR,
        uptime: 'Unknown',
        memory: 'Unknown',
        cpu: 'Unknown',
      };
    }
  }

  private createTimeoutPromise(timeoutMs: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Health check timeout')), timeoutMs);
    });
  }
}
```

### 3. Resource Usage Formatting

```typescript
class HealthDataFormatter {
  static formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  static formatMemory(usedBytes: number, totalBytes: number): string {
    const formatBytes = (bytes: number): string => {
      if (bytes >= 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
      } else if (bytes >= 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(0)}MB`;
      } else {
        return `${(bytes / 1024).toFixed(0)}KB`;
      }
    };

    const used = formatBytes(usedBytes);
    const total = formatBytes(totalBytes);
    const percentage = ((usedBytes / totalBytes) * 100).toFixed(1);

    return `${used} / ${total} (${percentage}%)`;
  }

  static formatCpu(percentage: number): string {
    return `${percentage.toFixed(1)}%`;
  }
}
```

## Dependencies

This module has no external dependencies and provides the foundation for:

- System monitoring and observability
- Service reliability tracking
- Performance metrics collection
- Alerting and incident response

## Related Types

- **Log Types** (`logTypes.ts`) - For service logging and error tracking
- **Statistics Types** (`statisticsTypes.ts`) - For performance analytics
- **Response Types** (`responseTypes.ts`) - For API response structures

## Common Anti-Patterns to Avoid

### 1. Blocking Health Checks

```typescript
// ❌ Don't: Synchronous or slow health checks
app.get('/health', (req, res) => {
  const dbResult = database.querySync('SELECT 1'); // Blocks event loop
  res.json({ status: 'running' });
});

// ✅ Do: Async health checks with timeouts
app.get('/health', async (req, res) => {
  try {
    await Promise.race([
      database.query('SELECT 1'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
    ]);
    res.json({ status: ServiceStatus.RUNNING });
  } catch (error) {
    res.status(503).json({ status: ServiceStatus.ERROR });
  }
});
```

### 2. Inconsistent Status Reporting

```typescript
// ❌ Don't: Use inconsistent status values
const healthCheck1 = { status: 'ok' };
const healthCheck2 = { status: 'healthy' };
const healthCheck3 = { status: 'up' };

// ✅ Do: Use standardized enum values
const healthCheck: ServiceHealth = {
  name: 'API Service',
  status: ServiceStatus.RUNNING, // Consistent enum usage
  uptime: '5d 12h 34m',
  memory: '512MB / 1GB (51%)',
  cpu: '15%',
};
```

### 3. Missing Error Handling

```typescript
// ❌ Don't: Ignore errors in health checks
async function checkHealth() {
  const dbHealth = await checkDatabase(); // Could throw
  const redisHealth = await checkRedis(); // Could throw
  return { database: dbHealth, redis: redisHealth };
}

// ✅ Do: Handle errors gracefully
async function checkHealth(): Promise<{ database: ServiceHealth; redis: ServiceHealth }> {
  const [dbHealth, redisHealth] = await Promise.allSettled([
    checkDatabaseWithTimeout(),
    checkRedisWithTimeout()
  ]);

  return {
    database: dbHealth.status === 'fulfilled' ? dbHealth.value : createErrorHealth('Database'),
    redis: redisHealth.status === 'fulfilled' ? redisHealth.value : createErrorHealth('Redis')
  };
}
```
