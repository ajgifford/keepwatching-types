import { AdminEpisode, ProfileEpisode } from './episodeTypes';
import { WatchStatus } from './watchStatusTypes';

/**
 * Represents a TV show season in the KeepWatching application.
 * Contains essential metadata about a season including episode count, release information,
 * and visual assets. This interface serves as the foundation for season management
 * across the platform.
 *
 * Seasons are organizational units within TV shows that group episodes together
 * by production cycles, release periods, or narrative arcs. Each season belongs
 * to a parent show and contains a collection of episodes.
 *
 * @interface Season
 * @example
 * ```typescript
 * const season: Season = {
 *   id: 101,
 *   showId: 15,
 *   tmdbId: 3572,
 *   name: "Season 1",
 *   overview: "The first season introduces the main characters and sets up the central mystery...",
 *   seasonNumber: 1,
 *   releaseDate: "2008-01-20",
 *   posterImage: "https://example.com/season1-poster.jpg",
 *   numberOfEpisodes: 7
 * };
 * ```
 */
export interface Season {
  /** Unique identifier for the season */
  id: number;

  /** ID of the parent show this season belongs to */
  showId: number;

  /** The Movie Database (TMDB) identifier for external API integration */
  tmdbId: number;

  /** Display name of the season (e.g., "Season 1", "Final Season") */
  name: string;

  /** Synopsis or description of the season's content and themes */
  overview: string;

  /** Sequential number of the season within the show (starting from 1) */
  seasonNumber: number;

  /** Original release date in ISO format (YYYY-MM-DD) */
  releaseDate: string;

  /** URL to the season's poster image for display purposes */
  posterImage: string;

  /** Total number of episodes contained in this season */
  numberOfEpisodes: number;
}

/**
 * Extended season interface that includes user-specific viewing information and episode collections.
 * This represents how a season appears to a specific user profile, including their watch progress,
 * viewing status, and access to individual episode viewing states.
 *
 * ProfileSeason provides the complete viewing context for a season, enabling features like
 * progress tracking, next episode recommendations, and personalized season management.
 *
 * @interface ProfileSeason
 * @extends Season
 * @example
 * ```typescript
 * const profileSeason: ProfileSeason = {
 *   id: 101,
 *   showId: 15,
 *   tmdbId: 3572,
 *   name: "Season 1",
 *   overview: "The first season introduces the main characters...",
 *   seasonNumber: 1,
 *   releaseDate: "2008-01-20",
 *   posterImage: "https://example.com/season1-poster.jpg",
 *   numberOfEpisodes: 7,
 *   profileId: 42,
 *   watchStatus: WatchStatus.WATCHING,
 *   episodes: [
 *     {
 *       id: 1001,
 *       tmdbId: 349232,
 *       seasonId: 101,
 *       showId: 15,
 *       seasonNumber: 1,
 *       episodeNumber: 1,
 *       episodeType: "regular",
 *       title: "Pilot",
 *       overview: "The series begins with...",
 *       runtime: 47,
 *       airDate: "2008-01-20",
 *       stillImage: "https://example.com/episode1-still.jpg",
 *       profileId: 42,
 *       watchStatus: WatchStatus.WATCHED
 *     }
 *     // ... more episodes
 *   ]
 * };
 * ```
 */
export interface ProfileSeason extends Season {
  /** ID of the profile viewing this season */
  profileId: number;

  /**
   * Current watch status of the season for this profile.
   *
   * The season watch status is typically calculated based on the viewing progress
   * of individual episodes within the season:
   * - UNAIRED: The season has not aired
   * - NOT_WATCHED: No episodes have been watched
   * - WATCHING: Some episodes watched, but season not complete
   * - WATCHED: All episodes in the season have been watched (complete season)
   * - UP_TO_DATE: All available episodes watched (for ongoing seasons)
   *
   * Season status can also be set directly by the user to override automatic calculation.
   */
  watchStatus: WatchStatus;

  /**
   * Array of episodes in this season with profile-specific viewing states.
   *
   * Each episode includes the user's watch status, enabling detailed progress tracking
   * and the ability to resume watching from the correct episode. Episodes are typically
   * ordered by episode number for proper viewing sequence.
   *
   * The episodes array enables features like:
   * - Progress tracking across the season
   * - Next episode recommendations
   * - Season completion calculation
   * - Episode-level watch status management
   */
  episodes: ProfileEpisode[];
}

/**
 * Administrative season interface that extends the base season with metadata for content
 * management operations. Used by administrators and automated systems for season lifecycle
 * management, content synchronization, and audit trail maintenance.
 *
 * AdminSeason provides administrative context for season management including creation
 * and modification timestamps, supporting content management workflows and system auditing.
 *
 * @interface AdminSeason
 * @extends Season
 * @example
 * ```typescript
 * const adminSeason: AdminSeason = {
 *   id: 101,
 *   showId: 15,
 *   tmdbId: 3572,
 *   name: "Season 1",
 *   overview: "The first season introduces the main characters...",
 *   seasonNumber: 1,
 *   releaseDate: "2008-01-20",
 *   posterImage: "https://example.com/season1-poster.jpg",
 *   numberOfEpisodes: 7,
 *   createdAt: "2024-01-15T10:30:00Z",
 *   updatedAt: "2024-01-20T14:22:00Z"
 * };
 * ```
 */
export interface AdminSeason extends Season {
  /** ISO timestamp of when the season was first added to the system */
  createdAt: string;

  /** ISO timestamp of the last modification made to the season data */
  updatedAt: string;
}

/**
 * Extended administrative interface that includes the complete episode collection for
 * comprehensive season management. This interface provides administrators with full
 * visibility into season structure, episode organization, and content completeness.
 *
 * AdminSeasonWithEpisodes enables administrative operations that require complete
 * season context, such as content validation, bulk episode management, and
 * season integrity verification.
 *
 * @interface AdminSeasonWithEpisodes
 * @extends Season
 * @example
 * ```typescript
 * const adminSeasonWithEpisodes: AdminSeasonWithEpisodes = {
 *   id: 101,
 *   showId: 15,
 *   tmdbId: 3572,
 *   name: "Season 1",
 *   overview: "The first season introduces the main characters...",
 *   seasonNumber: 1,
 *   releaseDate: "2008-01-20",
 *   posterImage: "https://example.com/season1-poster.jpg",
 *   numberOfEpisodes: 7,
 *   episodes: [
 *     {
 *       id: 1001,
 *       tmdbId: 349232,
 *       seasonId: 101,
 *       showId: 15,
 *       seasonNumber: 1,
 *       episodeNumber: 1,
 *       episodeType: "regular",
 *       title: "Pilot",
 *       overview: "The series begins with...",
 *       runtime: 47,
 *       airDate: "2008-01-20",
 *       stillImage: "https://example.com/episode1-still.jpg",
 *       createdAt: "2024-01-15T10:30:00Z",
 *       updatedAt: "2024-01-15T10:30:00Z"
 *     }
 *     // ... more episodes with administrative metadata
 *   ]
 * };
 * ```
 */
export interface AdminSeasonWithEpisodes extends Season {
  /**
   * Array of episodes in this season with administrative metadata.
   *
   * Each episode includes creation and modification timestamps, enabling
   * comprehensive content management and audit trail maintenance. This
   * collection supports administrative operations such as:
   *
   * - Content validation and integrity checking
   * - Bulk episode management operations
   * - Season completion verification
   * - Episode sequence validation
   * - Content synchronization with external sources
   *
   * Episodes are typically ordered by episode number to maintain proper
   * viewing sequence and enable validation of episode numbering consistency.
   */
  episodes: AdminEpisode[];
}

/**
 * Request payload for creating new seasons in the content management system.
 * Uses snake_case field naming for database compatibility and includes all essential
 * season metadata required for content management operations.
 *
 * This interface supports integration with external content databases (like TMDB)
 * and provides all necessary information for establishing new seasons within shows.
 *
 * @interface CreateSeasonRequest
 * @example
 * ```typescript
 * const createSeasonRequest: CreateSeasonRequest = {
 *   show_id: 15,
 *   tmdb_id: 3572,
 *   name: "Season 2",
 *   overview: "The second season delves deeper into the mythology and introduces new characters who will change everything.",
 *   season_number: 2,
 *   release_date: "2009-01-11",
 *   poster_image: "https://example.com/season2-poster.jpg",
 *   number_of_episodes: 8
 * };
 * ```
 */
export interface CreateSeasonRequest {
  /** ID of the parent show this season belongs to */
  show_id: number;

  /** The Movie Database (TMDB) identifier for external API integration and content synchronization */
  tmdb_id: number;

  /** Display name of the season (e.g., "Season 2", "Final Season", "Special Episodes") */
  name: string;

  /** Synopsis or description of the season's content, themes, and narrative arc */
  overview: string;

  /** Sequential number of the season within the show (must be unique per show) */
  season_number: number;

  /** Original release date in ISO format (YYYY-MM-DD) for chronological organization */
  release_date: string;

  /** URL to the season's poster image for display in user interfaces */
  poster_image: string;

  /** Total number of episodes that will be contained in this season */
  number_of_episodes: number;
}

/**
 * Request payload for updating existing seasons in the content management system.
 * Extends the creation request structure to enable modification of any season field,
 * providing complete flexibility for season metadata management.
 *
 * All fields from the creation request can be updated, allowing for comprehensive
 * season maintenance including metadata corrections, episode count adjustments,
 * and poster image updates.
 *
 * @interface UpdateSeasonRequest
 * @extends CreateSeasonRequest
 * @example
 * ```typescript
 * const updateSeasonRequest: UpdateSeasonRequest = {
 *   show_id: 15,
 *   tmdb_id: 3572,
 *   name: "Season 2: The Reckoning",
 *   overview: "Updated description with more detail about the season's themes and character development.",
 *   season_number: 2,
 *   release_date: "2009-01-11",
 *   poster_image: "https://example.com/season2-updated-poster.jpg",
 *   number_of_episodes: 8
 * };
 * ```
 */
export interface UpdateSeasonRequest extends CreateSeasonRequest {}
