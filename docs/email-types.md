[< Back](../README.md)

# Email Types Documentation

This module provides TypeScript type definitions for email-related operations in the KeepWatching application. It
handles email message management, template creation, recipient tracking, and delivery status monitoring.

## Overview

The email types module defines interfaces for:

- Email message creation and management
- Email template system
- Recipient tracking and delivery status
- Scheduled and immediate email delivery
- Email lifecycle management (draft, pending, sent, failed)

## Type Definitions

### `EmailStatus`

Status values for email messages in the system. Tracks the lifecycle of email messages from draft to delivery.

**Possible Values:**

- `draft` - Email is being composed but not yet ready to send
- `pending` - Email is queued for processing
- `scheduled` - Email is scheduled for future delivery
- `sent` - Email has been successfully delivered
- `failed` - Email delivery failed

**Usage Example:**

```typescript
const status: EmailStatus = 'sent';
const draftStatus: EmailStatus = 'draft';
```

### `EmailAction`

Actions that can be performed on email messages. Determines the immediate action to take with an email.

**Possible Values:**

- `draft` - Save email as a draft without sending
- `schedule` - Schedule email for future delivery
- `send` - Send email immediately

**Usage Example:**

```typescript
const action: EmailAction = 'send';
const scheduleAction: EmailAction = 'schedule';
```

### `EmailRecipientStatus`

Status values for individual email recipients. Tracks delivery status for each recipient of an email.

**Possible Values:**

- `pending` - Awaiting delivery
- `sent` - Successfully delivered to recipient
- `failed` - Delivery to recipient failed
- `bounced` - Email bounced back (invalid address or other issue)

**Usage Example:**

```typescript
const recipientStatus: EmailRecipientStatus = 'sent';
const failedStatus: EmailRecipientStatus = 'failed';
```

## Core Interfaces

### `EmailReference`

Minimal reference to an email message. Used for foreign key relationships and lightweight references.

**Properties:**

- `id: number` - Unique identifier for the email

**Usage Example:**

```typescript
const emailRef: EmailReference = {
  id: 42,
};
```

### `Email`

Complete email message with all metadata. Represents a full email record in the system.

**Properties:**

- `id: number` - Unique identifier for the email
- `subject: string` - Email subject line
- `message: string` - Email message content
- `sentToAll: boolean` - Whether this email was sent to all accounts
- `accountCount: number` - Number of accounts this email was sent to
- `scheduledDate: string | null` - Timestamp when the email is scheduled to be sent (null for immediate send)
- `sentDate: string | null` - Timestamp when the email was actually sent (null if not yet sent)
- `status: EmailStatus` - Current status of the email
- `createdAt: string` - Timestamp when the email record was created
- `updatedAt: string` - Timestamp when the email record was last updated

**Usage Example:**

```typescript
const email: Email = {
  id: 100,
  subject: 'Welcome to KeepWatching!',
  message: 'Thanks for joining our platform!',
  sentToAll: false,
  accountCount: 50,
  scheduledDate: null,
  sentDate: '2025-01-08T10:00:00Z',
  status: 'sent',
  createdAt: '2025-01-08T09:55:00Z',
  updatedAt: '2025-01-08T10:00:00Z',
};
```

### `EmailTemplate`

Template for email messages. Defines reusable email structure with dynamic content.

**Properties:**

- `id: number` - Unique identifier for the template
- `name: string` - Human-readable name for the template
- `subject: string` - Email subject line
- `message: string` - Email message content (may include placeholders like {{variable}})
- `createdAt: string` - Timestamp when the template was created
- `updatedAt: string` - Timestamp when the template was last updated

**Usage Example:**

```typescript
const template: EmailTemplate = {
  id: 1,
  name: 'welcome-email',
  subject: 'Welcome to KeepWatching!',
  message: 'Welcome {{userName}}! Thanks for joining!',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};
```

### `EmailRecipient`

Complete email recipient record with delivery tracking. Represents a single recipient of an email message.

**Properties:**

- `id: number` - Unique identifier for this recipient record
- `emailId: number` - ID of the email this recipient belongs to
- `accountId: number` - ID of the account receiving the email
- `email: string` - Recipient's email address
- `name: string` - Recipient's display name
- `status: EmailRecipientStatus` - Current delivery status for this recipient
- `sentAt: string` - Timestamp when the email was sent to this recipient
- `errorMessage: string` - Error message if delivery failed (empty string if successful)

**Usage Example:**

```typescript
const recipient: EmailRecipient = {
  id: 500,
  emailId: 100,
  accountId: 42,
  email: 'user@example.com',
  name: 'John Doe',
  status: 'sent',
  sentAt: '2025-01-08T10:00:00Z',
  errorMessage: '',
};
```

## Request Types

### `CreateEmail`

Input data for creating a new email message. Contains all required fields and scheduling information.

**Properties:**

- `subject: string` - Email subject line
- `message: string` - Email message content
- `sendToAll: boolean` - Whether to send to all accounts
- `recipients: number[]` - Array of account IDs to send the email to
- `scheduledDate: string | null` - When to send the email (null for immediate, ISO 8601 string for scheduled)
- `action: EmailAction` - Action to perform (draft, schedule, or send)

**Usage Example:**

```typescript
const newEmail: CreateEmail = {
  subject: 'Welcome!',
  message: 'Welcome to KeepWatching!',
  sendToAll: false,
  recipients: [1, 2, 3],
  scheduledDate: null,
  action: 'send',
};
```

### `UpdateEmail`

Input data for updating an existing email message. Includes all email fields plus the ID for identification.

**Properties:**

- All properties from `CreateEmail`
- `id: number` - Email ID to update

**Usage Example:**

```typescript
const update: UpdateEmail = {
  id: 100,
  subject: 'Updated Subject',
  message: 'Updated message',
  sendToAll: false,
  recipients: [1, 2, 3, 4],
  scheduledDate: '2025-01-10T12:00:00Z',
  action: 'schedule',
};
```

### `CreateEmailTemplate`

Input data for creating a new email template. Contains all required fields for template creation.

**Properties:**

- `name: string` - Human-readable name for the template
- `subject: string` - Email subject line
- `message: string` - Email message content

**Usage Example:**

```typescript
const newTemplate: CreateEmailTemplate = {
  name: 'password-reset',
  subject: 'Reset Your Password',
  message: 'Click the following link to reset your password: {{resetLink}}',
};
```

### `UpdateEmailTemplate`

Input data for updating an existing email template. Includes all template fields plus the ID for identification.

**Properties:**

- All properties from `CreateEmailTemplate`
- `id: number` - Template ID to update

**Usage Example:**

```typescript
const update: UpdateEmailTemplate = {
  id: 1,
  name: 'password-reset',
  subject: 'Updated Subject Line',
  message: 'Updated message content',
};
```

### `CreateEmailRecipient`

Input data for creating a new email recipient. Associates a recipient with an email message for tracking.

**Properties:**

- `email_id: number` - ID of the email to associate this recipient with
- `account_id: number` - ID of the account receiving the email
- `status: EmailRecipientStatus` - Initial delivery status
- `sent_at: string | null` - Timestamp when sent (null if not yet sent)
- `error_message: string | null` - Error message if applicable (null if no error)

**Usage Example:**

```typescript
const newRecipient: CreateEmailRecipient = {
  email_id: 100,
  account_id: 42,
  status: 'pending',
  sent_at: null,
  error_message: null,
};
```

## Integration Patterns

### Email Template System

Templates support variable substitution for dynamic content:

```typescript
// Create a template with placeholders
const template: CreateEmailTemplate = {
  name: 'new-content-alert',
  subject: 'New content available: {{showName}}',
  message: 'Hi {{userName}}, a new episode of {{showName}} is now available!',
};

// When sending, replace placeholders with actual values
const emailContent = template.message.replace('{{userName}}', 'John').replace('{{showName}}', 'Breaking Bad');
```

### Scheduled Email Workflow

```typescript
// Create a scheduled email
const scheduledEmail: CreateEmail = {
  subject: 'Weekly Newsletter',
  message: "Check out this week's new releases!",
  sendToAll: true,
  recipients: [],
  scheduledDate: '2025-01-15T09:00:00Z',
  action: 'schedule',
};

// Email status progresses: draft → scheduled → pending → sent
```

### Recipient Tracking

Track delivery status for individual recipients:

```typescript
// Query recipients for a specific email
const recipients: EmailRecipient[] = await getEmailRecipients(emailId);

// Check for delivery failures
const failedRecipients = recipients.filter((r) => r.status === 'failed' || r.status === 'bounced');

// Retry failed deliveries
for (const recipient of failedRecipients) {
  await retryEmailDelivery(recipient.id);
}
```

### Bulk Email Operations

Send to all accounts or selected recipients:

```typescript
// Send to all accounts
const bulkEmail: CreateEmail = {
  subject: 'System Maintenance Notice',
  message: 'Our service will be down for maintenance...',
  sendToAll: true,
  recipients: [],
  scheduledDate: null,
  action: 'send',
};

// Send to specific accounts
const targetedEmail: CreateEmail = {
  subject: 'Premium Feature Update',
  message: 'Check out our new premium features!',
  sendToAll: false,
  recipients: [1, 5, 10, 15, 20],
  scheduledDate: null,
  action: 'send',
};
```

## Best Practices

1. **Draft First**: Create emails as drafts for review before sending
2. **Template Usage**: Use templates for recurring email types to maintain consistency
3. **Recipient Validation**: Validate recipient lists before sending
4. **Error Handling**: Monitor recipient status and handle failures appropriately
5. **Scheduling**: Use scheduled emails for optimal delivery times
6. **Status Tracking**: Monitor email status transitions for debugging
7. **Placeholder Validation**: Ensure all template placeholders are replaced before sending

## Related Types

- `Account` types (from accountTypes.ts) - For recipient account information
- `BaseResponse` (from responseTypes.ts) - For API response structure
- `Notification` types (from notificationTypes.ts) - For in-app notifications

## Dependencies

This module is self-contained and does not extend other type modules. It provides types that may be used in conjunction
with account and notification systems.
