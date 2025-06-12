[< Back](../README.md)

# Notification Types Documentation

This module provides TypeScript type definitions for notification management in the KeepWatching application. It handles
user messaging, system announcements, administrative notifications, and time-based notification scheduling.

## Overview

The notification types module defines interfaces for:

- Account-specific and system-wide notifications
- Administrative notification management
- Time-based notification scheduling
- API request/response patterns for notification operations
- Notification targeting and distribution control

## Core Interfaces

### `AccountNotification`

The primary interface representing a notification message displayed to account holders. These notifications provide
timely information about system updates, feature announcements, or other relevant communications.

**Properties:**

- `id: number` - Unique identifier for the notification
- `message: string` - The notification content to display to the user
- `startDate: Date` - Date and time when the notification should start being displayed
- `endDate: Date` - Date and time when the notification should stop being displayed

**Key Features:**

- **Time-Based Display**: Notifications are automatically shown/hidden based on date ranges
- **Targeted Messaging**: Content can be tailored to specific account contexts
- **Persistent Storage**: Notifications maintain state across user sessions

**Usage Example:**

```typescript
const notification: AccountNotification = {
  id: 1,
  message: 'New episodes of your favorite shows are now available!',
  startDate: new Date('2024-01-15T00:00:00Z'),
  endDate: new Date('2024-01-22T23:59:59Z'),
};
```

### `AdminNotification`

Extended notification interface for administrative purposes that provides full control over notification distribution
and targeting. This interface enables administrators to manage both system-wide announcements and account-specific
messages.

**Additional Properties:**

- `sendToAll: boolean` - Flag indicating whether the notification should be displayed to all users
- `accountId: number | null` - ID of the specific account to receive this notification

**Key Features:**

- **Flexible Targeting**: Support for both system-wide and account-specific notifications
- **Administrative Control**: Full management of notification scope and recipients
- **Conditional Distribution**: Logic for determining notification visibility

**Usage Examples:**

```typescript
// System-wide notification
const systemNotification: AdminNotification = {
  id: 1,
  message: 'Scheduled maintenance will occur on Sunday from 2-4 AM EST',
  startDate: new Date('2024-01-10T00:00:00Z'),
  endDate: new Date('2024-01-15T04:00:00Z'),
  sendToAll: true,
  accountId: null,
};

// Account-specific notification
const accountNotification: AdminNotification = {
  id: 2,
  message: 'Your premium subscription expires in 7 days',
  startDate: new Date('2024-01-15T00:00:00Z'),
  endDate: new Date('2024-01-22T23:59:59Z'),
  sendToAll: false,
  accountId: 123,
};
```

## Request Types

### `CreateNotificationRequest`

Defines the payload structure for creating new notifications. Uses string dates for API compatibility and includes
explicit targeting options for flexible notification distribution.

**Required Fields:**

- `message: string` - The notification message content
- `startDate: string` - ISO string representation of start time
- `endDate: string` - ISO string representation of end time
- `sendToAll: boolean` - Whether to send to all users
- `accountId: number | null` - Target account ID or null for system-wide

**Usage Examples:**

```typescript
// Create a system-wide maintenance notification
const maintenanceNotification: CreateNotificationRequest = {
  message: 'System maintenance scheduled for tonight at midnight',
  startDate: '2024-01-15T22:00:00Z',
  endDate: '2024-01-16T06:00:00Z',
  sendToAll: true,
  accountId: null,
};

// Create a user-specific notification
const userNotification: CreateNotificationRequest = {
  message: 'Your watchlist has been updated with new episodes',
  startDate: '2024-01-15T00:00:00Z',
  endDate: '2024-01-22T23:59:59Z',
  sendToAll: false,
  accountId: 789,
};
```

### `UpdateNotificationRequest`

Enables modification of existing notifications by extending the creation request with an ID field. All fields from the
creation request can be updated, allowing for complete notification management.

**Additional Field:**

- `id: number` - ID of the notification to update

**Usage Examples:**

```typescript
// Update notification message and extend end date
const updateRequest: UpdateNotificationRequest = {
  id: 15,
  message: 'Maintenance has been rescheduled to tomorrow night',
  startDate: '2024-01-15T22:00:00Z',
  endDate: '2024-01-17T06:00:00Z',
  sendToAll: true,
  accountId: null,
};

// Change targeting from system-wide to account-specific
const retargetRequest: UpdateNotificationRequest = {
  id: 20,
  message: 'Your account requires attention',
  startDate: '2024-01-15T00:00:00Z',
  endDate: '2024-01-30T23:59:59Z',
  sendToAll: false,
  accountId: 456,
};
```

## Response Types

### `NotificationResponse`

API response wrapper for notification retrieval operations that extends BaseResponse to include an array of account
notifications in a standardized format.

**Structure:**

```typescript
interface NotificationResponse extends BaseResponse {
  message: string; // From BaseResponse
  notifications: AccountNotification[]; // Array of notifications
}
```

**Usage Example:**

```typescript
const notificationResponse: NotificationResponse = {
  message: 'Notifications retrieved successfully',
  notifications: [
    {
      id: 1,
      message: 'New episodes available for your shows',
      startDate: new Date('2024-01-15T00:00:00Z'),
      endDate: new Date('2024-01-22T23:59:59Z'),
    },
    {
      id: 2,
      message: 'System maintenance completed successfully',
      startDate: new Date('2024-01-10T00:00:00Z'),
      endDate: new Date('2024-01-16T00:00:00Z'),
    },
  ],
};
```

## Real-World Usage Examples

### Controller Implementation

```typescript
import { CreateNotificationRequest, UpdateNotificationRequest } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  // GET /api/v1/notifications
  async getNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = req.user.accountId; // From authentication middleware
      const response = await this.notificationService.getActiveNotificationsForAccount(accountId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/notifications
  async createNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: CreateNotificationRequest = req.body;
      const notification = await this.notificationService.createNotification(request);

      res.status(201).json({
        message: 'Notification created successfully',
        notification,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/admin/notifications/:id
  async updateNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const request: UpdateNotificationRequest = {
        id,
        ...req.body,
      };

      const notification = await this.notificationService.updateNotification(request);

      res.status(200).json({
        message: 'Notification updated successfully',
        notification,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/v1/admin/notifications/:id
  async deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.notificationService.deleteNotification(id);

      res.status(200).json({
        message: 'Notification deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/admin/notifications
  async getAllNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notifications = await this.notificationService.getAllNotifications();

      res.status(200).json({
        message: 'All notifications retrieved successfully',
        notifications,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

## Performance Considerations

### Caching Strategy

```typescript
class NotificationCacheService {
  private cache = new Map<string, { data: any; expiry: number }>();
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Cache active notifications by account ID
  async getCachedNotifications(accountId: number): Promise<AccountNotification[] | null> {
    const cacheKey = `notifications:${accountId}`;
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    return null;
  }

  setCachedNotifications(accountId: number, notifications: AccountNotification[]): void {
    const cacheKey = `notifications:${accountId}`;
    this.cache.set(cacheKey, {
      data: notifications,
      expiry: Date.now() + this.CACHE_TTL,
    });
  }

  invalidateCache(accountId?: number): void {
    if (accountId) {
      this.cache.delete(`notifications:${accountId}`);
    } else {
      // Clear all caches when system-wide notifications change
      this.cache.clear();
    }
  }
}
```

## Best Practices

### Notification Content Guidelines

1. **Clear and Concise**: Keep messages brief and to the point
2. **Actionable**: Include clear next steps when appropriate
3. **Timely**: Schedule notifications for optimal user engagement
4. **Relevant**: Target notifications to appropriate user segments
5. **Accessible**: Use clear language that's easy to understand

```typescript
// Good notification examples
const examples = {
  maintenance: 'Scheduled maintenance tonight 11 PM - 2 AM EST. Service may be temporarily unavailable.',
  newContent: "3 new episodes of 'Your Favorite Show' are now available!",
  subscription: 'Your premium subscription expires in 7 days. Renew now to continue ad-free viewing.',
  feature: 'New feature: Create custom watch lists! Organize your content your way.',
  security: "For your security, we've updated our privacy policy. Review changes in your account settings.",
};

// Avoid these patterns
const antiPatterns = {
  vague: 'Something happened!',
  technical: 'Database migration completed with 0 errors',
  overwhelming: 'Check out these 47 new features we just released including...',
  urgent_overuse: 'URGENT: Minor UI update available',
};
```

## Common Anti-Patterns to Avoid

### Poor Targeting

```typescript
// ❌ Don't: Send all notifications to everyone
const spamNotification: CreateNotificationRequest = {
  message: 'Minor bug fix applied',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 86400000).toISOString(),
  sendToAll: true, // Not relevant to all users
  accountId: null,
};

// ✅ Do: Target appropriately
const targetedNotification: CreateNotificationRequest = {
  message: 'Your premium features have been updated!',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 604800000).toISOString(),
  sendToAll: false,
  accountId: premiumAccountId, // Only relevant to premium users
};
```

### Poor Timing

```typescript
// ❌ Don't: Show notifications for too long
const overlyLongNotification: CreateNotificationRequest = {
  message: 'Welcome to our new feature!',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 2592000000).toISOString(), // 30 days
  sendToAll: true,
  accountId: null,
};

// ✅ Do: Use appropriate duration
const appropriateNotification: CreateNotificationRequest = {
  message: 'Welcome to our new feature!',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 604800000).toISOString(), // 7 days
  sendToAll: true,
  accountId: null,
};
```

### Inconsistent Structure

```typescript
// ❌ Don't: Create custom response types
interface BadNotificationResponse {
  success: boolean;
  data: AccountNotification[];
  errors?: string[];
}

// ✅ Do: Extend BaseResponse consistently
interface GoodNotificationResponse extends BaseResponse {
  notifications: AccountNotification[];
}
```

## Related Documentation

### Dependencies

This module depends on:

- `./responseTypes` - For BaseResponse interface
- Database ORM/query builder - For persistence
- Authentication middleware - For user context
- Caching layer - For performance optimization

### Integration Points

- **Account Management**: Links to user accounts for targeting
- **Authentication System**: Validates user permissions
- **Frontend Components**: Displays notifications to users
- **Admin Panel**: Manages notification lifecycle

### API Endpoints

Standard REST endpoints for notification management:

- `GET /api/v1/notifications` - Get user notifications
- `POST /api/v1/admin/notifications` - Create notification
- `PUT /api/v1/admin/notifications/:id` - Update notification
- `DELETE /api/v1/admin/notifications/:id` - Delete notification
- `GET /api/v1/admin/notifications` - List all notifications
