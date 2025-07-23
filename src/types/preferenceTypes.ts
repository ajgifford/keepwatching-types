import { BaseResponse } from './responseTypes';

export type PreferenceType = 'email' | 'notification' | 'display' | 'privacy';

export interface EmailPreferences {
  weeklyDigest?: boolean;
  marketingEmails?: boolean;
}

export interface NotificationPreferences {
  newSeasonAlerts?: boolean;
  newEpisodeAlerts?: boolean;
}

export interface DisplayPreferences {
  theme?: 'light' | 'dark' | 'auto';
  dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
}

export interface PrivacyPreferences {
  allowRecommendations?: boolean;
  dataCollection?: boolean;
}

export const DEFAULT_PREFERENCES: Record<PreferenceType, PreferenceData> = {
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

export type PreferenceData = EmailPreferences | NotificationPreferences | DisplayPreferences | PrivacyPreferences;

export interface UpdatePreferenceRequest<T extends PreferenceData> {
  preference_type: PreferenceType;
  preferences: Partial<T>;
}

export interface AccountPreferences {
  email?: EmailPreferences;
  notification?: NotificationPreferences;
  display?: DisplayPreferences;
  privacy?: PrivacyPreferences;
}

export interface AccountPreferencesResponse extends BaseResponse {
  preferences: AccountPreferences;
}

export interface AccountPreferenceDataResponse extends BaseResponse {
  preferences: PreferenceData;
}

export interface TypedPreferenceUpdate {
  email: Partial<EmailPreferences>;
  notification: Partial<NotificationPreferences>;
  display: Partial<DisplayPreferences>;
  privacy: Partial<PrivacyPreferences>;
}
