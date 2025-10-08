/**
 * Status values for email messages in the system.
 * Tracks the lifecycle of email messages from draft to delivery.
 *
 * - `draft`: Email is being composed but not yet ready to send
 * - `pending`: Email is queued for processing
 * - `scheduled`: Email is scheduled for future delivery
 * - `sent`: Email has been successfully delivered
 * - `failed`: Email delivery failed
 *
 * @type {EmailStatus}
 * @example
 * ```typescript
 * const status: EmailStatus = 'sent';
 * const draftStatus: EmailStatus = 'draft';
 * ```
 */
export type EmailStatus = 'draft' | 'pending' | 'scheduled' | 'sent' | 'failed';

/**
 * Actions that can be performed on email messages.
 * Determines the immediate action to take with an email.
 *
 * - `draft`: Save email as a draft without sending
 * - `schedule`: Schedule email for future delivery
 * - `send`: Send email immediately
 *
 * @type {EmailAction}
 * @example
 * ```typescript
 * const action: EmailAction = 'send';
 * const scheduleAction: EmailAction = 'schedule';
 * ```
 */
export type EmailAction = 'draft' | 'schedule' | 'send';

/**
 * Status values for individual email recipients.
 * Tracks delivery status for each recipient of an email.
 *
 * - `pending`: Awaiting delivery
 * - `sent`: Successfully delivered to recipient
 * - `failed`: Delivery to recipient failed
 * - `bounced`: Email bounced back (invalid address or other issue)
 *
 * @type {EmailRecipientStatus}
 * @example
 * ```typescript
 * const recipientStatus: EmailRecipientStatus = 'sent';
 * const failedStatus: EmailRecipientStatus = 'failed';
 * ```
 */
export type EmailRecipientStatus = 'pending' | 'sent' | 'failed' | 'bounced';

/**
 * Minimal reference to an email message.
 * Used for foreign key relationships and lightweight references.
 *
 * @interface EmailReference
 * @example
 * ```typescript
 * const emailRef: EmailReference = {
 *   id: 42
 * };
 * ```
 */
export interface EmailReference {
  /** Unique identifier for the email */
  id: number;
}

/**
 * Template for email messages.
 * Defines reusable email structure with dynamic content.
 *
 * @interface EmailTemplate
 * @extends {EmailReference}
 * @example
 * ```typescript
 * const template: EmailTemplate = {
 *   id: 1,
 *   name: 'welcome-email',
 *   subject: 'Welcome to KeepWatching!',
 *   message: 'Welcome {{userName}}! Thanks for joining!',
 *   createdAt: '2025-01-01T00:00:00Z',
 *   updatedAt: '2025-01-01T00:00:00Z'
 * };
 * ```
 */
export interface EmailTemplate extends EmailReference {
  /** Human-readable name for the template */
  name: string;
  /** Email subject line */
  subject: string;
  /** Email message content (may include placeholders like {{variable}}) */
  message: string;
  /** Timestamp when the template was created */
  createdAt: string;
  /** Timestamp when the template was last updated */
  updatedAt: string;
}

/**
 * Complete email message with all metadata.
 * Represents a full email record in the system.
 *
 * @interface Email
 * @extends {EmailReference}
 * @example
 * ```typescript
 * const email: Email = {
 *   id: 100,
 *   subject: 'Welcome to KeepWatching!',
 *   message: 'Thanks for joining our platform!',
 *   sentToAll: false,
 *   accountCount: 50,
 *   scheduledDate: null,
 *   sentDate: '2025-01-08T10:00:00Z',
 *   status: 'sent',
 *   createdAt: '2025-01-08T09:55:00Z',
 *   updatedAt: '2025-01-08T10:00:00Z'
 * };
 * ```
 */
export interface Email extends EmailReference {
  /** Email subject line */
  subject: string;
  /** Email message content */
  message: string;
  /** Whether this email was sent to all accounts */
  sentToAll: boolean;
  /** Number of accounts this email was sent to */
  accountCount: number;
  /** Timestamp when the email is scheduled to be sent (null for immediate send) */
  scheduledDate: string | null;
  /** Timestamp when the email was actually sent (null if not yet sent) */
  sentDate: string | null;
  /** Current status of the email */
  status: EmailStatus;
  /** Timestamp when the email record was created */
  createdAt: string;
  /** Timestamp when the email record was last updated */
  updatedAt: string;
}

/**
 * Input data for creating a new email template.
 * Contains all required fields for template creation.
 *
 * @interface CreateEmailTemplate
 * @example
 * ```typescript
 * const newTemplate: CreateEmailTemplate = {
 *   name: 'password-reset',
 *   subject: 'Reset Your Password',
 *   message: 'Click the following link to reset your password: {{resetLink}}'
 * };
 * ```
 */
export interface CreateEmailTemplate {
  /** Human-readable name for the template */
  name: string;
  /** Email subject line */
  subject: string;
  /** Email message content */
  message: string;
}

/**
 * Input data for updating an existing email template.
 * Includes all template fields plus the ID for identification.
 *
 * @interface UpdateEmailTemplate
 * @extends {CreateEmailTemplate}
 * @extends {EmailReference}
 * @example
 * ```typescript
 * const update: UpdateEmailTemplate = {
 *   id: 1,
 *   name: 'password-reset',
 *   subject: 'Updated Subject Line',
 *   message: 'Updated message content'
 * };
 * ```
 */
export interface UpdateEmailTemplate extends CreateEmailTemplate, EmailReference {}

/**
 * Input data for creating a new email message.
 * Contains all required fields and scheduling information.
 *
 * @interface CreateEmail
 * @example
 * ```typescript
 * const newEmail: CreateEmail = {
 *   subject: 'Welcome!',
 *   message: 'Welcome to KeepWatching!',
 *   sendToAll: false,
 *   recipients: [1, 2, 3],
 *   scheduledDate: null,
 *   action: 'send'
 * };
 * ```
 */
export interface CreateEmail {
  /** Email subject line */
  subject: string;
  /** Email message content */
  message: string;
  /** Whether to send to all accounts */
  sendToAll: boolean;
  /** Array of account IDs to send the email to */
  recipients: number[];
  /** When to send the email (null for immediate, ISO 8601 string for scheduled) */
  scheduledDate: string | null;
  /** Action to perform (draft, schedule, or send) */
  action: EmailAction;
}

/**
 * Input data for updating an existing email message.
 * Includes all email fields plus the ID for identification.
 *
 * @interface UpdateEmail
 * @extends {CreateEmail}
 * @extends {EmailReference}
 * @example
 * ```typescript
 * const update: UpdateEmail = {
 *   id: 100,
 *   subject: 'Updated Subject',
 *   message: 'Updated message',
 *   sendToAll: false,
 *   recipients: [1, 2, 3, 4],
 *   scheduledDate: '2025-01-10T12:00:00Z',
 *   action: 'schedule'
 * };
 * ```
 */
export interface UpdateEmail extends CreateEmail, EmailReference {}

/**
 * Complete email recipient record with delivery tracking.
 * Represents a single recipient of an email message.
 *
 * @interface EmailRecipient
 * @example
 * ```typescript
 * const recipient: EmailRecipient = {
 *   id: 500,
 *   emailId: 100,
 *   accountId: 42,
 *   email: 'user@example.com',
 *   name: 'John Doe',
 *   status: 'sent',
 *   sentAt: '2025-01-08T10:00:00Z',
 *   errorMessage: ''
 * };
 * ```
 */
export interface EmailRecipient {
  /** Unique identifier for this recipient record */
  id: number;
  /** ID of the email this recipient belongs to */
  emailId: number;
  /** ID of the account receiving the email */
  accountId: number;
  /** Recipient's email address */
  email: string;
  /** Recipient's display name */
  name: string;
  /** Current delivery status for this recipient */
  status: EmailRecipientStatus;
  /** Timestamp when the email was sent to this recipient */
  sentAt: string;
  /** Error message if delivery failed (empty string if successful) */
  errorMessage: string;
}

/**
 * Input data for creating a new email recipient.
 * Associates a recipient with an email message for tracking.
 *
 * @interface CreateEmailRecipient
 * @example
 * ```typescript
 * const newRecipient: CreateEmailRecipient = {
 *   email_id: 100,
 *   account_id: 42,
 *   status: 'pending',
 *   sent_at: null,
 *   error_message: null
 * };
 * ```
 */
export interface CreateEmailRecipient {
  /** ID of the email to associate this recipient with */
  email_id: number;
  /** ID of the account receiving the email */
  account_id: number;
  /** Initial delivery status */
  status: EmailRecipientStatus;
  /** Timestamp when sent (null if not yet sent) */
  sent_at: string | null;
  /** Error message if applicable (null if no error) */
  error_message: string | null;
}
