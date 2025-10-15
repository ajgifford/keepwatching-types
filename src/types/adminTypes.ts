import { Email } from './emailTypes';
import { AdminMovie } from './movieTypes';
import { AdminNotification } from './notificationTypes';
import { Person } from './personTypes';
import { BasePaginationResponse } from './responseTypes';
import { AdminShow } from './showTypes';

/**
 * Response interface for retrieving all shows with pagination in administrative contexts.
 * Extends BasePaginationResponse to provide standardized pagination metadata
 * along with an array of administrative show data.
 *
 * Used by admin interfaces to display and manage the complete show catalog
 * with efficient pagination support.
 *
 * @interface GetAllShowsResponse
 * @extends BasePaginationResponse
 * @example
 * ```typescript
 * const response: GetAllShowsResponse = {
 *   message: "Shows retrieved successfully",
 *   shows: [
 *     {
 *       id: 1,
 *       tmdbId: 1399,
 *       title: "Game of Thrones",
 *       // ... other AdminShow properties
 *       lastUpdated: "2024-01-15T10:30:00Z"
 *     }
 *   ],
 *   pagination: {
 *     totalCount: 150,
 *     totalPages: 15,
 *     currentPage: 1,
 *     limit: 10,
 *     hasNextPage: true,
 *     hasPrevPage: false
 *   }
 * };
 * ```
 */
export interface GetAllShowsResponse extends BasePaginationResponse {
  /**
   * Array of administrative show data for the current page.
   * Each show includes comprehensive metadata and administrative tracking information.
   */
  shows: AdminShow[];
}

/**
 * Response interface for retrieving all movies with pagination in administrative contexts.
 * Extends BasePaginationResponse to provide standardized pagination metadata
 * along with an array of administrative movie data.
 *
 * Used by admin interfaces to display and manage the complete movie catalog
 * with efficient pagination support.
 *
 * @interface GetAllMoviesResponse
 * @extends BasePaginationResponse
 * @example
 * ```typescript
 * const response: GetAllMoviesResponse = {
 *   message: "Movies retrieved successfully",
 *   movies: [
 *     {
 *       id: 1,
 *       tmdbId: 550,
 *       title: "Fight Club",
 *       // ... other AdminMovie properties
 *       lastUpdated: "2024-01-15T10:30:00Z"
 *     }
 *   ],
 *   pagination: {
 *     totalCount: 200,
 *     totalPages: 20,
 *     currentPage: 1,
 *     limit: 10,
 *     hasNextPage: true,
 *     hasPrevPage: false
 *   }
 * };
 * ```
 */
export interface GetAllMoviesResponse extends BasePaginationResponse {
  /**
   * Array of administrative movie data for the current page.
   * Each movie includes comprehensive metadata and administrative tracking information.
   */
  movies: AdminMovie[];
}

/**
 * Response interface for retrieving persons (actors, directors, crew) with pagination
 * in administrative contexts. Extends BasePaginationResponse to provide standardized
 * pagination metadata along with an array of person data.
 *
 * Typically used for browsing persons alphabetically or by other criteria,
 * with pagination support for large datasets.
 *
 * @interface GetPersonsResponse
 * @extends BasePaginationResponse
 * @example
 * ```typescript
 * const response: GetPersonsResponse = {
 *   message: "Persons retrieved successfully",
 *   persons: [
 *     {
 *       id: 1,
 *       tmdbId: 287,
 *       name: "Brad Pitt",
 *       // ... other Person properties
 *     }
 *   ],
 *   pagination: {
 *     totalCount: 1500,
 *     totalPages: 150,
 *     currentPage: 1,
 *     limit: 10,
 *     hasNextPage: true,
 *     hasPrevPage: false
 *   }
 * };
 * ```
 */
export interface GetPersonsResponse extends BasePaginationResponse {
  /**
   * Array of person data for the current page.
   * Each person includes biographical information and metadata.
   */
  persons: Person[];
}

/**
 * Response interface for retrieving emails with pagination in administrative contexts.
 * Extends BasePaginationResponse to provide standardized pagination metadata
 * along with an array of email records.
 *
 * Used by admin interfaces to display and manage email history, scheduled emails,
 * and email delivery tracking with efficient pagination support.
 *
 * @interface GetAllEmailsResponse
 * @extends BasePaginationResponse
 * @example
 * ```typescript
 * const response: GetAllEmailsResponse = {
 *   message: "Emails retrieved successfully",
 *   emails: [
 *     {
 *       id: 1,
 *       subject: "Weekly Digest - January 2024",
 *       message: "Your weekly content summary...",
 *       sentToAll: false,
 *       accountCount: 150,
 *       scheduledDate: null,
 *       sentDate: "2024-01-15T09:00:00Z",
 *       status: "sent"
 *     }
 *   ],
 *   pagination: {
 *     totalCount: 500,
 *     totalPages: 50,
 *     currentPage: 1,
 *     limit: 10,
 *     hasNextPage: true,
 *     hasPrevPage: false
 *   }
 * };
 * ```
 */
export interface GetAllEmailsResponse extends BasePaginationResponse {
  /**
   * Array of email records for the current page.
   * Each email includes metadata about delivery status, recipients, and scheduling.
   */
  emails: Email[];
}

/**
 * Response interface for retrieving all notifications with pagination in administrative contexts.
 * Extends BasePaginationResponse to provide standardized pagination metadata
 * along with an array of administrative notification data.
 *
 * Used by admin interfaces to display and manage system-wide notifications
 * with efficient pagination support.
 *
 * @interface GetAllNotificationsResponse
 * @extends BasePaginationResponse
 * @example
 * ```typescript
 * const response: GetAllNotificationsResponse = {
 *   message: "Notifications retrieved successfully",
 *   notifications: [
 *     {
 *       id: 1,
 *       title: "System Maintenance",
 *       message: "Scheduled maintenance tonight from 2-4 AM",
 *       startDate: new Date("2025-01-15T00:00:00Z"),
 *       endDate: new Date("2025-01-16T06:00:00Z"),
 *       type: 'issue',
 *       sendToAll: true,
 *       accountId: null
 *     }
 *   ],
 *   pagination: {
 *     totalCount: 50,
 *     totalPages: 5,
 *     currentPage: 1,
 *     limit: 10,
 *     hasNextPage: true,
 *     hasPrevPage: false
 *   }
 * };
 * ```
 */
export interface GetAllNotificationsResponse extends BasePaginationResponse {
  /**
   * Array of administrative notification data for the current page.
   * Each notification includes comprehensive metadata and targeting information.
   */
  notifications: AdminNotification[];
}
