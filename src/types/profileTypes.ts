import { EpisodesForProfile, NextEpisode } from './episodeTypes';
import { ProfileMovie, RecentUpcomingMoviesForProfile } from './movieTypes';
import { BaseResponse } from './responseTypes';
import { ProfileShow } from './showTypes';
import { WatchStatusType } from './watchStatusTypes';

export interface Profile {
  id: number;
  accountId: number;
  name: string;
  image: string | undefined;
}

export interface AdminProfile extends Profile {
  createdAt: string;
  favoritedShows: number;
  favoritedMovies: number;
}

export interface CreateProfileRequest {
  accountId: number;
  name: string;
}

interface UpdateProfileRequest {
  id: number;
}

export interface UpdateProfileNameRequest extends UpdateProfileRequest {
  name: string;
}

export interface UpdateProfileImageRequest extends UpdateProfileRequest {
  image: string;
}

export interface ContentProfiles {
  profileId: number;
  name: string;
  image: string;
  accountId: number;
  accountName: string;
  watchStatus: WatchStatusType;
  addedDate: string;
  lastUpdated: string;
}

export interface AdminSeasonWatchProgress {
  seasonId: number;
  seasonNumber: number;
  name: string;
  status: WatchStatusType | null;
  episodeCount: number;
  watchedEpisodes: number;
  percentComplete: number;
}

export interface AdminProfileWatchProgress {
  profileId: number;
  name: string;
  showStatus: WatchStatusType | null;
  totalEpisodes: number;
  watchedEpisodes: number;
  percentComplete: number;
  seasons: AdminSeasonWatchProgress[];
}

export interface ProfileWithContent {
  profile: Profile;
  shows: ProfileShow[];
  episodes: EpisodesForProfile;
  movies: ProfileMovie[];
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}

export type AdminShowWatchProgressResult = AdminProfileWatchProgress[];

export interface ProfileResponse extends BaseResponse {
  profile: Profile;
}

export interface ProfilesResponse extends BaseResponse {
  profiles: Profile[];
}

export interface ProfileContentResponse extends BaseResponse {
  profileWithContent: ProfileWithContent;
}
