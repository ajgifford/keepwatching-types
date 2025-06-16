import { BaseResponse } from './responseTypes';

/**
 * Represents a user account in the KeepWatching application.
 * Contains core account information and settings.
 *
 * @interface Account
 * @example
 * ```typescript
 * const account: Account = {
 *   id: 1,
 *   name: "John Doe",
 *   email: "john.doe@example.com",
 *   uid: "firebase-uid-123",
 *   image: "https://example.com/avatar.jpg",
 *   defaultProfileId: 5
 * };
 * ```
 */
export interface Account {
  /** Unique identifier for the account */
  id: number;

  /** Display name of the account holder */
  name: string;

  /** Email address associated with the account */
  email: string;

  /** Firebase authentication UID for the account */
  uid: string;

  /** URL to the account's profile image/avatar */
  image: string;

  /** ID of the default profile to use for this account */
  defaultProfileId: number;
}

/**
 * Extended account interface that combines database account data with Firebase authentication metadata.
 * Provides a comprehensive view of account information including authentication status and timestamps.
 *
 * @interface CombinedAccount
 * @extends Account
 * @example
 * ```typescript
 * const combinedAccount: CombinedAccount = {
 *   id: 1,
 *   name: "John Doe",
 *   email: "john.doe@example.com",
 *   uid: "firebase-uid-123",
 *   image: "https://example.com/avatar.jpg",
 *   defaultProfileId: 5,
 *   emailVerified: true,
 *   displayName: "John Doe",
 *   photoURL: "https://example.com/photo.jpg",
 *   disabled: false,
 *   metadata: {
 *     creationTime: "2023-01-15T10:30:00Z",
 *     lastSignInTime: "2023-12-01T14:22:00Z",
 *     lastRefreshTime: "2023-12-01T16:45:00Z"
 *   },
 *   databaseCreatedAt: new Date("2023-01-15T10:30:00Z")
 * };
 * ```
 */
export interface CombinedAccount {
  /** Unique identifier for the account */
  id: number;

  /** Display name of the account holder */
  name: string;

  /** Email address associated with the account (nullable from Firebase) */
  email: string | null;

  /** Firebase authentication UID for the account */
  uid: string;

  /** URL to the account's profile image/avatar (nullable from Firebase) */
  image: string | null;

  /** ID of the default profile to use for this account (nullable if not set) */
  defaultProfileId: number | null;

  /** Whether the account's email address has been verified */
  emailVerified: boolean;

  /** Display name from Firebase (may differ from database name) */
  displayName: string | null;

  /** Photo URL from Firebase authentication */
  photoURL: string | null;

  /** Whether the account has been disabled */
  disabled: boolean;

  /** Firebase authentication metadata containing timestamp information */
  metadata: {
    /** ISO string timestamp of when the account was created in Firebase */
    creationTime: string;

    /** ISO string timestamp of the last sign-in event */
    lastSignInTime: string;

    /** ISO string timestamp of the last token refresh (nullable if never refreshed) */
    lastRefreshTime: string | null;
  };

  /** Date when the account was created in the application database */
  databaseCreatedAt: Date;
}

/**
 * API response wrapper for single account operations.
 * Extends BaseResponse to include account data in a standardized response format.
 *
 * @interface AccountResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: AccountResponse = {
 *   message: "Account retrieved successfully",
 *   result: {
 *     id: 1,
 *     name: "John Doe",
 *     email: "john.doe@example.com",
 *     uid: "firebase-uid-123",
 *     image: "https://example.com/avatar.jpg",
 *     defaultProfileId: 5
 *   }
 * };
 * ```
 */
export interface AccountResponse extends BaseResponse {
  /** The account data returned by the API */
  result: Account;
}

/**
 * Request payload for creating a new account.
 * Contains the minimum required information to establish a new user account.
 *
 * @interface CreateAccountRequest
 * @example
 * ```typescript
 * const createRequest: CreateAccountRequest = {
 *   name: "Jane Smith",
 *   email: "jane.smith@example.com",
 *   uid: "firebase-uid-456",
 *   image: "https://example.com/jane-avatar.jpg"
 * };
 *
 * // Image is optional
 * const minimalRequest: CreateAccountRequest = {
 *   name: "Bob Johnson",
 *   email: "bob@example.com",
 *   uid: "firebase-uid-789"
 * };
 * ```
 */
export interface CreateAccountRequest {
  /** Display name for the new account */
  name: string;

  /** Email address for the new account */
  email: string;

  /** Firebase authentication UID for the new account */
  uid: string;

  /** Optional URL to the account's profile image/avatar */
  image?: string;
}

/**
 * Request payload for updating an existing account.
 * All fields except ID are optional, allowing for partial updates.
 *
 * @interface UpdateAccountRequest
 * @example
 * ```typescript
 * // Update only the name
 * const updateName: UpdateAccountRequest = {
 *   id: 1,
 *   name: "John Smith"
 * };
 *
 * // Update multiple fields
 * const updateMultiple: UpdateAccountRequest = {
 *   id: 1,
 *   name: "John Smith",
 *   image: "https://example.com/new-avatar.jpg",
 *   defaultProfileId: 3
 * };
 *
 * // Update only default profile
 * const updateProfile: UpdateAccountRequest = {
 *   id: 1,
 *   defaultProfileId: 7
 * };
 * ```
 */
export interface UpdateAccountRequest {
  /** ID of the account to update */
  id: number;

  /** Optional new display name for the account */
  name?: string;

  /** Optional new profile image URL for the account */
  image?: string | null;

  /** Optional new default profile ID for the account */
  defaultProfileId?: number;
}
