export interface ServiceHealth {
  name: string;
  status: ServiceStatus;
  uptime: string;
  memory: string;
  cpu: string;
}

export enum ServiceStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  ERROR = 'error',
}

export type ServiceStatusesType = keyof typeof ServiceStatus;
