import { EpisodesForProfile } from './episodeTypes';
import { ProfileMovie, RecentUpcomingMoviesForProfile } from './movieTypes';
import { BaseResponse } from './responseTypes';
import { ProfileShow } from './showTypes';
import { WatchStatusType } from './watchStatusTypes';

/**
 * Represents a user profile within an account in the KeepWatching application.
 * Profiles allow multiple users within a single account to maintain separate
 * viewing preferences, watch histories, and content libraries.
 *
 * Each profile belongs to a specific account and maintains its own content
 * associations, watch statuses, and viewing progress independent of other
 * profiles in the same account.
 *
 * @interface Profile
 * @example
 * ```typescript
 * const profile: Profile = {
 *   id: 1,
 *   accountId: 5,
 *   name: "John's Profile",
 *   image: "https://example.com/john-avatar.jpg"
 * };
 *
 * // Profile without image
 * const minimalProfile: Profile = {
 *   id: 2,
 *   accountId: 5,
 *   name: "Guest Profile",
 *   image: undefined
 * };
 * ```
 */
export interface Profile {
  /** Unique identifier for the profile */
  id: number;

  /** ID of the parent account this profile belongs to */
  accountId: number;

  /** Display name of the profile */
  name: string;

  /** Optional URL to the profile's avatar image */
  image: string | undefined;
}

/**
 * Extended profile interface for administrative purposes that includes creation
 * metadata and content statistics. This interface provides administrators with
 * comprehensive insights into profile usage and content consumption patterns.
 *
 * The admin profile extends the base profile with additional fields for tracking
 * user engagement metrics and profile lifecycle management.
 *
 * @interface AdminProfile
 * @extends Profile
 * @example
 * ```typescript
 * const adminProfile: AdminProfile = {
 *   id: 1,
 *   accountId: 5,
 *   name: "John's Profile",
 *   image: "https://example.com/john-avatar.jpg",
 *   createdAt: "2023-01-15T10:30:00Z",
 *   favoritedShows: 25,
 *   favoritedMovies: 42
 * };
 * ```
 */
export interface AdminProfile extends Profile {
  /** ISO timestamp of when the profile was created */
  createdAt: string;

  /** Count of shows marked as favorites by this profile */
  favoritedShows: number;

  /** Count of movies marked as favorites by this profile */
  favoritedMovies: number;
}

/**
 * Request payload for creating a new profile within an account.
 * Contains the minimum required information to establish a new user profile
 * with the specified account association and display name.
 *
 * @interface CreateProfileRequest
 * @example
 * ```typescript
 * const createRequest: CreateProfileRequest = {
 *   accountId: 15,
 *   name: "Kids Profile"
 * };
 * ```
 */
export interface CreateProfileRequest {
  /** ID of the parent account to create the profile under */
  accountId: number;

  /** Display name for the new profile */
  name: string;
}

/**
 * Base interface for profile update operations.
 * Contains the profile ID that identifies which profile to modify.
 * This interface serves as the foundation for more specific update request types.
 *
 * @interface UpdateProfileRequest
 */
interface UpdateProfileRequest {
  /** ID of the profile to update */
  id: number;
}

/**
 * Request payload for updating a profile's display name.
 * Extends the base update request with the new name value.
 *
 * @interface UpdateProfileNameRequest
 * @extends UpdateProfileRequest
 * @example
 * ```typescript
 * const updateName: UpdateProfileNameRequest = {
 *   id: 123,
 *   name: "Updated Profile Name"
 * };
 * ```
 */
export interface UpdateProfileNameRequest extends UpdateProfileRequest {
  /** New display name for the profile */
  name: string;
}

/**
 * Request payload for updating a profile's avatar image.
 * Extends the base update request with the new image URL.
 *
 * @interface UpdateProfileImageRequest
 * @extends UpdateProfileRequest
 * @example
 * ```typescript
 * const updateImage: UpdateProfileImageRequest = {
 *   id: 123,
 *   image: "https://example.com/new-avatar.jpg"
 * };
 * ```
 */
export interface UpdateProfileImageRequest extends UpdateProfileRequest {
  /** New profile image URL */
  image: string | null;
}

/**
 * Represents the relationship between content and profiles, showing which profiles
 * have interacted with specific content and their associated watch status and timestamps.
 *
 * This interface is used to track content engagement across different profiles
 * and provides comprehensive metadata about content-profile associations.
 *
 * @interface ContentProfiles
 * @example
 * ```typescript
 * const contentProfile: ContentProfiles = {
 *   profileId: 123,
 *   name: "Sarah's Profile",
 *   image: "https://example.com/sarah-avatar.jpg",
 *   accountId: 45,
 *   accountName: "Smith Family",
 *   watchStatus: "WATCHING",
 *   addedDate: "2023-06-15T14:22:00Z",
 *   lastUpdated: "2023-12-01T09:45:00Z"
 * };
 * ```
 */
export interface ContentProfiles {
  /** ID of the profile associated with the content */
  profileId: number;

  /** Display name of the profile */
  name: string;

  /** Profile avatar image URL */
  image: string;

  /** ID of the account that owns the profile */
  accountId: number;

  /** Display name of the account that owns the profile */
  accountName: string;

  /** Current watch status of the content for this profile */
  watchStatus: WatchStatusType;

  /** ISO timestamp when the content was added to this profile */
  addedDate: string;

  /** ISO timestamp of the last status update for this content */
  lastUpdated: string;
}

/**
 * Detailed watch progress information for individual seasons within a show.
 * Used in administrative analytics and progress tracking to provide granular
 * insights into viewing patterns at the season level.
 *
 * @interface AdminSeasonWatchProgress
 * @example
 * ```typescript
 * const seasonProgress: AdminSeasonWatchProgress = {
 *   seasonId: 301,
 *   seasonNumber: 1,
 *   name: "Season 1",
 *   status: "WATCHING",
 *   episodeCount: 13,
 *   watchedEpisodes: 8,
 *   percentComplete: 61.5
 * };
 * ```
 */
export interface AdminSeasonWatchProgress {
  /** Unique identifier for the season */
  seasonId: number;

  /** Season number within the show (e.g., 1, 2, 3) */
  seasonNumber: number;

  /** Display name of the season */
  name: string;

  /** Overall watch status for the season (null if no episodes watched) */
  status: WatchStatusType | null;

  /** Total number of episodes in the season */
  episodeCount: number;

  /** Number of episodes watched in this season */
  watchedEpisodes: number;

  /** Completion percentage for this season (0-100) */
  percentComplete: number;
}

/**
 * Comprehensive watch progress aggregation for a profile across an entire show.
 * Includes season-level breakdowns and overall progress metrics for administrative
 * analytics and detailed progress tracking.
 *
 * This interface provides a complete view of how a specific profile has progressed
 * through a show, including individual season progress and overall completion metrics.
 *
 * @interface AdminProfileWatchProgress
 * @example
 * ```typescript
 * const profileProgress: AdminProfileWatchProgress = {
 *   profileId: 123,
 *   name: "Sarah's Profile",
 *   showStatus: "WATCHING",
 *   totalEpisodes: 62,
 *   watchedEpisodes: 45,
 *   percentComplete: 72.6,
 *   seasons: [
 *     {
 *       seasonId: 301,
 *       seasonNumber: 1,
 *       name: "Season 1",
 *       status: "WATCHED",
 *       episodeCount: 13,
 *       watchedEpisodes: 13,
 *       percentComplete: 100
 *     },
 *     {
 *       seasonId: 302,
 *       seasonNumber: 2,
 *       name: "Season 2",
 *       status: "WATCHING",
 *       episodeCount: 13,
 *       watchedEpisodes: 8,
 *       percentComplete: 61.5
 *     }
 *   ]
 * };
 * ```
 */
export interface AdminProfileWatchProgress {
  /** ID of the profile this progress data belongs to */
  profileId: number;

  /** Display name of the profile */
  name: string;

  /** Overall watch status for the entire show (null if no episodes watched) */
  showStatus: WatchStatusType | null;

  /** Total number of episodes across all seasons of the show */
  totalEpisodes: number;

  /** Total number of episodes watched across all seasons */
  watchedEpisodes: number;

  /** Overall completion percentage for the entire show (0-100) */
  percentComplete: number;

  /** Detailed progress breakdown for each season in the show */
  seasons: AdminSeasonWatchProgress[];
}

/**
 * Comprehensive profile interface that aggregates a profile with all associated
 * content including shows, episodes, and movies. This interface provides a complete
 * view of a profile's content library and viewing activity.
 *
 * Used for dashboard views, content management, and comprehensive profile displays
 * where all related content needs to be loaded together.
 *
 * @interface ProfileWithContent
 * @example
 * ```typescript
 * const profileWithContent: ProfileWithContent = {
 *   profile: {
 *     id: 1,
 *     accountId: 5,
 *     name: "John's Profile",
 *     image: "https://example.com/john-avatar.jpg"
 *   },
 *   shows: [
 *     {
 *       id: 101,
 *       title: "Breaking Bad",
 *       profileId: 1,
 *       watchStatus: "WATCHED",
 *       // ... other show properties
 *     }
 *   ],
 *   episodes: {
 *     recentEpisodes: [],
 *     upcomingEpisodes: [],
 *     nextUnwatchedEpisodes: []
 *   },
 *   movies: [
 *     {
 *       id: 201,
 *       title: "Inception",
 *       profileId: 1,
 *       watchStatus: "WATCHED",
 *       // ... other movie properties
 *     }
 *   ],
 *   recentUpcomingMovies: {
 *     recentMovies: [],
 *     upcomingMovies: []
 *   }
 * };
 * ```
 */
export interface ProfileWithContent {
  /** The base profile information */
  profile: Profile;

  /** Array of shows associated with this profile */
  shows: ProfileShow[];

  /** Episode collections (recent, upcoming, next unwatched) for this profile */
  episodes: EpisodesForProfile;

  /** Array of movies associated with this profile */
  movies: ProfileMovie[];

  /** Recent and upcoming movie collections for this profile */
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

/**
 * Type alias for arrays of profile watch progress data.
 * Commonly used in administrative analytics and reporting functions
 * where multiple profiles' progress needs to be analyzed together.
 *
 * @type AdminShowWatchProgressResult
 * @example
 * ```typescript
 * const showProgressData: AdminShowWatchProgressResult = [
 *   {
 *     profileId: 123,
 *     name: "Profile 1",
 *     showStatus: "WATCHING",
 *     totalEpisodes: 50,
 *     watchedEpisodes: 35,
 *     percentComplete: 70,
 *     seasons: []
 *   },
 *   {
 *     profileId: 124,
 *     name: "Profile 2",
 *     showStatus: "WATCHED",
 *     totalEpisodes: 50,
 *     watchedEpisodes: 50,
 *     percentComplete: 100,
 *     seasons: []
 *   }
 * ];
 * ```
 */
export type AdminShowWatchProgressResult = AdminProfileWatchProgress[];

/**
 * API response wrapper for single profile operations.
 * Extends BaseResponse to include profile data in a standardized response format.
 *
 * @interface ProfileResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: ProfileResponse = {
 *   message: "Profile retrieved successfully",
 *   profile: {
 *     id: 1,
 *     accountId: 5,
 *     name: "John's Profile",
 *     image: "https://example.com/john-avatar.jpg"
 *   }
 * };
 * ```
 */
export interface ProfileResponse extends BaseResponse {
  /** The profile data returned by the API */
  profile: Profile;
}

/**
 * API response wrapper for multiple profile operations.
 * Extends BaseResponse to include an array of profiles in a standardized response format.
 *
 * @interface ProfilesResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: ProfilesResponse = {
 *   message: "Profiles retrieved successfully",
 *   profiles: [
 *     {
 *       id: 1,
 *       accountId: 5,
 *       name: "John's Profile",
 *       image: "https://example.com/john-avatar.jpg"
 *     },
 *     {
 *       id: 2,
 *       accountId: 5,
 *       name: "Jane's Profile",
 *       image: "https://example.com/jane-avatar.jpg"
 *     }
 *   ]
 * };
 * ```
 */
export interface ProfilesResponse extends BaseResponse {
  /** Array of profiles returned by the API */
  profiles: Profile[];
}

/**
 * API response wrapper for profile content aggregation operations.
 * Extends BaseResponse to include comprehensive profile and content data
 * in a standardized response format.
 *
 * @interface ProfileContentResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: ProfileContentResponse = {
 *   message: "Profile content retrieved successfully",
 *   profileWithContent: {
 *     profile: {
 *       id: 1,
 *       accountId: 5,
 *       name: "John's Profile",
 *       image: "https://example.com/avatar.jpg"
 *     },
 *     shows: [],
 *     episodes: { recentEpisodes: [], upcomingEpisodes: [], nextUnwatchedEpisodes: [] },
 *     movies: [],
 *     recentUpcomingMovies: { recentMovies: [], upcomingMovies: [] }
 *   }
 * };
 * ```
 */
export interface ProfileContentResponse extends BaseResponse {
  /** Profile data with all associated content */
  profileWithContent: ProfileWithContent;
}
