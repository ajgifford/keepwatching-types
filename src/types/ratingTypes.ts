import { BaseResponse } from './responseTypes';

/**
 * Discriminator type for content that can be rated or recommended.
 *
 * @type {RatingContentType}
 * @example
 * ```typescript
 * const showRating: RatingContentType = 'show';
 * const movieRating: RatingContentType = 'movie';
 * ```
 */
export type RatingContentType = 'show' | 'movie';

// --- Ratings (private, per-profile) ---

/**
 * Represents a private rating given by a specific profile to a show or movie.
 * Ratings are personal to the profile and are not visible to other profiles.
 *
 * @interface ContentRating
 * @example
 * ```typescript
 * const rating: ContentRating = {
 *   id: 1,
 *   profileId: 42,
 *   contentType: 'show',
 *   contentId: 101,
 *   contentTitle: "Breaking Bad",
 *   posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   rating: 5,
 *   note: "One of the best shows ever made.",
 *   createdAt: "2024-01-15T10:30:00Z",
 *   updatedAt: "2024-01-15T10:30:00Z"
 * };
 * ```
 */
export interface ContentRating {
  /** Unique identifier for this rating record */
  id: number;

  /** ID of the profile that submitted the rating */
  profileId: number;

  /** Whether the rated content is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie being rated */
  contentId: number;

  /** Display title of the rated content */
  contentTitle: string;

  /** Poster image URL of the rated content for display */
  posterImage: string;

  /** Rating value on a 1–5 star scale */
  rating: number;

  /** Optional personal note accompanying the rating */
  note: string | null;

  /** ISO timestamp when the rating was first created */
  createdAt: string;

  /** ISO timestamp when the rating was last updated */
  updatedAt: string;
}

/**
 * Request payload for creating or updating a content rating.
 * If a rating for the given profile/content combination already exists it will
 * be replaced; otherwise a new rating record is created.
 *
 * @interface UpsertRatingRequest
 * @example
 * ```typescript
 * // Rate a show
 * const request: UpsertRatingRequest = {
 *   contentType: 'show',
 *   contentId: 101,
 *   rating: 4,
 *   note: "Great writing but the ending disappointed me."
 * };
 *
 * // Rate a movie with no note
 * const movieRequest: UpsertRatingRequest = {
 *   contentType: 'movie',
 *   contentId: 550,
 *   rating: 5
 * };
 * ```
 */
export interface UpsertRatingRequest {
  /** Whether the content being rated is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie being rated */
  contentId: number;

  /** Rating value on a 1–5 star scale */
  rating: number;

  /** Optional personal note to accompany the rating */
  note?: string | null;
}

// --- Community Recommendations ---

/**
 * Represents a recommendation made by a specific profile, optionally accompanied
 * by a rating and a personal message. Recommendations are shared within the
 * community but are attributed to the submitting profile.
 *
 * @interface ProfileRecommendation
 * @example
 * ```typescript
 * const recommendation: ProfileRecommendation = {
 *   id: 7,
 *   profileId: 42,
 *   contentType: 'movie',
 *   contentId: 550,
 *   rating: 5,
 *   message: "You have to watch this — it changed how I think about filmmaking.",
 *   createdAt: "2024-03-10T18:00:00Z"
 * };
 * ```
 */
export interface ProfileRecommendation {
  /** Unique identifier for this recommendation record */
  id: number;

  /** ID of the profile that submitted the recommendation */
  profileId: number;

  /** Whether the recommended content is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie being recommended */
  contentId: number;

  /** Optional rating (1–5) attached to this recommendation */
  rating: number | null;

  /** Optional personal message explaining the recommendation */
  message: string | null;

  /** ISO timestamp when the recommendation was created */
  createdAt: string;
}

/**
 * Aggregated community recommendation entry for a piece of content.
 * Combines all individual profile recommendations for a given show or movie
 * into a single summary record suitable for discovery and browsing.
 *
 * @interface CommunityRecommendation
 * @example
 * ```typescript
 * const communityRec: CommunityRecommendation = {
 *   id: 3,
 *   contentType: 'show',
 *   contentId: 101,
 *   contentTitle: "Breaking Bad",
 *   posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   releaseDate: "2008-01-20",
 *   genres: "Drama,Crime,Thriller",
 *   averageRating: 4.7,
 *   ratingCount: 15,
 *   messageCount: 8,
 *   recommendationCount: 20,
 *   createdAt: "2024-01-01T00:00:00Z"
 * };
 * ```
 */
export interface CommunityRecommendation {
  /** Unique identifier for this community recommendation record */
  id: number;

  /** Whether the recommended content is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie being recommended */
  contentId: number;

  /** Display title of the recommended content */
  contentTitle: string;

  /** Poster image URL of the recommended content for display */
  posterImage: string;

  /** Release date of the content in ISO format (YYYY-MM-DD) */
  releaseDate: string;

  /** Comma-separated list of genre names associated with the content */
  genres: string;

  /** Average star rating across all profiles that included a rating (null if no ratings) */
  averageRating: number | null;

  /** Total number of profiles that included a star rating with their recommendation */
  ratingCount: number;

  /** Total number of profiles that included a written message with their recommendation */
  messageCount: number;

  /** Total number of profiles that have recommended this content */
  recommendationCount: number;

  /** ISO timestamp when the first recommendation for this content was created */
  createdAt: string;
}

/**
 * Individual profile-level detail for a community recommendation.
 * Used to display the breakdown of who recommended a piece of content
 * and what they said, without exposing profile IDs.
 *
 * @interface RecommendationDetail
 * @example
 * ```typescript
 * const detail: RecommendationDetail = {
 *   profileName: "Alice",
 *   rating: 5,
 *   message: "Absolutely unmissable.",
 *   createdAt: "2024-03-10T18:00:00Z"
 * };
 * ```
 */
export interface RecommendationDetail {
  /** Display name of the profile that submitted this recommendation */
  profileName: string;

  /** Star rating (1–5) given by this profile, or null if no rating was provided */
  rating: number | null;

  /** Personal message from this profile, or null if no message was provided */
  message: string | null;

  /** ISO timestamp when this recommendation was created */
  createdAt: string;
}

/**
 * Request payload for sending a community recommendation for a show or movie.
 * An optional rating and message may be included to enrich the recommendation.
 *
 * @interface SendRecommendationRequest
 * @example
 * ```typescript
 * // Recommend with rating and message
 * const request: SendRecommendationRequest = {
 *   contentType: 'show',
 *   contentId: 101,
 *   rating: 5,
 *   message: "One of the greatest TV dramas ever made."
 * };
 *
 * // Recommend without a rating or message
 * const minimalRequest: SendRecommendationRequest = {
 *   contentType: 'movie',
 *   contentId: 550
 * };
 * ```
 */
export interface SendRecommendationRequest {
  /** Whether the content being recommended is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie being recommended */
  contentId: number;

  /** Optional star rating (1–5) to accompany the recommendation */
  rating?: number | null;

  /** Optional personal message to accompany the recommendation */
  message?: string | null;
}

// --- Admin views (attributed — never exposed to regular users) ---

/**
 * Administrative summary of all ratings for a specific piece of content.
 * Provides aggregate metrics and a per-star distribution breakdown.
 * Never exposed to regular users.
 *
 * @interface AdminContentRatingSummary
 * @example
 * ```typescript
 * const summary: AdminContentRatingSummary = {
 *   contentType: 'show',
 *   contentId: 101,
 *   averageRating: 4.3,
 *   ratingCount: 27,
 *   distribution: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 12 }
 * };
 * ```
 */
export interface AdminContentRatingSummary {
  /** Whether the content is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie */
  contentId: number;

  /** Average star rating rounded to one decimal place */
  averageRating: number;

  /** Total number of ratings submitted for this content */
  ratingCount: number;

  /** Count of ratings for each star value (1 through 5) */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

/**
 * Administrative view of a single rating with full attribution details.
 * Includes profile and account identifiers for cross-referencing.
 * Never exposed to regular users.
 *
 * @interface AdminRatingWithProfile
 * @example
 * ```typescript
 * const adminRating: AdminRatingWithProfile = {
 *   id: 1,
 *   profileId: 42,
 *   profileName: "Alice",
 *   accountId: 10,
 *   contentType: 'show',
 *   contentId: 101,
 *   contentTitle: "Breaking Bad",
 *   rating: 5,
 *   note: "Masterpiece.",
 *   createdAt: "2024-01-15T10:30:00Z",
 *   updatedAt: "2024-01-15T10:30:00Z"
 * };
 * ```
 */
export interface AdminRatingWithProfile {
  /** Unique identifier for this rating record */
  id: number;

  /** ID of the profile that submitted the rating */
  profileId: number;

  /** Display name of the profile, denormalized for admin display */
  profileName: string;

  /** ID of the account that owns the profile */
  accountId: number;

  /** Whether the rated content is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie being rated */
  contentId: number;

  /** Display title of the rated content */
  contentTitle: string;

  /** Star rating value (1–5) */
  rating: number;

  /** Personal note accompanying the rating (only present when note is not null) */
  note: string;

  /** ISO timestamp when the rating was created */
  createdAt: string;

  /** ISO timestamp when the rating was last updated */
  updatedAt: string;
}

/**
 * Administrative view of a single recommendation with full attribution details.
 * Includes profile and account identifiers and the platform-wide recommendation
 * count for the content. Never exposed to regular users.
 *
 * @interface AdminRecommendationWithProfile
 * @example
 * ```typescript
 * const adminRec: AdminRecommendationWithProfile = {
 *   id: 7,
 *   profileId: 42,
 *   profileName: "Alice",
 *   accountId: 10,
 *   contentType: 'movie',
 *   contentId: 550,
 *   contentTitle: "Fight Club",
 *   posterImage: "https://image.tmdb.org/t/p/w500/poster.jpg",
 *   rating: 5,
 *   message: "Changed my perspective on consumerism.",
 *   recommendationCount: 34,
 *   createdAt: "2024-03-10T18:00:00Z"
 * };
 * ```
 */
export interface AdminRecommendationWithProfile {
  /** Unique identifier for this recommendation record */
  id: number;

  /** ID of the profile that submitted the recommendation */
  profileId: number;

  /** Display name of the profile, denormalized for admin display */
  profileName: string;

  /** ID of the account that owns the profile */
  accountId: number;

  /** Whether the recommended content is a show or movie */
  contentType: RatingContentType;

  /** ID of the show or movie being recommended */
  contentId: number;

  /** Display title of the recommended content */
  contentTitle: string;

  /** Poster image URL of the recommended content */
  posterImage: string;

  /** Optional star rating (1–5) attached to this recommendation */
  rating: number | null;

  /** Optional personal message accompanying this recommendation */
  message: string | null;

  /** Total number of recommendations for this content across all profiles */
  recommendationCount: number;

  /** ISO timestamp when this recommendation was created */
  createdAt: string;
}

/**
 * API response wrapper for a single content rating.
 * Extends BaseResponse to include the rating in a standardized response format.
 *
 * @interface RatingResponse
 * @extends BaseResponse
 */
export interface RatingResponse extends BaseResponse {
  /** The content rating returned by the API */
  rating: ContentRating;
}

/**
 * API response wrapper for a collection of content ratings.
 * Extends BaseResponse to include an array of ratings in a standardized response format.
 *
 * @interface RatingsResponse
 * @extends BaseResponse
 */
export interface RatingsResponse extends BaseResponse {
  /** Array of content ratings returned by the API */
  ratings: ContentRating[];
}

/**
 * API response wrapper for a single profile recommendation.
 * Extends BaseResponse to include the recommendation in a standardized response format.
 *
 * @interface ProfileRecommendationResponse
 * @extends BaseResponse
 */
export interface ProfileRecommendationResponse extends BaseResponse {
  /** The profile recommendation returned by the API */
  recommendation: ProfileRecommendation;
}

/**
 * API response wrapper for a collection of profile recommendations.
 * Extends BaseResponse to include an array of recommendations in a standardized response format.
 *
 * @interface ProfileRecommendationsResponse
 * @extends BaseResponse
 */
export interface ProfileRecommendationsResponse extends BaseResponse {
  /** Array of profile recommendations returned by the API */
  recommendations: ProfileRecommendation[];
}

/**
 * API response wrapper for community recommendations.
 * Extends BaseResponse to include an array of aggregated community
 * recommendations in a standardized response format.
 *
 * @interface CommunityRecommendationsResponse
 * @extends BaseResponse
 */
export interface CommunityRecommendationsResponse extends BaseResponse {
  /** Array of community recommendations returned by the API */
  recommendations: CommunityRecommendation[];
}

/**
 * API response wrapper for the per-profile details of a community recommendation.
 * Extends BaseResponse to include an array of individual recommendation details
 * in a standardized response format.
 *
 * @interface RecommendationDetailsResponse
 * @extends BaseResponse
 */
export interface RecommendationDetailsResponse extends BaseResponse {
  /** Array of individual profile recommendation details */
  details: RecommendationDetail[];
}
