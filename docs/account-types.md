[< Back](../README.md)

# Account Types Documentation

This module provides TypeScript type definitions for account-related operations in the KeepWatching application. It
handles user account management, authentication integration, and API request/response structures.

## Overview

The account types module defines interfaces for:

- Core account data structures
- Firebase authentication integration
- API request/response patterns
- Account creation and modification operations

## Core Interfaces

### `AccountReference`

Lightweight account reference interface containing only essential identification information. Used in contexts where
full account data is not needed, such as foreign key relationships, lists, or cross-references.

**Properties:**

- `id: number` - Unique identifier for the account
- `name: string` - Display name of the account holder
- `email: string` - Email address associated with the account

**Usage Example:**

```typescript
const accountRef: AccountReference = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
};
```

### `Account`

**Extends:** `AccountReference`

The primary interface representing a user account in the application. Inherits id, name, and email from AccountReference
and adds authentication and profile settings.

**Properties:**

- `id: number` - Unique identifier for the account
- `name: string` - Display name of the account holder
- `email: string` - Email address associated with the account
- `uid: string` - Firebase authentication UID
- `image: string` - URL to the account's profile image/avatar
- `defaultProfileId: number` - ID of the default profile for this account

**Usage Example:**

```typescript
const account: Account = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  uid: 'firebase-uid-123',
  image: 'https://example.com/avatar.jpg',
  defaultProfileId: 5,
};
```

### `CombinedAccount`

An extended account interface that merges database account information with Firebase authentication metadata. This
provides a comprehensive view of account status including verification state and authentication timestamps.

**Key Features:**

- Nullable fields to handle Firebase data inconsistencies
- Authentication metadata with timestamps
- Email verification status
- Account disabled state
- Last login tracking from application database

**Properties:**

- All properties from `Account` interface
- `emailVerified: boolean` - Whether the email has been verified
- `displayName: string | null` - Display name from Firebase (may differ from database name)
- `photoURL: string | null` - Photo URL from Firebase authentication
- `disabled: boolean` - Whether the account is disabled
- `metadata` - Firebase authentication metadata:
  - `creationTime: string` - ISO timestamp of account creation in Firebase
  - `lastSignInTime: string` - ISO timestamp of last Firebase sign-in
  - `lastRefreshTime: string | null` - ISO timestamp of last token refresh
- `databaseCreatedAt: Date` - Date when account was created in application database
- `lastLogin: Date | null` - Date when user last logged in via the application (null if never logged in)
- `lastActivity: Date | null` - Date when the user last was active in the application such as viewing a page (null if no
  activity)

**Usage Example:**

```typescript
const combinedAccount: CombinedAccount = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  uid: 'firebase-uid-123',
  image: 'https://example.com/avatar.jpg',
  defaultProfileId: 5,
  emailVerified: true,
  displayName: 'John Doe',
  photoURL: 'https://example.com/photo.jpg',
  disabled: false,
  metadata: {
    creationTime: '2023-01-15T10:30:00Z',
    lastSignInTime: '2023-12-01T14:22:00Z',
    lastRefreshTime: '2023-12-01T16:45:00Z',
  },
  databaseCreatedAt: new Date('2023-01-15T10:30:00Z'),
  lastLogin: new Date('2023-12-01T14:22:00Z'),
  lastActivity: new Date('2023-12-01T16:45:00Z'),
};
```

**Notes:**

- The `lastLogin` field tracks when users authenticate through the application's login, register, or Google login
  workflows
- This differs from Firebase's `lastSignInTime` which tracks Firebase authentication events
- The field will be `null` for users who have never logged in or for existing users before the feature was implemented

## API Response Types

### `AccountResponse`

Standardized API response format for account operations that extends the base response pattern.

**Structure:**

```typescript
interface AccountResponse extends BaseResponse {
  message: string; // From BaseResponse
  result: Account; // The account data
}
```

**Usage Example:**

```typescript
const response: AccountResponse = {
  message: 'Account retrieved successfully',
  result: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    uid: 'firebase-uid-123',
    image: 'https://example.com/avatar.jpg',
    defaultProfileId: 5,
  },
};
```

## Request Types

### `CreateAccountRequest`

Defines the payload structure for creating new accounts. The `image` field is optional to accommodate users without
profile pictures.

**Required Fields:**

- `name: string` - Account display name
- `email: string` - Account email address
- `uid: string` - Firebase authentication UID

**Optional Fields:**

- `image?: string` - Profile image URL

**Usage Examples:**

```typescript
// Complete account creation
const createRequest: CreateAccountRequest = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  uid: 'firebase-uid-456',
  image: 'https://example.com/jane-avatar.jpg',
};

// Minimal account creation (no image)
const minimalRequest: CreateAccountRequest = {
  name: 'Bob Johnson',
  email: 'bob@example.com',
  uid: 'firebase-uid-789',
};
```

### `UpdateAccountRequest`

Enables partial updates to existing accounts. Only the `id` field is required; all other fields are optional, allowing
for flexible update operations.

**Required Fields:**

- `id: number` - Account ID to update

**Optional Fields:**

- `name?: string` - New display name
- `image?: string | null` - New profile image URL (can be set to null to remove the image)
- `defaultProfileId?: number` - New default profile ID

**Usage Examples:**

```typescript
// Update only the name
const updateName: UpdateAccountRequest = {
  id: 1,
  name: 'John Smith',
};

// Update multiple fields
const updateMultiple: UpdateAccountRequest = {
  id: 1,
  name: 'John Smith',
  image: 'https://example.com/new-avatar.jpg',
  defaultProfileId: 3,
};

// Update only default profile
const updateProfile: UpdateAccountRequest = {
  id: 1,
  defaultProfileId: 7,
};
```

## Integration Patterns

### Firebase Authentication

The account types are designed to work seamlessly with Firebase Authentication:

1. **Account Creation**: Use Firebase UID to link accounts
2. **Authentication State**: CombinedAccount provides verification status
3. **Metadata Tracking**: Timestamps for creation, sign-in, and token refresh

### API Integration

These types support RESTful API patterns:

```typescript
// Account creation endpoint
async function createAccount(request: CreateAccountRequest): Promise<AccountResponse> {
  // Implementation
}

// Account update endpoint
async function updateAccount(request: UpdateAccountRequest): Promise<AccountResponse> {
  // Implementation
}

// Account retrieval endpoint
async function getAccount(id: number): Promise<AccountResponse> {
  // Implementation
}
```

## Dependencies

This module depends on:

- `./responseTypes` - For BaseResponse interface
- Firebase Authentication (implied through UID usage)

## Best Practices

1. **Type Safety**: Always use these interfaces for account-related operations
2. **Partial Updates**: Leverage optional fields in UpdateAccountRequest for efficient updates
3. **Null Handling**: Check for null values when working with CombinedAccount
4. **Validation**: Implement runtime validation for external data sources
5. **Consistency**: Use Account interface for internal operations, CombinedAccount for Firebase integration

## Related Types

- `Profile` types (from profileTypes.ts) - For account profiles
- `BaseResponse` (from responseTypes.ts) - For API response structure
- Firebase User types - For authentication integration
