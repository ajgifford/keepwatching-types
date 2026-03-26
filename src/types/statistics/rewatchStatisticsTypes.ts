/**
 * A show that has been rewatched at least once.
 */
export interface RewatchedShow {
  showId: number;
  showTitle: string;
  rewatchCount: number;
}

/**
 * A movie that has been rewatched at least once.
 */
export interface RewatchedMovie {
  movieId: number;
  movieTitle: string;
  rewatchCount: number;
}

/**
 * Rewatch statistics for a single profile.
 */
export interface ProfileRewatchStats {
  /** Total number of show rewatch cycles initiated across all shows */
  totalShowRewatches: number;
  /** Total number of movie rewatch cycles initiated across all movies */
  totalMovieRewatches: number;
  /** Shows rewatched most often, sorted descending by rewatchCount */
  mostRewatchedShows: RewatchedShow[];
  /** Movies rewatched most often, sorted descending by rewatchCount */
  mostRewatchedMovies: RewatchedMovie[];
}

/**
 * Rewatch statistics aggregated across all profiles in an account.
 */
export interface AccountRewatchStats {
  /** Total show rewatch cycles across all profiles */
  totalShowRewatches: number;
  /** Total movie rewatch cycles across all profiles */
  totalMovieRewatches: number;
  /** Most rewatched shows across all profiles (includes profileName) */
  mostRewatchedShows: Array<RewatchedShow & { profileName: string }>;
  /** Most rewatched movies across all profiles (includes profileName) */
  mostRewatchedMovies: Array<RewatchedMovie & { profileName: string }>;
}
