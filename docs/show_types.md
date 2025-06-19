[< Back](../README.md)

# Show Types Documentation

This module provides TypeScript type definitions for show-related operations in the KeepWatching application. It handles
TV shows, series management, season tracking, episode progress, and comprehensive show metadata operations.

## Overview

The show types module defines interfaces for:

- Core show data structures and metadata
- Profile-specific show tracking with watch status
- Show seasons and episode relationships
- Administrative show management
- API request/response patterns for show operations
- Keep watching and recommendation systems
- Show favorites and watchlist management

## Core Interfaces

### `Show`

The primary interface representing a TV show or series in the application with comprehensive metadata.

**Properties:**

- `id: number` - Unique identifier for the show
- `tmdbId: number` - The Movie Database (TMDB) identifier for external data syncing
- `title: string` - Display title of the show
- `description: string` - Detailed description or synopsis of the show
- `releaseDate: string` - Original air date or premiere date
- `posterImage: string` - URL to the show's poster image
- `backdropImage: string` - URL to the show's backdrop/banner image
- `userRating: number` - User rating score (typically 0-10 scale)
- `contentRating: string` - Content rating (TV-MA, TV-14, etc.)
- `streamingServices: string` - Available streaming platforms
- `genres: string` - Show genres (comma-separated or JSON string)
- `seasonCount: number` - Total number of seasons
- `episodeCount: number` - Total number of episodes across all seasons
- `status: string` - Production status (Ended, Continuing, etc.)
- `type: string` - Show type (Scripted, Documentary, etc.)
- `inProduction: boolean` - Whether the show is currently in production
- `lastAirDate: string | null` - Date of the most recent episode
- `network: string | null` - Original broadcasting network

**Usage Example:**

```typescript
const show: Show = {
  id: 1,
  tmdbId: 1399,
  title: 'Game of Thrones',
  description: 'Seven noble families fight for control of the mythical land of Westeros...',
  releaseDate: '2011-04-17',
  posterImage: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
  backdropImage: 'https://image.tmdb.org/t/p/w1280/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
  userRating: 9.3,
  contentRating: 'TV-MA',
  streamingServices: 'HBO Max',
  genres: 'Drama,Fantasy,Adventure',
  seasonCount: 8,
  episodeCount: 73,
  status: 'Ended',
  type: 'Scripted',
  inProduction: false,
  lastAirDate: '2019-05-19',
  network: 'HBO',
};
```

### `ProfileShow`

Extended show interface that includes user-specific data and watch progress for a particular profile. This interface
combines show metadata with personalized viewing information.

**Additional Properties:**

- `profileId: number` - ID of the profile this show belongs to
- `watchStatus: WatchStatus` - Current watch status for this profile
- `lastEpisode: ShowEpisode | null` - Most recently watched episode
- `nextEpisode: ShowEpisode | null` - Next episode to watch

**Key Features:**

- **Progress Tracking**: Maintains watch status and episode position
- **Profile Isolation**: Each profile maintains separate show progress
- **Episode Navigation**: Tracks viewing history and next episode recommendations

**Usage Example:**

```typescript
const profileShow: ProfileShow = {
  // All Show properties
  id: 1,
  tmdbId: 1399,
  title: 'Game of Thrones',
  description: 'Seven noble families fight for control...',
  releaseDate: '2011-04-17',
  posterImage: 'https://image.tmdb.org/poster.jpg',
  backdropImage: 'https://image.tmdb.org/backdrop.jpg',
  userRating: 9.3,
  contentRating: 'TV-MA',
  streamingServices: 'HBO Max',
  genres: 'Drama,Fantasy,Adventure',
  seasonCount: 8,
  episodeCount: 73,
  status: 'Ended',
  type: 'Scripted',
  inProduction: false,
  lastAirDate: '2019-05-19',
  network: 'HBO',

  // Profile-specific properties
  profileId: 123,
  watchStatus: 'WATCHING',
  lastEpisode: {
    title: 'The Long Night',
    airDate: '2019-04-28',
    seasonNumber: 8,
    episodeNumber: 3,
  },
  nextEpisode: {
    title: 'The Last of the Starks',
    airDate: '2019-05-05',
    seasonNumber: 8,
    episodeNumber: 4,
  },
};
```

### `ProfileShowWithSeasons`

Enhanced version of ProfileShow that includes detailed season information with episodes. This interface provides a
complete view of show structure and progress.

**Additional Properties:**

- `seasons?: ProfileSeason[]` - Array of seasons with episode details (optional for performance)

**Usage Example:**

```typescript
const showWithSeasons: ProfileShowWithSeasons = {
  // All ProfileShow properties
  ...profileShow,

  // Season details
  seasons: [
    {
      id: 1,
      showId: 1,
      seasonNumber: 1,
      name: 'Season 1',
      profileId: 123,
      watchStatus: 'WATCHED',
      episodes: [
        {
          id: 1,
          title: 'Winter Is Coming',
          episodeNumber: 1,
          seasonNumber: 1,
          profileId: 123,
          watchStatus: 'WATCHED',
          // ... other episode properties
        },
      ],
      // ... other season properties
    },
  ],
};
```

### `AdminShow`

Administrative interface for show management that extends the base Show with metadata tracking for content management
purposes.

**Additional Properties:**

- `lastUpdated: string` - Timestamp of the last update to show metadata

**Usage Example:**

```typescript
const adminShow: AdminShow = {
  // All Show properties
  ...show,

  // Administrative metadata
  lastUpdated: '2024-01-15T10:30:00Z',
};
```

## Reference Types

### `ShowReference`

Minimal show reference containing only the ID for lightweight operations and foreign key relationships.

```typescript
const showRef: ShowReference = {
  id: 1,
};
```

### `ShowTMDBReference`

Extended reference that includes TMDB ID and title for external API operations and content matching.

```typescript
const tmdbRef: ShowTMDBReference = {
  id: 1,
  tmdbId: 1399,
  title: 'Game of Thrones',
};
```

## Progress and Continuation Types

### `KeepWatchingShow`

Interface for keep watching functionality that tracks viewing progress and next episodes to watch.

**Properties:**

- `showId: number` - ID of the show
- `showTitle: string` - Title of the show
- `posterImage: string` - Show poster image URL
- `lastWatched: string` - Timestamp of last viewing activity
- `episodes: NextEpisode[]` - Array of next episodes to watch

**Usage Example:**

```typescript
const keepWatching: KeepWatchingShow = {
  showId: 1,
  showTitle: 'Breaking Bad',
  posterImage: 'https://image.tmdb.org/poster.jpg',
  lastWatched: '2024-01-15T20:30:00Z',
  episodes: [
    {
      episodeId: 15,
      episodeTitle: 'Ozymandias',
      episodeNumber: 14,
      seasonNumber: 5,
      showId: 1,
      showName: 'Breaking Bad',
      // ... other NextEpisode properties
    },
  ],
};
```

### `SimilarOrRecommendedShow`

Interface for show recommendations and similar content suggestions.

**Properties:**

- `id: number` - Show ID
- `title: string` - Show title
- `genres: string[]` - Array of genre names
- `premiered: string` - Premiere date
- `summary: string` - Show summary
- `image: string` - Show image URL
- `rating: number` - Show rating
- `popularity: number` - Popularity score
- `country: string` - Country of origin
- `language: string` - Primary language
- `inFavorites: boolean` - Whether show is in user's favorites

**Usage Example:**

```typescript
const recommendation: SimilarOrRecommendedShow = {
  id: 2,
  title: 'Better Call Saul',
  genres: ['Drama', 'Crime'],
  premiered: '2015-02-08',
  summary: 'The trials and tribulations of criminal lawyer Jimmy McGill...',
  image: 'https://image.tmdb.org/poster.jpg',
  rating: 8.8,
  popularity: 85.5,
  country: 'US',
  language: 'en',
  inFavorites: false,
};
```

## Request Types

### `CreateShowRequest`

Comprehensive payload for creating new shows in the system. Uses underscore_case for database compatibility.

**Required Fields:**

- `tmdb_id: number` - TMDB identifier
- `title: string` - Show title
- `description: string` - Show description
- `release_date: string` - Release date
- `poster_image: string` - Poster image URL
- `backdrop_image: string` - Backdrop image URL
- `user_rating: number` - User rating
- `content_rating: string` - Content rating
- `season_count: number` - Number of seasons
- `episode_count: number` - Number of episodes
- `status: string` - Production status
- `type: string` - Show type
- `in_production: 0 | 1` - Production flag (0/1 for database)
- `last_air_date: string` - Last air date
- `last_episode_to_air: number | null` - Last episode ID
- `next_episode_to_air: number | null` - Next episode ID
- `network: string | null` - Network name
- `streaming_service_ids: number[]` - Array of streaming service IDs
- `genre_ids: number[]` - Array of genre IDs

**Usage Example:**

```typescript
const createRequest: CreateShowRequest = {
  tmdb_id: 1399,
  title: 'Game of Thrones',
  description: 'Seven noble families fight for control of the mythical land of Westeros...',
  release_date: '2011-04-17',
  poster_image: 'https://image.tmdb.org/poster.jpg',
  backdrop_image: 'https://image.tmdb.org/backdrop.jpg',
  user_rating: 9.3,
  content_rating: 'TV-MA',
  season_count: 8,
  episode_count: 73,
  status: 'Ended',
  type: 'Scripted',
  in_production: 0,
  last_air_date: '2019-05-19',
  last_episode_to_air: 73,
  next_episode_to_air: null,
  network: 'HBO',
  streaming_service_ids: [1, 2],
  genre_ids: [18, 10765],
};
```

### `UpdateShowRequest`

Request for updating existing shows that extends CreateShowRequest with an ID field.

**Additional Field:**

- `id: number` - ID of the show to update

**Usage Example:**

```typescript
const updateRequest: UpdateShowRequest = {
  id: 1,
  // All CreateShowRequest fields
  ...createRequest,
  // Updated fields
  status: 'Continuing',
  in_production: 1,
};
```

## Favorites and Management Types

### `AddShowFavorite`

Response type for adding shows to favorites that includes the added show and updated episode information.

**Properties:**

- `favoritedShow: ProfileShow` - The show that was added to favorites
- `episodes?: EpisodesForProfile` - Updated episode information (optional)

### `RemoveShowFavorite`

Response type for removing shows from favorites that includes minimal show reference and updated episodes.

**Properties:**

- `removedShow: ShowTMDBReference` - Reference to the removed show
- `episodes: EpisodesForProfile` - Updated episode information

## API Response Types

### `ShowsResponse`

API response for operations returning multiple shows.

```typescript
interface ShowsResponse extends BaseResponse {
  message: string; // From BaseResponse
  shows: ProfileShow[]; // Array of profile shows
}
```

### `ShowDetailsResponse`

API response for detailed show information including seasons.

```typescript
interface ShowDetailsResponse extends BaseResponse {
  message: string; // From BaseResponse
  show: ProfileShowWithSeasons; // Detailed show with seasons
}
```

### `UpdateWatchStatusResponse`

Response for watch status updates that includes keep watching updates.

```typescript
interface UpdateWatchStatusResponse extends BaseResponse {
  message: string; // From BaseResponse
  nextUnwatchedEpisodes: KeepWatchingShow[]; // Updated keep watching list
}
```

### `EpisodesForProfileResponse`

Response for episode-related operations.

```typescript
interface EpisodesForProfileResponse extends BaseResponse {
  message: string; // From BaseResponse
  episodes: EpisodesForProfile; // Episode information
}
```

### `AddShowFavoriteResponse`

Response for adding shows to favorites.

```typescript
interface AddShowFavoriteResponse extends BaseResponse {
  message: string; // From BaseResponse
  addedShow: ProfileShow; // The added show
  episodes?: EpisodesForProfile; // Updated episodes (optional)
}
```

### `RemoveShowFavoriteResponse`

Response for removing shows from favorites.

```typescript
interface RemoveShowFavoriteResponse extends BaseResponse {
  message: string; // From BaseResponse
  removedShowReference: ShowTMDBReference; // Reference to removed show
  episodes: EpisodesForProfile; // Updated episodes
}
```

### `SimilarOrRecommendedShowsResponse`

Response for show recommendations and similar content.

```typescript
interface SimilarOrRecommendedShowsResponse extends BaseResponse {
  message: string; // From BaseResponse
  shows: SimilarOrRecommendedShow[]; // Recommended shows
}
```

## Real-World Usage Examples

### Controller Implementation

```typescript
import {
  CreateShowRequest,
  ShowDetailsResponse,
  ShowsResponse,
  UpdateShowRequest,
} from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class ShowController {
  constructor(private showService: ShowService) {}

  // GET /api/v1/shows/profile/:profileId
  async getProfileShows(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const shows = await this.showService.getShowsForProfile(profileId);

      const response: ShowsResponse = {
        message: 'Shows retrieved successfully',
        shows,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/shows/:id/profile/:profileId
  async getShowDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.id);
      const profileId = parseInt(req.params.profileId);
      const show = await this.showService.getShowWithSeasons(showId, profileId);

      const response: ShowDetailsResponse = {
        message: 'Show details retrieved successfully',
        show,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/shows
  async createShow(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: CreateShowRequest = req.body;
      const show = await this.showService.createShow(request);

      res.status(201).json({
        message: 'Show created successfully',
        show,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/admin/shows/:id
  async updateShow(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const request: UpdateShowRequest = {
        id,
        ...req.body,
      };

      const show = await this.showService.updateShow(request);

      res.status(200).json({
        message: 'Show updated successfully',
        show,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/shows/:id/favorite/profile/:profileId
  async addToFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.id);
      const profileId = parseInt(req.params.profileId);

      const result = await this.showService.addShowToFavorites(showId, profileId);

      const response: AddShowFavoriteResponse = {
        message: 'Show added to favorites successfully',
        addedShow: result.favoritedShow,
        episodes: result.episodes,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/v1/shows/:id/favorite/profile/:profileId
  async removeFromFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.id);
      const profileId = parseInt(req.params.profileId);

      const result = await this.showService.removeShowFromFavorites(showId, profileId);

      const response: RemoveShowFavoriteResponse = {
        message: 'Show removed from favorites successfully',
        removedShowReference: result.removedShow,
        episodes: result.episodes,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/shows/:id/similar
  async getSimilarShows(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.id);
      const profileId = req.query.profileId ? parseInt(req.query.profileId as string) : undefined;

      const shows = await this.showService.getSimilarShows(showId, profileId);

      const response: SimilarOrRecommendedShowsResponse = {
        message: 'Similar shows retrieved successfully',
        shows,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/shows/keep-watching/profile/:profileId
  async getKeepWatching(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const keepWatching = await this.showService.getKeepWatchingShows(profileId);

      res.status(200).json({
        message: 'Keep watching shows retrieved successfully',
        shows: keepWatching,
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
  CreateShowRequest,
  KeepWatchingShow,
  ProfileShow,
  Show,
  SimilarOrRecommendedShow,
} from '@ajgifford/keepwatching-types';

export class ShowService {
  constructor(
    private showRepository: ShowRepository,
    private profileRepository: ProfileRepository,
    private episodeService: EpisodeService,
  ) {}

  async getShowsForProfile(profileId: number): Promise<ProfileShow[]> {
    // Validate profile exists
    await this.profileRepository.findById(profileId);

    // Get shows with profile-specific data
    const shows = await this.showRepository.findByProfileId(profileId);

    // Transform to ProfileShow format
    return shows.map((show) => this.transformToProfileShow(show, profileId));
  }

  async createShow(request: CreateShowRequest): Promise<Show> {
    // Validate TMDB ID doesn't already exist
    const existingShow = await this.showRepository.findByTmdbId(request.tmdb_id);
    if (existingShow) {
      throw new Error(`Show with TMDB ID ${request.tmdb_id} already exists`);
    }

    // Transform request to database format
    const showData = this.transformCreateRequest(request);

    // Create show
    const show = await this.showRepository.create(showData);

    // Create associated genres and streaming services
    await this.associateGenres(show.id, request.genre_ids);
    await this.associateStreamingServices(show.id, request.streaming_service_ids);

    return show;
  }

  async addShowToFavorites(showId: number, profileId: number): Promise<AddShowFavorite> {
    // Validate show and profile exist
    const show = await this.showRepository.findById(showId);
    const profile = await this.profileRepository.findById(profileId);

    // Check if already in favorites
    const existingFavorite = await this.showRepository.findFavorite(showId, profileId);
    if (existingFavorite) {
      throw new Error('Show is already in favorites');
    }

    // Add to favorites
    await this.showRepository.addToFavorites(showId, profileId);

    // Get updated show data
    const favoritedShow = await this.getProfileShow(showId, profileId);

    // Get updated episodes
    const episodes = await this.episodeService.getEpisodesForProfile(profileId);

    return {
      favoritedShow,
      episodes,
    };
  }

  async getKeepWatchingShows(profileId: number): Promise<KeepWatchingShow[]> {
    // Get shows that are currently being watched
    const watchingShows = await this.showRepository.findWatchingByProfile(profileId);

    // Transform to keep watching format with next episodes
    return Promise.all(
      watchingShows.map(async (show) => {
        const nextEpisodes = await this.episodeService.getNextUnwatchedEpisodes(show.id, profileId);

        return {
          showId: show.id,
          showTitle: show.title,
          posterImage: show.posterImage,
          lastWatched: show.lastWatchedAt,
          episodes: nextEpisodes,
        };
      }),
    );
  }

  async getSimilarShows(showId: number, profileId?: number): Promise<SimilarOrRecommendedShow[]> {
    const show = await this.showRepository.findById(showId);

    // Get shows with similar genres
    const similarShows = await this.showRepository.findSimilarByGenres(show.genres, showId, { limit: 20 });

    // Transform to recommendation format
    return Promise.all(
      similarShows.map(async (similarShow) => {
        const inFavorites = profileId ? await this.showRepository.isInFavorites(similarShow.id, profileId) : false;

        return {
          id: similarShow.id,
          title: similarShow.title,
          genres: similarShow.genres.split(','),
          premiered: similarShow.releaseDate,
          summary: similarShow.description,
          image: similarShow.posterImage,
          rating: similarShow.userRating,
          popularity: similarShow.popularity || 0,
          country: similarShow.country || 'US',
          language: similarShow.language || 'en',
          inFavorites,
        };
      }),
    );
  }

  private transformToProfileShow(show: any, profileId: number): ProfileShow {
    return {
      id: show.id,
      tmdbId: show.tmdbId,
      title: show.title,
      description: show.description,
      releaseDate: show.releaseDate,
      posterImage: show.posterImage,
      backdropImage: show.backdropImage,
      userRating: show.userRating,
      contentRating: show.contentRating,
      streamingServices: show.streamingServices,
      genres: show.genres,
      seasonCount: show.seasonCount,
      episodeCount: show.episodeCount,
      status: show.status,
      type: show.type,
      inProduction: show.inProduction,
      lastAirDate: show.lastAirDate,
      network: show.network,
      profileId: profileId,
      watchStatus: show.watchStatus || 'NOT_WATCHED',
      lastEpisode: show.lastEpisode,
      nextEpisode: show.nextEpisode,
    };
  }

  private transformCreateRequest(request: CreateShowRequest): any {
    return {
      tmdbId: request.tmdb_id,
      title: request.title,
      description: request.description,
      releaseDate: request.release_date,
      posterImage: request.poster_image,
      backdropImage: request.backdrop_image,
      userRating: request.user_rating,
      contentRating: request.content_rating,
      seasonCount: request.season_count,
      episodeCount: request.episode_count,
      status: request.status,
      type: request.type,
      inProduction: Boolean(request.in_production),
      lastAirDate: request.last_air_date,
      lastEpisodeToAir: request.last_episode_to_air,
      nextEpisodeToAir: request.next_episode_to_air,
      network: request.network,
    };
  }

  private async associateGenres(showId: number, genreIds: number[]): Promise<void> {
    for (const genreId of genreIds) {
      await this.showRepository.addGenre(showId, genreId);
    }
  }

  private async associateStreamingServices(showId: number, serviceIds: number[]): Promise<void> {
    for (const serviceId of serviceIds) {
      await this.showRepository.addStreamingService(showId, serviceId);
    }
  }
}
```

## Watch Status Management

### Status Progression

Shows support all watch statuses due to their episodic nature:

```typescript
import { WatchStatus } from '@ajgifford/keepwatching-types';

class ShowWatchStatusService {
  // Calculate show status based on episode progress
  calculateShowStatus(watchedEpisodes: number, totalEpisodes: number, isOngoing: boolean): WatchStatus {
    if (watchedEpisodes === 0) {
      return WatchStatus.NOT_WATCHED;
    } else if (watchedEpisodes < totalEpisodes) {
      return WatchStatus.WATCHING;
    } else if (isOngoing) {
      return WatchStatus.UP_TO_DATE;
    } else {
      return WatchStatus.WATCHED;
    }
  }

  // Update show status when episode status changes
  async updateShowStatusFromEpisode(showId: number, profileId: number): Promise<void> {
    const episodes = await this.episodeService.getEpisodesForShow(showId, profileId);
    const show = await this.showService.getShow(showId);

    const watchedCount = episodes.filter((ep) => ep.watchStatus === 'WATCHED').length;
    const newStatus = this.calculateShowStatus(watchedCount, episodes.length, show.inProduction);

    await this.showService.updateWatchStatus(showId, profileId, newStatus);
  }
}
```

## Performance Optimization Patterns

### Caching Strategy

```typescript
interface ShowCacheEntry {
  data: ProfileShow | ProfileShowWithSeasons;
  timestamp: number;
  expiresAt: number;
}

class ShowCacheService {
  private cache = new Map<string, ShowCacheEntry>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  async getCachedShow(
    showId: number,
    profileId: number,
    includeSeasons?: boolean,
  ): Promise<ProfileShow | ProfileShowWithSeasons | null> {
    const cacheKey = `show:${showId}:profile:${profileId}:seasons:${Boolean(includeSeasons)}`;
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    return null;
  }

  setCachedShow(
    showId: number,
    profileId: number,
    show: ProfileShow | ProfileShowWithSeasons,
    includeSeasons: boolean = false,
  ): void {
    const cacheKey = `show:${showId}:profile:${profileId}:seasons:${includeSeasons}`;
    const now = Date.now();

    this.cache.set(cacheKey, {
      data: show,
      timestamp: now,
      expiresAt: now + this.CACHE_DURATION,
    });
  }

  invalidateShowCache(showId: number, profileId?: number): void {
    if (profileId) {
      // Invalidate specific profile's show cache
      this.cache.delete(`show:${showId}:profile:${profileId}:seasons:true`);
      this.cache.delete(`show:${showId}:profile:${profileId}:seasons:false`);
    } else {
      // Invalidate all caches for this show
      for (const key of this.cache.keys()) {
        if (key.startsWith(`show:${showId}:`)) {
          this.cache.delete(key);
        }
      }
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}
```

## Dependencies

This module depends on:

- `./episodeTypes` - For EpisodesForProfile, NextEpisode, ShowEpisode interfaces
- `./responseTypes` - For BaseResponse interface
- `./seasonTypes` - For ProfileSeason interface
- `./watchStatusTypes` - For WatchStatus
- External APIs (TMDB) - For content metadata
- Database ORM - For persistence operations

## Best Practices

1. **Type Safety**: Always use specific show interfaces (ProfileShow vs Show) based on context
2. **Performance**: Use caching for frequently accessed show data
3. **Validation**: Validate TMDB IDs and show data before persistence
4. **Error Handling**: Implement specific error types for different failure scenarios
5. **Consistency**: Maintain consistent naming between database fields and API responses
6. **Relationships**: Properly manage show-season-episode relationships
7. **Status Management**: Update watch status consistently across related entities

## Related Types

- **Episode Types** (`episodeTypes.ts`) - For episode-related functionality
- **Season Types** (`seasonTypes.ts`) - For season management
- **Profile Types** (`profileTypes.ts`) - For user profile integration
- **Watch Status Types** (`watchStatusTypes.ts`) - For progress tracking
- **Statistics Types** (`statisticsTypes.ts`) - For analytics and reporting
- **BaseResponse** (`responseTypes.ts`) - For API response structure
