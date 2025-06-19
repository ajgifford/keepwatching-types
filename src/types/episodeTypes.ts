import { KeepWatchingShow } from './showTypes';
import { WatchStatus } from './watchStatusTypes';

/**
 * Represents an individual episode in the KeepWatching application with complete metadata
 * and identification information. This interface serves as the foundation for all episode-related
 * operations and provides comprehensive episode details including external database references,
 * content metadata, and scheduling information.
 *
 * Episodes are discrete content units within TV shows and series, containing all necessary
 * information for content management, user experience, and external data synchronization.
 *
 * @interface Episode
 * @example
 * ```typescript
 * const episode: Episode = {
 *   id: 1001,
 *   tmdbId: 62085,
 *   seasonId: 101,
 *   showId: 10,
 *   seasonNumber: 1,
 *   episodeNumber: 1,
 *   episodeType: "regular",
 *   title: "Pilot",
 *   overview: "A high school chemistry teacher turned methamphetamine manufacturer...",
 *   runtime: 58,
 *   airDate: "2008-01-20",
 *   stillImage: "https://image.tmdb.org/t/p/w500/pilot-still.jpg"
 * };
 * ```
 */
export interface Episode {
  /** Unique identifier for the episode in the application database */
  id: number;

  /** The Movie Database (TMDB) identifier for external data synchronization and updates */
  tmdbId: number;

  /** ID of the season this episode belongs to, establishing hierarchical content structure */
  seasonId: number;

  /** ID of the show this episode belongs to for direct show-level episode access */
  showId: number;

  /** Season number within the show (1-based indexing for user-friendly display) */
  seasonNumber: number;

  /** Episode number within the season (1-based indexing for user-friendly display) */
  episodeNumber: number;

  /**
   * Type classification of the episode for categorization and special handling.
   *
   * Common episode types include:
   * - "regular" - Standard episode in the series
   * - "special" - Special episode or bonus content
   * - "finale" - Season or series finale
   * - "premiere" - Season or series premiere
   * - "recap" - Recap or summary episode
   *
   * This field enables different UI treatment and filtering options for various episode types.
   */
  episodeType: string;

  /** Episode title or name as provided by the content source */
  title: string;

  /** Episode synopsis, description, or summary for user preview and content discovery */
  overview: string;

  /** Episode duration in minutes for scheduling and user time planning */
  runtime: number;

  /**
   * Original air date in ISO format (YYYY-MM-DD) for chronological sorting and scheduling.
   *
   * This date represents when the episode first aired or was released, used for:
   * - Timeline displays and sorting
   * - Recent/upcoming episode calculations
   * - User notification scheduling
   * - Content availability tracking
   */
  airDate: string;

  /**
   * URL to episode still image or screenshot for visual content identification.
   *
   * Typically sourced from TMDB or other content databases, these images provide
   * visual context for episodes in user interfaces and help users identify content.
   */
  stillImage: string;
}

/**
 * Extended episode interface that includes user-specific viewing information and watch status
 * for a particular profile. This represents an episode as seen from a specific user's perspective,
 * combining the core episode metadata with personalized viewing state and progress tracking.
 *
 * Profile episodes enable individualized tracking of viewing progress across different users
 * within the same account, maintaining separate watch histories and enabling personalized
 * recommendations and keep-watching functionality.
 *
 * @interface ProfileEpisode
 * @extends Episode
 * @example
 * ```typescript
 * const profileEpisode: ProfileEpisode = {
 *   id: 1001,
 *   tmdbId: 62085,
 *   seasonId: 101,
 *   showId: 10,
 *   seasonNumber: 1,
 *   episodeNumber: 1,
 *   episodeType: "regular",
 *   title: "Pilot",
 *   overview: "A high school chemistry teacher turned methamphetamine manufacturer...",
 *   runtime: 58,
 *   airDate: "2008-01-20",
 *   stillImage: "https://image.tmdb.org/t/p/w500/pilot-still.jpg",
 *   profileId: 5,
 *   watchStatus: "WATCHED"
 * };
 * ```
 */
export interface ProfileEpisode extends Episode {
  /** ID of the profile viewing this episode for user-specific state management */
  profileId: number;

  /**
   * Watch status for this episode from the perspective of the specified profile.
   *
   * Episodes use binary watch status, supporting only two states:
   * - "NOT_WATCHED" - Episode has not been viewed by this profile
   * - "WATCHED" - Episode has been completely viewed by this profile
   *
   * Episodes do not support partial viewing states like "WATCHING" or "UP_TO_DATE"
   * as they represent discrete content that is either watched or not watched.
   * This binary approach simplifies progress tracking and enables accurate
   * season and show completion calculations.
   */
  watchStatus: WatchStatus;
}

/**
 * Administrative episode interface that extends the base episode with system metadata
 * for content management, auditing, and administrative operations. This interface provides
 * administrators with complete episode information including creation and modification timestamps.
 *
 * Admin episodes are used in content management workflows, data synchronization processes,
 * and administrative dashboards where full episode lifecycle information is required.
 *
 * @interface AdminEpisode
 * @extends Episode
 * @example
 * ```typescript
 * const adminEpisode: AdminEpisode = {
 *   id: 1001,
 *   tmdbId: 62085,
 *   seasonId: 101,
 *   showId: 10,
 *   seasonNumber: 1,
 *   episodeNumber: 1,
 *   episodeType: "regular",
 *   title: "Pilot",
 *   overview: "A high school chemistry teacher turned methamphetamine manufacturer...",
 *   runtime: 58,
 *   airDate: "2008-01-20",
 *   stillImage: "https://image.tmdb.org/t/p/w500/pilot-still.jpg",
 *   createdAt: "2024-01-15T10:30:00Z",
 *   updatedAt: "2024-01-15T10:30:00Z"
 * };
 * ```
 */
export interface AdminEpisode extends Episode {
  /** ISO timestamp of when the episode was initially added to the system for audit tracking */
  createdAt: string;

  /** ISO timestamp of the last modification to the episode data for change tracking */
  updatedAt: string;
}

/**
 * Comprehensive interface for episodes that users should watch next, providing all necessary
 * information for the "keep watching" experience. This interface combines episode metadata
 * with show context and streaming information to create rich next-episode recommendations.
 *
 * NextEpisode interfaces are used in personalized dashboards to help users seamlessly continue
 * their viewing journey across different shows and seasons.
 *
 * @interface NextEpisode
 * @example
 * ```typescript
 * const nextEpisode: NextEpisode = {
 *   episodeId: 1002,
 *   episodeTitle: "Cat's in the Bag...",
 *   overview: "Walt and Jesse face the aftermath of their first cook...",
 *   episodeNumber: 2,
 *   seasonNumber: 1,
 *   episodeStillImage: "https://image.tmdb.org/t/p/w500/episode2-still.jpg",
 *   airDate: "2008-01-27",
 *   showId: 10,
 *   showName: "Breaking Bad",
 *   seasonId: 101,
 *   posterImage: "https://image.tmdb.org/t/p/w500/breaking-bad-poster.jpg",
 *   network: "AMC",
 *   streamingServices: "Netflix, Amazon Prime",
 *   profileId: 5
 * };
 * ```
 */
export interface NextEpisode {
  /** Unique identifier for the episode */
  episodeId: number;

  /** Title of the episode for display in keep-watching interfaces */
  episodeTitle: string;

  /** Episode description or synopsis for user preview */
  overview: string;

  /** Episode number within the season for context and navigation */
  episodeNumber: number;

  /** Season number within the show for hierarchical context */
  seasonNumber: number;

  /** URL to episode still image for visual identification */
  episodeStillImage: string;

  /** Original air date for chronological context and sorting */
  airDate: string;

  /** Parent show identifier for navigation and grouping */
  showId: number;

  /** Show title for context when displaying episode recommendations */
  showName: string;

  /** Parent season identifier for season-level navigation */
  seasonId: number;

  /** Show poster image for visual context in keep-watching displays */
  posterImage: string;

  /** Broadcasting network or original platform for content attribution */
  network: string;

  /** Available streaming services for user access information */
  streamingServices: string;

  /** Profile ID this next episode recommendation applies to */
  profileId: number;
}

/**
 * Interface for episodes in recent/upcoming episode lists, optimized for timeline displays
 * and notification systems. This streamlined interface focuses on the essential information
 * needed for chronological episode lists and user notifications about new content.
 *
 * Recent/upcoming episodes are used in dashboard timelines, notification emails,
 * and mobile app push notifications to keep users informed about new episodes
 * from their followed shows.
 *
 * @interface RecentUpcomingEpisode
 * @example
 * ```typescript
 * const recentEpisode: RecentUpcomingEpisode = {
 *   profileId: 5,
 *   showId: 10,
 *   showName: "Breaking Bad",
 *   streamingServices: "Netflix, Amazon Prime",
 *   network: "AMC",
 *   episodeTitle: "...and the Bag's in the River",
 *   airDate: "2008-02-10",
 *   episodeNumber: 3,
 *   seasonNumber: 1,
 *   episodeStillImage: "https://image.tmdb.org/t/p/w500/episode3-still.jpg"
 * };
 * ```
 */
export interface RecentUpcomingEpisode {
  /** Profile identifier for user-specific episode relevance */
  profileId: number;

  /** Show identifier for grouping and navigation */
  showId: number;

  /** Show title for context in episode lists */
  showName: string;

  /** Available streaming platforms for user access planning */
  streamingServices: string;

  /** Broadcasting network for content attribution */
  network: string;

  /** Episode title for identification and display */
  episodeTitle: string;

  /** Air date for chronological sorting and timeline displays */
  airDate: string;

  /** Episode number for sequential context */
  episodeNumber: number;

  /** Season number for hierarchical context */
  seasonNumber: number;

  /** Episode still image for visual identification in lists */
  episodeStillImage: string;
}

/**
 * Simplified episode interface for show-level episode listings and metadata display.
 * This lightweight interface provides essential episode information for show pages,
 * season overviews, and basic episode browsing without user-specific data.
 *
 * Show episodes are used in public content pages, guest browsing experiences,
 * and content management interfaces where only core episode metadata is needed.
 *
 * @interface ShowEpisode
 * @example
 * ```typescript
 * const showEpisode: ShowEpisode = {
 *   title: "Pilot",
 *   airDate: "2008-01-20",
 *   seasonNumber: 1,
 *   episodeNumber: 1
 * };
 * ```
 */
export interface ShowEpisode {
  /** Episode title for display and identification */
  title: string;

  /** Original air date for chronological information */
  airDate: string;

  /** Season number for hierarchical organization */
  seasonNumber: number;

  /** Episode number for sequential organization */
  episodeNumber: number;
}

/**
 * Request payload for creating new episodes in the system. This interface defines
 * the structure for episode creation API requests, using snake_case field names
 * for database compatibility and including all necessary episode metadata.
 *
 * Episode creation requests are typically used in administrative interfaces,
 * data import processes, and content synchronization workflows to add new
 * episodes to the application database.
 *
 * @interface CreateEpisodeRequest
 * @example
 * ```typescript
 * const createRequest: CreateEpisodeRequest = {
 *   tmdb_id: 62085,
 *   show_id: 10,
 *   season_id: 101,
 *   season_number: 1,
 *   episode_number: 1,
 *   episode_type: "regular",
 *   title: "Pilot",
 *   overview: "A high school chemistry teacher turned methamphetamine manufacturer...",
 *   air_date: "2008-01-20",
 *   runtime: 58,
 *   still_image: "https://image.tmdb.org/t/p/w500/pilot-still.jpg"
 * };
 * ```
 */
export interface CreateEpisodeRequest {
  /** TMDB identifier for external data synchronization */
  tmdb_id: number;

  /** Parent show identifier */
  show_id: number;

  /** Parent season identifier */
  season_id: number;

  /** Season number within the show */
  season_number: number;

  /** Episode number within the season */
  episode_number: number;

  /** Episode type classification (regular, special, finale, etc.) */
  episode_type: string;

  /** Episode title or name */
  title: string;

  /** Episode description or synopsis */
  overview: string;

  /** Original air date in ISO format (YYYY-MM-DD) */
  air_date: string;

  /** Episode duration in minutes */
  runtime: number;

  /** URL to episode still image */
  still_image: string;
}

/**
 * Comprehensive episode collection interface for a user profile, organizing episodes
 * by viewing relevance and timeline. This interface provides a complete view of
 * episode-related content for a user, including recent activity, upcoming releases,
 * and personalized keep-watching recommendations.
 *
 * Episodes for profile collections can be used in user dashboards, mobile app home screens,
 * and personalized content recommendation systems to provide users with relevant
 * episode information tailored to their viewing habits and preferences.
 *
 * @interface EpisodesForProfile
 * @example
 * ```typescript
 * const episodesForProfile: EpisodesForProfile = {
 *   recentEpisodes: [
 *     {
 *       profileId: 5,
 *       showId: 10,
 *       showName: "Breaking Bad",
 *       streamingServices: "Netflix",
 *       network: "AMC",
 *       episodeTitle: "Pilot",
 *       airDate: "2008-01-20",
 *       episodeNumber: 1,
 *       seasonNumber: 1,
 *       episodeStillImage: "https://image.tmdb.org/t/p/w500/pilot-still.jpg"
 *     }
 *   ],
 *   upcomingEpisodes: [
 *     {
 *       profileId: 5,
 *       showId: 15,
 *       showName: "The Mandalorian",
 *       streamingServices: "Disney+",
 *       network: "Disney+",
 *       episodeTitle: "Chapter 1: The Mandalorian",
 *       airDate: "2024-02-15",
 *       episodeNumber: 1,
 *       seasonNumber: 4,
 *       episodeStillImage: "https://image.tmdb.org/t/p/w500/mando-s4e1.jpg"
 *     }
 *   ],
 *   nextUnwatchedEpisodes: [
 *     {
 *       showId: 10,
 *       showTitle: "Breaking Bad",
 *       posterImage: "https://image.tmdb.org/t/p/w500/breaking-bad-poster.jpg",
 *       lastWatched: "2024-01-15T20:30:00Z",
 *       episodes: []
 *     }
 *   ]
 * };
 * ```
 */
export interface EpisodesForProfile {
  /**
   * Recently aired episodes from shows in the user's library.
   *
   * These episodes typically aired within the last 7-14 days and are from shows
   * that the user has marked as favorites or is currently watching. This helps
   * users stay current with their ongoing series.
   */
  recentEpisodes: RecentUpcomingEpisode[];

  /**
   * Episodes that will air soon from shows in the user's library.
   *
   * These episodes are scheduled to air within the next 7-14 days from shows
   * that the user follows. This enables users to plan their viewing schedule
   * and be notified about new content releases.
   */
  upcomingEpisodes: RecentUpcomingEpisode[];

  /**
   * Next unwatched episodes organized by show for keep-watching functionality.
   *
   * This collection provides the next episodes to watch for each show where the user
   * has made viewing progress but hasn't completed all available episodes. It enables
   * seamless continuation of viewing across multiple series.
   */
  nextUnwatchedEpisodes: KeepWatchingShow[];
}

/**
 * Request payload for updating existing episodes in the system. This interface
 * extends the creation request structure to maintain consistency between create
 * and update operations while allowing for complete episode modification.
 *
 * Episode update requests are used in administrative content management,
 * data correction workflows, and bulk update operations when episode
 * information needs to be modified after initial creation.
 *
 * @interface UpdateEpisodeRequest
 * @extends CreateEpisodeRequest
 * @example
 * ```typescript
 * const updateRequest: UpdateEpisodeRequest = {
 *   tmdb_id: 62085,
 *   show_id: 10,
 *   season_id: 101,
 *   season_number: 1,
 *   episode_number: 1,
 *   episode_type: "series_premiere",
 *   title: "Pilot (Updated)",
 *   overview: "Updated description with more details...",
 *   air_date: "2008-01-20",
 *   runtime: 58,
 *   still_image: "https://image.tmdb.org/t/p/w500/pilot-still-hd.jpg"
 * };
 * ```
 */
export interface UpdateEpisodeRequest extends CreateEpisodeRequest {}
