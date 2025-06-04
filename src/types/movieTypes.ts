import { BaseResponse } from './responseTypes';
import { BinaryWatchStatusType } from './watchStatusTypes';

export interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  description: string;
  releaseDate: string;
  posterImage: string;
  backdropImage: string;
  runtime: number;
  userRating: number;
  mpaRating: string;
  genres: string;
  streamingServices: string;
}

export interface ProfileMovie extends Movie {
  profileId: number;
  watchStatus: BinaryWatchStatusType;
}

export interface AdminMovie extends Movie {
  lastUpdated: string;
}

export interface MovieReference {
  id: number;
  title: string;
  tmdbId: number;
}

export interface CreateMovieRequest {
  tmdb_id: number;
  title: string;
  description: string;
  release_date: string;
  runtime: number;
  poster_image: string;
  backdrop_image: string;
  user_rating: number;
  mpa_rating: string;
  streaming_service_ids?: number[];
  genre_ids?: number[];
}

export interface RecentUpcomingMoviesForProfile {
  recentMovies: MovieReference[];
  upcomingMovies: MovieReference[];
}

export interface AddMovieFavorite {
  favoritedMovie: ProfileMovie;
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

export interface RemoveMovieFavorite {
  removedMovie: MovieReference;
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

export interface UpdateMovieRequest extends CreateMovieRequest {
  id: number;
}

export interface FavoriteMovieResponse extends BaseResponse {
  favoritedMovie: ProfileMovie;
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

export interface RemoveMovieResponse extends BaseResponse {
  removedMovieReference: MovieReference;
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}
