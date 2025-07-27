[< Back](../README.md)

# Preferences Type Interface

Comprehensive TypeScript type definitions for user preference management in the KeepWatching application. This module
provides type-safe preference handling across email, notification, display, and privacy settings.

## Overview

The preferences type interface enables users to customize their application experience through various preference
categories. Each category has specific settings that control different aspects of the user interface and communication
preferences.

## Preference Categories

### PreferenceType

Core preference categories available in the system:

```typescript
type PreferenceType = 'email' | 'notification' | 'display' | 'privacy';
```

## Individual Preference Interfaces

### EmailPreferences

Controls email communication settings and frequency:

```typescript
interface EmailPreferences {
  weeklyDigest?: boolean; // Weekly content digest emails
  marketingEmails?: boolean; // Promotional and marketing communications
}
```

**Usage Examples:**

```typescript
// Enable all email communications
const emailPrefs: EmailPreferences = {
  weeklyDigest: true,
  marketingEmails: true,
};

// Disable marketing but keep digest
const minimalEmailPrefs: EmailPreferences = {
  weeklyDigest: true,
  marketingEmails: false,
};
```

### NotificationPreferences

Manages in-app and push notification settings:

```typescript
interface NotificationPreferences {
  newSeasonAlerts?: boolean; // Alerts when new seasons are released
  newEpisodeAlerts?: boolean; // Alerts when new episodes are available
}
```

**Usage Examples:**

```typescript
// Get all content notifications
const activeNotifications: NotificationPreferences = {
  newSeasonAlerts: true,
  newEpisodeAlerts: true,
};

// Only season-level notifications
const seasonOnlyNotifications: NotificationPreferences = {
  newSeasonAlerts: true,
  newEpisodeAlerts: false,
};
```

### DisplayPreferences

Controls visual appearance and formatting options:

```typescript
interface DisplayPreferences {
  theme?: 'light' | 'dark' | 'auto'; // UI theme preference
  dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'; // Date display format
}
```

**Usage Examples:**

```typescript
// Dark theme with ISO date format
const darkModePrefs: DisplayPreferences = {
  theme: 'dark',
  dateFormat: 'YYYY-MM-DD',
};

// Auto theme following system preferences
const systemPrefs: DisplayPreferences = {
  theme: 'auto',
  dateFormat: 'MM/DD/YYYY',
};
```

### PrivacyPreferences

Manages data collection and recommendation settings:

```typescript
interface PrivacyPreferences {
  allowRecommendations?: boolean; // Enable personalized content recommendations
  dataCollection?: boolean; // Allow usage analytics and data collection
}
```

**Usage Examples:**

```typescript
// Privacy-focused settings
const privateSettings: PrivacyPreferences = {
  allowRecommendations: false,
  dataCollection: false,
};

// Full personalization enabled
const personalizedSettings: PrivacyPreferences = {
  allowRecommendations: true,
  dataCollection: true,
};
```

## Default Preferences

System-wide default preferences for new users:

```typescript
const DEFAULT_PREFERENCES: Record<PreferenceType, PreferenceData> = {
  email: {
    weeklyDigest: true,
    marketingEmails: true,
  },
  notification: {
    newSeasonAlerts: true,
    newEpisodeAlerts: true,
  },
  display: {
    theme: 'auto',
    dateFormat: 'MM/DD/YYYY',
  },
  privacy: {
    allowRecommendations: true,
    dataCollection: true,
  },
};
```

## Union and Utility Types

### PreferenceData

Union type representing any preference category data:

```typescript
type PreferenceData = EmailPreferences | NotificationPreferences | DisplayPreferences | PrivacyPreferences;
```

### TypedPreferenceUpdate

Type-safe preference updates for each category:

```typescript
interface TypedPreferenceUpdate {
  email: Partial<EmailPreferences>;
  notification: Partial<NotificationPreferences>;
  display: Partial<DisplayPreferences>;
  privacy: Partial<PrivacyPreferences>;
}
```

## Request and Response Types

### UpdatePreferenceRequest

Generic request interface for updating specific preference categories:

```typescript
interface UpdatePreferenceRequest<T extends PreferenceData> {
  preference_type: PreferenceType;
  preferences: Partial<T>;
}
```

**Usage Examples:**

```typescript
// Update email preferences
const emailUpdate: UpdatePreferenceRequest<EmailPreferences> = {
  preference_type: 'email',
  preferences: {
    weeklyDigest: false,
  },
};

// Update display preferences
const displayUpdate: UpdatePreferenceRequest<DisplayPreferences> = {
  preference_type: 'display',
  preferences: {
    theme: 'dark',
    dateFormat: 'YYYY-MM-DD',
  },
};
```

### AccountPreferences

Complete user preference collection:

```typescript
interface AccountPreferences {
  email?: EmailPreferences;
  notification?: NotificationPreferences;
  display?: DisplayPreferences;
  privacy?: PrivacyPreferences;
}
```

**Usage Example:**

```typescript
const userPreferences: AccountPreferences = {
  email: {
    weeklyDigest: true,
    marketingEmails: false,
  },
  notification: {
    newSeasonAlerts: true,
    newEpisodeAlerts: true,
  },
  display: {
    theme: 'dark',
    dateFormat: 'YYYY-MM-DD',
  },
  privacy: {
    allowRecommendations: true,
    dataCollection: false,
  },
};
```

### Response Interfaces

#### AccountPreferencesResponse

Response for retrieving complete user preferences:

```typescript
interface AccountPreferencesResponse extends BaseResponse {
  preferences: AccountPreferences;
}
```

#### AccountPreferenceDataResponse

Response for retrieving specific preference category data:

```typescript
interface AccountPreferenceDataResponse extends BaseResponse {
  preferences: PreferenceData;
}
```

## Implementation Examples

### Service Layer Implementation

```typescript
import {
  AccountPreferences,
  DEFAULT_PREFERENCES,
  PreferenceType,
  UpdatePreferenceRequest,
} from '@ajgifford/keepwatching-types';

class PreferenceService {
  async updatePreferences<T extends PreferenceData>(
    accountId: number,
    request: UpdatePreferenceRequest<T>,
  ): Promise<AccountPreferences> {
    const { preference_type, preferences } = request;

    // Validate preference type
    if (!['email', 'notification', 'display', 'privacy'].includes(preference_type)) {
      throw new Error('Invalid preference type');
    }

    // Update specific preference category
    const updatedPreferences = await this.repository.updatePreferences(accountId, preference_type, preferences);

    return updatedPreferences;
  }

  async getPreferences(accountId: number): Promise<AccountPreferences> {
    const preferences = await this.repository.getPreferences(accountId);

    // Apply defaults for missing preferences
    return this.mergeWithDefaults(preferences);
  }

  private mergeWithDefaults(preferences: Partial<AccountPreferences>): AccountPreferences {
    return {
      email: { ...DEFAULT_PREFERENCES.email, ...preferences.email },
      notification: { ...DEFAULT_PREFERENCES.notification, ...preferences.notification },
      display: { ...DEFAULT_PREFERENCES.display, ...preferences.display },
      privacy: { ...DEFAULT_PREFERENCES.privacy, ...preferences.privacy },
    };
  }
}
```

### Controller Implementation

```typescript
import { EmailPreferences, UpdatePreferenceRequest } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class PreferenceController {
  constructor(private preferenceService: PreferenceService) {}

  // GET /api/v1/preferences
  async getPreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = req.user.accountId;
      const preferences = await this.preferenceService.getPreferences(accountId);

      res.status(200).json({
        message: 'Preferences retrieved successfully',
        preferences,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/preferences/email
  async updateEmailPreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = req.user.accountId;
      const request: UpdatePreferenceRequest<EmailPreferences> = {
        preference_type: 'email',
        preferences: req.body,
      };

      const updatedPreferences = await this.preferenceService.updatePreferences(accountId, request);

      res.status(200).json({
        message: 'Email preferences updated successfully',
        preferences: updatedPreferences,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

### Frontend Hook Implementation

```typescript
import { AccountPreferences, PreferenceType, UpdatePreferenceRequest } from '@ajgifford/keepwatching-types';
import { useCallback, useState } from 'react';

interface UsePreferencesReturn {
  preferences: AccountPreferences | null;
  loading: boolean;
  error: string | null;
  updatePreferences: <T extends PreferenceData>(type: PreferenceType, updates: Partial<T>) => Promise<void>;
  refreshPreferences: () => Promise<void>;
}

export function usePreferences(): UsePreferencesReturn {
  const [preferences, setPreferences] = useState<AccountPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePreferences = useCallback(async <T extends PreferenceData>(type: PreferenceType, updates: Partial<T>) => {
    setLoading(true);
    setError(null);

    try {
      const request: UpdatePreferenceRequest<T> = {
        preference_type: type,
        preferences: updates,
      };

      const response = await fetch(`/api/v1/preferences/${type}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      const result = await response.json();
      setPreferences(result.preferences);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshPreferences = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/preferences');

      if (!response.ok) {
        throw new Error('Failed to fetch preferences');
      }

      const result = await response.json();
      setPreferences(result.preferences);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    refreshPreferences,
  };
}
```

## Best Practices

### Type Safety

Always use the specific preference interfaces for type safety:

```typescript
// ✅ Type-safe preference handling
function updateEmailSettings(settings: Partial<EmailPreferences>): void {
  const request: UpdatePreferenceRequest<EmailPreferences> = {
    preference_type: 'email',
    preferences: settings,
  };
  // TypeScript ensures settings match EmailPreferences shape
}

// ❌ Avoid untyped preference handling
function updateSettings(type: string, settings: any): void {
  // No type safety, runtime errors possible
}
```

### Default Handling

Always provide sensible defaults for optional preferences:

```typescript
// ✅ Proper default handling
function getEmailPreferences(user: AccountPreferences): EmailPreferences {
  return {
    weeklyDigest: user.email?.weeklyDigest ?? DEFAULT_PREFERENCES.email.weeklyDigest,
    marketingEmails: user.email?.marketingEmails ?? DEFAULT_PREFERENCES.email.marketingEmails
  };
}

// ❌ Avoid assumptions about undefined values
function getEmailPreferences(user: AccountPreferences): EmailPreferences {
  return user.email!; // Runtime error if email is undefined
}
```

### Partial Updates

Use Partial<T> for preference updates to allow incremental changes:

```typescript
// ✅ Allow partial updates
async function updateDisplayPreferences(
  accountId: number,
  updates: Partial<DisplayPreferences>
): Promise<void> {
  // Only update provided fields
  const request: UpdatePreferenceRequest<DisplayPreferences> = {
    preference_type: 'display',
    preferences: updates
  };

  await preferenceService.updatePreferences(accountId, request);
}

// ❌ Avoid requiring complete preference objects
async function updateDisplayPreferences(
  accountId: number,
  preferences: DisplayPreferences // Forces all fields to be provided
): Promise<void> {
  // Implementation
}
```

## Common Anti-Patterns

### Hardcoded Preference Values

```typescript
// ❌ Don't hardcode preference values
const userTheme = 'dark'; // What if user prefers light?

// ✅ Use user preferences
const userTheme = preferences.display?.theme ?? DEFAULT_PREFERENCES.display.theme;
```

### Ignoring Optional Fields

```typescript
// ❌ Don't assume optional fields exist
function shouldSendEmail(prefs: AccountPreferences): boolean {
  return prefs.email.weeklyDigest; // Runtime error if email is undefined
}

// ✅ Handle optional fields properly
function shouldSendEmail(prefs: AccountPreferences): boolean {
  return prefs.email?.weeklyDigest ?? DEFAULT_PREFERENCES.email.weeklyDigest;
}
```

### Direct Mutation

```typescript
// ❌ Don't mutate preference objects directly
function disableMarketing(prefs: AccountPreferences): void {
  prefs.email!.marketingEmails = false; // Mutation and unsafe access
}

// ✅ Create new objects for updates
function disableMarketing(prefs: AccountPreferences): AccountPreferences {
  return {
    ...prefs,
    email: {
      ...prefs.email,
      marketingEmails: false
    }
  };
}
```

## Related Documentation

- **[Account Types](./docs/account-types.md)** - User account management
- **[Response Types](./docs/response-types.md)** - API response structures
- **[Notification Types](./docs/notification-types.md)** - Notification preferences integration
