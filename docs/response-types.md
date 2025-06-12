[< Back](../README.md)

# Response Types Documentation

This module provides the foundational TypeScript type definition for API responses in the KeepWatching application. It
establishes a standardized response structure that ensures consistent communication patterns across all endpoints and
services.

## Overview

The response types module defines:

- Base response interface for all API operations
- Standardized message structure for client communication
- Foundation for extended response types across the application
- Consistent error and success handling patterns

## Core Interface

### `BaseResponse`

The fundamental interface that serves as the foundation for all API responses in the KeepWatching ecosystem. This
interface ensures every API endpoint returns a consistent structure that clients can reliably process.

**Properties:**

- `message: string` - Human-readable message describing the operation result

**Key Features:**

- **Consistency**: Every API response extends this interface
- **User-Friendly**: Provides clear, actionable feedback
- **Debugging Support**: Enables effective error tracking and logging
- **Extensibility**: Serves as base for more complex response types

**Usage Example:**

```typescript
const response: BaseResponse = {
  message: 'Operation completed successfully',
};
```

## Design Philosophy

### Standardization

The `BaseResponse` interface establishes a contract that all API endpoints must follow. This standardization provides:

- **Predictable Structure**: Clients always know to expect a `message` field
- **Consistent Error Handling**: Error responses follow the same pattern as success responses
- **Simplified Testing**: Unit tests can rely on consistent response structure
- **Enhanced Debugging**: Uniform message format aids in troubleshooting

### Message Guidelines

The `message` field should follow these principles:

**Success Messages:**

- Be concise and descriptive
- Confirm the action that was performed
- Use active voice when possible

```typescript
// Good examples
message: 'Account created successfully';
message: 'Profile updated';
message: 'Content added to favorites';
message: 'Password changed';

// Avoid
message: 'OK';
message: 'Success';
message: 'Done';
```

**Error Messages:**

- Clearly describe what went wrong
- Provide actionable guidance when possible
- Avoid technical jargon for user-facing messages

```typescript
// Good examples
message: 'Invalid email address format';
message: 'Content not found';
message: 'Insufficient permissions to perform this action';
message: 'Account with this email already exists';

// Avoid
message: 'Error 500';
message: 'Database constraint violation';
message: 'Null pointer exception';
```

**Informational Messages:**

- Provide context about the operation's result
- Include relevant details when helpful

```typescript
// Good examples
message: 'Search completed with 15 results';
message: 'No new episodes available';
message: 'Backup completed successfully';
message: '5 notifications marked as read';
```

## Extended Response Patterns

### Single Entity Responses

Most API operations that return a single entity extend `BaseResponse`:

```typescript
interface AccountResponse extends BaseResponse {
  account: Account;
}

interface ShowResponse extends BaseResponse {
  show: ProfileShow;
}

interface ProfileResponse extends BaseResponse {
  profile: Profile;
}
```

### Collection Responses

Operations returning multiple items also extend the base pattern:

```typescript
interface ShowsResponse extends BaseResponse {
  shows: ProfileShow[];
}

interface NotificationResponse extends BaseResponse {
  notifications: AccountNotification[];
}

interface ProfilesResponse extends BaseResponse {
  profiles: Profile[];
}
```

### Complex Responses

Some operations return complex data structures while maintaining the base contract:

```typescript
interface ProfileContentResponse extends BaseResponse {
  profileWithContent: ProfileWithContent;
}

interface StatisticsResponse extends BaseResponse {
  statistics: ProfileStatisticsResponse;
}

interface DiscoverAndSearchResponse extends BaseResponse {
  results: DiscoverAndSearchResult[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
}
```

## Implementation Patterns

### API Endpoint Implementation

```typescript
import { BaseResponse } from '@ajgifford/keepwatching-types';

// Simple success response
async function deleteAccount(id: number): Promise<BaseResponse> {
  await accountService.delete(id);
  return {
    message: 'Account deleted successfully',
  };
}

// Extended response with data
async function getAccount(id: number): Promise<AccountResponse> {
  const account = await accountService.findById(id);
  return {
    message: 'Account retrieved successfully',
    account,
  };
}

// Error response (still follows BaseResponse pattern)
async function updateAccount(id: number, data: UpdateAccountRequest): Promise<AccountResponse> {
  try {
    const account = await accountService.update(id, data);
    return {
      message: 'Account updated successfully',
      account,
    };
  } catch (error) {
    // Error responses also extend BaseResponse
    throw {
      message: 'Failed to update account: ' + error.message,
    };
  }
}
```

## Testing Strategies

### Unit Testing

```typescript
describe('BaseResponse', () => {
  it('should have required message field', () => {
    const response: BaseResponse = {
      message: 'Test message',
    };

    expect(response.message).toBeDefined();
    expect(typeof response.message).toBe('string');
  });

  it('should extend properly for complex responses', () => {
    const accountResponse: AccountResponse = {
      message: 'Account retrieved',
      account: mockAccount,
    };

    // Should satisfy BaseResponse contract
    const baseResponse: BaseResponse = accountResponse;
    expect(baseResponse.message).toBe('Account retrieved');
  });
});
```

## Best Practices

1. **Consistency**: Always extend `BaseResponse` for API responses
2. **Clarity**: Write clear, actionable messages
3. **User Focus**: Tailor messages for the intended audience
4. **Error Safety**: Don't expose sensitive information in error messages
5. **Testing**: Validate response structure in all test scenarios
6. **Documentation**: Keep message examples up to date

## Common Anti-Patterns

### Avoid These Patterns:

```typescript
// ❌ Don't: Inconsistent response structure
interface BadResponse {
  status: string;
  data: unknown;
  // Missing message field
}

// ❌ Don't: Vague messages
const vague: BaseResponse = {
  message: 'Error',
};

// ❌ Don't: Technical jargon in user messages
const technical: BaseResponse = {
  message: 'FOREIGN KEY constraint failed: accounts.defaultProfileId',
};

// ❌ Don't: Information disclosure
const insecure: BaseResponse = {
  message: "Authentication failed for user john@example.com with password attempt 'wrongpass'",
};
```

### Prefer These Patterns:

```typescript
// ✅ Do: Consistent structure
interface GoodResponse extends BaseResponse {
  data: unknown;
}

// ✅ Do: Clear, actionable messages
const clear: BaseResponse = {
  message: 'Invalid email address format',
};

// ✅ Do: User-friendly language
const friendly: BaseResponse = {
  message: 'Please select a valid profile before continuing',
};

// ✅ Do: Security-conscious messaging
const secure: BaseResponse = {
  message: 'Invalid credentials provided',
};
```

## Dependencies

This module has no external dependencies and serves as the foundation for:

- All API response types in the KeepWatching ecosystem
- Extended response interfaces throughout the application
- Error handling and logging systems

## Related Types

- All response interfaces extend `BaseResponse`
- Error handling utilities depend on this structure
- Logging and monitoring systems expect this format
