/**
 * Health status values for services in the KeepWatching ecosystem.
 * Indicates the operational state of a service.
 *
 * @enum {string}
 * @example
 * ```typescript
 * const status = ServiceStatus.RUNNING;
 * const errorStatus = ServiceStatus.ERROR;
 * ```
 */
export enum ServiceStatus {
  /** Service is running normally */
  RUNNING = 'running',
  /** Service is stopped */
  STOPPED = 'stopped',
  /** Service encountered an error */
  ERROR = 'error',
}

/**
 * Type representing ServiceStatus enum keys.
 * Provides a type-safe way to reference service status values.
 *
 * @type {ServiceStatusesType}
 * @example
 * ```typescript
 * const status: ServiceStatusesType = 'RUNNING';
 * const errorStatus: ServiceStatusesType = 'ERROR';
 * ```
 */
export type ServiceStatusesType = keyof typeof ServiceStatus;

/**
 * Complete health check response for a service.
 * Contains detailed information about service status and resource usage.
 *
 * @interface ServiceHealth
 * @example
 * ```typescript
 * const health: ServiceHealth = {
 *   name: 'api-service',
 *   status: ServiceStatus.RUNNING,
 *   uptime: '5d 3h 45m',
 *   memory: '512 MB',
 *   cpu: '25%'
 * };
 * ```
 */
export interface ServiceHealth {
  /** Name of the service being reported */
  name: string;
  /** Current operational status of the service */
  status: ServiceStatus;
  /** Human-readable uptime duration (e.g., '5d 3h 45m') */
  uptime: string;
  /** Memory usage as a human-readable string (e.g., '512 MB') */
  memory: string;
  /** CPU usage as a percentage string (e.g., '25%') */
  cpu: string;
}

/**
 * Result of probing the public-facing site URL to verify end-to-end reachability.
 *
 * @interface SiteStatus
 * @example
 * ```typescript
 * const status: SiteStatus = {
 *   url: 'https://keepwatching.example.com/health',
 *   status: 'up',
 *   statusCode: 200,
 *   responseTimeMs: 142,
 *   lastChecked: '2026-02-20T10:00:00.000Z',
 * };
 * ```
 */
export interface SiteStatus {
  /** The URL that was probed */
  url: string;
  /** Whether the site responded successfully */
  status: 'up' | 'down';
  /** HTTP status code returned, or null if the request failed entirely */
  statusCode: number | null;
  /** Round-trip response time in milliseconds, or null on failure */
  responseTimeMs: number | null;
  /** ISO 8601 timestamp of when the check was performed */
  lastChecked: string;
  /** Error message if the site is down */
  error?: string;
}
