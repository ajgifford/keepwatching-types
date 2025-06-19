[< Back](../README.md)

# Episode Types Documentation

This module provides TypeScript type definitions for episode-related operations in the KeepWatching application. It
handles individual episode management, watch progress tracking, and episode-centric API request/response structures.

## Overview

The episode types module defines interfaces for:

- Core episode data structures and metadata
- Episode watch status and progress tracking
- Profile-specific episode viewing information
- Administrative episode management
- Episode collections and groupings
- API request/response patterns for episode operations

## Core Interfaces

### `Episode`

The foundational interface representing an individual episode in the application with complete metadata and
identification information.

**Properties:**

- `id: number` - Unique identifier for the episode
- `tmdbId: number` - The Movie Database (TMDB) identifier for external data synchronization
- `seasonId: number` - ID of the season this episode belongs to
- `showId: number` - ID of the show this episode belongs to
- `seasonNumber: number` - Season number within the show
- `episodeNumber: number` - Episode number within the season
- `episodeType: string` - Type classification (e.g., "regular", "special", "finale")
- `title: string` - Episode title or name
- `overview: string` - Episode synopsis or description
- `runtime: number` - Episode duration in minutes
- `airDate: string` - Original air date in ISO format
- `stillImage: string` - URL to episode still image or screenshot

**Usage Example:**

```typescript
const episode: Episode = {
  id: 1001,
  tmdbId: 62085,
  seasonId: 101,
  showId: 10,
  seasonNumber: 1,
  episodeNumber: 1,
  episodeType: 'regular',
  title: 'Pilot',
  overview: 'A high school chemistry teacher turned methamphetamine manufacturer...',
  runtime: 58,
  airDate: '2008-01-20',
  stillImage: 'https://image.tmdb.org/t/p/w500/pilot-still.jpg',
};
```

### `ProfileEpisode`

Extended episode interface that includes user-specific viewing information and watch status for a particular profile.
This represents an episode as seen from a specific user's perspective.

**Additional Properties:**

- `profileId: number` - ID of the profile viewing this episode
- `watchStatus: WatchStatus` - Watch status (UNAIRED, WATCHED or NOT_WATCHED)

**Key Features:**

- **Profile-Specific Data**: Each user profile maintains independent episode watch status
- **Binary Status**: Episodes are either watched or not watched (no partial states)
- **Progress Tracking**: Enables calculation of show and season completion percentages

**Usage Example:**

```typescript
const profileEpisode: ProfileEpisode = {
  id: 1001,
  tmdbId: 62085,
  seasonId: 101,
  showId: 10,
  seasonNumber: 1,
  episodeNumber: 1,
  episodeType: 'regular',
  title: 'Pilot',
  overview: 'A high school chemistry teacher turned methamphetamine manufacturer...',
  runtime: 58,
  airDate: '2008-01-20',
  stillImage: 'https://image.tmdb.org/t/p/w500/pilot-still.jpg',
  profileId: 5,
  watchStatus: 'WATCHED',
};
```

### `AdminEpisode`

Administrative interface that extends the base episode with system metadata for content management and auditing
purposes.

**Additional Properties:**

- `createdAt: string` - ISO timestamp of when the episode was added to the system
- `updatedAt: string` - ISO timestamp of the last modification

**Usage Example:**

```typescript
const adminEpisode: AdminEpisode = {
  id: 1001,
  tmdbId: 62085,
  seasonId: 101,
  showId: 10,
  seasonNumber: 1,
  episodeNumber: 1,
  episodeType: 'regular',
  title: 'Pilot',
  overview: 'A high school chemistry teacher turned methamphetamine manufacturer...',
  runtime: 58,
  airDate: '2008-01-20',
  stillImage: 'https://image.tmdb.org/t/p/w500/pilot-still.jpg',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
};
```

## Specialized Episode Types

### `NextEpisode`

Comprehensive interface for episodes that users should watch next, providing all necessary information for the "keep
watching" experience.

**Properties:**

- `episodeId: number` - Unique episode identifier
- `episodeTitle: string` - Episode title
- `overview: string` - Episode description
- `episodeNumber: number` - Episode number within season
- `seasonNumber: number` - Season number within show
- `episodeStillImage: string` - Episode still image URL
- `airDate: string` - Original air date
- `showId: number` - Parent show identifier
- `showName: string` - Show title for context
- `seasonId: number` - Parent season identifier
- `posterImage: string` - Show poster image
- `network: string` - Broadcasting network
- `streamingServices: string` - Available streaming platforms
- `profileId: number` - Profile this applies to

**Usage Example:**

```typescript
const nextEpisode: NextEpisode = {
  episodeId: 1002,
  episodeTitle: "Cat's in the Bag...",
  overview: 'Walt and Jesse face the aftermath of their first cook...',
  episodeNumber: 2,
  seasonNumber: 1,
  episodeStillImage: 'https://image.tmdb.org/t/p/w500/episode2-still.jpg',
  airDate: '2008-01-27',
  showId: 10,
  showName: 'Breaking Bad',
  seasonId: 101,
  posterImage: 'https://image.tmdb.org/t/p/w500/breaking-bad-poster.jpg',
  network: 'AMC',
  streamingServices: 'Netflix, Amazon Prime',
  profileId: 5,
};
```

### `RecentUpcomingEpisode`

Interface for episodes in recent/upcoming episode lists, optimized for timeline displays and notification systems.

**Properties:**

- `profileId: number` - Profile identifier
- `showId: number` - Show identifier
- `showName: string` - Show title
- `streamingServices: string` - Available platforms
- `network: string` - Broadcasting network
- `episodeTitle: string` - Episode title
- `airDate: string` - Air date for sorting
- `episodeNumber: number` - Episode number
- `seasonNumber: number` - Season number
- `episodeStillImage: string` - Episode image

**Usage Example:**

```typescript
const recentEpisode: RecentUpcomingEpisode = {
  profileId: 5,
  showId: 10,
  showName: 'Breaking Bad',
  streamingServices: 'Netflix, Amazon Prime',
  network: 'AMC',
  episodeTitle: "...and the Bag's in the River",
  airDate: '2008-02-10',
  episodeNumber: 3,
  seasonNumber: 1,
  episodeStillImage: 'https://image.tmdb.org/t/p/w500/episode3-still.jpg',
};
```

### `ShowEpisode`

Simplified episode interface for show-level episode listings and metadata display.

**Properties:**

- `title: string` - Episode title
- `airDate: string` - Original air date
- `seasonNumber: number` - Season number
- `episodeNumber: number` - Episode number

**Usage Example:**

```typescript
const showEpisode: ShowEpisode = {
  title: 'Pilot',
  airDate: '2008-01-20',
  seasonNumber: 1,
  episodeNumber: 1,
};
```

## Collection Interfaces

### `EpisodesForProfile`

Comprehensive episode collection for a profile, organizing episodes by viewing relevance and timeline.

**Properties:**

- `recentEpisodes: RecentUpcomingEpisode[]` - Recently aired episodes
- `upcomingEpisodes: RecentUpcomingEpisode[]` - Episodes airing soon
- `nextUnwatchedEpisodes: KeepWatchingShow[]` - Next episodes to watch per show

**Usage Example:**

```typescript
const episodesForProfile: EpisodesForProfile = {
  recentEpisodes: [
    {
      profileId: 5,
      showId: 10,
      showName: 'Breaking Bad',
      streamingServices: 'Netflix',
      network: 'AMC',
      episodeTitle: 'Pilot',
      airDate: '2008-01-20',
      episodeNumber: 1,
      seasonNumber: 1,
      episodeStillImage: 'https://image.tmdb.org/t/p/w500/pilot-still.jpg',
    },
  ],
  upcomingEpisodes: [
    {
      profileId: 5,
      showId: 15,
      showName: 'The Mandalorian',
      streamingServices: 'Disney+',
      network: 'Disney+',
      episodeTitle: 'Chapter 1: The Mandalorian',
      airDate: '2024-02-15',
      episodeNumber: 1,
      seasonNumber: 4,
      episodeStillImage: 'https://image.tmdb.org/t/p/w500/mando-s4e1.jpg',
    },
  ],
  nextUnwatchedEpisodes: [
    {
      showId: 10,
      showTitle: 'Breaking Bad',
      posterImage: 'https://image.tmdb.org/t/p/w500/breaking-bad-poster.jpg',
      lastWatched: '2024-01-15T20:30:00Z',
      episodes: [
        {
          episodeId: 1002,
          episodeTitle: "Cat's in the Bag...",
          overview: 'Walt and Jesse face the aftermath...',
          episodeNumber: 2,
          seasonNumber: 1,
          episodeStillImage: 'https://image.tmdb.org/t/p/w500/episode2-still.jpg',
          airDate: '2008-01-27',
          showId: 10,
          showName: 'Breaking Bad',
          seasonId: 101,
          posterImage: 'https://image.tmdb.org/t/p/w500/breaking-bad-poster.jpg',
          network: 'AMC',
          streamingServices: 'Netflix',
          profileId: 5,
        },
      ],
    },
  ],
};
```

## Request Types

### `CreateEpisodeRequest`

Defines the payload structure for creating new episodes in the system. Uses snake_case for database compatibility.

**Properties:**

- `tmdb_id: number` - TMDB identifier for the episode
- `show_id: number` - Parent show identifier
- `season_id: number` - Parent season identifier
- `season_number: number` - Season number within show
- `episode_number: number` - Episode number within season
- `episode_type: string` - Episode type classification
- `title: string` - Episode title
- `overview: string` - Episode description
- `air_date: string` - Original air date
- `runtime: number` - Episode duration in minutes
- `still_image: string` - Episode still image URL

**Usage Example:**

```typescript
const createRequest: CreateEpisodeRequest = {
  tmdb_id: 62085,
  show_id: 10,
  season_id: 101,
  season_number: 1,
  episode_number: 1,
  episode_type: 'regular',
  title: 'Pilot',
  overview: 'A high school chemistry teacher turned methamphetamine manufacturer...',
  air_date: '2008-01-20',
  runtime: 58,
  still_image: 'https://image.tmdb.org/t/p/w500/pilot-still.jpg',
};
```

### `UpdateEpisodeRequest`

Enables modification of existing episodes. Extends the creation request structure for consistency.

**Usage Example:**

```typescript
const updateRequest: UpdateEpisodeRequest = {
  tmdb_id: 62085,
  show_id: 10,
  season_id: 101,
  season_number: 1,
  episode_number: 1,
  episode_type: 'series_premiere',
  title: 'Pilot (Updated)',
  overview: 'Updated description with more details...',
  air_date: '2008-01-20',
  runtime: 58,
  still_image: 'https://image.tmdb.org/t/p/w500/pilot-still-hd.jpg',
};
```

## Real-World Usage Examples

### Episode Controller Implementation

```typescript
import { CreateEpisodeRequest, ProfileEpisode, UpdateEpisodeRequest } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class EpisodeController {
  constructor(private episodeService: EpisodeService) {}

  // GET /api/v1/episodes/profile/:profileId
  async getEpisodesForProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const episodes = await this.episodeService.getEpisodesForProfile(profileId);

      res.status(200).json({
        message: 'Episodes retrieved successfully',
        episodes,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/episodes
  async createEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: CreateEpisodeRequest = req.body;
      const episode = await this.episodeService.createEpisode(request);

      res.status(201).json({
        message: 'Episode created successfully',
        episode,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/admin/episodes/:id
  async updateEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const request: UpdateEpisodeRequest = req.body;
      const episode = await this.episodeService.updateEpisode(id, request);

      res.status(200).json({
        message: 'Episode updated successfully',
        episode,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/episodes/:episodeId/watch-status
  async updateWatchStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const episodeId = parseInt(req.params.episodeId);
      const { profileId, watchStatus } = req.body;

      const updatedEpisode = await this.episodeService.updateWatchStatus(profileId, episodeId, watchStatus);

      res.status(200).json({
        message: 'Episode watch status updated successfully',
        episode: updatedEpisode,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/episodes/keep-watching/:profileId
  async getKeepWatching(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const keepWatching = await this.episodeService.getKeepWatchingEpisodes(profileId);

      res.status(200).json({
        message: 'Keep watching episodes retrieved successfully',
        keepWatching,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/episodes/recent-upcoming/:profileId
  async getRecentUpcoming(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId);
      const { days = 7 } = req.query;

      const episodes = await this.episodeService.getRecentUpcomingEpisodes(profileId, parseInt(days as string));

      res.status(200).json({
        message: 'Recent and upcoming episodes retrieved successfully',
        episodes,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

## Progress Tracking Patterns

### Episode Progress Calculation

```typescript
function calculateEpisodeProgress(episodes: ProfileEpisode[]): {
  totalEpisodes: number;
  watchedEpisodes: number;
  progressPercentage: number;
} {
  const totalEpisodes = episodes.length;
  const watchedEpisodes = episodes.filter((ep) => ep.watchStatus === WatchStatus.WATCHED).length;
  const progressPercentage = totalEpisodes > 0 ? (watchedEpisodes / totalEpisodes) * 100 : 0;

  return {
    totalEpisodes,
    watchedEpisodes,
    progressPercentage,
  };
}

// Season-specific progress
function calculateSeasonProgress(seasonEpisodes: ProfileEpisode[]): {
  seasonNumber: number;
  episodeCount: number;
  watchedCount: number;
  percentComplete: number;
  nextEpisode?: ProfileEpisode;
} {
  const seasonNumber = seasonEpisodes[0]?.seasonNumber || 0;
  const episodeCount = seasonEpisodes.length;
  const watchedCount = seasonEpisodes.filter((ep) => ep.watchStatus === WatchStatus.WATCHED).length;
  const percentComplete = episodeCount > 0 ? (watchedCount / episodeCount) * 100 : 0;

  const nextEpisode = seasonEpisodes
    .filter((ep) => ep.watchStatus === WatchStatus.NOT_WATCHED)
    .sort((a, b) => a.episodeNumber - b.episodeNumber)[0];

  return {
    seasonNumber,
    episodeCount,
    watchedCount,
    percentComplete,
    nextEpisode,
  };
}
```

### Keep Watching Logic

```typescript
function generateKeepWatching(profileEpisodes: ProfileEpisode[]): KeepWatchingShow[] {
  // Group episodes by show
  const episodesByShow = profileEpisodes.reduce(
    (acc, episode) => {
      if (!acc[episode.showId]) {
        acc[episode.showId] = [];
      }
      acc[episode.showId].push(episode);
      return acc;
    },
    {} as Record<number, ProfileEpisode[]>,
  );

  const keepWatchingShows: KeepWatchingShow[] = [];

  Object.entries(episodesByShow).forEach(([showId, episodes]) => {
    // Find shows with at least one watched episode
    const watchedEpisodes = episodes.filter((ep) => ep.watchStatus === WatchStatus.WATCHED);
    const unwatchedEpisodes = episodes.filter((ep) => ep.watchStatus === WatchStatus.NOT_WATCHED);

    if (watchedEpisodes.length > 0 && unwatchedEpisodes.length > 0) {
      // Find the most recently watched episode
      const lastWatchedEpisode = watchedEpisodes.sort(
        (a, b) => new Date(b.airDate).getTime() - new Date(a.airDate).getTime(),
      )[0];

      // Find next episodes to watch (sorted by season/episode number)
      const nextEpisodes = unwatchedEpisodes
        .sort((a, b) => {
          if (a.seasonNumber !== b.seasonNumber) {
            return a.seasonNumber - b.seasonNumber;
          }
          return a.episodeNumber - b.episodeNumber;
        })
        .slice(0, 3) // Limit to next 3 episodes
        .map((ep) => convertToNextEpisode(ep));

      if (nextEpisodes.length > 0) {
        keepWatchingShows.push({
          showId: parseInt(showId),
          showTitle: lastWatchedEpisode.title,
          posterImage: 'https://image.tmdb.org/t/p/w500/show-poster.jpg', // Would be fetched from show data
          lastWatched: lastWatchedEpisode.airDate,
          episodes: nextEpisodes,
        });
      }
    }
  });

  return keepWatchingShows;
}

function convertToNextEpisode(episode: ProfileEpisode): NextEpisode {
  return {
    episodeId: episode.id,
    episodeTitle: episode.title,
    overview: episode.overview,
    episodeNumber: episode.episodeNumber,
    seasonNumber: episode.seasonNumber,
    episodeStillImage: episode.stillImage,
    airDate: episode.airDate,
    showId: episode.showId,
    showName: 'Show Name', // Would be fetched from related show data
    seasonId: episode.seasonId,
    posterImage: 'https://image.tmdb.org/t/p/w500/show-poster.jpg',
    network: 'Network Name',
    streamingServices: 'Streaming Services',
    profileId: episode.profileId,
  };
}
```

## Best Practices

### Episode Status Management

1. **Binary Status Only**: Episodes only support WATCHED/NOT_WATCHED status
2. **Cascade Updates**: Update season/show status when episode status changes
3. **Progress Calculation**: Maintain accurate progress metrics across related content
4. **Validation**: Always validate episode status before updates

```typescript
// Good: Proper episode status handling
async function markEpisodeWatched(profileId: number, episodeId: number): Promise<void> {
  // Validate status is appropriate for episodes
  const newStatus = WatchStatus.WATCHED;

  if (!isBinaryWatchStatus(newStatus)) {
    throw new Error('Episodes only support binary watch status');
  }

  // Update episode status
  await episodeService.updateWatchStatus(profileId, episodeId, newStatus);

  // Cascade to related content
  await updateRelatedProgress(profileId, episodeId);
}

// Avoid: Don't use full watch status for episodes
// const episodeStatus = WatchStatus.UP_TO_DATE; // ❌ Invalid for episodes
```

### Data Consistency

1. **Relational Integrity**: Maintain proper relationships between episodes, seasons, and shows
2. **Air Date Handling**: Use consistent date formats and timezone handling
3. **Image URLs**: Implement fallbacks for missing episode images
4. **TMDB Sync**: Keep external IDs synchronized for data updates

### Performance Optimization

1. **Batch Operations**: Group episode status updates when possible
2. **Efficient Queries**: Use proper indexing for episode lookups
3. **Caching**: Cache frequently accessed episode collections
4. **Pagination**: Implement pagination for large episode lists

## Dependencies

This module depends on:

- `./showTypes` - For KeepWatchingShow and ProfileShow types
- `./watchStatusTypes` - For WatchStatus and status validation
- Database models for episodes, seasons, and shows
- External APIs (TMDB) for episode metadata

## Related Types

- **Show Types** (`showTypes.ts`) - For show-level episode aggregations
- **Season Types** (`seasonTypes.ts`) - For season-level episode collections
- **Profile Types** (`profileTypes.ts`) - For user-specific episode data
- **Watch Status Types** (`watchStatusTypes.ts`) - For episode status management
- **Statistics Types** (`statisticsTypes.ts`) - For episode progress analytics
