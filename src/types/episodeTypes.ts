import { ContinueWatchingShow, ProfileShow } from './showTypes';
import { BinaryWatchStatusType } from './watchStatusTypes';

export interface Episode {
  id: number;
  tmdbId: number;
  seasonId: number;
  showId: number;
  seasonNumber: number;
  episodeNumber: number;
  episodeType: string;
  title: string;
  overview: string;
  runtime: number;
  airDate: string;
  stillImage: string;
}

export interface ProfileEpisode extends Episode {
  profileId: number;
  watchStatus: BinaryWatchStatusType;
}

export interface AdminEpisode extends Episode {
  createdAt: string;
  updatedAt: string;
}

export interface NextEpisode {
  episodeId: number;
  episodeTitle: string;
  overview: string;
  episodeNumber: number;
  seasonNumber: number;
  episodeStillImage: string;
  airDate: string;
  showId: number;
  showName: string;
  seasonId: number;
  posterImage: string;
  network: string;
  streamingServices: string;
  profileId: number;
}

export interface RecentUpcomingEpisode {
  profileId: number;
  showId: number;
  showName: string;
  streamingServices: string;
  network: string;
  episodeTitle: string;
  airDate: string;
  episodeNumber: number;
  seasonNumber: number;
  episodeStillImage: string;
}

export interface ShowEpisode {
  title: string;
  airDate: string;
  seasonNumber: number;
  episodeNumber: number;
}

export interface CreateEpisodeRequest {
  tmdb_id: number;
  show_id: number;
  season_id: number;
  season_number: number;
  episode_number: number;
  episode_type: string;
  title: string;
  overview: string;
  air_date: string;
  runtime: number;
  still_image: string;
}

export interface EpisodesForProfile {
  recentEpisodes: RecentUpcomingEpisode[];
  upcomingEpisodes: RecentUpcomingEpisode[];
  nextUnwatchedEpisodes: ContinueWatchingShow[];
}

export interface UpdateEpisodeRequest extends CreateEpisodeRequest {}
