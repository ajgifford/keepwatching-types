# Account Types Documentation

This module provides TypeScript type definitions for account-related operations in the KeepWatching application. It handles user account management, authentication integration, and API request/response structures.

## Overview

The account types module defines interfaces for:
- Core account data structures
- Firebase authentication integration
- API request/response patterns
- Account creation and modification operations

## Core Interfaces

### `Account`

The primary interface representing a user account in the application.

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
  name: "John Doe",
  email: "john.doe@example.com",
  uid: "firebase-uid-123",
  image: "https://example.com/avatar.jpg",
  defaultProfileId: 5
};
```

### `CombinedAccount`

An extended account interface that merges database account information with Firebase authentication metadata. This provides a comprehensive view of account status including verification state and authentication timestamps.

**Key Features:**
- Nullable fields to handle Firebase data inconsistencies
- Authentication metadata with timestamps
- Email verification status
- Account disabled state

**Usage Example:**
```typescript
const combinedAccount: CombinedAccount = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  uid: "firebase-uid-123",
  image: "https://example.com/avatar.jpg",
  defaultProfileId: 5,
  emailVerified: true,
  displayName: "John Doe",
  photoURL: "https://example.com/photo.jpg",
  disabled: false,
  metadata: {
    creationTime: "2023-01-15T10:30:00Z",
    lastSignInTime: "2023-12-01T14:22:00Z",
    lastRefreshTime: "2023-12-01T16:45:00Z"
  },
  databaseCreatedAt: new Date("2023-01-15T10:30:00Z")
};
```

## API Response Types

### `AccountResponse`

Standardized API response format for account operations that extends the base response pattern.

**Structure:**
```typescript
interface AccountResponse extends BaseResponse {
  message: string;  // From BaseResponse
  result: Account;  // The account data
}
```

**Usage Example:**
```typescript
const response: AccountResponse = {
  message: "Account retrieved successfully",
  result: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    uid: "firebase-uid-123",
    image: "https://example.com/avatar.jpg",
    defaultProfileId: 5
  }
};
```

## Request Types

### `CreateAccountRequest`

Defines the payload structure for creating new accounts. The `image` field is optional to accommodate users without profile pictures.

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
  name: "Jane Smith",
  email: "jane.smith@example.com",
  uid: "firebase-uid-456",
  image: "https://example.com/jane-avatar.jpg"
};

// Minimal account creation (no image)
const minimalRequest: CreateAccountRequest = {
  name: "Bob Johnson",
  email: "bob@example.com",
  uid: "firebase-uid-789"
};
```

### `UpdateAccountRequest`

Enables partial updates to existing accounts. Only the `id` field is required; all other fields are optional, allowing for flexible update operations.

**Required Fields:**
- `id: number` - Account ID to update

**Optional Fields:**
- `name?: string` - New display name
- `image?: string` - New profile image URL
- `defaultProfileId?: number` - New default profile ID

**Usage Examples:**
```typescript
// Update only the name
const updateName: UpdateAccountRequest = {
  id: 1,
  name: "John Smith"
};

// Update multiple fields
const updateMultiple: UpdateAccountRequest = {
  id: 1,
  name: "John Smith",
  image: "https://example.com/new-avatar.jpg",
  defaultProfileId: 3
};

// Update only default profile
const updateProfile: UpdateAccountRequest = {
  id: 1,
  defaultProfileId: 7
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

### Error Handling

When working with these types, consider:

- **Nullable Fields**: Handle cases where Firebase data may be null
- **Validation**: Ensure required fields are present before API calls
- **Type Guards**: Use TypeScript type guards for runtime validation

```typescript
function isValidAccount(data: any): data is Account {
  return (
    typeof data.id === 'number' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.uid === 'string' &&
    typeof data.image === 'string' &&
    typeof data.defaultProfileId === 'number'
  );
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