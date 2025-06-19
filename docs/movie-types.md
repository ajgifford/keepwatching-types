[< Back](../README.md)

# Movie Types Documentation

This module provides TypeScript type definitions for movie-related operations in the KeepWatching application. It
handles movie data structures, watch status management, profile associations, and API request/response patterns for
movie content.

## Overview

The movie types module defines interfaces for:

- Core movie data structures and metadata
- Profile-specific movie associations with watch status
- Administrative movie management
- Movie discovery and recommendation systems
- API request/response patterns for movie operations
- Streaming service and genre associations
- Detailed production metadata and financial information

## Core Interfaces

### `Movie`

The foundational interface representing a movie in the KeepWatching application. Contains comprehensive metadata about
the film including ratings, release information, and streaming availability.

**Properties:**

- `id: number` - Unique identifier for the movie in the application database
- `tmdbId: number` - The Movie Database (TMDB) ID for external API integration
- `title: string` - Display title of the movie
- `description: string` - Plot summary or synopsis
- `releaseDate: string` - Release date in ISO format (YYYY-MM-DD)
- `posterImage: string` - URL to the movie's poster image
- `backdropImage: string` - URL to the movie's backdrop/hero image
- `runtime: number` - Movie duration in minutes
- `userRating: number` - Average user rating (typically 0-10 scale)
- `mpaRating: string` - Motion Picture Association rating (G, PG, PG-13, R, etc.)
- `genres: string` - Comma-separated list of genre names
- `streamingServices: string` - Comma-separated list of available streaming platforms

**Usage Example:**

```typescript
const movie: Movie = {
  id: 1,
  tmdbId: 27205,
  title: 'Inception',
  description: 'A thief who steals corporate secrets through dream-sharing technology...',
  releaseDate: '2010-07-16',
  posterImage: 'https://image.tmdb.org/t/p/w500/inception_poster.jpg',
  backdropImage: 'https://image.tmdb.org/t/p/original/inception_backdrop.jpg',
  runtime: 148,
  userRating: 8.8,
  mpaRating: 'PG-13',
  genres: 'Action, Drama, Sci-Fi, Thriller',
  streamingServices: 'Netflix, HBO Max',
};
```

### `ProfileMovie`

Extended movie interface that associates movies with specific user profiles and includes watch status tracking. This
interface enables personalized movie libraries and viewing progress management.

**Additional Properties:**

- `profileId: number` - ID of the user profile that owns this movie association
- `watchStatus: WatchStatus` - Current watch status (UNAIRED, WATCHED or NOT_WATCHED)

**Key Features:**

- **Profile Association**: Links movies to specific user profiles
- **Binary Status**: Movies can only be watched or not watched (no partial viewing)
- **Personalization**: Enables different watch statuses across multiple profiles

**Usage Example:**

```typescript
const profileMovie: ProfileMovie = {
  id: 1,
  tmdbId: 27205,
  title: 'Inception',
  description: 'A thief who steals corporate secrets through dream-sharing technology...',
  releaseDate: '2010-07-16',
  posterImage: 'https://image.tmdb.org/t/p/w500/inception_poster.jpg',
  backdropImage: 'https://image.tmdb.org/t/p/original/inception_backdrop.jpg',
  runtime: 148,
  userRating: 8.8,
  mpaRating: 'PG-13',
  genres: 'Action, Drama, Sci-Fi, Thriller',
  streamingServices: 'Netflix, HBO Max',
  profileId: 123,
  watchStatus: 'WATCHED',
};
```

### `ProfileMovieWithDetails` _(NEW)_

Extended profile movie interface that includes comprehensive production metadata, financial information, and creative
credits. This interface combines user-specific movie data with detailed production information for enhanced movie
analytics, detailed views, and industry insights.

**Additional Properties:**

- `director: string` - Name(s) of the movie's director(s)
- `productionCompanies: string` - Comma-separated list of production company names
- `budget: number` - Total production budget in USD
- `revenue: number` - Total worldwide box office revenue in USD

**Usage Example:**

```typescript
const detailedMovie: ProfileMovieWithDetails = {
  // All ProfileMovie properties
  id: 1,
  tmdbId: 27205,
  title: 'Inception',
  description: 'A thief who steals corporate secrets through dream-sharing technology...',
  releaseDate: '2010-07-16',
  posterImage: 'https://image.tmdb.org/t/p/w500/inception_poster.jpg',
  backdropImage: 'https://image.tmdb.org/t/p/original/inception_backdrop.jpg',
  runtime: 148,
  userRating: 8.8,
  mpaRating: 'PG-13',
  genres: 'Action, Drama, Sci-Fi, Thriller',
  streamingServices: 'Netflix, HBO Max',
  profileId: 123,
  watchStatus: 'WATCHED',

  // Additional detailed properties
  director: 'Christopher Nolan',
  productionCompanies: 'Warner Bros. Pictures, Legendary Entertainment, Syncopy',
  budget: 160000000, // $160 million
  revenue: 836836967, // $836.8 million worldwide
};
```

### `AdminMovie`

Administrative interface for movie management that extends the base movie with system metadata. Used for content
management, database administration, and tracking content lifecycle.

**Additional Properties:**

- `lastUpdated: string` - ISO timestamp of the last modification to the movie record

**Usage Example:**

```typescript
const adminMovie: AdminMovie = {
  id: 1,
  tmdbId: 27205,
  title: 'Inception',
  description: 'A thief who steals corporate secrets...',
  releaseDate: '2010-07-16',
  posterImage: 'https://image.tmdb.org/t/p/w500/inception_poster.jpg',
  backdropImage: 'https://image.tmdb.org/t/p/original/inception_backdrop.jpg',
  runtime: 148,
  userRating: 8.8,
  mpaRating: 'PG-13',
  genres: 'Action, Drama, Sci-Fi, Thriller',
  streamingServices: 'Netflix, HBO Max',
  lastUpdated: '2024-01-15T10:30:00Z',
};
```

## Reference Types

### `MovieReference`

Lightweight reference interface for movies that contains only essential identification information. Used in contexts
where full movie data is not needed, such as lists, recommendations, or cross-references.

**Properties:**

- `id: number` - Application database ID
- `title: string` - Movie title for display
- `tmdbId: number` - External database reference

**Usage Example:**

```typescript
const movieRef: MovieReference = {
  id: 1,
  title: 'Inception',
  tmdbId: 27205,
};

// Used in recommendation lists
const recentMovies: MovieReference[] = [
  { id: 1, title: 'Inception', tmdbId: 27205 },
  { id: 2, title: 'The Matrix', tmdbId: 603 },
  { id: 3, title: 'Interstellar', tmdbId: 157336 },
];
```

## Recommendation and Discovery Types

### `SimilarOrRecommendedMovie` _(NEW)_

Interface for movie recommendations and similar content suggestions. Contains comprehensive metadata for evaluating and
presenting content recommendations.

**Properties:**

- `id: number` - Movie ID for reference and navigation
- `title: string` - Movie title for display
- `genres: string[]` - Array of genre names associated with the movie
- `premiered: string` - Premiere date in ISO format (YYYY-MM-DD)
- `summary: string` - Brief description or synopsis of the movie
- `image: string` - Movie image URL for visual display
- `rating: number` - Movie rating score (typically 0-10 scale)
- `popularity: number` - Popularity score indicating audience engagement
- `country: string` - Country of origin (ISO country code or full name)
- `language: string` - Primary language (ISO language code)
- `inFavorites: boolean` - Whether this movie is already in the user's favorites

**Usage Example:**

```typescript
const recommendation: SimilarOrRecommendedMovie = {
  id: 2,
  title: 'The Matrix',
  genres: ['Action', 'Sci-Fi'],
  premiered: '1999-03-31',
  summary: 'A computer programmer discovers reality is a simulation...',
  image: 'https://image.tmdb.org/t/p/w500/matrix_poster.jpg',
  rating: 8.7,
  popularity: 92.3,
  country: 'US',
  language: 'en',
  inFavorites: false,
};
```

## Request Types

### `CreateMovieRequest`

Defines the payload structure for adding new movies to the application database. Uses snake_case field names for
database compatibility and includes optional associations for genres and streaming services.

**Required Fields:**

- `tmdb_id: number` - External database identifier
- `title: string` - Movie title
- `description: string` - Plot description
- `release_date: string` - Release date in ISO format
- `runtime: number` - Duration in minutes
- `poster_image: string` - Poster image URL
- `backdrop_image: string` - Backdrop image URL
- `user_rating: number` - Average rating
- `mpa_rating: string` - Content rating

**Optional Fields:**

- `streaming_service_ids?: number[]` - Array of streaming service IDs
- `genre_ids?: number[]` - Array of genre IDs

**Usage Example:**

```typescript
const createRequest: CreateMovieRequest = {
  tmdb_id: 27205,
  title: 'Inception',
  description:
    'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  release_date: '2010-07-16',
  runtime: 148,
  poster_image: 'https://image.tmdb.org/t/p/w500/inception_poster.jpg',
  backdrop_image: 'https://image.tmdb.org/t/p/original/inception_backdrop.jpg',
  user_rating: 8.8,
  mpa_rating: 'PG-13',
  streaming_service_ids: [1, 3], // Netflix, HBO Max
  genre_ids: [1, 2, 4, 8], // Action, Drama, Sci-Fi, Thriller
};
```

### `UpdateMovieRequest`

Enables modification of existing movies by extending the creation request with an ID field. All fields from the creation
request can be updated, allowing for comprehensive movie management.

**Additional Field:**

- `id: number` - ID of the movie to update

**Usage Example:**

```typescript
const updateRequest: UpdateMovieRequest = {
  id: 1,
  tmdb_id: 27205,
  title: "Inception (Director's Cut)",
  description: 'Enhanced version with additional scenes and commentary...',
  release_date: '2010-07-16',
  runtime: 155, // Extended runtime
  poster_image: 'https://image.tmdb.org/t/p/w500/inception_poster_dc.jpg',
  backdrop_image: 'https://image.tmdb.org/t/p/original/inception_backdrop_dc.jpg',
  user_rating: 9.0, // Updated rating
  mpa_rating: 'PG-13',
  streaming_service_ids: [1, 3, 5], // Added Disney+
  genre_ids: [1, 2, 4, 8],
};
```

## Profile Integration Types

### `RecentUpcomingMoviesForProfile`

Specialized interface for organizing movies by release timing relative to the current date. Provides quick access to
recently released and upcoming movies for enhanced user experience.

**Properties:**

- `recentMovies: MovieReference[]` - Movies released in the recent past
- `upcomingMovies: MovieReference[]` - Movies scheduled for future release

**Usage Example:**

```typescript
const movieTimeline: RecentUpcomingMoviesForProfile = {
  recentMovies: [
    { id: 100, title: 'Top Gun: Maverick', tmdbId: 361743 },
    { id: 101, title: 'Thor: Love and Thunder', tmdbId: 616037 },
  ],
  upcomingMovies: [
    { id: 102, title: 'Avatar: The Way of Water', tmdbId: 76600 },
    { id: 103, title: 'Black Panther: Wakanda Forever', tmdbId: 505642 },
  ],
};
```

### `AddMovieFavorite`

Response interface for adding movies to a user's favorites that includes both the newly favorited movie and updated
timeline information.

**Properties:**

- `favoritedMovie: ProfileMovie` - The movie that was added to favorites
- `recentUpcomingMovies: RecentUpcomingMoviesForProfile` - Updated timeline data

**Usage Example:**

```typescript
const favoriteResult: AddMovieFavorite = {
  favoritedMovie: {
    id: 1,
    tmdbId: 27205,
    title: 'Inception',
    // ... other movie properties
    profileId: 123,
    watchStatus: 'NOT_WATCHED',
  },
  recentUpcomingMovies: {
    recentMovies: [{ id: 100, title: 'Top Gun: Maverick', tmdbId: 361743 }],
    upcomingMovies: [{ id: 102, title: 'Avatar: The Way of Water', tmdbId: 76600 }],
  },
};
```

### `RemoveMovieFavorite`

Response interface for removing movies from favorites that provides reference to the removed movie and updated timeline.

**Properties:**

- `removedMovie: MovieReference` - Reference to the movie that was removed
- `recentUpcomingMovies: RecentUpcomingMoviesForProfile` - Updated timeline data

**Usage Example:**

```typescript
const removeResult: RemoveMovieFavorite = {
  removedMovie: {
    id: 1,
    title: 'Inception',
    tmdbId: 27205,
  },
  recentUpcomingMovies: {
    recentMovies: [{ id: 100, title: 'Top Gun: Maverick', tmdbId: 361743 }],
    upcomingMovies: [{ id: 102, title: 'Avatar: The Way of Water', tmdbId: 76600 }],
  },
};
```

## Response Types

### `FavoriteMovieResponse`

API response wrapper for movie favorite operations that extends BaseResponse to include the favorited movie and updated
timeline information.

**Structure:**

```typescript
interface FavoriteMovieResponse extends BaseResponse {
  message: string; // From BaseResponse
  favoritedMovie: ProfileMovie;
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}
```

**Usage Example:**

```typescript
const favoriteResponse: FavoriteMovieResponse = {
  message: 'Movie added to favorites successfully',
  favoritedMovie: {
    id: 1,
    tmdbId: 27205,
    title: 'Inception',
    // ... other properties
    profileId: 123,
    watchStatus: 'NOT_WATCHED',
  },
  recentUpcomingMovies: {
    recentMovies: [{ id: 100, title: 'Top Gun: Maverick', tmdbId: 361743 }],
    upcomingMovies: [{ id: 102, title: 'Avatar: The Way of Water', tmdbId: 76600 }],
  },
};
```

### `RemoveMovieResponse`

API response wrapper for movie removal operations that includes reference to the removed movie and updated timeline.

**Structure:**

```typescript
interface RemoveMovieResponse extends BaseResponse {
  message: string; // From BaseResponse
  removedMovieReference: MovieReference;
  recentUpcomingMovies: RecentUpcomingMoviesForProfile;
}
```

**Usage Example:**

```typescript
const removeResponse: RemoveMovieResponse = {
  message: 'Movie removed from favorites successfully',
  removedMovieReference: {
    id: 1,
    title: 'Inception',
    tmdbId: 27205,
  },
  recentUpcomingMovies: {
    recentMovies: [{ id: 100, title: 'Top Gun: Maverick', tmdbId: 361743 }],
    upcomingMovies: [{ id: 102, title: 'Avatar: The Way of Water', tmdbId: 76600 }],
  },
};
```

### `MovieDetailsResponse` _(NEW)_

API response wrapper for comprehensive movie details operations that includes detailed movie information and related
content recommendations. This response extends BaseResponse to provide a complete movie viewing experience with detailed
metadata, user context, and content discovery features.

**Structure:**

```typescript
interface MovieDetailsResponse extends BaseResponse {
  message: string; // From BaseResponse
  movie: ProfileMovieWithDetails; // Comprehensive movie data
  recommendedMovies: SimilarOrRecommendedMovie[]; // Personalized recommendations
  similarMovies: SimilarOrRecommendedMovie[]; // Similar content
}
```

**Usage Example:**

```typescript
const movieDetailsResponse: MovieDetailsResponse = {
  message: 'Movie details retrieved successfully',
  movie: {
    id: 1,
    tmdbId: 27205,
    title: 'Inception',
    description: 'A thief who steals corporate secrets...',
    releaseDate: '2010-07-16',
    posterImage: 'https://image.tmdb.org/t/p/w500/inception_poster.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/inception_backdrop.jpg',
    runtime: 148,
    userRating: 8.8,
    mpaRating: 'PG-13',
    genres: 'Action, Drama, Sci-Fi, Thriller',
    streamingServices: 'Netflix, HBO Max',
    profileId: 123,
    watchStatus: 'WATCHED',
    director: 'Christopher Nolan',
    productionCompanies: 'Warner Bros. Pictures, Legendary Entertainment',
    budget: 160000000,
    revenue: 836836967,
  },
  recommendedMovies: [
    {
      id: 2,
      title: 'The Matrix',
      genres: ['Action', 'Sci-Fi'],
      premiered: '1999-03-31',
      summary: 'A computer programmer discovers reality is a simulation...',
      image: 'https://image.tmdb.org/t/p/w500/matrix_poster.jpg',
      rating: 8.7,
      popularity: 92.3,
      country: 'US',
      language: 'en',
      inFavorites: false,
    },
  ],
  similarMovies: [
    {
      id: 3,
      title: 'Shutter Island',
      genres: ['Drama', 'Mystery', 'Thriller'],
      premiered: '2010-02-19',
      summary: 'A U.S. Marshal investigates a psychiatric facility...',
      image: 'https://image.tmdb.org/t/p/w500/shutter_island_poster.jpg',
      rating: 8.2,
      popularity: 78.5,
      country: 'US',
      language: 'en',
      inFavorites: true,
    },
  ],
};
```

## Real-World Usage Examples

### Controller Implementation

```typescript
import { CreateMovieRequest, MovieReference, UpdateMovieRequest } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class MovieController {
  constructor(private movieService: MovieService) {}

  // POST /api/v1/admin/movies
  async createMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: CreateMovieRequest = req.body;
      const movie = await this.movieService.createMovie(request);

      res.status(201).json({
        message: 'Movie created successfully',
        movie,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/admin/movies/:id
  async updateMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const request: UpdateMovieRequest = {
        id,
        ...req.body,
      };

      const movie = await this.movieService.updateMovie(request);

      res.status(200).json({
        message: 'Movie updated successfully',
        movie,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/movies/:id/details/:profileId
  async getMovieDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const movieId = parseInt(req.params.id);
      const profileId = parseInt(req.params.profileId);

      const movieDetails = await this.movieService.getMovieDetails(movieId, profileId);

      const response: MovieDetailsResponse = {
        message: 'Movie details retrieved successfully',
        movie: movieDetails.movie,
        recommendedMovies: movieDetails.recommendedMovies,
        similarMovies: movieDetails.similarMovies,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/profiles/:profileId/movies/:movieId/favorite
  async addMovieToFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const movieId = parseInt(req.params.movieId);

      const result = await this.movieService.addToFavorites(profileId, movieId);

      const response: FavoriteMovieResponse = {
        message: 'Movie added to favorites successfully',
        favoritedMovie: result.favoritedMovie,
        recentUpcomingMovies: result.recentUpcomingMovies,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/v1/profiles/:profileId/movies/:movieId/favorite
  async removeMovieFromFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const movieId = parseInt(req.params.movieId);

      const result = await this.movieService.removeFromFavorites(profileId, movieId);

      const response: RemoveMovieResponse = {
        message: 'Movie removed from favorites successfully',
        removedMovieReference: result.removedMovie,
        recentUpcomingMovies: result.recentUpcomingMovies,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/profiles/:profileId/movies
  async getProfileMovies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const movies = await this.movieService.getMoviesForProfile(profileId);

      res.status(200).json({
        message: 'Profile movies retrieved successfully',
        movies,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/movies/timeline/:profileId
  async getMovieTimeline(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const timeline = await this.movieService.getMovieTimeline(profileId);

      res.status(200).json({
        message: 'Movie timeline retrieved successfully',
        timeline,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/movies/:id/recommendations/:profileId
  async getMovieRecommendations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const movieId = parseInt(req.params.id);
      const profileId = parseInt(req.params.profileId);

      const recommendations = await this.movieService.getMovieRecommendations(movieId, profileId);

      res.status(200).json({
        message: 'Movie recommendations retrieved successfully',
        recommendedMovies: recommendations.recommended,
        similarMovies: recommendations.similar,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

### Service Implementation

```typescript
import {
  AddMovieFavorite,
  CreateMovieRequest,
  Movie,
  MovieDetailsResponse,
  ProfileMovie,
  ProfileMovieWithDetails,
  RecentUpcomingMoviesForProfile,
  RemoveMovieFavorite,
  SimilarOrRecommendedMovie,
  UpdateMovieRequest,
} from '@ajgifford/keepwatching-types';

export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private profileMovieRepository: ProfileMovieRepository,
    private recommendationService: RecommendationService,
  ) {}

  async createMovie(request: CreateMovieRequest): Promise<Movie> {
    // Validate TMDB ID doesn't already exist
    const existingMovie = await this.movieRepository.findByTmdbId(request.tmdb_id);
    if (existingMovie) {
      throw new Error('Movie with this TMDB ID already exists');
    }

    // Create movie record
    const movieData = {
      tmdbId: request.tmdb_id,
      title: request.title,
      description: request.description,
      releaseDate: request.release_date,
      posterImage: request.poster_image,
      backdropImage: request.backdrop_image,
      runtime: request.runtime,
      userRating: request.user_rating,
      mpaRating: request.mpa_rating,
      genres: '', // Will be populated from genre_ids
      streamingServices: '', // Will be populated from streaming_service_ids
    };

    const movie = await this.movieRepository.create(movieData);

    // Associate genres and streaming services if provided
    if (request.genre_ids) {
      await this.associateGenres(movie.id, request.genre_ids);
    }

    if (request.streaming_service_ids) {
      await this.associateStreamingServices(movie.id, request.streaming_service_ids);
    }

    // Return movie with populated associations
    return await this.movieRepository.findByIdWithAssociations(movie.id);
  }

  async getMovieDetails(
    movieId: number,
    profileId: number,
  ): Promise<{
    movie: ProfileMovieWithDetails;
    recommendedMovies: SimilarOrRecommendedMovie[];
    similarMovies: SimilarOrRecommendedMovie[];
  }> {
    // Get detailed movie information
    const movie = await this.getProfileMovieWithDetails(movieId, profileId);

    // Get recommendations and similar movies in parallel
    const [recommendedMovies, similarMovies] = await Promise.all([
      this.recommendationService.getRecommendedMovies(movieId, profileId),
      this.recommendationService.getSimilarMovies(movieId, profileId),
    ]);

    return {
      movie,
      recommendedMovies,
      similarMovies,
    };
  }

  async addToFavorites(profileId: number, movieId: number): Promise<AddMovieFavorite> {
    // Check if movie is already favorited
    const existingFavorite = await this.profileMovieRepository.findByProfileAndMovie(profileId, movieId);
    if (existingFavorite) {
      throw new Error('Movie is already in favorites');
    }

    // Add to favorites
    const profileMovie = await this.profileMovieRepository.create({
      profileId,
      movieId,
      watchStatus: 'NOT_WATCHED',
    });

    // Get full movie data
    const favoritedMovie = await this.getProfileMovie(profileId, movieId);

    // Get updated timeline
    const recentUpcomingMovies = await this.getMovieTimeline(profileId);

    return {
      favoritedMovie,
      recentUpcomingMovies,
    };
  }

  async removeFromFavorites(profileId: number, movieId: number): Promise<RemoveMovieFavorite> {
    // Check if movie is favorited
    const favorite = await this.profileMovieRepository.findByProfileAndMovie(profileId, movieId);
    if (!favorite) {
      throw new Error('Movie is not in favorites');
    }

    // Get movie reference before deletion
    const movie = await this.movieRepository.findById(movieId);
    const removedMovie: MovieReference = {
      id: movie.id,
      title: movie.title,
      tmdbId: movie.tmdbId,
    };

    // Remove from favorites
    await this.profileMovieRepository.delete(favorite.id);

    // Get updated timeline
    const recentUpcomingMovies = await this.getMovieTimeline(profileId);

    return {
      removedMovie,
      recentUpcomingMovies,
    };
  }

  async getMovieTimeline(profileId: number): Promise<RecentUpcomingMoviesForProfile> {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

    const [recentMovies, upcomingMovies] = await Promise.all([
      this.movieRepository.findRecentMovies(threeMonthsAgo, now, profileId),
      this.movieRepository.findUpcomingMovies(now, threeMonthsFromNow, profileId),
    ]);

    return {
      recentMovies: recentMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        tmdbId: movie.tmdbId,
      })),
      upcomingMovies: upcomingMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        tmdbId: movie.tmdbId,
      })),
    };
  }

  private async getProfileMovie(profileId: number, movieId: number): Promise<ProfileMovie> {
    const movie = await this.movieRepository.findById(movieId);
    const profileMovie = await this.profileMovieRepository.findByProfileAndMovie(profileId, movieId);

    return {
      ...movie,
      profileId: profileMovie.profileId,
      watchStatus: profileMovie.watchStatus,
    };
  }

  private async associateGenres(movieId: number, genreIds: number[]): Promise<void> {
    // Implementation would associate movie with genres
    // and update the genres string field
    for (const genreId of genreIds) {
      await this.movieRepository.addGenre(movieId, genreId);
    }
  }

  private async associateStreamingServices(movieId: number, serviceIds: number[]): Promise<void> {
    // Implementation would associate movie with streaming services
    // and update the streamingServices string field
    for (const serviceId of serviceIds) {
      await this.movieRepository.addStreamingService(movieId, serviceId);
    }
  }
}
```

## Integration Patterns

### Watch Status Management

```typescript
import { WatchStatus } from '@ajgifford/keepwatching-types';

class MovieWatchStatusService {
  async updateWatchStatus(profileId: number, movieId: number, newStatus: WatchStatus): Promise<ProfileMovie> {
    // Update the status
    await this.profileMovieRepository.updateWatchStatus(profileId, movieId, newStatus);

    // Return updated movie
    return await this.getProfileMovie(profileId, movieId);
  }

  async toggleWatchStatus(profileId: number, movieId: number): Promise<ProfileMovie> {
    const profileMovie = await this.getProfileMovie(profileId, movieId);
    const newStatus: WatchStatus =
      profileMovie.watchStatus === WatchStatus.WATCHED ? WatchStatus.NOT_WATCHED : WatchStatus.WATCHED;

    return await this.updateWatchStatus(profileId, movieId, newStatus);
  }

  async markAsWatched(profileId: number, movieId: number): Promise<ProfileMovie> {
    return await this.updateWatchStatus(profileId, movieId, WatchStatus.WATCHED);
  }

  async markAsNotWatched(profileId: number, movieId: number): Promise<ProfileMovie> {
    return await this.updateWatchStatus(profileId, movieId, WatchStatus.NOT_WATCHED);
  }
}
```

### External API Integration

```typescript
import { CreateMovieRequest } from '@ajgifford/keepwatching-types';

class TMDBIntegrationService {
  async importMovieFromTMDB(tmdbId: number): Promise<CreateMovieRequest> {
    const tmdbMovie = await this.fetchMovieFromTMDB(tmdbId);

    // Transform TMDB data to our format
    const createRequest: CreateMovieRequest = {
      tmdb_id: tmdbMovie.id,
      title: tmdbMovie.title,
      description: tmdbMovie.overview,
      release_date: tmdbMovie.release_date,
      runtime: tmdbMovie.runtime,
      poster_image: this.buildImageUrl(tmdbMovie.poster_path),
      backdrop_image: this.buildImageUrl(tmdbMovie.backdrop_path),
      user_rating: tmdbMovie.vote_average,
      mpa_rating: await this.getMPARating(tmdbMovie.id),
      genre_ids: tmdbMovie.genre_ids,
      streaming_service_ids: await this.getStreamingServices(tmdbMovie.id),
    };

    return createRequest;
  }

  private async fetchMovieFromTMDB(tmdbId: number): Promise<any> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${this.apiKey}`);
    return await response.json();
  }

  private buildImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  private async getMPARating(tmdbId: number): Promise<string> {
    // Fetch content rating from TMDB
    const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/release_dates?api_key=${this.apiKey}`);
    const data = await response.json();

    // Find US rating
    const usRelease = data.results.find((release: any) => release.iso_3166_1 === 'US');
    return usRelease?.release_dates[0]?.certification || 'NR';
  }

  private async getStreamingServices(tmdbId: number): Promise<number[]> {
    // Implementation would map TMDB watch providers to internal service IDs
    return [];
  }
}
```

### Recommendation Engine Integration

```typescript
import { SimilarOrRecommendedMovie } from '@ajgifford/keepwatching-types';

class MovieRecommendationService {
  async getRecommendedMovies(movieId: number, profileId: number): Promise<SimilarOrRecommendedMovie[]> {
    // Get user's viewing history and preferences
    const userProfile = await this.getUserPreferences(profileId);
    const baseMovie = await this.movieRepository.findById(movieId);

    // Generate personalized recommendations based on:
    // - User's favorite genres
    // - Previously watched movies
    // - Similar user preferences
    const recommendations = await this.generatePersonalizedRecommendations(baseMovie, userProfile);

    return recommendations.map((movie) => this.transformToRecommendation(movie, profileId));
  }

  async getSimilarMovies(movieId: number, profileId: number): Promise<SimilarOrRecommendedMovie[]> {
    const baseMovie = await this.movieRepository.findById(movieId);

    // Find movies with similar attributes:
    // - Same genres
    // - Same director
    // - Similar release period
    // - Similar ratings
    const similarMovies = await this.findSimilarMovies(baseMovie);

    return Promise.all(
      similarMovies.map(async (movie) => {
        const inFavorites = await this.isInUserFavorites(movie.id, profileId);
        return this.transformToRecommendation(movie, profileId, inFavorites);
      }),
    );
  }

  private async transformToRecommendation(
    movie: any,
    profileId: number,
    inFavorites?: boolean,
  ): Promise<SimilarOrRecommendedMovie> {
    const userHasFavorited = inFavorites ?? (await this.isInUserFavorites(movie.id, profileId));

    return {
      id: movie.id,
      title: movie.title,
      genres: movie.genres.split(',').map((g: string) => g.trim()),
      premiered: movie.releaseDate,
      summary: movie.description,
      image: movie.posterImage,
      rating: movie.userRating,
      popularity: movie.popularity || 0,
      country: movie.country || 'US',
      language: movie.language || 'en',
      inFavorites: userHasFavorited,
    };
  }

  private async isInUserFavorites(movieId: number, profileId: number): Promise<boolean> {
    const favorite = await this.profileMovieRepository.findByProfileAndMovie(profileId, movieId);
    return !!favorite;
  }

  private async getUserPreferences(profileId: number): Promise<any> {
    // Analyze user's viewing history to determine preferences
    const watchedMovies = await this.profileMovieRepository.findWatchedByProfile(profileId);

    // Calculate genre preferences, favorite directors, etc.
    return this.analyzeUserPreferences(watchedMovies);
  }

  private async generatePersonalizedRecommendations(baseMovie: any, userProfile: any): Promise<any[]> {
    // Implementation would use machine learning or collaborative filtering
    // to generate personalized recommendations
    return [];
  }

  private async findSimilarMovies(baseMovie: any): Promise<any[]> {
    // Find movies with similar characteristics
    return await this.movieRepository.findSimilarMovies(baseMovie);
  }

  private analyzeUserPreferences(watchedMovies: any[]): any {
    // Analyze viewing patterns to determine user preferences
    return {
      favoriteGenres: this.extractFavoriteGenres(watchedMovies),
      favoriteDirectors: this.extractFavoriteDirectors(watchedMovies),
      ratingPreference: this.calculateAverageRatingPreference(watchedMovies),
    };
  }

  private extractFavoriteGenres(movies: any[]): string[] {
    // Implementation to extract user's favorite genres
    return [];
  }

  private extractFavoriteDirectors(movies: any[]): string[] {
    // Implementation to extract user's favorite directors
    return [];
  }

  private calculateAverageRatingPreference(movies: any[]): number {
    // Calculate user's preference for movie ratings
    return movies.reduce((sum, movie) => sum + movie.userRating, 0) / movies.length;
  }
}
```

## Performance Considerations

### Caching Strategy

```typescript
class MovieCacheService {
  private movieCache = new Map<number, Movie>();
  private profileMovieCache = new Map<string, ProfileMovie>();
  private timelineCache = new Map<number, RecentUpcomingMoviesForProfile>();
  private recommendationCache = new Map<string, SimilarOrRecommendedMovie[]>();

  private CACHE_TTL = 15 * 60 * 1000; // 15 minutes

  async getCachedMovie(movieId: number): Promise<Movie | null> {
    return this.movieCache.get(movieId) || null;
  }

  setCachedMovie(movie: Movie): void {
    this.movieCache.set(movie.id, movie);

    // Auto-expire cache entries
    setTimeout(() => {
      this.movieCache.delete(movie.id);
    }, this.CACHE_TTL);
  }

  async getCachedProfileMovie(profileId: number, movieId: number): Promise<ProfileMovie | null> {
    const key = `${profileId}:${movieId}`;
    return this.profileMovieCache.get(key) || null;
  }

  setCachedProfileMovie(profileMovie: ProfileMovie): void {
    const key = `${profileMovie.profileId}:${profileMovie.id}`;
    this.profileMovieCache.set(key, profileMovie);

    setTimeout(() => {
      this.profileMovieCache.delete(key);
    }, this.CACHE_TTL);
  }

  async getCachedRecommendations(
    movieId: number,
    profileId: number,
    type: 'recommended' | 'similar',
  ): Promise<SimilarOrRecommendedMovie[] | null> {
    const key = `${type}:${movieId}:${profileId}`;
    return this.recommendationCache.get(key) || null;
  }

  setCachedRecommendations(
    movieId: number,
    profileId: number,
    type: 'recommended' | 'similar',
    recommendations: SimilarOrRecommendedMovie[],
  ): void {
    const key = `${type}:${movieId}:${profileId}`;
    this.recommendationCache.set(key, recommendations);

    setTimeout(() => {
      this.recommendationCache.delete(key);
    }, this.CACHE_TTL * 2); // Longer cache for recommendations
  }

  invalidateProfileCache(profileId: number): void {
    // Remove all cached entries for a profile
    for (const [key, value] of this.profileMovieCache.entries()) {
      if (key.startsWith(`${profileId}:`)) {
        this.profileMovieCache.delete(key);
      }
    }

    // Also invalidate timeline cache
    this.timelineCache.delete(profileId);

    // Invalidate recommendation cache for this profile
    for (const [key] of this.recommendationCache.entries()) {
      if (key.includes(`:${profileId}`)) {
        this.recommendationCache.delete(key);
      }
    }
  }

  clearCache(): void {
    this.movieCache.clear();
    this.profileMovieCache.clear();
    this.timelineCache.clear();
    this.recommendationCache.clear();
  }
}
```

## Frontend Component Integration

```typescript
import React, { useState, useEffect } from 'react';
import {
  ProfileMovie,
  ProfileMovieWithDetails,
  SimilarOrRecommendedMovie,
  MovieDetailsResponse,
} from '@ajgifford/keepwatching-types';

interface MovieDetailsProps {
  movieId: number;
  profileId: number;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, profileId }) => {
  const [movieDetails, setMovieDetails] = useState<ProfileMovieWithDetails | null>(null);
  const [recommendations, setRecommendations] = useState<SimilarOrRecommendedMovie[]>([]);
  const [similarMovies, setSimilarMovies] = useState<SimilarOrRecommendedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId, profileId]);

  const loadMovieDetails = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/v1/movies/${movieId}/details/${profileId}`);

      if (!response.ok) {
        throw new Error('Failed to load movie details');
      }

      const data: MovieDetailsResponse = await response.json();

      setMovieDetails(data.movie);
      setRecommendations(data.recommendedMovies);
      setSimilarMovies(data.similarMovies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleWatchStatus = async (): Promise<void> => {
    if (!movieDetails) return;

    try {
      const newStatus = movieDetails.watchStatus === 'WATCHED' ? 'NOT_WATCHED' : 'WATCHED';

      const response = await fetch(`/api/v1/movies/${movieId}/watch-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, watchStatus: newStatus }),
      });

      if (response.ok) {
        setMovieDetails(prev => prev ? { ...prev, watchStatus: newStatus } : null);
      }
    } catch (err) {
      console.error('Failed to update watch status:', err);
    }
  };

  const formatBudget = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRevenue = (amount: number): string => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    return formatBudget(amount);
  };

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="spinner" />
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-error">
        <h2>Error Loading Movie</h2>
        <p>{error}</p>
        <button onClick={loadMovieDetails}>Try Again</button>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="movie-details-not-found">
        <h2>Movie Not Found</h2>
        <p>The requested movie could not be found.</p>
      </div>
    );
  }

  return (
    <div className="movie-details">
      {/* Hero Section */}
      <div
        className="movie-hero"
        style={{ backgroundImage: `url(${movieDetails.backdropImage})` }}
      >
        <div className="movie-hero-overlay">
          <div className="movie-hero-content">
            <img
              src={movieDetails.posterImage}
              alt={movieDetails.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h1>{movieDetails.title}</h1>
              <div className="movie-meta">
                <span className="rating">{movieDetails.mpaRating}</span>
                <span className="runtime">{movieDetails.runtime} min</span>
                <span className="release-year">
                  {new Date(movieDetails.releaseDate).getFullYear()}
                </span>
                <span className="user-rating">⭐ {movieDetails.userRating.toFixed(1)}</span>
              </div>
              <p className="movie-description">{movieDetails.description}</p>

              <div className="movie-actions">
                <button
                  className={`watch-status-btn ${movieDetails.watchStatus.toLowerCase()}`}
                  onClick={toggleWatchStatus}
                >
                  {movieDetails.watchStatus === 'WATCHED' ? '✓ Watched' : '+ Mark as Watched'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="movie-details-content">
        <div className="movie-details-grid">
          <div className="movie-details-main">
            <section className="movie-production">
              <h2>Production Details</h2>
              <div className="production-info">
                <div className="production-item">
                  <label>Director:</label>
                  <span>{movieDetails.director}</span>
                </div>
                <div className="production-item">
                  <label>Production Companies:</label>
                  <span>{movieDetails.productionCompanies}</span>
                </div>
                <div className="production-item">
                  <label>Budget:</label>
                  <span>{formatBudget(movieDetails.budget)}</span>
                </div>
                <div className="production-item">
                  <label>Box Office:</label>
                  <span>{formatRevenue(movieDetails.revenue)}</span>
                </div>
                <div className="production-item">
                  <label>Genres:</label>
                  <span>{movieDetails.genres}</span>
                </div>
                <div className="production-item">
                  <label>Streaming:</label>
                  <span>{movieDetails.streamingServices}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="movie-recommendations">
            <h2>Recommended for You</h2>
            <div className="movie-grid">
              {recommendations.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img src={movie.image} alt={movie.title} />
                  <div className="movie-card-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-card-genres">{movie.genres.join(', ')}</p>
                    <div className="movie-card-meta">
                      <span className="rating">⭐ {movie.rating.toFixed(1)}</span>
                      {movie.inFavorites && <span className="favorited">❤️</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="similar-movies">
            <h2>More Like This</h2>
            <div className="movie-grid">
              {similarMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img src={movie.image} alt={movie.title} />
                  <div className="movie-card-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-card-genres">{movie.genres.join(', ')}</p>
                    <div className="movie-card-meta">
                      <span className="rating">⭐ {movie.rating.toFixed(1)}</span>
                      {movie.inFavorites && <span className="favorited">❤️</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
```

## Dependencies

This module depends on:

- `./responseTypes` - For BaseResponse interface
- `./watchStatusTypes` - For WatchStatus
- External movie databases (TMDB) - For movie metadata
- Image CDN services - For poster and backdrop images
- Streaming service APIs - For availability data

## Best Practices

1. **Type Safety**: Always use ProfileMovie for profile-specific operations and Movie for general data
2. **Watch Status**: Use binary watch status types for movies (WATCHED/NOT_WATCHED only)
3. **External IDs**: Maintain TMDB IDs for external API integration
4. **Image Handling**: Implement fallbacks for missing or broken image URLs
5. **Caching**: Cache frequently accessed movie data to improve performance
6. **Validation**: Validate external API data before creating movie records
7. **Consistency**: Use snake_case for database operations, camelCase for application logic
8. **Recommendations**: Implement proper caching and user preference analysis for recommendations
9. **Performance**: Use parallel loading for movie details and recommendations
10. **Error Handling**: Implement graceful degradation for missing recommendation data

## Related Types

- `WatchStatus` (from watchStatusTypes.ts) - For movie watch status
- `BaseResponse` (from responseTypes.ts) - For API response structure
- `Profile` types (from profileTypes.ts) - For user profile associations
- `Statistics` types (from statisticsTypes.ts) - For movie analytics
- External API types - For TMDB and streaming service integration
