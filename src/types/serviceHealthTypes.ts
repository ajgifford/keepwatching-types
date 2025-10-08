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
