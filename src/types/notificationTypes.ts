import { BaseResponse } from './responseTypes';

export interface AccountNotification {
  id: number;
  message: string;
  startDate: Date;
  endDate: Date;
}

export interface AdminNotification extends AccountNotification {
  sendToAll: boolean;
  accountId: number | null;
}

export interface CreateNotificationRequest {
  message: string;
  startDate: string;
  endDate: string;
  sendToAll: boolean;
  accountId: number | null;
}

export interface UpdateNotificationRequest extends CreateNotificationRequest {
  id: number;
}

export interface NotificationResponse extends BaseResponse {
  notifications: AccountNotification[];
}
