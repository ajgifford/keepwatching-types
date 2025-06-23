import { EpisodesForProfile, NextEpisode, ShowEpisode } from './episodeTypes';
import { BaseResponse } from './responseTypes';
import { ProfileSeason } from './seasonTypes';
import { WatchStatus } from './watchStatusTypes';

/**
 * Represents a TV show or series in the KeepWatching application with comprehensive metadata.
 * Contains all core information about a show including content details, production status,
 * and streaming availability.
 *
 * This interface serves as the foundation for show data across the application and includes
 * all metadata necessary for content management, discovery, and user interaction.
 *
 * @interface Show
 * @example
 * ```typescript
 * const show: Show = {
 *   id: 1,
 *   tmdbId: 1399,
 *   title: "Game of Thrones",
 *   description: "Seven noble families fight for control of the mythical land of Westeros...",
 *   releaseDate: "2011-04-17",
 *   posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   backdropImage: "https://image.tmdb.org/t/p/w1280/backdrop.jpg",
 *   userRating: 9.3,
 *   contentRating: "TV-MA",
 *   streamingServices: "HBO Max",
 *   genres: "Drama,Fantasy,Adventure",
 *   seasonCount: 8,
 *   episodeCount: 73,
 *   status: "Ended",
 *   type: "Scripted",
 *   inProduction: false,
 *   lastAirDate: "2019-05-19",
 *   network: "HBO"
 * };
 * ```
 */
export interface Show {
  /** Unique identifier for the show in the application database */
  id: number;

  /** The Movie Database (TMDB) identifier for external data synchronization and API integration */
  tmdbId: number;

  /** Display title of the show as it appears to users */
  title: string;

  /** Detailed description or synopsis of the show's premise and content */
  description: string;

  /**
   * Original air date or premiere date in ISO format (YYYY-MM-DD)
   *
   * Represents when the show first aired or became available to audiences.
   * Used for sorting, filtering, and displaying show information.
   */
  releaseDate: string;

  /**
   * URL to the show's poster image for display in lists and cards
   *
   * Typically a portrait-oriented image optimized for thumbnails and grid displays.
   * Should be a high-quality image URL, preferably from a CDN.
   */
  posterImage: string;

  /**
   * URL to the show's backdrop or banner image for hero sections
   *
   * Typically a landscape-oriented image used for prominent display areas
   * such as show detail headers and featured content sections.
   */
  backdropImage: string;

  /**
   * User rating score on a scale of 0-10
   *
   * Represents the average user rating or a curated quality score.
   * Used for recommendations, sorting, and quality indicators.
   */
  userRating: number;

  /**
   * Content rating indicating appropriate audience (TV-MA, TV-14, TV-PG, etc.)
   *
   * Standard television content ratings that help users determine
   * if content is appropriate for their viewing preferences.
   */
  contentRating: string;

  /**
   * Available streaming platforms where the show can be watched
   *
   * May be a comma-separated string or structured data indicating
   * which streaming services currently offer this content.
   */
  streamingServices: string;

  /**
   * Show genres as a comma-separated string or structured format
   *
   * Categories that help classify and recommend content.
   * Examples: "Drama,Fantasy,Adventure" or JSON array format.
   */
  genres: string;

  /** Total number of seasons in the show */
  seasonCount: number;

  /** Total number of episodes across all seasons */
  episodeCount: number;

  /**
   * Current production status of the show
   *
   * Common values: "Ended", "Continuing", "Canceled", "In Production", "Planned"
   * Indicates whether users can expect new content.
   */
  status: string;

  /**
   * Type or format of the show content
   *
   * Common values: "Scripted", "Documentary", "Reality", "News", "Talk Show", "Miniseries"
   * Helps categorize content for filtering and recommendations.
   */
  type: string;

  /**
   * Whether the show is currently in active production
   *
   * Boolean flag indicating if new episodes are being produced.
   * Used to determine if users can expect new content.
   */
  inProduction: boolean;

  /**
   * Date of the most recent episode air date (nullable)
   *
   * ISO format date string (YYYY-MM-DD) or null if no episodes have aired.
   * Used for determining recency and update status.
   */
  lastAirDate: string | null;

  /**
   * Original broadcasting network or platform (nullable)
   *
   * The primary network or service that originally aired the show.
   * May be null for shows without a clear original broadcaster.
   */
  network: string | null;
}

/**
 * Extended show interface that includes user-specific data and watch progress for a particular profile.
 * Combines show metadata with personalized viewing information to provide context-aware show data.
 *
 * This interface is used throughout the application when displaying shows in the context of
 * a specific user profile, including watch status, progress tracking, and episode navigation.
 *
 * @interface ProfileShow
 * @extends Show
 * @example
 * ```typescript
 * const profileShow: ProfileShow = {
 *   // All Show properties
 *   id: 1,
 *   tmdbId: 1399,
 *   title: "Game of Thrones",
 *   description: "Seven noble families fight for control...",
 *   releaseDate: "2011-04-17",
 *   posterImage: "https://image.tmdb.org/poster.jpg",
 *   backdropImage: "https://image.tmdb.org/backdrop.jpg",
 *   userRating: 9.3,
 *   contentRating: "TV-MA",
 *   streamingServices: "HBO Max",
 *   genres: "Drama,Fantasy,Adventure",
 *   seasonCount: 8,
 *   episodeCount: 73,
 *   status: "Ended",
 *   type: "Scripted",
 *   inProduction: false,
 *   lastAirDate: "2019-05-19",
 *   network: "HBO",
 *
 *   // Profile-specific properties
 *   profileId: 123,
 *   watchStatus: WatchStatus.WATCHING,
 *   lastEpisode: {
 *     title: "The Long Night",
 *     airDate: "2019-04-28",
 *     seasonNumber: 8,
 *     episodeNumber: 3
 *   },
 *   nextEpisode: {
 *     title: "The Last of the Starks",
 *     airDate: "2019-05-05",
 *     seasonNumber: 8,
 *     episodeNumber: 4
 *   }
 * };
 * ```
 */
export interface ProfileShow extends Show {
  /** ID of the profile this show data belongs to */
  profileId: number;

  /**
   * Current watch status for this profile
   *
   * Supports all watch statuses (UNAIRED, NOT_WATCHED, WATCHING, WATCHED, UP_TO_DATE)
   * since shows can have progressive viewing states based on episode progress.
   */
  watchStatus: WatchStatus;

  /**
   * Information about the most recently watched episode (nullable)
   *
   * Contains basic episode metadata to help users remember where they left off.
   * Null if no episodes have been watched yet.
   */
  lastEpisode: ShowEpisode | null;

  /**
   * Information about the next episode to watch (nullable)
   *
   * Provides episode details for keep watching functionality.
   * Null if all available episodes have been watched or no episodes exist.
   */
  nextEpisode: ShowEpisode | null;
}

/**
 * Enhanced version of ProfileShow that includes detailed season information with episodes.
 * This interface provides a complete hierarchical view of show structure and viewing progress.
 *
 * The seasons property is optional to allow for performance optimization - it can be included
 * when detailed season/episode information is needed or omitted for lightweight operations.
 *
 * @interface ProfileShowWithSeasons
 * @extends ProfileShow
 * @example
 * ```typescript
 * const showWithSeasons: ProfileShowWithSeasons = {
 *   // All ProfileShow properties
 *   id: 1,
 *   title: "Breaking Bad",
 *   profileId: 123,
 *   watchStatus: WatchStatus.WATCHING,
 *   // ... other ProfileShow properties
 *
 *   // Season details with episodes
 *   seasons: [
 *     {
 *       id: 1,
 *       showId: 1,
 *       seasonNumber: 1,
 *       name: "Season 1",
 *       profileId: 123,
 *       watchStatus: WatchStatus.WATCHED,
 *       episodes: [
 *         {
 *           id: 1,
 *           title: "Pilot",
 *           episodeNumber: 1,
 *           seasonNumber: 1,
 *           profileId: 123,
 *           watchStatus: WatchStatus.WATCHED
 *         }
 *       ]
 *     }
 *   ]
 * };
 * ```
 */
export interface ProfileShowWithSeasons extends ProfileShow {
  /**
   * Array of seasons with detailed episode information (optional)
   *
   * When included, provides complete season and episode data with watch status
   * for comprehensive show management. Can be omitted for performance when
   * only basic show information is needed.
   */
  seasons?: ProfileSeason[];
}

/**
 * Administrative interface for show management that extends the base Show with
 * metadata tracking for content management purposes.
 *
 * This interface is used in administrative contexts where tracking of content
 * updates and maintenance information is required.
 *
 * @interface AdminShow
 * @extends Show
 * @example
 * ```typescript
 * const adminShow: AdminShow = {
 *   // All Show properties
 *   id: 1,
 *   tmdbId: 1399,
 *   title: "Game of Thrones",
 *   // ... other Show properties
 *
 *   // Administrative metadata
 *   lastUpdated: "2024-01-15T10:30:00Z"
 * };
 * ```
 */
export interface AdminShow extends Show {
  /**
   * Timestamp of the last update to show metadata
   *
   * ISO format timestamp indicating when show information was last modified.
   * Used for content management, cache invalidation, and update tracking.
   */
  lastUpdated: string;
}

/**
 * Show reference that includes ID, TMDB ID, title and release date for external API operations
 * and content matching.
 *
 * @interface ShowReference
 * @example
 * ```typescript
 * const tmdbRef: ShowTMDBReference = {
 *   id: 1,
 *   tmdbId: 1399,
 *   title: "Game of Thrones"
 *   releaseDate: "2018-08-09"
 * };
 *
 * // Used for removed show references
 * const removedShowRef: ShowTMDBReference = {
 *   id: 15,
 *   tmdbId: 1396,
 *   title: "Breaking Bad"
 *   releaseDate: "2015-07-01"
 * };
 * ```
 */
export interface ShowReference {
  /** Unique identifier for the show */
  id: number;

  /** TMDB identifier for external API operations */
  tmdbId: number;

  /** Display title of the show */
  title: string;

  /** Release date of the show */
  releaseDate: string;
}

/**
 * Interface for keep watching functionality that tracks viewing progress
 * and provides next episodes to watch.
 *
 * This interface enables the "Keep Watching" feature by maintaining
 * viewing history and identifying upcoming episodes for users.
 *
 * @interface KeepWatchingShow
 * @example
 * ```typescript
 * const keepWatching: KeepWatchingShow = {
 *   showId: 1,
 *   showTitle: "Breaking Bad",
 *   posterImage: "https://image.tmdb.org/poster.jpg",
 *   lastWatched: "2024-01-15T20:30:00Z",
 *   episodes: [
 *     {
 *       episodeId: 15,
 *       episodeTitle: "Ozymandias",
 *       episodeNumber: 14,
 *       seasonNumber: 5,
 *       showId: 1,
 *       showName: "Breaking Bad",
 *       profileId: 123
 *     }
 *   ]
 * };
 * ```
 */
export interface KeepWatchingShow {
  /** ID of the show */
  showId: number;

  /** Title of the show for display purposes */
  showTitle: string;

  /** Show poster image URL for visual identification */
  posterImage: string;

  /**
   * Timestamp of last viewing activity
   *
   * ISO format timestamp indicating when the user last watched an episode
   * from this show. Used for sorting keep watching lists by recency.
   */
  lastWatched: string;

  /**
   * Array of next episodes to watch
   *
   * Contains upcoming unwatched episodes that the user can continue with.
   * Typically sorted by air date or episode order.
   */
  episodes: NextEpisode[];
}

/**
 * Interface for show recommendations and similar content suggestions.
 * Contains comprehensive metadata for evaluating and presenting content recommendations.
 *
 * This interface supports recommendation algorithms and helps users discover
 * new content based on their viewing preferences and history.
 *
 * @interface SimilarOrRecommendedShow
 * @example
 * ```typescript
 * const recommendation: SimilarOrRecommendedShow = {
 *   id: 2,
 *   title: "Better Call Saul",
 *   genres: ["Drama", "Crime"],
 *   premiered: "2015-02-08",
 *   summary: "The trials and tribulations of criminal lawyer Jimmy McGill...",
 *   image: "https://image.tmdb.org/poster.jpg",
 *   rating: 8.8,
 *   popularity: 85.5,
 *   country: "US",
 *   language: "en",
 *   inFavorites: false
 * };
 * ```
 */
export interface SimilarOrRecommendedShow {
  /** Show ID for reference and navigation */
  id: number;

  /** Show title for display */
  title: string;

  /**
   * Array of genre names associated with the show
   *
   * Used for genre-based filtering and similarity matching in recommendations.
   */
  genres: string[];

  /**
   * Premiere date in ISO format (YYYY-MM-DD)
   *
   * Used for sorting by recency and filtering by time periods.
   */
  premiered: string;

  /** Brief description or synopsis of the show */
  summary: string;

  /** Show image URL for visual display */
  image: string;

  /**
   * Show rating score (typically 0-10 scale)
   *
   * Used for quality-based recommendations and sorting.
   */
  rating: number;

  /**
   * Popularity score indicating audience engagement
   *
   * Higher values indicate more popular content. Used for trending
   * recommendations and popularity-based sorting.
   */
  popularity: number;

  /**
   * Country of origin (ISO country code or full name)
   *
   * Used for regional content filtering and localization preferences.
   */
  country: string;

  /**
   * Primary language (ISO language code)
   *
   * Used for language-based filtering and accessibility features.
   */
  language: string;

  /**
   * Whether this show is already in the user's favorites
   *
   * Helps avoid recommending content the user has already added
   * and provides context for recommendation displays.
   */
  inFavorites: boolean;
}

/**
 * Profile and account mapping for show access control and sharing features.
 * Links profiles to accounts for permission management and content sharing.
 *
 * @interface ProfileAccountMapping
 * @example
 * ```typescript
 * const mapping: ProfileAccountMapping = {
 *   profileId: 123,
 *   accountId: 456
 * };
 * ```
 */
export interface ProfileAccountMapping {
  /** ID of the profile */
  profileId: number;

  /** ID of the account that owns the profile */
  accountId: number;
}

/**
 * Response interface for show profile access queries that includes
 * profile-account relationships and count information.
 *
 * Used for administrative features and access control management.
 *
 * @interface ProfilesForShowResponse
 * @example
 * ```typescript
 * const response: ProfilesForShowResponse = {
 *   showId: 1,
 *   profileAccountMappings: [
 *     { profileId: 123, accountId: 456 },
 *     { profileId: 124, accountId: 789 }
 *   ],
 *   totalCount: 2
 * };
 * ```
 */
export interface ProfilesForShowResponse {
  /** ID of the show being queried */
  showId: number;

  /** Array of profile-account relationships for this show */
  profileAccountMappings: ProfileAccountMapping[];

  /** Total count of profiles with access to this show */
  totalCount: number;
}

/**
 * Comprehensive payload for creating new shows in the system.
 * Uses underscore_case naming convention for database compatibility.
 *
 * This interface includes all necessary metadata for complete show creation
 * including relationships to genres and streaming services.
 *
 * @interface CreateShowRequest
 * @example
 * ```typescript
 * const createRequest: CreateShowRequest = {
 *   tmdb_id: 1399,
 *   title: "Game of Thrones",
 *   description: "Seven noble families fight for control of the mythical land of Westeros...",
 *   release_date: "2011-04-17",
 *   poster_image: "https://image.tmdb.org/poster.jpg",
 *   backdrop_image: "https://image.tmdb.org/backdrop.jpg",
 *   user_rating: 9.3,
 *   content_rating: "TV-MA",
 *   season_count: 8,
 *   episode_count: 73,
 *   status: "Ended",
 *   type: "Scripted",
 *   in_production: 0,
 *   last_air_date: "2019-05-19",
 *   last_episode_to_air: 73,
 *   next_episode_to_air: null,
 *   network: "HBO",
 *   streaming_service_ids: [1, 2],
 *   genre_ids: [18, 10765]
 * };
 * ```
 */
export interface CreateShowRequest {
  /** TMDB identifier for external API integration */
  tmdb_id: number;

  /** Show title */
  title: string;

  /** Show description or synopsis */
  description: string;

  /** Release date in ISO format (YYYY-MM-DD) */
  release_date: string;

  /** Poster image URL */
  poster_image: string;

  /** Backdrop image URL */
  backdrop_image: string;

  /** User rating score (0-10) */
  user_rating: number;

  /** Content rating (TV-MA, TV-14, etc.) */
  content_rating: string;

  /** Number of seasons */
  season_count: number;

  /** Total number of episodes */
  episode_count: number;

  /** Production status */
  status: string;

  /** Show type (Scripted, Documentary, etc.) */
  type: string;

  /**
   * Production flag (0 or 1 for database compatibility)
   *
   * Use 1 for true (in production) or 0 for false (not in production).
   * This numeric format is required for certain database systems.
   */
  in_production: 0 | 1;

  /** Last air date in ISO format */
  last_air_date: string;

  /**
   * ID of the last episode that aired (nullable)
   *
   * References the episode ID of the most recently aired episode.
   * Null if no episodes have aired yet.
   */
  last_episode_to_air: number | null;

  /**
   * ID of the next episode to air (nullable)
   *
   * References the episode ID of the upcoming episode.
   * Null if no future episodes are scheduled.
   */
  next_episode_to_air: number | null;

  /** Original broadcasting network (nullable) */
  network: string | null;

  /**
   * Array of streaming service IDs where the show is available
   *
   * References to streaming service entities for relationship management.
   * Used to track availability across platforms.
   */
  streaming_service_ids: number[];

  /**
   * Array of genre IDs associated with the show
   *
   * References to genre entities for categorization and recommendations.
   * Used for content discovery and filtering.
   */
  genre_ids: number[];
}

/**
 * Request payload for updating existing shows that extends CreateShowRequest with an ID field.
 * Allows modification of all show properties while maintaining referential integrity.
 *
 * @interface UpdateShowRequest
 * @extends CreateShowRequest
 * @example
 * ```typescript
 * const updateRequest: UpdateShowRequest = {
 *   id: 1,
 *   // All CreateShowRequest fields can be updated
 *   tmdb_id: 1399,
 *   title: "Game of Thrones (Updated)",
 *   status: "Continuing",
 *   in_production: 1,
 *   // ... other fields
 * };
 * ```
 */
export interface UpdateShowRequest extends CreateShowRequest {
  /** ID of the show to update */
  id: number;
}

export interface UpdateWatchStatusData {
  /** Updated show with seasons */
  show: ProfileShowWithSeasons;
  /** Updated keep watching shows after status change */
  nextUnwatchedEpisodes: KeepWatchingShow[];
}

/**
 * Response type for adding shows to favorites that includes the added show
 * and updated episode information for the profile.
 *
 * Provides comprehensive data about the favorite addition operation
 * including updated keep watching information.
 *
 * @interface AddShowFavorite
 * @example
 * ```typescript
 * const addResult: AddShowFavorite = {
 *   favoritedShow: {
 *     id: 1,
 *     title: "Breaking Bad",
 *     profileId: 123,
 *     seasons: [
 *       {
 *         id: 1,
 *         seasonNumber: 1,
 *         episodes: []
 *       }
 *     ]
 *     // ... other ProfileShowWithSeasons properties
 *   }
 * };
 * ```
 */
export interface AddShowFavorite {
  /** The show that was successfully added to the user's favorites with profile-specific viewing data */
  favoritedShow: ProfileShow;

  /**
   * Updated episode information for the profile after adding the show (optional)
   *
   * May be included to provide immediate updates to keep watching lists,
   * recent episodes, and upcoming episodes after adding a show to favorites.
   * This helps maintain UI consistency without requiring additional API calls.
   */
  episodes?: EpisodesForProfile;
}

/**
 * Response type for removing shows from favorites that includes show reference
 * and updated episode information for the profile.
 *
 * Provides minimal show reference since the full show data is no longer needed
 * after removal, along with updated episode collections to maintain UI consistency.
 *
 * @interface RemoveShowFavorite
 * @example
 * ```typescript
 * const removeResult: RemoveShowFavorite = {
 *   removedShow: {
 *     id: 1,
 *     tmdbId: 1399,
 *     title: "Breaking Bad"
 *   },
 *   episodes: {
 *     recentEpisodes: [],
 *     upcomingEpisodes: [],
 *     nextUnwatchedEpisodes: []
 *   }
 * };
 * ```
 */
export interface RemoveShowFavorite {
  /** Reference to the show that was removed from favorites */
  removedShow: ShowReference;

  /** Updated episode information after show removal */
  episodes: EpisodesForProfile;
}

/**
 * API response wrapper for operations returning multiple shows.
 * Extends BaseResponse to include an array of profile shows in a standardized format.
 *
 * @interface ShowsResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: ShowsResponse = {
 *   message: "Shows retrieved successfully",
 *   shows: [
 *     {
 *       id: 1,
 *       title: "Breaking Bad",
 *       profileId: 123,
 *       watchStatus: WatchStatus.WATCHING
 *       // ... other ProfileShow properties
 *     }
 *   ]
 * };
 * ```
 */
export interface ShowsResponse extends BaseResponse {
  /** Array of shows returned by the API */
  shows: ProfileShow[];
}

/**
 * API response wrapper for detailed show information including seasons and episodes.
 * Extends BaseResponse to include comprehensive show data with complete season/episode hierarchy.
 *
 * @interface ShowDetailsResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: ShowDetailsResponse = {
 *   message: "Show details retrieved successfully",
 *   show: {
 *     id: 1,
 *     title: "Breaking Bad",
 *     profileId: 123,
 *     watchStatus: WatchStatus.WATCHING,
 *     seasons: [
 *       {
 *         id: 1,
 *         seasonNumber: 1,
 *         episodes: []
 *       }
 *     ]
 *     // ... other ProfileShowWithSeasons properties
 *   }
 * };
 * ```
 */
export interface ShowDetailsResponse extends BaseResponse {
  /** Detailed show information with seasons and episodes */
  show: ProfileShowWithSeasons;
}

/**
 * API response for watch status updates that includes updated keep watching information.
 * Provides immediate feedback about status changes and their impact on viewing progress.
 *
 * @interface UpdateWatchStatusResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: UpdateWatchStatusResponse = {
 *   message: "Watch status updated successfully",
 *   nextUnwatchedEpisodes: [
 *     {
 *       showId: 1,
 *       showTitle: "Breaking Bad",
 *       posterImage: "poster.jpg",
 *       lastWatched: "2024-01-15T20:30:00Z",
 *       episodes: []
 *     }
 *   ]
 * };
 * ```
 */
export interface UpdateWatchStatusResponse extends BaseResponse {
  /** Updated data after changing the watch status */
  data: UpdateWatchStatusData;
}

/**
 * API response wrapper for episode-related operations in the context of shows.
 * Provides updated episode information after show operations.
 *
 * @interface EpisodesForProfileResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: EpisodesForProfileResponse = {
 *   message: "Episodes retrieved successfully",
 *   episodes: {
 *     recentEpisodes: [],
 *     upcomingEpisodes: [],
 *     nextUnwatchedEpisodes: []
 *   }
 * };
 * ```
 */
export interface EpisodesForProfileResponse extends BaseResponse {
  /** Episode information organized by category (recent, upcoming, next unwatched) */
  episodes: EpisodesForProfile;
}

/**
 * API response for adding shows to favorites that includes the added show
 * and optionally updated episode information.
 *
 * @interface AddShowFavoriteResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: AddShowFavoriteResponse = {
 *   message: "Show added to favorites successfully",
 *   addedShow: {
 *     id: 1,
 *     title: "Breaking Bad",
 *     profileId: 123,
 *     watchStatus: WatchStatus.NOT_WATCHED
 *   },
 *   episodes: {
 *     recentEpisodes: [],
 *     upcomingEpisodes: [],
 *     nextUnwatchedEpisodes: []
 *   }
 * };
 * ```
 */
export interface AddShowFavoriteResponse extends BaseResponse {
  /** The show that was added to favorites */
  addedShow: ProfileShow;

  /**
   * Updated episode information for the profile (optional)
   *
   * May be included to provide immediate updates to keep watching
   * and episode tracking after adding a show to favorites.
   */
  episodes?: EpisodesForProfile;
}

/**
 * API response for removing shows from favorites that includes show reference
 * and updated episode information.
 *
 * @interface RemoveShowFavoriteResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: RemoveShowFavoriteResponse = {
 *   message: "Show removed from favorites successfully",
 *   removedShowReference: {
 *     id: 1,
 *     tmdbId: 1399,
 *     title: "Breaking Bad"
 *   },
 *   episodes: {
 *     recentEpisodes: [],
 *     upcomingEpisodes: [],
 *     nextUnwatchedEpisodes: []
 *   }
 * };
 * ```
 */
export interface RemoveShowFavoriteResponse extends BaseResponse {
  /** Reference to the show that was removed from favorites */
  removedShowReference: ShowReference;

  /** Updated episode information after show removal */
  episodes: EpisodesForProfile;
}

/**
 * API response wrapper for show recommendations and similar content operations.
 * Extends BaseResponse to include an array of recommended shows with metadata
 * for content discovery and recommendation features.
 *
 * @interface SimilarOrRecommendedShowsResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const response: SimilarOrRecommendedShowsResponse = {
 *   message: "Similar shows retrieved successfully",
 *   shows: [
 *     {
 *       id: 2,
 *       title: "Better Call Saul",
 *       genres: ["Drama", "Crime"],
 *       premiered: "2015-02-08",
 *       summary: "The trials and tribulations of criminal lawyer Jimmy McGill...",
 *       image: "https://image.tmdb.org/poster.jpg",
 *       rating: 8.8,
 *       popularity: 85.5,
 *       country: "US",
 *       language: "en",
 *       inFavorites: false
 *     }
 *   ]
 * };
 * ```
 */
export interface SimilarOrRecommendedShowsResponse extends BaseResponse {
  /** Array of recommended or similar shows */
  shows: SimilarOrRecommendedShow[];
}
