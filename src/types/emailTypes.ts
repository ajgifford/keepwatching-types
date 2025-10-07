export type EmailStatus = 'draft' | 'pending' | 'scheduled' | 'sent' | 'failed';
export type EmailAction = 'draft' | 'schedule' | 'send';
export type EmailRecipientStatus = 'pending' | 'sent' | 'failed' | 'bounced';

export interface EmailReference {
  id: number;
}

export interface EmailTemplate extends EmailReference {
  name: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Email extends EmailReference {
  subject: string;
  message: string;
  sentToAll: boolean;
  accountCount: number;
  scheduledDate: string | null;
  sentDate: string | null;
  status: EmailStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmailTemplate {
  name: string;
  subject: string;
  message: string;
}

export interface UpdateEmailTemplate extends CreateEmailTemplate, EmailReference {}

export interface CreateEmail {
  subject: string;
  message: string;
  sendToAll: boolean;
  recipients: number[];
  scheduledDate: string | null;
  action: EmailAction;
}

export interface UpdateEmail extends CreateEmail, EmailReference {}

export interface EmailRecipient {
  id: number;
  emailId: number;
  accountId: number;
  email: string;
  name: string;
  status: EmailRecipientStatus;
  sentAt: string;
  errorMessage: string;
}

export interface CreateEmailRecipient {
  email_id: number;
  account_id: number;
  status: EmailRecipientStatus;
  sent_at: string | null;
  error_message: string | null;
}
