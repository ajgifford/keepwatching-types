import { BaseResponse } from './responseTypes';

export interface DiscoverAndSearchResult {
  id: string;
  title: string;
  genres: string[];
  premiered: string;
  summary: string;
  image: string;
  rating: number;
  popularity?: number;
}

export interface DiscoverAndSearchResponse extends BaseResponse {
  results: DiscoverAndSearchResult[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
}

export enum MediaType {
  SHOW = 'tv',
  MOVIE = 'movie',
}

export type ShowType = 'movie' | 'series';

export type StreamingService = 'netflix' | 'disney' | 'hbo' | 'apple' | 'prime';

export type ChangeType = 'new' | 'upcoming' | 'expiring';
