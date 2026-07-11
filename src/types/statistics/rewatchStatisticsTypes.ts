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
 * An episode that has been rewatched at least once by a profile.
 *
 * @interface RewatchedEpisode
 * @example
 * ```typescript
 * const rewatchedEpisode: RewatchedEpisode = {
 *   episodeId: 5001,
 *   showId: 101,
 *   showTitle: "Breaking Bad",
 *   seasonNumber: 1,
 *   episodeNumber: 1,
 *   episodeTitle: "Pilot",
 *   rewatchCount: 2
 * };
 * ```
 */
export interface RewatchedEpisode {
  /** Unique identifier for the episode */
  episodeId: number;

  /** Unique identifier for the show the episode belongs to */
  showId: number;

  /** Display title of the show the episode belongs to */
  showTitle: string;

  /** Season number the episode belongs to */
  seasonNumber: number;

  /** Episode number within its season */
  episodeNumber: number;

  /** Display title of the episode */
  episodeTitle: string;

  /** Number of times the episode has been rewatched (excludes the original watch) */
  rewatchCount: number;
}

/**
 * A show's episode-rewatch activity, summarizing how many of its episodes have been
 * rewatched and surfacing the show's own most-rewatched episodes.
 *
 * @interface RewatchedShowEpisodeSummary
 * @example
 * ```typescript
 * const summary: RewatchedShowEpisodeSummary = {
 *   showId: 101,
 *   showTitle: "Breaking Bad",
 *   totalEpisodesRewatched: 2,
 *   totalRewatchCount: 6,
 *   topEpisodes: [
 *     { episodeId: 5001, showId: 101, showTitle: "Breaking Bad", seasonNumber: 1, episodeNumber: 1, episodeTitle: "Pilot", rewatchCount: 4 }
 *   ]
 * };
 * ```
 */
export interface RewatchedShowEpisodeSummary {
  /** Unique identifier for the show */
  showId: number;

  /** Display title of the show */
  showTitle: string;

  /** Number of distinct episodes of this show that have been rewatched at least once */
  totalEpisodesRewatched: number;

  /** Sum of rewatch counts across all of this show's rewatched episodes */
  totalRewatchCount: number;

  /** This show's most-rewatched episodes, sorted descending by rewatchCount */
  topEpisodes: RewatchedEpisode[];
}

/**
 * Rewatch statistics for a single profile.
 * Tracks how many times shows, movies, and episodes have been rewatched and surfaces
 * the most frequently rewatched titles.
 *
 * @interface ProfileRewatchStats
 * @example
 * ```typescript
 * const stats: ProfileRewatchStats = {
 *   totalShowRewatches: 5,
 *   totalMovieRewatches: 12,
 *   totalEpisodeRewatches: 7,
 *   mostRewatchedShows: [{ showId: 101, showTitle: "Breaking Bad", rewatchCount: 2 }],
 *   mostRewatchedMovies: [{ movieId: 550, movieTitle: "Fight Club", rewatchCount: 3 }],
 *   mostRewatchedEpisodes: [{ episodeId: 5001, showId: 101, showTitle: "Breaking Bad", seasonNumber: 1, episodeNumber: 1, episodeTitle: "Pilot", rewatchCount: 2 }]
 * };
 * ```
 */
export interface ProfileRewatchStats {
  /** Total number of show rewatch cycles initiated across all shows for this profile */
  totalShowRewatches: number;

  /** Total number of movie rewatch cycles initiated across all movies for this profile */
  totalMovieRewatches: number;

  /** Total number of episode rewatches across all episodes for this profile */
  totalEpisodeRewatches: number;

  /** Shows rewatched most often by this profile, sorted descending by rewatchCount */
  mostRewatchedShows: RewatchedShow[];

  /** Movies rewatched most often by this profile, sorted descending by rewatchCount */
  mostRewatchedMovies: RewatchedMovie[];

  /** Episodes rewatched most often by this profile, sorted descending by rewatchCount */
  mostRewatchedEpisodes: RewatchedEpisode[];

  /** Shows ranked by total episode-rewatch volume, each with its own top rewatched episodes */
  topRewatchedShowsByEpisodes: RewatchedShowEpisodeSummary[];
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
 *   totalEpisodeRewatches: 22,
 *   mostRewatchedShows: [{ showId: 101, showTitle: "Breaking Bad", rewatchCount: 5, profileName: "Alice" }],
 *   mostRewatchedMovies: [{ movieId: 550, movieTitle: "Fight Club", rewatchCount: 8, profileName: "Bob" }],
 *   mostRewatchedEpisodes: [{ episodeId: 5001, showId: 101, showTitle: "Breaking Bad", seasonNumber: 1, episodeNumber: 1, episodeTitle: "Pilot", rewatchCount: 3, profileName: "Alice" }]
 * };
 * ```
 */
export interface AccountRewatchStats {
  /** Total show rewatch cycles across all profiles in the account */
  totalShowRewatches: number;

  /** Total movie rewatch cycles across all profiles in the account */
  totalMovieRewatches: number;

  /** Total episode rewatches across all profiles in the account */
  totalEpisodeRewatches: number;

  /** Most rewatched shows across all profiles, each entry attributed to a profile by name */
  mostRewatchedShows: Array<RewatchedShow & { profileName: string }>;

  /** Most rewatched movies across all profiles, each entry attributed to a profile by name */
  mostRewatchedMovies: Array<RewatchedMovie & { profileName: string }>;

  /** Most rewatched episodes across all profiles, each entry attributed to a profile by name */
  mostRewatchedEpisodes: Array<RewatchedEpisode & { profileName: string }>;

  /** Shows ranked by total episode-rewatch volume across all profiles, each entry attributed to a profile by name */
  topRewatchedShowsByEpisodes: Array<RewatchedShowEpisodeSummary & { profileName: string }>;
}
