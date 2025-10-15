/**
 * Base response interface that provides a standardized structure for all API responses
 * across the KeepWatching application. This interface serves as the foundation for
 * consistent API communication and error handling patterns.
 *
 * All API endpoints in the KeepWatching ecosystem extend this interface to ensure
 * uniform response structure and predictable client-side handling.
 *
 * @interface BaseResponse
 * @example
 * ```typescript
 * // Basic API response
 * const response: BaseResponse = {
 *   message: "Operation completed successfully"
 * };
 *
 * // Extended response with additional data
 * interface UserResponse extends BaseResponse {
 *   user: User;
 * }
 *
 * const userResponse: UserResponse = {
 *   message: "User retrieved successfully",
 *   user: {
 *     id: 1,
 *     name: "John Doe",
 *     email: "john@example.com"
 *   }
 * };
 * ```
 */
export interface BaseResponse {
  /**
   * Human-readable message describing the result of the API operation.
   *
   * This message provides context about the operation's outcome and can be used for:
   * - User notifications and feedback
   * - Logging and debugging purposes
   * - Error reporting and troubleshooting
   * - Success confirmations
   *
   * The message should be descriptive enough to understand what occurred without
   * requiring additional context, while remaining concise and user-friendly.
   *
   * @example
   * ```typescript
   * // Success messages
   * message: "Account created successfully"
   * message: "Profile updated"
   * message: "Content added to favorites"
   *
   * // Error messages
   * message: "Invalid credentials provided"
   * message: "Content not found"
   * message: "Insufficient permissions"
   *
   * // Informational messages
   * message: "No new episodes available"
   * message: "Search completed with 15 results"
   * ```
   */
  message: string;
}

/**
 * Pagination metadata interface that provides information about paginated data sets.
 * This interface contains all the necessary information for implementing pagination
 * UI controls and navigation in client applications.
 *
 * @interface PaginationMeta
 * @example
 * ```typescript
 * const paginationMeta: PaginationMeta = {
 *   totalCount: 150,
 *   totalPages: 15,
 *   currentPage: 3,
 *   limit: 10,
 *   hasNextPage: true,
 *   hasPrevPage: true
 * };
 * ```
 */
export interface PaginationMeta {
  /**
   * Total number of items across all pages.
   * This represents the complete count of items in the dataset before pagination.
   *
   * @example
   * ```typescript
   * totalCount: 150 // There are 150 total items
   * ```
   */
  totalCount: number;

  /**
   * Total number of pages available based on the limit and total count.
   * Calculated as Math.ceil(totalCount / limit).
   *
   * @example
   * ```typescript
   * totalPages: 15 // With 150 items and limit of 10, there are 15 pages
   * ```
   */
  totalPages: number;

  /**
   * Current page number (1-based indexing).
   * Indicates which page of results is currently being displayed.
   *
   * @example
   * ```typescript
   * currentPage: 3 // Currently viewing page 3
   * ```
   */
  currentPage: number;

  /**
   * Maximum number of items per page.
   * This is the page size that determines how many items are returned in each page.
   *
   * @example
   * ```typescript
   * limit: 10 // Each page contains up to 10 items
   * ```
   */
  limit: number;

  /**
   * Indicates whether there is a next page available.
   * True if currentPage < totalPages, false otherwise.
   *
   * @example
   * ```typescript
   * hasNextPage: true // More pages are available
   * ```
   */
  hasNextPage: boolean;

  /**
   * Indicates whether there is a previous page available.
   * True if currentPage > 1, false otherwise.
   *
   * @example
   * ```typescript
   * hasPrevPage: true // Can navigate to previous pages
   * ```
   */
  hasPrevPage: boolean;
}

/**
 * Base pagination response interface that extends BaseResponse with pagination metadata.
 * This interface should be used as the foundation for all paginated API responses
 * to ensure consistent pagination structure across the application.
 *
 * Extend this interface and add your data property to create paginated response types.
 *
 * @interface BasePaginationResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * // Define a paginated response for shows
 * interface GetAllShowsResponse extends BasePaginationResponse {
 *   shows: Show[];
 * }
 *
 * // Usage in API response
 * const response: GetAllShowsResponse = {
 *   message: "Shows retrieved successfully",
 *   shows: [
 *     { id: 1, title: "Show 1" },
 *     { id: 2, title: "Show 2" }
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
export interface BasePaginationResponse extends BaseResponse {
  /**
   * Pagination metadata for the current result set.
   * Provides all necessary information for pagination controls and navigation.
   */
  pagination: PaginationMeta;
}
