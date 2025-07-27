import { BaseResponse } from './responseTypes';

/**
 * Type definition for the different categories of user preferences available in the system.
 *
 * Each preference type corresponds to a specific area of user customization:
 * - `email`: Controls email communication settings and frequency
 * - `notification`: Manages in-app and push notification preferences
 * - `display`: Controls visual appearance and formatting options
 * - `privacy`: Manages data collection and recommendation settings
 *
 * @type {PreferenceType}
 * @example
 * ```typescript
 * const preferenceCategory: PreferenceType = 'email';
 * const notificationCategory: PreferenceType = 'notification';
 * ```
 */
export type PreferenceType = 'email' | 'notification' | 'display' | 'privacy';

/**
 * Interface defining email communication preferences for user accounts.
 * Controls how and when the application sends email communications to users.
 *
 * All fields are optional to allow partial updates and graceful handling
 * of missing preferences, with defaults applied at the service level.
 *
 * @interface EmailPreferences
 * @example
 * ```typescript
 * // Enable all email communications
 * const emailPrefs: EmailPreferences = {
 *   weeklyDigest: true,
 *   marketingEmails: true
 * };
 *
 * // Minimal email preferences (digest only)
 * const minimalEmailPrefs: EmailPreferences = {
 *   weeklyDigest: true,
 *   marketingEmails: false
 * };
 *
 * // Partial update example
 * const emailUpdate: Partial<EmailPreferences> = {
 *   weeklyDigest: false
 * };
 * ```
 */
export interface EmailPreferences {
  /**
   * Controls whether the user receives weekly digest emails containing
   * summaries of new content, recommendations, and platform updates.
   *
   * When enabled, users receive a comprehensive weekly email highlighting:
   * - New episodes and seasons of favorited shows
   * - Recommended content based on viewing history
   * - Platform updates and new features
   * - Popular content trending on the platform
   *
   * @type {boolean}
   * @default true
   * @optional
   */
  weeklyDigest?: boolean;

  /**
   * Controls whether the user receives marketing and promotional emails
   * including special offers, feature announcements, and platform news.
   *
   * Marketing emails may include:
   * - Special subscription offers and promotions
   * - New feature announcements and beta invitations
   * - Partnership announcements and exclusive content
   * - Survey invitations and user research requests
   *
   * Users can disable marketing emails while still receiving essential
   * account notifications and weekly digests.
   *
   * @type {boolean}
   * @default true
   * @optional
   */
  marketingEmails?: boolean;
}

/**
 * Interface defining in-app and push notification preferences for content updates.
 * Controls when and how users are notified about new content availability.
 *
 * These preferences directly impact user engagement by controlling real-time
 * notifications about content they're following or might be interested in.
 *
 * @interface NotificationPreferences
 * @example
 * ```typescript
 * // Enable all content notifications
 * const activeNotifications: NotificationPreferences = {
 *   newSeasonAlerts: true,
 *   newEpisodeAlerts: true
 * };
 *
 * // Season-level notifications only
 * const seasonOnlyNotifications: NotificationPreferences = {
 *   newSeasonAlerts: true,
 *   newEpisodeAlerts: false
 * };
 *
 * // Disable all content notifications
 * const quietMode: NotificationPreferences = {
 *   newSeasonAlerts: false,
 *   newEpisodeAlerts: false
 * };
 * ```
 */
export interface NotificationPreferences {
  /**
   * Controls whether the user receives notifications when new seasons
   * of their favorited shows are released or announced.
   *
   * Season alerts are triggered when:
   * - A new season of a favorited show premieres
   * - A new season is officially announced with a release date
   * - Renewal or cancellation news for favorited shows
   *
   * These notifications help users stay current with major developments
   * in their favorite series without overwhelming them with episode-level updates.
   *
   * @type {boolean}
   * @default true
   * @optional
   */
  newSeasonAlerts?: boolean;

  /**
   * Controls whether the user receives notifications for individual
   * new episodes of their favorited shows.
   *
   * Episode alerts are sent when:
   * - New episodes of favorited shows are available to watch
   * - Special episodes or movie-length episodes are released
   * - Season finales and premieres of followed shows
   *
   * This provides the most granular level of content notifications,
   * keeping users informed about every new piece of content from their favorite shows.
   *
   * @type {boolean}
   * @default true
   * @optional
   */
  newEpisodeAlerts?: boolean;
}

/**
 * Interface defining visual appearance and formatting preferences for the user interface.
 * Controls how content and dates are displayed throughout the application.
 *
 * Display preferences enhance user experience by allowing customization
 * of the interface to match user preferences and regional conventions.
 *
 * @interface DisplayPreferences
 * @example
 * ```typescript
 * // Dark theme with ISO date format
 * const darkModePrefs: DisplayPreferences = {
 *   theme: 'dark',
 *   dateFormat: 'YYYY-MM-DD'
 * };
 *
 * // Auto theme following system preferences
 * const systemPrefs: DisplayPreferences = {
 *   theme: 'auto',
 *   dateFormat: 'MM/DD/YYYY'
 * };
 *
 * // European-style preferences
 * const europeanPrefs: DisplayPreferences = {
 *   theme: 'light',
 *   dateFormat: 'DD/MM/YYYY'
 * };
 * ```
 */
export interface DisplayPreferences {
  /**
   * Controls the visual theme of the application interface.
   *
   * Theme options:
   * - `light`: Light theme with bright backgrounds and dark text
   * - `dark`: Dark theme with dark backgrounds and light text
   * - `auto`: Automatically follows the user's system theme preference
   *
   * The auto option provides seamless integration with the user's
   * operating system preferences and automatically switches between
   * light and dark modes based on system settings or time of day.
   *
   * @type {'light' | 'dark' | 'auto'}
   * @default 'auto'
   * @optional
   */
  theme?: 'light' | 'dark' | 'auto';

  /**
   * Controls how dates are formatted and displayed throughout the application.
   *
   * Supported date formats:
   * - `MM/DD/YYYY`: US format (e.g., "03/15/2024")
   * - `DD/MM/YYYY`: European format (e.g., "15/03/2024")
   * - `YYYY-MM-DD`: ISO format (e.g., "2024-03-15")
   *
   * This preference affects all date displays including:
   * - Release dates for movies and episodes
   * - Air dates for upcoming content
   * - User activity timestamps
   * - Content addition dates
   *
   * @type {'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'}
   * @default 'MM/DD/YYYY'
   * @optional
   */
  dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
}

/**
 * Interface defining privacy and data usage preferences for user accounts.
 * Controls how the application uses user data for personalization and analytics.
 *
 * Privacy preferences give users control over their data and how it's used
 * to enhance their experience, balancing personalization with privacy concerns.
 *
 * @interface PrivacyPreferences
 * @example
 * ```typescript
 * // Privacy-focused settings
 * const privateSettings: PrivacyPreferences = {
 *   allowRecommendations: false,
 *   dataCollection: false
 * };
 *
 * // Full personalization enabled
 * const personalizedSettings: PrivacyPreferences = {
 *   allowRecommendations: true,
 *   dataCollection: true
 * };
 *
 * // Recommendations only, no analytics
 * const recommendationsOnly: PrivacyPreferences = {
 *   allowRecommendations: true,
 *   dataCollection: false
 * };
 * ```
 */
export interface PrivacyPreferences {
  /**
   * Controls whether the application provides personalized content recommendations
   * based on user viewing history and preferences.
   *
   * When enabled, the recommendation system uses:
   * - Viewing history and watch progress
   * - Favorited shows and movies
   * - Rating patterns and preferences
   * - Genre and content type preferences
   *
   * Disabling this preference will show generic, popular content recommendations
   * instead of personalized suggestions, providing a more privacy-focused experience.
   *
   * @type {boolean}
   * @default true
   * @optional
   */
  allowRecommendations?: boolean;

  /**
   * Controls whether the application collects usage analytics and telemetry data
   * for improving features and user experience.
   *
   * When enabled, collected data may include:
   * - Feature usage patterns and click tracking
   * - Performance metrics and error reporting
   * - Content interaction patterns
   * - Search queries and filter usage
   *
   * All data collection follows privacy best practices and is used solely
   * for improving the application. Users can opt out while still receiving
   * full functionality and personalized recommendations.
   *
   * @type {boolean}
   * @default true
   * @optional
   */
  dataCollection?: boolean;
}

/**
 * System-wide default preferences applied to new user accounts.
 * These defaults are designed to provide an optimal out-of-box experience
 * while respecting user privacy and engagement preferences.
 *
 * Default values prioritize user engagement and personalization while
 * maintaining reasonable privacy settings. Users can modify any of these
 * preferences after account creation.
 *
 * @constant
 * @type {Record<PreferenceType, PreferenceData>}
 * @example
 * ```typescript
 * // Access default email preferences
 * const defaultEmail = DEFAULT_PREFERENCES.email;
 *
 * // Use defaults for new user initialization
 * function initializeUserPreferences(): AccountPreferences {
 *   return {
 *     email: { ...DEFAULT_PREFERENCES.email },
 *     notification: { ...DEFAULT_PREFERENCES.notification },
 *     display: { ...DEFAULT_PREFERENCES.display },
 *     privacy: { ...DEFAULT_PREFERENCES.privacy }
 *   };
 * }
 * ```
 */
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

/**
 * Union type representing any of the preference category data interfaces.
 * Used for type-safe handling of preference data across different categories
 * without requiring specific knowledge of which category is being processed.
 *
 * This type enables generic preference handling while maintaining type safety
 * through TypeScript's discriminated union capabilities.
 *
 * @type {PreferenceData}
 * @example
 * ```typescript
 * function processPreferences(data: PreferenceData): void {
 *   // TypeScript knows this could be any preference type
 *   // Additional type checking needed for specific operations
 * }
 *
 * function updateUserPreference(
 *   type: PreferenceType,
 *   data: PreferenceData
 * ): Promise<void> {
 *   // Generic preference update handler
 *   return preferenceService.update(type, data);
 * }
 * ```
 */
export type PreferenceData = EmailPreferences | NotificationPreferences | DisplayPreferences | PrivacyPreferences;

/**
 * Generic request interface for updating specific categories of user preferences.
 * Provides type-safe preference updates with compile-time validation of
 * preference type and data structure alignment.
 *
 * The generic constraint ensures that the preferences field matches the
 * expected type for the specified preference category, preventing runtime errors
 * from mismatched preference data.
 *
 * @interface UpdatePreferenceRequest
 * @template T - The specific preference data type extending PreferenceData
 * @example
 * ```typescript
 * // Type-safe email preference update
 * const emailUpdate: UpdatePreferenceRequest<EmailPreferences> = {
 *   preference_type: 'email',
 *   preferences: {
 *     weeklyDigest: false,
 *     marketingEmails: true
 *   }
 * };
 *
 * // Type-safe display preference update
 * const displayUpdate: UpdatePreferenceRequest<DisplayPreferences> = {
 *   preference_type: 'display',
 *   preferences: {
 *     theme: 'dark'
 *   }
 * };
 *
 * // Compile-time error prevention
 * const invalidUpdate: UpdatePreferenceRequest<EmailPreferences> = {
 *   preference_type: 'email',
 *   preferences: {
 *     theme: 'dark' // TypeScript error: not a valid EmailPreferences field
 *   }
 * };
 * ```
 */
export interface UpdatePreferenceRequest<T extends PreferenceData> {
  /**
   * The category of preference being updated.
   * Must correspond to the generic type parameter to ensure type safety.
   *
   * @type {PreferenceType}
   */
  preference_type: PreferenceType;

  /**
   * Partial preference data containing only the fields to be updated.
   * Uses Partial<T> to allow incremental updates without requiring
   * all preference fields to be specified.
   *
   * @type {Partial<T>}
   */
  preferences: Partial<T>;
}

/**
 * Interface representing a complete user's preference collection across all categories.
 * Aggregates all preference types into a single structure for comprehensive
 * preference management and API responses.
 *
 * All preference categories are optional to handle cases where users
 * haven't set specific preferences or when returning partial preference data.
 * Missing categories should be populated with default values at the service level.
 *
 * @interface AccountPreferences
 * @example
 * ```typescript
 * // Complete user preference set
 * const userPreferences: AccountPreferences = {
 *   email: {
 *     weeklyDigest: true,
 *     marketingEmails: false
 *   },
 *   notification: {
 *     newSeasonAlerts: true,
 *     newEpisodeAlerts: true
 *   },
 *   display: {
 *     theme: 'dark',
 *     dateFormat: 'YYYY-MM-DD'
 *   },
 *   privacy: {
 *     allowRecommendations: true,
 *     dataCollection: false
 *   }
 * };
 *
 * // Partial preferences (other categories use defaults)
 * const partialPreferences: AccountPreferences = {
 *   display: {
 *     theme: 'dark'
 *   }
 * };
 * ```
 */
export interface AccountPreferences {
  /**
   * Email communication preferences for the account.
   * Controls weekly digests and marketing email delivery.
   *
   * @type {EmailPreferences}
   * @optional
   */
  email?: EmailPreferences;

  /**
   * In-app and push notification preferences for content updates.
   * Controls alerts for new seasons and episodes.
   *
   * @type {NotificationPreferences}
   * @optional
   */
  notification?: NotificationPreferences;

  /**
   * Visual appearance and formatting preferences for the interface.
   * Controls theme selection and date formatting.
   *
   * @type {DisplayPreferences}
   * @optional
   */
  display?: DisplayPreferences;

  /**
   * Privacy and data usage preferences for personalization features.
   * Controls recommendations and analytics data collection.
   *
   * @type {PrivacyPreferences}
   * @optional
   */
  privacy?: PrivacyPreferences;
}

/**
 * API response interface for retrieving complete user preferences.
 * Extends BaseResponse to provide standardized API communication patterns
 * while including the complete preference collection.
 *
 * This response type is used for endpoints that return the full set of
 * user preferences, typically for initial preference loading or after
 * bulk preference updates.
 *
 * @interface AccountPreferencesResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: AccountPreferencesResponse = {
 *   message: "Preferences retrieved successfully",
 *   preferences: {
 *     email: { weeklyDigest: true, marketingEmails: false },
 *     notification: { newSeasonAlerts: true, newEpisodeAlerts: true },
 *     display: { theme: 'dark', dateFormat: 'YYYY-MM-DD' },
 *     privacy: { allowRecommendations: true, dataCollection: false }
 *   }
 * };
 *
 * // Response with partial preferences
 * const partialResponse: AccountPreferencesResponse = {
 *   message: "Display preferences updated successfully",
 *   preferences: {
 *     display: { theme: 'dark' }
 *   }
 * };
 * ```
 */
export interface AccountPreferencesResponse extends BaseResponse {
  /**
   * Complete or partial user preference collection.
   * May contain only specific preference categories depending on the API operation.
   *
   * @type {AccountPreferences}
   */
  preferences: AccountPreferences;
}

/**
 * API response interface for retrieving specific preference category data.
 * Extends BaseResponse to include only the requested preference category
 * data, enabling efficient partial preference operations.
 *
 * This response type is used for endpoints that operate on individual
 * preference categories, such as updating only email preferences or
 * retrieving only display settings.
 *
 * @interface AccountPreferenceDataResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * // Response for email preference retrieval
 * const emailResponse: AccountPreferenceDataResponse = {
 *   message: "Email preferences retrieved successfully",
 *   preferences: {
 *     weeklyDigest: true,
 *     marketingEmails: false
 *   }
 * };
 *
 * // Response for display preference update
 * const displayResponse: AccountPreferenceDataResponse = {
 *   message: "Display preferences updated successfully",
 *   preferences: {
 *     theme: 'dark',
 *     dateFormat: 'YYYY-MM-DD'
 *   }
 * };
 * ```
 */
export interface AccountPreferenceDataResponse extends BaseResponse {
  /**
   * Specific preference category data returned by the API.
   * The type will be one of the preference interfaces depending on
   * which category was requested or updated.
   *
   * @type {PreferenceData}
   */
  preferences: PreferenceData;
}

/**
 * Type-safe mapping interface for preference updates by category.
 * Ensures that preference updates are properly typed according to their
 * category, preventing runtime errors from mismatched preference data.
 *
 * This interface is primarily used for internal type checking and
 * service layer implementations that need to handle multiple preference
 * types with compile-time safety guarantees.
 *
 * @interface TypedPreferenceUpdate
 * @example
 * ```typescript
 * // Type-safe preference update handling
 * class PreferenceService {
 *   async updateTypedPreferences(
 *     accountId: number,
 *     updates: Partial<TypedPreferenceUpdate>
 *   ): Promise<AccountPreferences> {
 *     const result: AccountPreferences = {};
 *
 *     if (updates.email) {
 *       result.email = await this.updateEmailPreferences(accountId, updates.email);
 *     }
 *
 *     if (updates.display) {
 *       result.display = await this.updateDisplayPreferences(accountId, updates.display);
 *     }
 *
 *     return result;
 *   }
 * }
 *
 * // Usage with type safety
 * const updates: Partial<TypedPreferenceUpdate> = {
 *   email: { weeklyDigest: false },
 *   display: { theme: 'dark' }
 * };
 * ```
 */
export interface TypedPreferenceUpdate {
  /**
   * Partial email preference updates.
   * Only specified fields will be updated, others remain unchanged.
   *
   * @type {Partial<EmailPreferences>}
   */
  email: Partial<EmailPreferences>;

  /**
   * Partial notification preference updates.
   * Only specified fields will be updated, others remain unchanged.
   *
   * @type {Partial<NotificationPreferences>}
   */
  notification: Partial<NotificationPreferences>;

  /**
   * Partial display preference updates.
   * Only specified fields will be updated, others remain unchanged.
   *
   * @type {Partial<DisplayPreferences>}
   */
  display: Partial<DisplayPreferences>;

  /**
   * Partial privacy preference updates.
   * Only specified fields will be updated, others remain unchanged.
   *
   * @type {Partial<PrivacyPreferences>}
   */
  privacy: Partial<PrivacyPreferences>;
}
