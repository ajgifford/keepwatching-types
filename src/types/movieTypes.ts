import { BaseResponse } from './responseTypes';
import { SimpleWatchStatus } from './watchStatusTypes';

/**
 * Represents a movie in the KeepWatching application.
 * Contains comprehensive metadata about the film including ratings, release information,
 * streaming availability, and visual assets for display in the user interface.
 *
 * This interface serves as the foundation for all movie-related operations and provides
 * the core data structure for movie management across the application.
 *
 * @interface Movie
 * @example
 * ```typescript
 * const movie: Movie = {
 *   id: 1,
 *   tmdbId: 27205,
 *   title: "Inception",
 *   description: "A thief who steals corporate secrets through dream-sharing technology...",
 *   releaseDate: "2010-07-16",
 *   posterImage: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *   backdropImage: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *   runtime: 148,
 *   userRating: 8.8,
 *   mpaRating: "PG-13",
 *   genres: "Action, Drama, Sci-Fi, Thriller",
 *   streamingServices: "Netflix, HBO Max"
 * };
 * ```
 */
export interface Movie {
  /** Unique identifier for the movie in the application database */
  id: number;

  /** The Movie Database (TMDB) ID for external API integration and cross-referencing */
  tmdbId: number;

  /** Display title of the movie */
  title: string;

  /** Plot summary or synopsis of the movie */
  description: string;

  /** Release date in ISO format (YYYY-MM-DD) */
  releaseDate: string;

  /** URL to the movie's poster image for display in lists and details */
  posterImage: string;

  /** URL to the movie's backdrop/hero image for detailed views */
  backdropImage: string;

  /** Movie duration in minutes */
  runtime: number;

  /** Average user rating (typically 0-10 scale) */
  userRating: number;

  /** Motion Picture Association rating (G, PG, PG-13, R, NC-17, etc.) */
  mpaRating: string;

  /** Comma-separated list of genre names associated with the movie */
  genres: string;

  /** Comma-separated list of available streaming platforms */
  streamingServices: string;
}

/**
 * Extended movie interface that includes comprehensive production metadata,
 * financial information, and creative credits.
 *
 * MovieDetails provides complete movie information including production
 * credits, company details, and financial performance data.
 *
 * @interface MovieDetails
 * @extends ProfileMovie
 * @example
 * ```typescript
 * const detailedMovie: MovieDetails = {
 *   // All Movie properties
 *   id: 1,
 *   tmdbId: 27205,
 *   title: "Inception",
 *   description: "A thief who steals corporate secrets through dream-sharing technology...",
 *   releaseDate: "2010-07-16",
 *   posterImage: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *   backdropImage: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *   runtime: 148,
 *   userRating: 8.8,
 *   mpaRating: "PG-13",
 *   genres: "Action, Drama, Sci-Fi, Thriller",
 *   streamingServices: "Netflix, HBO Max",
 *
 *   // Additional detailed properties
 *   director: "Christopher Nolan",
 *   productionCompanies: "Warner Bros. Pictures, Legendary Entertainment, Syncopy",
 *   budget: 160000000, // $160 million
 *   revenue: 836836967  // $836.8 million worldwide
 * };
 * ```
 */
export interface MovieDetails extends Movie {
  /**
   * Contains the name(s) of the movie's director(s)
   */
  director: string;

  /**
   * Comma-separated list of production company names that were involved in
   * bringing the movie to screen.
   */
  productionCompanies: string;

  /**
   * Total production budget in USD
   */
  budget: number;

  /**
   * Total worldwide box office revenue in USD
   */
  revenue: number;
}

/**
 * Extended movie interface that associates movies with specific user profiles
 * and includes watch status tracking. This interface enables personalized movie
 * libraries and viewing progress management across multiple user profiles.
 *
 * The profile movie association allows different users within the same account
 * to maintain separate watch statuses and favorites lists for the same movie content.
 *
 * @interface ProfileMovie
 * @extends Movie
 * @example
 * ```typescript
 * const profileMovie: ProfileMovie = {
 *   id: 1,
 *   tmdbId: 27205,
 *   title: "Inception",
 *   description: "A thief who steals corporate secrets...",
 *   releaseDate: "2010-07-16",
 *   posterImage: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *   backdropImage: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *   runtime: 148,
 *   userRating: 8.8,
 *   mpaRating: "PG-13",
 *   genres: "Action, Drama, Sci-Fi, Thriller",
 *   streamingServices: "Netflix, HBO Max",
 *   profileId: 123,
 *   watchStatus: WatchStatus.WATCHED
 * };
 * ```
 */
export interface ProfileMovie extends Movie {
  /** ID of the user profile that owns this movie association */
  profileId: number;

  /**
   * Current watch status for this movie (not release, watched or not watched)
   *
   * Movies use watch status because they are discrete content that
   * can only be completely watched or not watched, unlike TV shows which
   * can have partial progress through multiple episodes.
   */
  watchStatus: SimpleWatchStatus;
}

/**
 * Extended profile movie interface that includes comprehensive production metadata,
 * financial information, and creative credits. This interface combines user-specific
 * movie data with detailed production information for enhanced movie analytics,
 * detailed views, and industry insights.
 *
 * ProfileMovieWithDetails provides complete movie information including production
 * credits, company details, and financial performance data while maintaining
 * profile-specific viewing context and watch status tracking.
 *
 * @interface ProfileMovieWithDetails
 * @extends MovieDetails
 * @extends ProfileMovie
 * @example
 * ```typescript
 * const detailedMovie: ProfileMovieWithDetails = {
 *   // All ProfileMovie properties
 *   id: 1,
 *   tmdbId: 27205,
 *   title: "Inception",
 *   description: "A thief who steals corporate secrets through dream-sharing technology...",
 *   releaseDate: "2010-07-16",
 *   posterImage: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *   backdropImage: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *   runtime: 148,
 *   userRating: 8.8,
 *   mpaRating: "PG-13",
 *   genres: "Action, Drama, Sci-Fi, Thriller",
 *   streamingServices: "Netflix, HBO Max",
 *   profileId: 123,
 *   watchStatus: WatchStatus.WATCHED,
 *
 *   // Additional detailed properties
 *   director: "Christopher Nolan",
 *   productionCompanies: "Warner Bros. Pictures, Legendary Entertainment, Syncopy",
 *   budget: 160000000, // $160 million
 *   revenue: 836836967  // $836.8 million worldwide
 * };
 * ```
 */
export interface ProfileMovieWithDetails extends MovieDetails, ProfileMovie {}

/**
 * Administrative interface for movie management that extends the base movie
 * with system metadata. Used for content management, database administration,
 * and tracking content lifecycle in administrative panels and tools.
 *
 * This interface provides administrators with additional context about when
 * movie records were last modified, enabling better content management workflows.
 *
 * @interface AdminMovie
 * @extends Movie
 * @example
 * ```typescript
 * const adminMovie: AdminMovie = {
 *   id: 1,
 *   tmdbId: 27205,
 *   title: "Inception",
 *   description: "A thief who steals corporate secrets...",
 *   releaseDate: "2010-07-16",
 *   posterImage: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *   backdropImage: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *   runtime: 148,
 *   userRating: 8.8,
 *   mpaRating: "PG-13",
 *   genres: "Action, Drama, Sci-Fi, Thriller",
 *   streamingServices: "Netflix, HBO Max",
 *   lastUpdated: "2024-01-15T10:30:00Z"
 * };
 * ```
 */
export interface AdminMovie extends Movie {
  /** ISO timestamp of the last modification to the movie record */
  lastUpdated: string;
}

/**
 * Administrative interface for movie management that extends the movie details
 * with system metadata. Used for content management, database administration,
 * and tracking content lifecycle in administrative panels and tools.
 *
 * This interface provides administrators with additional context about when
 * movie records were last modified, enabling better content management workflows.
 *
 * @interface AdminMovieDetails
 * @extends MovieDetails
 * @extends AdminMovie
 * @example
 * ```typescript
 * const adminMovie: AdminMovie = {
 *   id: 1,
 *   tmdbId: 27205,
 *   title: "Inception",
 *   description: "A thief who steals corporate secrets...",
 *   releaseDate: "2010-07-16",
 *   posterImage: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *   backdropImage: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *   runtime: 148,
 *   userRating: 8.8,
 *   mpaRating: "PG-13",
 *   genres: "Action, Drama, Sci-Fi, Thriller",
 *   streamingServices: "Netflix, HBO Max",
 *   lastUpdated: "2024-01-15T10:30:00Z"
 *
 *   // Additional detailed properties
 *   director: "Christopher Nolan",
 *   productionCompanies: "Warner Bros. Pictures, Legendary Entertainment, Syncopy",
 *   budget: 160000000, // $160 million
 *   revenue: 836836967  // $836.8 million worldwide
 * };
 * ```
 */
export interface AdminMovieDetails extends MovieDetails, AdminMovie {}

/**
 * Lightweight reference interface for movies that contains only essential
 * identification information. Used in contexts where full movie data is not
 * needed, such as lists, recommendations, cross-references, or API responses
 * that need to minimize payload size.
 *
 * This interface is particularly useful for operations like recent/upcoming
 * movie lists, search results, or when referencing movies that have been
 * removed from a user's collection.
 *
 * @interface MovieReference
 * @example
 * ```typescript
 * const movieRef: MovieReference = {
 *   id: 1,
 *   title: "Inception",
 *   tmdbId: 27205
 * };
 *
 * // Used in recommendation lists
 * const recentMovies: MovieReference[] = [
 *   { id: 1, title: "Inception", tmdbId: 27205 },
 *   { id: 2, title: "The Matrix", tmdbId: 603 },
 *   { id: 3, title: "Interstellar", tmdbId: 157336 }
 * ];
 * ```
 */
export interface MovieReference {
  /** Application database ID for the movie */
  id: number;

  /** Movie title for display purposes */
  title: string;

  /** External database reference (TMDB ID) */
  tmdbId: number;

  /** Release date of the movie */
  releaseDate: string;
}

/**
 * Request payload for creating new movies in the application database.
 * Uses snake_case field names for database compatibility and includes optional
 * associations for genres and streaming services.
 *
 * The creation request structure aligns with database schema conventions
 * and supports batch operations for importing movie data from external sources
 * like The Movie Database (TMDB).
 *
 * @interface CreateMovieRequest
 * @example
 * ```typescript
 * const createRequest: CreateMovieRequest = {
 *   tmdb_id: 27205,
 *   title: "Inception",
 *   description: "A thief who steals corporate secrets through dream-sharing technology...",
 *   release_date: "2010-07-16",
 *   runtime: 148,
 *   poster_image: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *   backdrop_image: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *   user_rating: 8.8,
 *   mpa_rating: "PG-13",
 *   streaming_service_ids: [1, 3], // Netflix, HBO Max
 *   genre_ids: [1, 2, 4, 8] // Action, Drama, Sci-Fi, Thriller
 * };
 * ```
 */
export interface CreateMovieRequest {
  /** External database identifier (TMDB ID) */
  tmdb_id: number;

  /** Movie title */
  title: string;

  /** Plot description or synopsis */
  description: string;

  /** Release date in ISO format (YYYY-MM-DD) */
  release_date: string;

  /** Movie duration in minutes */
  runtime: number;

  /** URL to the movie's poster image */
  poster_image: string;

  /** URL to the movie's backdrop/hero image */
  backdrop_image: string;

  /** Average user rating (0-10 scale) */
  user_rating: number;

  /** Motion Picture Association content rating */
  mpa_rating: string;

  /**
   * Contains the name(s) of the movie's director(s)
   */
  director: string;

  /**
   * Comma-separated list of production company names that were involved in
   * bringing the movie to screen.
   */
  production_companies: string;

  /**
   * Total production budget in USD
   */
  budget: number;

  /**
   * Total worldwide box office revenue in USD
   */
  revenue: number;

  /**
   * Optional array of streaming service IDs to associate with this movie
   *
   * These IDs reference the streaming services table and will be used
   * to populate the streamingServices string field after creation.
   */
  streaming_service_ids?: number[];

  /**
   * Optional array of genre IDs to associate with this movie
   *
   * These IDs reference the genres table and will be used to populate
   * the genres string field after creation.
   */
  genre_ids?: number[];
}

/**
 * Request payload for updating existing movies. Extends the creation request
 * with an ID field to identify which movie to modify. All fields from the
 * creation request can be updated, allowing for comprehensive movie management.
 *
 * This interface supports both partial and complete updates to movie records,
 * enabling flexible content management workflows for administrators.
 *
 * @interface UpdateMovieRequest
 * @extends CreateMovieRequest
 * @example
 * ```typescript
 * const updateRequest: UpdateMovieRequest = {
 *   id: 1,
 *   tmdb_id: 27205,
 *   title: "Inception (Director's Cut)",
 *   description: "Enhanced version with additional scenes and commentary...",
 *   release_date: "2010-07-16",
 *   runtime: 155, // Extended runtime
 *   poster_image: "https://image.tmdb.org/t/p/w500/inception_poster_dc.jpg",
 *   backdrop_image: "https://image.tmdb.org/t/p/original/inception_backdrop_dc.jpg",
 *   user_rating: 9.0, // Updated rating
 *   mpa_rating: "PG-13",
 *   streaming_service_ids: [1, 3, 5], // Added Disney+
 *   genre_ids: [1, 2, 4, 8]
 * };
 * ```
 */
export interface UpdateMovieRequest extends CreateMovieRequest {
  /** ID of the movie to update */
  id: number;
}

/**
 * Interface for movie recommendations and similar content suggestions.
 * Contains comprehensive metadata for evaluating and presenting content recommendations.
 *
 * This interface supports recommendation algorithms and helps users discover
 * new content based on their viewing preferences and history.
 *
 * @interface SimilarOrRecommendedMovie
 * @example
 * ```typescript
 * const recommendation: SimilarOrRecommendedMovie = {
 *   id: 2,
 *   title: "The Matrix",
 *   genres: ["Drama", "Crime"],
 *   premiered: "1998-02-08",
 *   summary: "The story of Neo...",
 *   image: "https://image.tmdb.org/poster.jpg",
 *   rating: 8.8,
 *   popularity: 85.5,
 *   country: "US",
 *   language: "en",
 *   inFavorites: false
 * };
 * ```
 */
export interface SimilarOrRecommendedMovie {
  /** Movie ID for reference and navigation */
  id: number;

  /** Movie title for display */
  title: string;

  /**
   * Array of genre names associated with the movie
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

  /** Brief description or synopsis of the movie */
  summary: string;

  /** Movie image URL for visual display */
  image: string;

  /**
   * Movie rating score (typically 0-10 scale)
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
   * Whether this movie is already in the user's favorites
   *
   * Helps avoid recommending content the user has already added
   * and provides context for recommendation displays.
   */
  inFavorites: boolean;
}

/**
 * Specialized interface for organizing movies by release timing relative to the current date.
 * Provides quick access to recently released and upcoming movies for enhanced user experience
 * and content discovery features.
 *
 * This interface supports user interfaces that display timelines of movie releases,
 * helping users discover new content and stay up-to-date with recent releases.
 *
 * @interface RecentUpcomingMoviesForProfile
 * @example
 * ```typescript
 * const movieTimeline: RecentUpcomingMoviesForProfile = {
 *   recentMovies: [
 *     { id: 100, title: "Top Gun: Maverick", tmdbId: 361743 },
 *     { id: 101, title: "Thor: Love and Thunder", tmdbId: 616037 }
 *   ],
 *   upcomingMovies: [
 *     { id: 102, title: "Avatar: The Way of Water", tmdbId: 76600 },
 *     { id: 103, title: "Black Panther: Wakanda Forever", tmdbId: 505642 }
 *   ]
 * };
 * ```
 */
export interface RecentUpcomingMoviesForProfile {
  /** Movies released in the recent past (typically last 3 months) */
  recentMovies: MovieReference[];

  /** Movies scheduled for future release (typically next 3 months) */
  upcomingMovies: MovieReference[];
}

/**
 * Response interface for adding movies to a user's favorites that includes both
 * the newly favorited movie and updated timeline information. This consolidated
 * response reduces the number of API calls needed to refresh the user interface.
 *
 * The response includes updated timeline data to ensure the UI reflects any
 * changes to recent/upcoming movies that may have occurred during the add favorite process.
 *
 * @interface AddMovieFavorite
 * @example
 * ```typescript
 * const favoriteResult: AddMovieFavorite = {
 *   favoritedMovie: {
 *     id: 1,
 *     tmdbId: 27205,
 *     title: "Inception",
 *     // ... other movie properties
 *     profileId: 123,
 *     watchStatus: WatchStatus.NOT_WATCHED
 *   },
 *   recentUpcomingMovies: {
 *     recentMovies: [
 *       { id: 100, title: "Top Gun: Maverick", tmdbId: 361743 }
 *     ],
 *     upcomingMovies: [
 *       { id: 102, title: "Avatar: The Way of Water", tmdbId: 76600 }
 *     ]
 *   }
 * };
 * ```
 */
export interface AddMovieFavorite {
  /** The movie that was successfully added to the user's favorites */
  favoritedMovie: ProfileMovie;

  /** Updated timeline data for recent and upcoming movies */
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

/**
 * Response interface for removing movies from favorites that provides reference
 * to the removed movie and updated timeline information. Uses a lightweight
 * movie reference since the full movie data is no longer needed after removal.
 *
 * The response includes updated timeline data to maintain UI consistency
 * and provide users with current information about available content.
 *
 * @interface RemoveMovieFavorite
 * @example
 * ```typescript
 * const removeResult: RemoveMovieFavorite = {
 *   removedMovie: {
 *     id: 1,
 *     title: "Inception",
 *     tmdbId: 27205
 *   },
 *   recentUpcomingMovies: {
 *     recentMovies: [
 *       { id: 100, title: "Top Gun: Maverick", tmdbId: 361743 }
 *     ],
 *     upcomingMovies: [
 *       { id: 102, title: "Avatar: The Way of Water", tmdbId: 76600 }
 *     ]
 *   }
 * };
 * ```
 */
export interface RemoveMovieFavorite {
  /** Reference to the movie that was removed from favorites */
  removedMovie: MovieReference;

  /** Updated timeline data for recent and upcoming movies */
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

/**
 * API response wrapper for movie favoriting operations that extends BaseResponse
 * to include the favorited movie and updated timeline information in a standardized format.
 *
 * This response type ensures consistent API communication patterns while providing
 * all necessary data for client-side state updates after favoriting operations.
 *
 * @interface FavoriteMovieResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const favoriteResponse: FavoriteMovieResponse = {
 *   message: "Movie added to favorites successfully",
 *   favoritedMovie: {
 *     id: 1,
 *     tmdbId: 27205,
 *     title: "Inception",
 *     // ... other properties
 *     profileId: 123,
 *     watchStatus: WatchStatus.NOT_WATCHED
 *   },
 *   recentUpcomingMovies: {
 *     recentMovies: [
 *       { id: 100, title: "Top Gun: Maverick", tmdbId: 361743 }
 *     ],
 *     upcomingMovies: [
 *       { id: 102, title: "Avatar: The Way of Water", tmdbId: 76600 }
 *     ]
 *   }
 * };
 * ```
 */
export interface FavoriteMovieResponse extends BaseResponse {
  /** The movie that was successfully added to favorites */
  favoritedMovie: ProfileMovie;

  /** Updated timeline data for recent and upcoming movies */
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

/**
 * API response wrapper for movie removal operations that includes reference
 * to the removed movie and updated timeline information in a standardized format.
 *
 * This response type maintains consistency with other API endpoints while
 * providing essential data for updating client-side state after removal operations.
 *
 * @interface RemoveMovieResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const removeResponse: RemoveMovieResponse = {
 *   message: "Movie removed from favorites successfully",
 *   removedMovieReference: {
 *     id: 1,
 *     title: "Inception",
 *     tmdbId: 27205
 *   },
 *   recentUpcomingMovies: {
 *     recentMovies: [
 *       { id: 100, title: "Top Gun: Maverick", tmdbId: 361743 }
 *     ],
 *     upcomingMovies: [
 *       { id: 102, title: "Avatar: The Way of Water", tmdbId: 76600 }
 *     ]
 *   }
 * };
 * ```
 */
export interface RemoveMovieResponse extends BaseResponse {
  /** Reference to the movie that was removed from favorites */
  removedMovieReference: MovieReference;

  /** Updated timeline data for recent and upcoming movies */
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

/**
 * API response wrapper for comprehensive movie details operations that includes
 * detailed movie information and related content recommendations. This response
 * extends BaseResponse to provide a complete movie viewing experience with
 * detailed metadata, user context, and content discovery features.
 *
 * MovieDetailsResponse serves as the primary response for detailed movie view
 * endpoints, combining core movie data with personalized recommendations to
 * enhance user engagement and content discovery.
 *
 * @interface MovieDetailsResponse
 * @extends BaseResponse
 * @example
 * ```typescript
 * const movieDetailsResponse: MovieDetailsResponse = {
 *   message: "Movie details retrieved successfully",
 *   movie: {
 *     id: 1,
 *     tmdbId: 27205,
 *     title: "Inception",
 *     description: "A thief who steals corporate secrets...",
 *     releaseDate: "2010-07-16",
 *     posterImage: "https://image.tmdb.org/t/p/w500/inception_poster.jpg",
 *     backdropImage: "https://image.tmdb.org/t/p/original/inception_backdrop.jpg",
 *     runtime: 148,
 *     userRating: 8.8,
 *     mpaRating: "PG-13",
 *     genres: "Action, Drama, Sci-Fi, Thriller",
 *     streamingServices: "Netflix, HBO Max",
 *     profileId: 123,
 *     watchStatus: WatchStatus.WATCHED,
 *     director: "Christopher Nolan",
 *     productionCompanies: "Warner Bros. Pictures, Legendary Entertainment",
 *     budget: 160000000,
 *     revenue: 836836967
 *   },
 *   recommendedMovies: [
 *     {
 *       id: 2,
 *       title: "The Matrix",
 *       genres: ["Action", "Sci-Fi"],
 *       premiered: "1999-03-31",
 *       summary: "A computer programmer discovers reality is a simulation...",
 *       image: "https://image.tmdb.org/t/p/w500/matrix_poster.jpg",
 *       rating: 8.7,
 *       popularity: 92.3,
 *       country: "US",
 *       language: "en",
 *       inFavorites: false
 *     }
 *   ],
 *   similarMovies: [
 *     {
 *       id: 3,
 *       title: "Shutter Island",
 *       genres: ["Drama", "Mystery", "Thriller"],
 *       premiered: "2010-02-19",
 *       summary: "A U.S. Marshal investigates a psychiatric facility...",
 *       image: "https://image.tmdb.org/t/p/w500/shutter_island_poster.jpg",
 *       rating: 8.2,
 *       popularity: 78.5,
 *       country: "US",
 *       language: "en",
 *       inFavorites: true
 *     }
 *   ]
 * };
 * ```
 */
export interface MovieDetailsResponse extends BaseResponse {
  /**
   * Comprehensive movie data with detailed production metadata and user context.
   */
  movie: ProfileMovieWithDetails;

  /**
   * Array of personalized movie recommendations based on user preferences and viewing history.
   */
  recommendedMovies: SimilarOrRecommendedMovie[];

  /**
   * Array of movies that are thematically or stylistically similar to the main movie.
   */
  similarMovies: SimilarOrRecommendedMovie[];
}
