# Season Types Documentation

This module provides TypeScript type definitions for season-related operations in the KeepWatching application. It
handles TV show season management, episode collections, watch progress tracking, and API request/response structures for
season operations.

## Overview

The season types module defines interfaces for:

- Core season data structures and metadata
- Profile-specific season viewing states and progress
- Administrative season management and analytics
- Season creation and modification operations
- Episode collection management within seasons

## Core Interfaces

### `Season`

The primary interface representing a TV show season in the application. Contains essential metadata about a season
including episode count, release information, and visual assets.

**Properties:**

- `id: number` - Unique identifier for the season
- `showId: number` - ID of the parent show this season belongs to
- `tmdbId: number` - The Movie Database (TMDB) identifier for external API integration
- `name: string` - Display name of the season (e.g., "Season 1", "Final Season")
- `overview: string` - Synopsis or description of the season
- `seasonNumber: number` - Sequential number of the season within the show
- `releaseDate: string` - Original release date in ISO format
- `posterImage: string` - URL to the season's poster image
- `numberOfEpisodes: number` - Total number of episodes in this season

**Usage Example:**

```typescript
const season: Season = {
  id: 101,
  showId: 15,
  tmdbId: 3572,
  name: 'Season 1',
  overview: 'The first season introduces the main characters and sets up the central mystery...',
  seasonNumber: 1,
  releaseDate: '2008-01-20',
  posterImage: 'https://example.com/season1-poster.jpg',
  numberOfEpisodes: 7,
};
```

### `ProfileSeason`

Extended season interface that includes user-specific viewing information and episode collections. This represents how a
season appears to a specific user profile, including their watch progress and episode viewing states.

**Additional Properties:**

- `profileId: number` - ID of the profile viewing this season
- `watchStatus: FullWatchStatusType` - Current watch status for the entire season
- `episodes: ProfileEpisode[]` - Array of episodes with profile-specific viewing states

**Key Features:**

- **Profile Context**: Links season data to specific user profiles
- **Watch Progress**: Tracks overall season viewing status
- **Episode Integration**: Includes complete episode collection with viewing states
- **Progress Calculation**: Supports automated status updates based on episode progress

**Usage Example:**

```typescript
const profileSeason: ProfileSeason = {
  id: 101,
  showId: 15,
  tmdbId: 3572,
  name: 'Season 1',
  overview: 'The first season introduces the main characters...',
  seasonNumber: 1,
  releaseDate: '2008-01-20',
  posterImage: 'https://example.com/season1-poster.jpg',
  numberOfEpisodes: 7,
  profileId: 42,
  watchStatus: 'WATCHING',
  episodes: [
    {
      id: 1001,
      tmdbId: 349232,
      seasonId: 101,
      showId: 15,
      seasonNumber: 1,
      episodeNumber: 1,
      episodeType: 'regular',
      title: 'Pilot',
      overview: 'The series begins with...',
      runtime: 47,
      airDate: '2008-01-20',
      stillImage: 'https://example.com/episode1-still.jpg',
      profileId: 42,
      watchStatus: 'WATCHED',
    },
    // ... more episodes
  ],
};
```

### `AdminSeason`

Administrative interface that extends the base season with metadata for content management operations. Used by
administrators and automated systems for season lifecycle management.

**Additional Properties:**

- `createdAt: string` - ISO timestamp of when the season was added to the system
- `updatedAt: string` - ISO timestamp of the last modification

**Key Features:**

- **Audit Trail**: Tracks creation and modification timestamps
- **Administrative Context**: Provides metadata for content management
- **System Integration**: Supports automated content updates and synchronization

**Usage Example:**

```typescript
const adminSeason: AdminSeason = {
  id: 101,
  showId: 15,
  tmdbId: 3572,
  name: 'Season 1',
  overview: 'The first season introduces the main characters...',
  seasonNumber: 1,
  releaseDate: '2008-01-20',
  posterImage: 'https://example.com/season1-poster.jpg',
  numberOfEpisodes: 7,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-20T14:22:00Z',
};
```

### `AdminSeasonWithEpisodes`

Extended administrative interface that includes the complete episode collection for comprehensive season management.
This interface provides administrators with full visibility into season structure and episode organization.

**Additional Properties:**

- `episodes: AdminEpisode[]` - Array of episodes with administrative metadata

**Key Features:**

- **Complete Season View**: Includes all episodes with administrative context
- **Bulk Operations**: Supports season-wide episode management
- **Content Validation**: Enables verification of season completion and episode sequencing

**Usage Example:**

```typescript
const adminSeasonWithEpisodes: AdminSeasonWithEpisodes = {
  id: 101,
  showId: 15,
  tmdbId: 3572,
  name: 'Season 1',
  overview: 'The first season introduces the main characters...',
  seasonNumber: 1,
  releaseDate: '2008-01-20',
  posterImage: 'https://example.com/season1-poster.jpg',
  numberOfEpisodes: 7,
  episodes: [
    {
      id: 1001,
      tmdbId: 349232,
      seasonId: 101,
      showId: 15,
      seasonNumber: 1,
      episodeNumber: 1,
      episodeType: 'regular',
      title: 'Pilot',
      overview: 'The series begins with...',
      runtime: 47,
      airDate: '2008-01-20',
      stillImage: 'https://example.com/episode1-still.jpg',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    // ... more episodes with administrative metadata
  ],
};
```

## Request Types

### `CreateSeasonRequest`

Defines the payload structure for creating new seasons. Uses snake_case field naming for database compatibility and
includes all essential season metadata for content management systems.

**Required Fields:**

- `show_id: number` - ID of the parent show
- `tmdb_id: number` - External TMDB identifier
- `name: string` - Season display name
- `overview: string` - Season description
- `season_number: number` - Sequential season number
- `release_date: string` - Release date in ISO format
- `poster_image: string` - URL to season poster
- `number_of_episodes: number` - Total episode count

**Usage Example:**

```typescript
const createSeasonRequest: CreateSeasonRequest = {
  show_id: 15,
  tmdb_id: 3572,
  name: 'Season 2',
  overview:
    'The second season delves deeper into the mythology and introduces new characters who will change everything.',
  season_number: 2,
  release_date: '2009-01-11',
  poster_image: 'https://example.com/season2-poster.jpg',
  number_of_episodes: 8,
};
```

### `UpdateSeasonRequest`

Enables modification of existing seasons by extending the creation request. All fields from the creation request can be
updated, allowing for complete season metadata management.

**Key Features:**

- **Complete Flexibility**: Any season field can be updated
- **Consistency**: Uses same structure as creation request
- **Database Compatibility**: Maintains snake_case naming convention

**Usage Example:**

```typescript
const updateSeasonRequest: UpdateSeasonRequest = {
  show_id: 15,
  tmdb_id: 3572,
  name: 'Season 2: The Reckoning',
  overview: "Updated description with more detail about the season's themes and character development.",
  season_number: 2,
  release_date: '2009-01-11',
  poster_image: 'https://example.com/season2-updated-poster.jpg',
  number_of_episodes: 8,
};
```

## Watch Status Integration

### Season Status Calculation

Seasons use `FullWatchStatusType` which supports all four watch status values:

```typescript
import { FullWatchStatusType, WatchStatus } from '@ajgifford/keepwatching-types';

// Season status progression examples
function calculateSeasonStatus(episodes: ProfileEpisode[], isOngoing: boolean): FullWatchStatusType {
  const watchedCount = episodes.filter((ep) => ep.watchStatus === WatchStatus.WATCHED).length;
  const totalCount = episodes.length;

  if (watchedCount === 0) {
    return WatchStatus.NOT_WATCHED;
  } else if (watchedCount === totalCount) {
    return isOngoing ? WatchStatus.UP_TO_DATE : WatchStatus.WATCHED;
  } else {
    return WatchStatus.WATCHING;
  }
}

// Valid season statuses
const seasonStatuses: FullWatchStatusType[] = [
  WatchStatus.NOT_WATCHED, // Haven't started watching any episodes
  WatchStatus.WATCHING, // Watching some episodes but not finished
  WatchStatus.WATCHED, // Finished all episodes (complete season)
  WatchStatus.UP_TO_DATE, // Caught up with ongoing season
];
```

### Episode Progress Tracking

```typescript
function getSeasonProgress(season: ProfileSeason): {
  watchedEpisodes: number;
  totalEpisodes: number;
  percentComplete: number;
} {
  const watchedEpisodes = season.episodes.filter((episode) => episode.watchStatus === WatchStatus.WATCHED).length;

  return {
    watchedEpisodes,
    totalEpisodes: season.numberOfEpisodes,
    percentComplete: (watchedEpisodes / season.numberOfEpisodes) * 100,
  };
}

// Season completion checks
function isSeasonComplete(season: ProfileSeason): boolean {
  return season.watchStatus === WatchStatus.WATCHED || season.watchStatus === WatchStatus.UP_TO_DATE;
}

function getNextUnwatchedEpisode(season: ProfileSeason): ProfileEpisode | null {
  return season.episodes.find((episode) => episode.watchStatus === WatchStatus.NOT_WATCHED) || null;
}
```

## Real-World Usage Examples

### Season Controller Implementation

```typescript
import { CreateSeasonRequest, UpdateSeasonRequest } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class SeasonController {
  constructor(private seasonService: SeasonService) {}

  // GET /api/v1/seasons/:id/profile/:profileId
  async getProfileSeason(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const seasonId = parseInt(req.params.id);
      const profileId = parseInt(req.params.profileId);

      const season = await this.seasonService.getProfileSeason(seasonId, profileId);

      res.status(200).json({
        message: 'Season retrieved successfully',
        season,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/seasons
  async createSeason(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: CreateSeasonRequest = req.body;
      const season = await this.seasonService.createSeason(request);

      res.status(201).json({
        message: 'Season created successfully',
        season,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/admin/seasons/:id
  async updateSeason(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const seasonId = parseInt(req.params.id);
      const request: UpdateSeasonRequest = req.body;

      const season = await this.seasonService.updateSeason(seasonId, request);

      res.status(200).json({
        message: 'Season updated successfully',
        season,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/seasons/:id/profile/:profileId/watch-status
  async updateWatchStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const seasonId = parseInt(req.params.id);
      const profileId = parseInt(req.params.profileId);
      const { watchStatus } = req.body;

      const season = await this.seasonService.updateSeasonWatchStatus(seasonId, profileId, watchStatus);

      res.status(200).json({
        message: 'Season watch status updated successfully',
        season,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/shows/:showId/seasons
  async getShowSeasons(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.showId);
      const profileId = req.query.profileId ? parseInt(req.query.profileId as string) : undefined;

      const seasons = profileId
        ? await this.seasonService.getProfileSeasonsForShow(showId, profileId)
        : await this.seasonService.getSeasonsForShow(showId);

      res.status(200).json({
        message: 'Seasons retrieved successfully',
        seasons,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

## Performance Optimization

### Caching Strategies

```typescript
class SeasonCacheService {
  private cache = new Map<string, { data: any; expiry: number }>();
  private readonly CACHE_TTL = 15 * 60 * 1000; // 15 minutes

  async getCachedProfileSeason(seasonId: number, profileId: number): Promise<ProfileSeason | null> {
    const cacheKey = `profile_season:${seasonId}:${profileId}`;
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    return null;
  }

  setCachedProfileSeason(seasonId: number, profileId: number, season: ProfileSeason): void {
    const cacheKey = `profile_season:${seasonId}:${profileId}`;
    this.cache.set(cacheKey, {
      data: season,
      expiry: Date.now() + this.CACHE_TTL,
    });
  }

  invalidateSeasonCache(seasonId: number, profileId?: number): void {
    if (profileId) {
      this.cache.delete(`profile_season:${seasonId}:${profileId}`);
    } else {
      // Clear all caches for this season across all profiles
      const keysToDelete = Array.from(this.cache.keys()).filter((key) => key.startsWith(`profile_season:${seasonId}:`));

      keysToDelete.forEach((key) => this.cache.delete(key));
    }
  }
}
```

## Best Practices

### Performance Considerations

1. **Lazy Loading**: Load episodes only when needed for season details
2. **Caching**: Cache season data with appropriate TTL
3. **Batch Operations**: Process multiple seasons efficiently
4. **Indexing**: Ensure proper database indexes on `showId` and `seasonNumber`

### Error Handling

1. **Validation**: Validate all input data before processing
2. **Rollback**: Implement transaction rollback for failed operations
3. **Logging**: Log all season management operations for auditing
4. **Graceful Degradation**: Handle missing episode data gracefully

## Dependencies

This module depends on:

- `./episodeTypes` - For ProfileEpisode and AdminEpisode interfaces
- `./watchStatusTypes` - For FullWatchStatusType
- External content APIs (TMDB) - For season metadata
- Database ORM - For data persistence

## Related Types

- **Show Types** (`showTypes.ts`) - Parent show relationships
- **Episode Types** (`episodeTypes.ts`) - Episode collections within seasons
- **Profile Types** (`profileTypes.ts`) - User profile associations
- **Watch Status Types** (`watchStatusTypes.ts`) - Progress tracking
- **Statistics Types** (`statisticsTypes.ts`) - Season progress analytics
