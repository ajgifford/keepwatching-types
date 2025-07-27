[< Back](../README.md)

# Notification Types Documentation

This module provides TypeScript type definitions for notification management in the KeepWatching application. It handles user messaging, system announcements, administrative notifications, and time-based notification scheduling.

## Overview

The notification types module defines interfaces for:

- Account-specific and system-wide notifications with user interaction tracking
- Administrative notification management with enhanced targeting
- Time-based notification scheduling with notification types
- API request/response patterns for notification operations
- Notification targeting and distribution control

## Core Types

### `NotificationType`

Defines the categories of notifications available in the system:

```typescript
type NotificationType = 'tv' | 'movie' | 'issue' | 'general' | 'feature';
```

**Type Descriptions:**
- `tv` - TV show related notifications (new episodes, seasons)
- `movie` - Movie related notifications (new releases, recommendations)
- `issue` - System issues, maintenance, or problems
- `general` - General announcements and information
- `feature` - New feature announcements and updates

**Validation Function:**

```typescript
function isValidNotificationType(value: string): value is NotificationType {
  return ['tv', 'movie', 'issue', 'general', 'feature'].includes(value);
}
```

## Core Interfaces

### `AccountNotification`

The primary interface representing a notification message displayed to account holders. These notifications provide timely information about system updates, feature announcements, or other relevant communications with user interaction tracking.

**Properties:**

- `id: number` - Unique identifier for the notification
- `title: string` - The notification title/header
- `message: string` - The notification content to display to the user
- `startDate: Date` - Date and time when the notification should start being displayed
- `endDate: Date` - Date and time when the notification should stop being displayed
- `type: NotificationType` - Category of notification for filtering and display
- `dismissed: boolean` - Flag indicating if the user has dismissed the notification
- `read: boolean` - Flag indicating if the user has read the notification

**Key Features:**

- **Time-Based Display**: Notifications are automatically shown/hidden based on date ranges
- **User Interaction Tracking**: Tracks read and dismissed states for better user experience
- **Typed Categories**: Notifications are categorized for filtering and presentation
- **Persistent Storage**: Notifications maintain state across user sessions

**Usage Example:**

```typescript
const notification: AccountNotification = {
  id: 1,
  title: 'New Content Available',
  message: 'New episodes of your favorite shows are now available!',
  startDate: new Date('2024-01-15T00:00:00Z'),
  endDate: new Date('2024-01-22T23:59:59Z'),
  type: 'tv',
  dismissed: false,
  read: true
};
```

### `AdminNotification`

Extended notification interface for administrative purposes that provides full control over notification distribution and targeting. This interface enables administrators to manage both system-wide announcements and account-specific messages.

**Properties:**

Extends `AccountNotification` but omits user interaction fields (`dismissed`, `read`) and adds:

- `sendToAll: boolean` - Flag indicating whether the notification should be displayed to all users
- `accountId: number | null` - ID of the specific account to receive this notification

**Key Features:**

- **Flexible Targeting**: Support for both system-wide and account-specific notifications
- **Administrative Control**: Full management of notification scope and recipients
- **Conditional Distribution**: Logic for determining notification visibility
- **Clean Admin Interface**: Excludes user-specific interaction fields

**Usage Examples:**

```typescript
// System-wide notification
const systemNotification: AdminNotification = {
  id: 1,
  title: 'Scheduled Maintenance',
  message: 'Scheduled maintenance will occur on Sunday from 2-4 AM EST',
  startDate: new Date('2024-01-10T00:00:00Z'),
  endDate: new Date('2024-01-15T04:00:00Z'),
  type: 'issue',
  sendToAll: true,
  accountId: null,
};

// Account-specific notification
const accountNotification: AdminNotification = {
  id: 2,
  title: 'Subscription Expiring',
  message: 'Your premium subscription expires in 7 days',
  startDate: new Date('2024-01-15T00:00:00Z'),
  endDate: new Date('2024-01-22T23:59:59Z'),
  type: 'general',
  sendToAll: false,
  accountId: 123,
};
```

## Request Types

### `CreateNotificationRequest`

Defines the payload structure for creating new notifications. Uses string dates for API compatibility and includes explicit targeting options for flexible notification distribution.

**Required Fields:**

- `title: string` - The notification title to display to user
- `message: string` - The notification message content to display to users
- `startDate: string` - ISO string representation of start time
- `endDate: string` - ISO string representation of end time
- `type: NotificationType` - Category of notification
- `sendToAll: boolean` - Whether to send to all users
- `accountId: number | null` - Target account ID or null for system-wide

**Usage Examples:**

```typescript
// Create a system-wide maintenance notification
const maintenanceNotification: CreateNotificationRequest = {
  title: 'System Maintenance',
  message: 'System maintenance scheduled for tonight at midnight',
  startDate: '2024-01-15T22:00:00Z',
  endDate: '2024-01-16T06:00:00Z',
  type: 'issue',
  sendToAll: true,
  accountId: null
};

// Create a user-specific notification
const userNotification: CreateNotificationRequest = {
  title: 'Watchlist Updated',
  message: 'Your watchlist has been updated with new episodes',
  startDate: '2024-01-15T00:00:00Z',
  endDate: '2024-01-22T23:59:59Z',
  type: 'tv',
  sendToAll: false,
  accountId: 789
};
```

### `UpdateNotificationRequest`

Enables modification of existing notifications by extending the creation request with an ID field. All fields from the creation request can be updated, allowing for complete notification management.

**Additional Field:**

- `id: number` - ID of the notification to update

**Usage Examples:**

```typescript
// Update notification message and extend end date
const updateRequest: UpdateNotificationRequest = {
  id: 15,
  title: 'Maintenance Rescheduled',
  message: 'Maintenance has been rescheduled to tomorrow night',
  startDate: '2024-01-15T22:00:00Z',
  endDate: '2024-01-17T06:00:00Z',
  type: 'issue',
  sendToAll: true,
  accountId: null
};

// Change targeting from system-wide to account-specific
const retargetRequest: UpdateNotificationRequest = {
  id: 20,
  title: 'Account Attention Required',
  message: 'Your account requires attention',
  startDate: '2024-01-15T00:00:00Z',
  endDate: '2024-01-30T23:59:59Z',
  type: 'general',
  sendToAll: false,
  accountId: 456
};
```

## Response Types

### `NotificationResponse`

API response wrapper for notification retrieval operations that extends BaseResponse to include an array of account notifications in a standardized format.

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
      title: 'New Content',
      message: 'New episodes available for your shows',
      startDate: new Date('2024-01-15T00:00:00Z'),
      endDate: new Date('2024-01-22T23:59:59Z'),
      type: 'tv',
      dismissed: false,
      read: true
    },
    {
      id: 2,
      title: 'Maintenance Complete',
      message: 'System maintenance completed successfully',
      startDate: new Date('2024-01-10T00:00:00Z'),
      endDate: new Date('2024-01-16T00:00:00Z'),
      type: 'issue',
      dismissed: false,
      read: false
    }
  ]
};
```

## Implementation Examples

### Service Layer Implementation

```typescript
import { 
  CreateNotificationRequest, 
  UpdateNotificationRequest,
  AccountNotification,
  NotificationType,
  isValidNotificationType
} from '@ajgifford/keepwatching-types';

class NotificationService {
  async createNotification(request: CreateNotificationRequest): Promise<AccountNotification> {
    // Validate notification type
    if (!isValidNotificationType(request.type)) {
      throw new Error('Invalid notification type');
    }

    // Validate targeting logic
    if (request.sendToAll && request.accountId !== null) {
      throw new Error('Cannot specify accountId when sendToAll is true');
    }

    if (!request.sendToAll && request.accountId === null) {
      throw new Error('Must specify accountId when sendToAll is false');
    }

    // Create notification with proper defaults
    const notification = await this.repository.create({
      ...request,
      startDate: new Date(request.startDate),
      endDate: new Date(request.endDate),
      dismissed: false,
      read: false
    });

    return notification;
  }

  async getActiveNotificationsForAccount(accountId: number): Promise<AccountNotification[]> {
    const now = new Date();
    
    return this.repository.findActiveNotifications({
      accountId,
      currentDate: now
    });
  }

  async markAsRead(notificationId: number, accountId: number): Promise<void> {
    await this.repository.updateUserInteraction(notificationId, accountId, {
      read: true
    });
  }

  async dismiss(notificationId: number, accountId: number): Promise<void> {
    await this.repository.updateUserInteraction(notificationId, accountId, {
      dismissed: true
    });
  }
}
```

### Controller Implementation

```typescript
import { CreateNotificationRequest, UpdateNotificationRequest } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  // GET /api/v1/notifications
  async getNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = req.user.accountId;
      const notifications = await this.notificationService.getActiveNotificationsForAccount(accountId);
      
      res.json({
        message: 'Notifications retrieved successfully',
        notifications
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/notifications
  async createNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createRequest: CreateNotificationRequest = req.body;
      const notification = await this.notificationService.createNotification(createRequest);
      
      res.status(201).json({
        message: 'Notification created successfully',
        notification
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/v1/notifications/:id/read
  async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notificationId = parseInt(req.params.id);
      const accountId = req.user.accountId;
      
      await this.notificationService.markAsRead(notificationId, accountId);
      
      res.json({
        message: 'Notification marked as read'
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/v1/notifications/:id/dismiss
  async dismiss(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notificationId = parseInt(req.params.id);
      const accountId = req.user.accountId;
      
      await this.notificationService.dismiss(notificationId, accountId);
      
      res.json({
        message: 'Notification dismissed'
      });
    } catch (error) {
      next(error);
    }
  }
}
```

## Best Practices

### Type Safety

```typescript
// ✅ Good: Use type validation
const createNotification = (request: CreateNotificationRequest) => {
  if (!isValidNotificationType(request.type)) {
    throw new Error('Invalid notification type');
  }
  // Process valid notification
};

// ❌ Bad: Skip type validation
const createNotification = (request: any) => {
  // Process without validation
};
```

### Date Handling

```typescript
// ✅ Good: Use ISO strings for API requests
const request: CreateNotificationRequest = {
  title: 'Maintenance Alert',
  message: 'System maintenance tonight',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 86400000).toISOString(), // +24 hours
  type: 'issue',
  sendToAll: true,
  accountId: null,
};

// ❌ Bad: Use Date objects in API requests
const request = {
  startDate: new Date(),
  endDate: new Date(Date.now() + 86400000),
  // ... other fields
};
```

### Consistent Response Structure

```typescript
// ✅ Good: Extend BaseResponse consistently
interface NotificationResponse extends BaseResponse {
  notifications: AccountNotification[];
}

// ❌ Bad: Create custom response types
interface BadNotificationResponse {
  success: boolean;
  data: AccountNotification[];
  errors?: string[];
}
```

## Key Changes from Previous Version

1. **Added `title` field** to all notification interfaces for better UI presentation
2. **Added `type` field** with `NotificationType` enum for categorization
3. **Added user interaction tracking** with `dismissed` and `read` boolean fields
4. **Enhanced `AdminNotification`** to exclude user interaction fields (omits `dismissed` and `read`)
5. **Updated all request interfaces** to include `title` and `type` fields
6. **Added type validation function** `isValidNotificationType` for runtime safety
7. **Enhanced documentation** with complete TypeScript examples
8. **Added implementation examples** showing proper service and controller patterns

## Related Documentation

### Dependencies

This module depends on:

- `./responseTypes` - For BaseResponse interface
- Database ORM/query builder - For persistence with user interaction tracking
- Authentication middleware - For user context
- Caching layer - For performance optimization

### Integration Points

- **Account Management**: Links to user accounts for targeting and interaction tracking
- **Authentication System**: Validates user permissions
- **Frontend Components**: Displays notifications with read/dismiss functionality
- **Admin Panel**: Manages notification lifecycle with enhanced targeting

### API Endpoints

Standard REST endpoints for notification management:

- `GET /api/v1/notifications` - Get user notifications with interaction state
- `POST /api/v1/admin/notifications` - Create notification with type and targeting
- `PUT /api/v1/admin/notifications/:id` - Update notification
- `DELETE /api/v1/admin/notifications/:id` - Delete notification
- `PATCH /api/v1/notifications/:id/read` - Mark notification as read
- `PATCH /api/v1/notifications/:id/dismiss` - Dismiss notification
- `GET /api/v1/admin/notifications` - List all notifications with admin metadata