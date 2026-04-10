import { BaseResponse } from './responseTypes';

export type RatingContentType = 'show' | 'movie';

// --- Ratings (private, per-profile) ---

export interface ContentRating {
  id: number;
  profileId: number;
  contentType: RatingContentType;
  contentId: number;
  contentTitle: string;
  posterImage: string;
  rating: number; // 1–5
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertRatingRequest {
  contentType: RatingContentType;
  contentId: number;
  rating: number; // 1–5
  note?: string | null;
}

// --- Community Recommendations ---

export interface ProfileRecommendation {
  id: number;
  profileId: number;
  contentType: RatingContentType;
  contentId: number;
  rating: number | null;
  message: string | null;
  createdAt: string;
}

export interface CommunityRecommendation {
  id: number;
  contentType: RatingContentType;
  contentId: number;
  contentTitle: string;
  posterImage: string;
  releaseDate: string;
  genres: string;
  averageRating: number | null;
  ratingCount: number;
  messageCount: number;
  recommendationCount: number;
  createdAt: string;
}

export interface RecommendationDetail {
  profileName: string;
  rating: number | null;
  message: string | null;
  createdAt: string;
}

export interface SendRecommendationRequest {
  contentType: RatingContentType;
  contentId: number;
  rating?: number | null;
  message?: string | null;
}

// --- Admin views (attributed — never exposed to regular users) ---

export interface AdminContentRatingSummary {
  contentType: RatingContentType;
  contentId: number;
  averageRating: number; // rounded to 1 decimal
  ratingCount: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>; // count per star value
}

export interface AdminRatingWithProfile {
  id: number;
  profileId: number;
  profileName: string; // denormalized for display
  accountId: number;
  contentType: RatingContentType;
  contentId: number;
  contentTitle: string;
  rating: number;
  note: string; // only returned when note IS NOT NULL
  createdAt: string;
  updatedAt: string;
}

export interface AdminRecommendationWithProfile {
  id: number;
  profileId: number;
  profileName: string; // denormalized for display
  accountId: number;
  contentType: RatingContentType;
  contentId: number;
  contentTitle: string;
  posterImage: string;
  rating: number | null;
  message: string | null;
  recommendationCount: number; // total across all profiles for this content
  createdAt: string;
}

// Response wrappers
export interface RatingResponse extends BaseResponse {
  rating: ContentRating;
}
export interface RatingsResponse extends BaseResponse {
  ratings: ContentRating[];
}
export interface ProfileRecommendationResponse extends BaseResponse {
  recommendation: ProfileRecommendation;
}
export interface ProfileRecommendationsResponse extends BaseResponse {
  recommendations: ProfileRecommendation[];
}
export interface CommunityRecommendationsResponse extends BaseResponse {
  recommendations: CommunityRecommendation[];
}
export interface RecommendationDetailsResponse extends BaseResponse {
  details: RecommendationDetail[];
}
