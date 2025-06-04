import { MovieReference } from './movieTypes';
import { FullWatchStatusType } from './watchStatusTypes';

export interface ShowStatisticsResponse {
  total: number;
  watchStatusCounts: { watched: number; watching: number; notWatched: number; upToDate: number };
  genreDistribution: Record<string, number>;
  serviceDistribution: Record<string, number>;
  watchProgress: number;
}

export interface ShowProgress {
  showId: number;
  title: string;
  status: FullWatchStatusType;
  totalEpisodes: number;
  watchedEpisodes: number;
  percentComplete: number;
}

export interface ProfileWatchProgressResponse {
  totalEpisodes: number;
  watchedEpisodes: number;
  overallProgress: number;
  showsProgress: ShowProgress[];
}

export interface MovieStatisticsResponse {
  movieReferences: MovieReference[];
  total: number;
  watchStatusCounts: { watched: number; notWatched: number };
  genreDistribution: Record<string, number>;
  serviceDistribution: Record<string, number>;
  watchProgress: number;
}

export interface ProfileStatisticsResponse {
  profileId?: number;
  profileName?: string;
  showStatistics: ShowStatisticsResponse;
  movieStatistics: MovieStatisticsResponse;
  episodeWatchProgress: ProfileWatchProgressResponse;
}

export interface UniqueContentCounts {
  showCount: number;
  movieCount: number;
}

export interface AccountEpisodeProgress {
  totalEpisodes: number;
  watchedEpisodes: number;
  watchProgress: number;
}

export interface AccountStatisticsResponse {
  profileCount: number;
  uniqueContent: UniqueContentCounts;
  showStatistics: ShowStatisticsResponse;
  movieStatistics: MovieStatisticsResponse;
  episodeStatistics: AccountEpisodeProgress;
}
