import { BaseResponse } from './responseTypes';

/**
 * Lightweight reference interface for persons that contains only essential
 * identification information. Used in contexts where full person data is not
 * needed, such as lists, cross-references, or API responses that need to
 * minimize payload size.
 *
 * This interface is particularly useful for operations like cast lists,
 * search results, or when referencing persons that are part of larger
 * data structures.
 *
 * @interface PersonReference
 * @example
 * ```typescript
 * const personRef: PersonReference = {
 *   id: 1,
 *   tmdbId: 31,
 *   name: "Tom Hanks"
 * };
 *
 * // Used in cast lists
 * const castReferences: PersonReference[] = [
 *   { id: 1, tmdbId: 31, name: "Tom Hanks" },
 *   { id: 2, tmdbId: 6384, name: "Keanu Reeves" },
 *   { id: 3, tmdbId: 1245, name: "Scarlett Johansson" }
 * ];
 * ```
 */
export interface PersonReference {
  /** Unique identifier for the person in the application database */
  id: number;

  /** The Movie Database (TMDB) identifier for external API operations and data synchronization */
  tmdbId: number;

  /** Full display name of the person */
  name: string;
}

/**
 * Comprehensive interface representing a person (actor, director, creator, etc.)
 * with complete biographical information and filmography. Contains detailed metadata
 * about individuals involved in content production.
 *
 * This interface includes everything needed for person detail pages, cast information,
 * and comprehensive person management throughout the application.
 *
 * @interface Person
 * @extends PersonReference
 * @example
 * ```typescript
 * const person: Person = {
 *   id: 1,
 *   tmdbId: 31,
 *   name: "Tom Hanks",
 *   gender: 2,
 *   biography: "Thomas Jeffrey Hanks is an American actor and filmmaker...",
 *   profileImage: "https://image.tmdb.org/t/p/w500/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
 *   birthdate: "1956-07-09",
 *   deathdate: null,
 *   placeOfBirth: "Concord, California, USA",
 *   movieCredits: [
 *     {
 *       name: "Forrest Gump",
 *       poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
 *       year: "1994",
 *       character: "Forrest Gump",
 *       rating: 8.8
 *     }
 *   ],
 *   showCredits: [
 *     {
 *       name: "Band of Brothers",
 *       poster: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *       year: "2001",
 *       character: "Narrator",
 *       rating: 9.4,
 *       episodeCount: 10
 *     }
 *   ]
 * };
 * ```
 */
export interface Person extends PersonReference {
  /**
   * Gender identifier following TMDB standards
   *
   * Standard values:
   * - 1: Female
   * - 2: Male
   * - 3: Non-binary
   * - 0: Not specified/unknown
   *
   * This field uses TMDB's gender coding system for consistency with external data sources.
   */
  gender: number;

  /**
   * Biographical information and career overview
   *
   * Contains detailed information about the person's life, career highlights,
   * background, and notable achievements. This text is typically sourced from
   * TMDB or other biographical databases and should be suitable for display
   * in person detail views.
   */
  biography: string;

  /**
   * URL to the person's profile/headshot image
   *
   * High-quality portrait image suitable for display in cast lists, person details,
   * and other contexts where visual identification is needed. Should be a reliable
   * URL, preferably from a CDN service.
   */
  profileImage: string;

  /**
   * Birth date in ISO format (YYYY-MM-DD)
   *
   * Used for age calculations, sorting, and biographical information.
   * Should be in standardized ISO date format for consistent processing.
   */
  birthdate: string;

  /**
   * Death date in ISO format (YYYY-MM-DD) or null if the person is alive
   *
   * When null, indicates the person is currently alive. When populated,
   * should be in ISO date format for consistency with birthdate field.
   */
  deathdate: string | null;

  /**
   * Birth location (city, state/province, country)
   *
   * Formatted location string providing geographical context for the person's
   * origin. Typically in format "City, State/Province, Country" for consistency.
   */
  placeOfBirth: string;

  /**
   * Array of movie appearances and roles
   *
   * Complete filmography of movie credits including character names, roles,
   * and movie metadata. Sorted by relevance or recency for display purposes.
   */
  movieCredits: Credit[];

  /**
   * Array of TV show appearances and roles
   *
   * Complete television credits including series work, guest appearances,
   * and episode counts. Includes additional TV-specific metadata like
   * episode counts for comprehensive show involvement tracking.
   */
  showCredits: ShowCredit[];
}

/**
 * Base interface for movie credits that contains essential information about
 * a person's involvement in a film. Provides core credit data that can be
 * displayed in filmography lists and person detail pages.
 *
 * @interface Credit
 * @example
 * ```typescript
 * const movieCredit: Credit = {
 *   name: "The Green Mile",
 *   poster: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   year: "1999",
 *   character: "Paul Edgecomb",
 *   rating: 8.6
 * };
 * ```
 */
export interface Credit {
  /** Title of the content the credit is for */
  name: string;

  /**
   * URL to the content's poster image
   *
   * Used for visual display in filmography sections and credit listings.
   * Should be a reliable URL to a properly sized poster image.
   */
  poster: string;

  /**
   * Release year of the content
   *
   * String representation of the year for easy display and sorting.
   * Extracted from full release date for simplified presentation.
   */
  year: string;

  /**
   * Character name or role description
   *
   * The name of the character portrayed by the person.
   */
  character: string;

  /**
   * Content rating score (typically 0-10 scale)
   *
   * Average rating or quality score for the content, used for sorting
   * credits by quality and providing context about the person's
   * involvement in well-regarded projects.
   */
  rating: number;
}

/**
 * Extended credit interface for TV show appearances that includes episode count
 * information. Inherits all properties from Credit and adds show-specific metadata
 * to provide comprehensive information about a person's television work.
 *
 * @interface ShowCredit
 * @extends Credit
 * @example
 * ```typescript
 * const showCredit: ShowCredit = {
 *   name: "The Pacific",
 *   poster: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   year: "2010",
 *   character: "Narrator",
 *   rating: 8.3,
 *   episodeCount: 10
 * };
 * ```
 */
export interface ShowCredit extends Credit {
  /**
   * Number of episodes the person appeared in
   *
   * Provides context about the extent of the person's involvement in the show.
   * Helps distinguish between main cast members, recurring guest stars,
   * and single-episode appearances.
   */
  episodeCount: number;
}

export interface SearchPerson {
  id: number;
  name: string;
  profileImage: string;
  department: string;
  popularity: number;
  biography: string;
  birthday: string;
  birthplace: string;
  deathday: string | null;
}

export interface SearchPersonResponse extends BaseResponse {
  person: SearchPerson;
}

/**
 * Interface representing a cast member's role in a specific piece of content
 * (movie or show). Links persons to content through character relationships
 * and provides display-ready information for cast listings.
 *
 * This interface is used throughout the application to display cast information
 * in movie and show detail pages, search results, and anywhere cast listings
 * are needed.
 *
 * @interface CastMember
 * @example
 * ```typescript
 * const castMember: CastMember = {
 *   contentId: 550, // Fight Club movie ID
 *   personId: 287,
 *   characterName: "Tyler Durden",
 *   order: 2,
 *   name: "Brad Pitt",
 *   profileImage: "https://image.tmdb.org/t/p/w500/profile.jpg"
 * };
 * ```
 */
export interface CastMember {
  /** ID of the movie or show this cast member appears in */
  contentId: number;

  /** ID of the person/actor in the cast */
  personId: number;

  /**
   * Name of the character portrayed by this cast member
   *
   * The character name as it appears in the content. For non-acting roles,
   * this might be a role description like "Director" or "Producer".
   */
  characterName: string;

  /**
   * Billing order position (lower numbers = higher billing)
   *
   * Determines the order in which cast members are displayed in cast lists.
   * Lower numbers indicate more prominent roles and higher billing positions.
   * Used for sorting cast members in order of importance.
   */
  order: number;

  /**
   * Actor's display name
   *
   * Full name of the actor/person for display in cast lists. Included here
   * for performance optimization to avoid additional person lookups when
   * displaying cast information.
   */
  name: string;

  /**
   * URL to the actor's profile image
   *
   * Profile/headshot image for visual display in cast lists. Should be a
   * high-quality image suitable for thumbnail display in cast grids.
   */
  profileImage: string;
}

/**
 * Extended cast member interface specifically for TV shows that includes
 * additional metadata about the actor's involvement across episodes and seasons.
 * Provides comprehensive information about cast member participation in series.
 *
 * @interface ShowCastMember
 * @extends CastMember
 * @example
 * ```typescript
 * const showCastMember: ShowCastMember = {
 *   contentId: 1399, // Game of Thrones show ID
 *   personId: 12835,
 *   characterName: "Jon Snow",
 *   order: 1,
 *   name: "Kit Harington",
 *   profileImage: "https://image.tmdb.org/t/p/w500/profile.jpg",
 *   episodeCount: 62,
 *   active: false // Show has ended
 * };
 *
 * // Current cast member in ongoing show
 * const activeCastMember: ShowCastMember = {
 *   contentId: 94997, // House of the Dragon show ID
 *   personId: 2524240,
 *   characterName: "Rhaenyra Targaryen",
 *   order: 1,
 *   name: "Emma D'Arcy",
 *   profileImage: "https://image.tmdb.org/t/p/w500/profile.jpg",
 *   episodeCount: 8,
 *   active: true // Show is ongoing
 * };
 * ```
 */
export interface ShowCastMember extends CastMember {
  /**
   * Total number of episodes the actor appeared in
   *
   * Provides insight into the actor's involvement in the series.
   * Helps distinguish between main cast members, recurring characters,
   * and guest appearances. Updated as new episodes air.
   */
  episodeCount: number;

  /**
   * Whether the actor is currently active in the show
   *
   * Indicates if the character/actor is part of the current active cast
   * or is a former cast member. Useful for organizing cast lists and
   * understanding current vs. historical cast composition.
   *
   * - true: Actor is currently active in the show
   * - false: Actor is no longer active (left the show, character died, etc.)
   */
  active: boolean;
}

export interface SearchPersonCredit {
  tmdbId: number;
  title: string;
  posterImage: string;
  releaseDate: string;
  character: string;
  job: string;
  mediaType: 'tv' | 'movie';
  isCast?: boolean;
}

export interface SearchPersonCredits {
  cast: SearchPersonCredit[];
  crew: SearchPersonCredit[];
}

export interface SearchPersonCreditsResponse extends BaseResponse {
  credits: SearchPersonCredits;
}

/**
 * Request payload for creating new person records in the system.
 * Uses snake_case field naming for database compatibility and includes
 * all necessary biographical and identification information.
 *
 * This interface aligns with database schema conventions and supports
 * integration with external data sources like TMDB for person information.
 *
 * @interface CreatePerson
 * @example
 * ```typescript
 * const createPersonRequest: CreatePerson = {
 *   tmdb_id: 6384,
 *   name: "Keanu Reeves",
 *   gender: 2,
 *   biography: "Keanu Charles Reeves is a Canadian actor. Born in Beirut and raised in Toronto...",
 *   profile_image: "https://image.tmdb.org/t/p/w500/profile.jpg",
 *   birthdate: "1964-09-02",
 *   deathdate: null,
 *   place_of_birth: "Beirut, Lebanon"
 * };
 * ```
 */
export interface CreatePerson {
  /** TMDB identifier for external data synchronization and API integration */
  tmdb_id: number;

  /** Full name of the person */
  name: string;

  /**
   * Gender identifier (TMDB standard: 1=female, 2=male, 3=non-binary, 0=unknown)
   *
   * Uses TMDB's standardized gender coding system for consistency with
   * external data sources and to enable proper integration with content databases.
   */
  gender: number;

  /**
   * Biographical information and career overview
   *
   * Comprehensive biographical text suitable for display in person detail pages.
   * Should include career highlights, background information, and notable achievements.
   */
  biography: string;

  /**
   * URL to the person's profile/headshot image
   *
   * High-quality portrait image URL for display purposes. Should be a reliable
   * URL, preferably from a CDN service that provides consistent availability.
   */
  profile_image: string;

  /**
   * Birth date in ISO format (YYYY-MM-DD)
   *
   * Standardized date format for consistent processing and display.
   * Used for age calculations and biographical information.
   */
  birthdate: string;

  /**
   * Death date in ISO format (YYYY-MM-DD) or null if the person is alive
   *
   * When null, indicates the person is currently alive. When populated,
   * must be in ISO format for consistency with the birthdate field.
   */
  deathdate: string | null;

  /**
   * Birth location (city, state/province, country)
   *
   * Formatted location string providing geographical context.
   * Typically follows the format "City, State/Province, Country" for consistency.
   */
  place_of_birth: string;
}

/**
 * Base request payload for creating cast member relationships between persons
 * and content. Provides the foundation for linking actors to their roles in
 * movies and TV shows with proper character and billing information.
 *
 * @interface CreateCast
 * @example
 * ```typescript
 * const createCastRequest: CreateCast = {
 *   content_id: 603, // The Matrix movie ID
 *   person_id: 6384, // Keanu Reeves person ID
 *   character_name: "Neo",
 *   credit_id: "52fe4232c3a36847f8014c11",
 *   cast_order: 1
 * };
 * ```
 */
export interface CreateCast {
  /** ID of the movie or show the person appears in */
  content_id: number;

  /** ID of the person/actor being added to the cast */
  person_id: number;

  /**
   * Name of the character portrayed
   *
   * The character name as it appears in the content. For non-acting roles,
   * this might be a role description.
   */
  character_name: string;

  /**
   * External credit identifier from TMDB or other sources
   *
   * Unique identifier for this specific credit relationship, typically
   * provided by external data sources for tracking and synchronization purposes.
   */
  credit_id: string;

  /**
   * Billing order position for cast display
   *
   * Determines the order in which cast members appear in cast lists.
   * Lower numbers indicate higher billing and more prominent display positions.
   */
  cast_order: number;
}

/**
 * Extended cast creation request specifically for TV shows that includes
 * additional show-specific metadata about the actor's involvement.
 * Provides comprehensive information for managing series cast relationships.
 *
 * @interface CreateShowCast
 * @extends CreateCast
 * @example
 * ```typescript
 * const createShowCastRequest: CreateShowCast = {
 *   content_id: 1399, // Game of Thrones show ID
 *   person_id: 12835, // Kit Harington person ID
 *   character_name: "Jon Snow",
 *   credit_id: "5256c8af19c2956ff6046e77",
 *   cast_order: 1,
 *   total_episodes: 62,
 *   active: 0 // Show has ended
 * };
 * ```
 */
export interface CreateShowCast extends CreateCast {
  /**
   * Total number of episodes the actor appeared in
   *
   * Represents the actor's involvement level in the series.
   * This number may be updated as new episodes air or as
   * historical data is corrected.
   */
  total_episodes: number;

  /**
   * Active status flag (0 or 1 for database compatibility)
   *
   * Indicates whether the actor is currently active in the show:
   * - 1: Actor is currently active in the show
   * - 0: Actor is no longer active (former cast member)
   *
   * Uses numeric format for database systems that require
   * integer boolean representation.
   */
  active: number;
}
