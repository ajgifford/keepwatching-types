import { EpisodesForProfile, NextEpisode, ShowEpisode } from './episodeTypes';
import { BaseResponse } from './responseTypes';
import { ProfileSeason } from './seasonTypes';
import { FullWatchStatusType } from './watchStatusTypes';

export interface Show {
  id: number;
  tmdbId: number;
  title: string;
  description: string;
  releaseDate: string;
  posterImage: string;
  backdropImage: string;
  userRating: number;
  contentRating: string;
  streamingServices: string;
  genres: string;
  seasonCount: number;
  episodeCount: number;
  status: string;
  type: string;
  inProduction: boolean;
  lastAirDate: string | null;
  network: string | null;
}

export interface ProfileShow extends Show {
  profileId: number;
  watchStatus: FullWatchStatusType;
  lastEpisode: ShowEpisode | null;
  nextEpisode: ShowEpisode | null;
}

export interface ProfileShowWithSeasons extends ProfileShow {
  seasons?: ProfileSeason[];
}

export interface AdminShow extends Show {
  lastUpdated: string;
}

export interface ShowReference {
  id: number;
}

export interface ShowTMDBReference {
  id: number;
  tmdbId: number;
  title: string;
}

export interface ContinueWatchingShow {
  showId: number;
  showTitle: string;
  posterImage: string;
  lastWatched: string;
  episodes: NextEpisode[];
}

export interface SimilarOrRecommendedShow {
  id: number;
  title: string;
  genres: string[];
  premiered: string;
  summary: string;
  image: string;
  rating: number;
  popularity: number;
  country: string;
  language: string;
  inFavorites: boolean;
}

export interface ProfileAccountMapping {
  profileId: number;
  accountId: number;
}

export interface ProfilesForShowResponse {
  showId: number;
  profileAccountMappings: ProfileAccountMapping[];
  totalCount: number;
}

export interface CreateShowRequest {
  tmdb_id: number;
  title: string;
  description: string;
  release_date: string;
  poster_image: string;
  backdrop_image: string;
  user_rating: number;
  content_rating: string;
  season_count: number;
  episode_count: number;
  status: string;
  type: string;
  in_production: 0 | 1;
  last_air_date: string;
  last_episode_to_air: number | null;
  next_episode_to_air: number | null;
  network: string | null;
  streaming_service_ids: number[];
  genre_ids: number[];
}

export interface UpdateShowRequest extends CreateShowRequest {
  id: number;
}

export interface AddShowFavorite {
  favoritedShow: ProfileShow;
  episodes?: EpisodesForProfile;
}

export interface RemoveShowFavorite {
  removedShow: ShowTMDBReference;
  episodes: EpisodesForProfile;
}

export interface ShowsResponse extends BaseResponse {
  shows: ProfileShow[];
}

export interface ShowDetailsResponse extends BaseResponse {
  show: ProfileShowWithSeasons;
}

export interface UpdateWatchStatusResponse extends BaseResponse {
  nextUnwatchedEpisodes: ContinueWatchingShow[];
}

export interface EpisodesForProfileResponse extends BaseResponse {
  episodes: EpisodesForProfile;
}

export interface AddShowFavoriteResponse extends BaseResponse {
  addedShow: ProfileShow;
  episodes?: EpisodesForProfile;
}

export interface RemoveShowFavoriteResponse extends BaseResponse {
  removedShowReference: ShowTMDBReference;
  episodes: EpisodesForProfile;
}

export interface SimilarOrRecommendedShowsResponse extends BaseResponse {
  shows: SimilarOrRecommendedShow[];
}
