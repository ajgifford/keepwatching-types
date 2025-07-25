import { BaseResponse } from './responseTypes';

/**
 * Represents a notification message displayed to account holders in the KeepWatching application.
 * Account notifications provide important information about system updates, feature announcements,
 * maintenance schedules, or other relevant communications.
 *
 * These notifications are targeted to specific accounts and have defined display periods
 * to ensure timely and relevant communication with users.
 *
 * @interface AccountNotification
 * @example
 * ```typescript
 * const notification: AccountNotification = {
 *   id: 1,
 *   message: "New episodes of your favorite shows are now available!",
 *   startDate: new Date("2024-01-15T00:00:00Z"),
 *   endDate: new Date("2024-01-22T23:59:59Z"),
 *   dismissed: false,
 *   read: true
 * };
 * ```
 */
export interface AccountNotification {
  /** Unique identifier for the notification */
  id: number;

  /** The notification content to display to the user */
  message: string;

  /** Date and time when the notification should start being displayed */
  startDate: Date;

  /** Date and time when the notification should stop being displayed */
  endDate: Date;

  /** Flag indicating if the account user has dismissed the notification */
  dismissed: boolean;

  /** Flag indicating if the account user has read the notification */
  read: boolean;
}

/**
 * Extended notification interface for administrative purposes that includes additional
 * metadata for managing notification distribution and targeting. This interface provides
 * administrators with full control over notification scope and recipient selection.
 *
 * Admin notifications can be sent to all users system-wide or targeted to specific
 * accounts for personalized messaging and account-specific communications.
 *
 * @interface AdminNotification
 * @extends AccountNotification
 * @example
 * ```typescript
 * // System-wide notification
 * const systemNotification: AdminNotification = {
 *   id: 1,
 *   message: "Scheduled maintenance will occur on Sunday from 2-4 AM EST",
 *   startDate: new Date("2024-01-10T00:00:00Z"),
 *   endDate: new Date("2024-01-15T04:00:00Z"),
 *   sendToAll: true,
 *   accountId: null
 * };
 *
 * // Account-specific notification
 * const accountNotification: AdminNotification = {
 *   id: 2,
 *   message: "Your premium subscription expires in 7 days",
 *   startDate: new Date("2024-01-15T00:00:00Z"),
 *   endDate: new Date("2024-01-22T23:59:59Z"),
 *   sendToAll: false,
 *   accountId: 123
 * };
 * ```
 */
export interface AdminNotification extends Omit<AccountNotification, 'dismissed' | 'read'> {
  /**
   * Flag indicating whether this notification should be displayed to all users.
   *
   * When true, the notification is shown to every user in the system regardless
   * of their account ID. When false, the notification is only shown to the
   * specific account identified by accountId.
   *
   * System-wide notifications are typically used for:
   * - Maintenance announcements
   * - New feature releases
   * - Service updates
   * - Emergency notifications
   */
  sendToAll: boolean;

  /**
   * ID of the specific account to receive this notification.
   *
   * This field is required when sendToAll is false and should be null
   * when sendToAll is true. Account-specific notifications enable
   * personalized messaging for individual users.
   *
   * Use cases for account-specific notifications:
   * - Subscription expiration warnings
   * - Account-specific feature updates
   * - Personal recommendations
   * - Account security notifications
   *
   * @example
   * ```typescript
   * // For system-wide notifications
   * accountId: null
   *
   * // For account-specific notifications
   * accountId: 456
   * ```
   */
  accountId: number | null;
}

/**
 * Request payload for creating new notifications in the system.
 * Contains all necessary information to establish a new notification
 * with proper timing, targeting, and message content.
 *
 * The creation request uses string dates for API compatibility and
 * includes explicit targeting options for flexible notification distribution.
 *
 * @interface CreateNotificationRequest
 * @example
 * ```typescript
 * // Create a system-wide maintenance notification
 * const maintenanceNotification: CreateNotificationRequest = {
 *   message: "System maintenance scheduled for tonight at midnight",
 *   startDate: "2024-01-15T22:00:00Z",
 *   endDate: "2024-01-16T06:00:00Z",
 *   sendToAll: true,
 *   accountId: null
 * };
 *
 * // Create a user-specific notification
 * const userNotification: CreateNotificationRequest = {
 *   message: "Your watchlist has been updated with new episodes",
 *   startDate: "2024-01-15T00:00:00Z",
 *   endDate: "2024-01-22T23:59:59Z",
 *   sendToAll: false,
 *   accountId: 789
 * };
 * ```
 */
export interface CreateNotificationRequest {
  /** The notification message content to display to users */
  message: string;

  /**
   * ISO string representation of when the notification should start being displayed
   *
   * Should be in ISO 8601 format (e.g., "2024-01-15T00:00:00Z") for consistent
   * timezone handling and API compatibility.
   */
  startDate: string;

  /**
   * ISO string representation of when the notification should stop being displayed
   *
   * Should be in ISO 8601 format (e.g., "2024-01-22T23:59:59Z") and must be
   * after the startDate for valid notification scheduling.
   */
  endDate: string;

  /** Whether this notification should be sent to all users system-wide */
  sendToAll: boolean;

  /**
   * ID of the specific account to receive this notification, or null for system-wide notifications
   *
   * Must be null when sendToAll is true, and must be a valid account ID when sendToAll is false.
   */
  accountId: number | null;
}

/**
 * Request payload for updating existing notifications.
 * Extends the creation request with an ID field to identify which notification to modify.
 *
 * All fields from the creation request can be updated, allowing for complete
 * notification management including message changes, timing adjustments, and targeting modifications.
 *
 * @interface UpdateNotificationRequest
 * @extends CreateNotificationRequest
 * @example
 * ```typescript
 * // Update notification message and extend end date
 * const updateRequest: UpdateNotificationRequest = {
 *   id: 15,
 *   message: "Maintenance has been rescheduled to tomorrow night",
 *   startDate: "2024-01-15T22:00:00Z",
 *   endDate: "2024-01-17T06:00:00Z",
 *   sendToAll: true,
 *   accountId: null
 * };
 *
 * // Change targeting from system-wide to account-specific
 * const reTargetRequest: UpdateNotificationRequest = {
 *   id: 20,
 *   message: "Your account requires attention",
 *   startDate: "2024-01-15T00:00:00Z",
 *   endDate: "2024-01-30T23:59:59Z",
 *   sendToAll: false,
 *   accountId: 456
 * };
 * ```
 */
export interface UpdateNotificationRequest extends CreateNotificationRequest {
  /** ID of the notification to update */
  id: number;
}

/**
 * API response wrapper for notification retrieval operations.
 * Extends BaseResponse to include an array of account notifications in a standardized format.
 *
 * This response type is used for endpoints that return multiple notifications,
 * such as fetching all active notifications for an account or retrieving
 * system-wide notifications for administrative purposes.
 *
 * @interface NotificationResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const notificationResponse: NotificationResponse = {
 *   message: "Notifications retrieved successfully",
 *   notifications: [
 *     {
 *       id: 1,
 *       message: "New episodes available for your shows",
 *       startDate: new Date("2024-01-15T00:00:00Z"),
 *       endDate: new Date("2024-01-22T23:59:59Z")
 *     },
 *     {
 *       id: 2,
 *       message: "System maintenance completed successfully",
 *       startDate: new Date("2024-01-10T00:00:00Z"),
 *       endDate: new Date("2024-01-16T00:00:00Z")
 *     }
 *   ]
 * };
 * ```
 */
export interface NotificationResponse extends BaseResponse {
  /** Array of notifications returned by the API */
  notifications: AccountNotification[];
}
