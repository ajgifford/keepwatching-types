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
