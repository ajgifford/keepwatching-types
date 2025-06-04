import { AdminEpisode, ProfileEpisode } from './episodeTypes';
import { FullWatchStatusType } from './watchStatusTypes';

export interface Season {
  id: number;
  showId: number;
  tmdbId: number;
  name: string;
  overview: string;
  seasonNumber: number;
  releaseDate: string;
  posterImage: string;
  numberOfEpisodes: number;
}

export interface ProfileSeason extends Season {
  profileId: number;
  watchStatus: FullWatchStatusType;
  episodes: ProfileEpisode[];
}

export interface AdminSeason extends Season {
  createdAt: string;
  updatedAt: string;
}

export interface AdminSeasonWithEpisodes extends Season {
  episodes: AdminEpisode[];
}

export interface CreateSeasonRequest {
  show_id: number;
  tmdb_id: number;
  name: string;
  overview: string;
  season_number: number;
  release_date: string;
  poster_image: string;
  number_of_episodes: number;
}

export interface UpdateSeasonRequest extends CreateSeasonRequest {}
