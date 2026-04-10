/**
 * A show that has been rewatched at least once by a profile.
 *
 * @interface RewatchedShow
 * @example
 * ```typescript
 * const rewatchedShow: RewatchedShow = {
 *   showId: 101,
 *   showTitle: "Breaking Bad",
 *   rewatchCount: 2
 * };
 * ```
 */
export interface RewatchedShow {
  /** Unique identifier for the show */
  showId: number;

  /** Display title of the show */
  showTitle: string;

  /** Number of complete rewatch cycles initiated (excludes the original watch) */
  rewatchCount: number;
}

/**
 * A movie that has been rewatched at least once by a profile.
 *
 * @interface RewatchedMovie
 * @example
 * ```typescript
 * const rewatchedMovie: RewatchedMovie = {
 *   movieId: 550,
 *   movieTitle: "Fight Club",
 *   rewatchCount: 3
 * };
 * ```
 */
export interface RewatchedMovie {
  /** Unique identifier for the movie */
  movieId: number;

  /** Display title of the movie */
  movieTitle: string;

  /** Number of times the movie has been rewatched (excludes the original watch) */
  rewatchCount: number;
}

/**
 * Rewatch statistics for a single profile.
 * Tracks how many times shows and movies have been rewatched and surfaces
 * the most frequently rewatched titles.
 *
 * @interface ProfileRewatchStats
 * @example
 * ```typescript
 * const stats: ProfileRewatchStats = {
 *   totalShowRewatches: 5,
 *   totalMovieRewatches: 12,
 *   mostRewatchedShows: [{ showId: 101, showTitle: "Breaking Bad", rewatchCount: 2 }],
 *   mostRewatchedMovies: [{ movieId: 550, movieTitle: "Fight Club", rewatchCount: 3 }]
 * };
 * ```
 */
export interface ProfileRewatchStats {
  /** Total number of show rewatch cycles initiated across all shows for this profile */
  totalShowRewatches: number;

  /** Total number of movie rewatch cycles initiated across all movies for this profile */
  totalMovieRewatches: number;

  /** Shows rewatched most often by this profile, sorted descending by rewatchCount */
  mostRewatchedShows: RewatchedShow[];

  /** Movies rewatched most often by this profile, sorted descending by rewatchCount */
  mostRewatchedMovies: RewatchedMovie[];
}

/**
 * Rewatch statistics aggregated across all profiles in an account.
 * Provides a platform-wide view of rewatch behavior and includes the profile
 * name alongside each entry for attribution.
 *
 * @interface AccountRewatchStats
 * @example
 * ```typescript
 * const stats: AccountRewatchStats = {
 *   totalShowRewatches: 18,
 *   totalMovieRewatches: 35,
 *   mostRewatchedShows: [{ showId: 101, showTitle: "Breaking Bad", rewatchCount: 5, profileName: "Alice" }],
 *   mostRewatchedMovies: [{ movieId: 550, movieTitle: "Fight Club", rewatchCount: 8, profileName: "Bob" }]
 * };
 * ```
 */
export interface AccountRewatchStats {
  /** Total show rewatch cycles across all profiles in the account */
  totalShowRewatches: number;

  /** Total movie rewatch cycles across all profiles in the account */
  totalMovieRewatches: number;

  /** Most rewatched shows across all profiles, each entry attributed to a profile by name */
  mostRewatchedShows: Array<RewatchedShow & { profileName: string }>;

  /** Most rewatched movies across all profiles, each entry attributed to a profile by name */
  mostRewatchedMovies: Array<RewatchedMovie & { profileName: string }>;
}
