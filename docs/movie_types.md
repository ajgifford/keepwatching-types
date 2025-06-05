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
- `watchStatus: BinaryWatchStatusType` - Current watch status (WATCHED or NOT_WATCHED)

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
  description: 'A thief who steals corporate secrets through dream-sharing technology...',
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
}
```

### Service Implementation

```typescript
import {
  AddMovieFavorite,
  CreateMovieRequest,
  Movie,
  ProfileMovie,
  RecentUpcomingMoviesForProfile,
  RemoveMovieFavorite,
  UpdateMovieRequest,
} from '@ajgifford/keepwatching-types';

export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private profileMovieRepository: ProfileMovieRepository,
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
  }

  private async associateStreamingServices(movieId: number, serviceIds: number[]): Promise<void> {
    // Implementation would associate movie with streaming services
    // and update the streamingServices string field
  }
}
```

## Integration Patterns

### Watch Status Management

```typescript
import { BinaryWatchStatusType, isBinaryWatchStatus } from '@ajgifford/keepwatching-types';

class MovieWatchStatusService {
  async updateWatchStatus(profileId: number, movieId: number, newStatus: string): Promise<ProfileMovie> {
    // Validate status is appropriate for movies
    if (!isBinaryWatchStatus(newStatus as any)) {
      throw new Error('Movies only support WATCHED and NOT_WATCHED statuses');
    }

    const status = newStatus as BinaryWatchStatusType;

    // Update the status
    await this.profileMovieRepository.updateWatchStatus(profileId, movieId, status);

    // Return updated movie
    return await this.getProfileMovie(profileId, movieId);
  }

  async toggleWatchStatus(profileId: number, movieId: number): Promise<ProfileMovie> {
    const profileMovie = await this.getProfileMovie(profileId, movieId);
    const newStatus: BinaryWatchStatusType = profileMovie.watchStatus === 'WATCHED' ? 'NOT_WATCHED' : 'WATCHED';

    return await this.updateWatchStatus(profileId, movieId, newStatus);
  }

  async markAsWatched(profileId: number, movieId: number): Promise<ProfileMovie> {
    return await this.updateWatchStatus(profileId, movieId, 'WATCHED');
  }

  async markAsNotWatched(profileId: number, movieId: number): Promise<ProfileMovie> {
    return await this.updateWatchStatus(profileId, movieId, 'NOT_WATCHED');
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

## Performance Considerations

### Caching Strategy

```typescript
class MovieCacheService {
  private movieCache = new Map<number, Movie>();
  private profileMovieCache = new Map<string, ProfileMovie>();
  private timelineCache = new Map<number, RecentUpcomingMoviesForProfile>();

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

  invalidateProfileCache(profileId: number): void {
    // Remove all cached entries for a profile
    for (const [key, value] of this.profileMovieCache.entries()) {
      if (key.startsWith(`${profileId}:`)) {
        this.profileMovieCache.delete(key);
      }
    }

    // Also invalidate timeline cache
    this.timelineCache.delete(profileId);
  }
}
```

## Dependencies

This module depends on:

- `./responseTypes` - For BaseResponse interface
- `./watchStatusTypes` - For BinaryWatchStatusType
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

## Related Types

- `BinaryWatchStatusType` (from watchStatusTypes.ts) - For movie watch status
- `BaseResponse` (from responseTypes.ts) - For API response structure
- `Profile` types (from profileTypes.ts) - For user profile associations
- `Statistics` types (from statisticsTypes.ts) - For movie analytics
- External API types - For TMDB and streaming service integration
