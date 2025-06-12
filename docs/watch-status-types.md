[< Back](../README.md)

# Watch Status Types Documentation

This module provides TypeScript type definitions for content watch status management in the KeepWatching application. It
handles viewing states, progress tracking, and content status categorization across different media types.

## Overview

The watch status types module defines:

- Core watch status enumeration and types
- Content-specific status constraints (binary vs. full)
- Type guards for runtime validation
- Helper functions for status management
- Default status assignment utilities

## Core Enumerations

### `WatchStatus`

The central enumeration containing all possible watch status values across the application. Serves as the single source
of truth for watch status values.

**Values:**

- `NOT_WATCHED = 'NOT_WATCHED'` - Content has not been viewed
- `WATCHING = 'WATCHING'` - Content is currently being viewed (in progress)
- `WATCHED = 'WATCHED'` - Content has been completely viewed
- `UP_TO_DATE = 'UP_TO_DATE'` - All available content has been viewed (for ongoing series)

**Usage Example:**

```typescript
import { WatchStatus } from '@ajgifford/keepwatching-types';

// Setting show status
const showStatus = WatchStatus.WATCHING;

// Updating episode status
const episodeStatus = WatchStatus.WATCHED;

// Checking status values
if (status === WatchStatus.UP_TO_DATE) {
  console.log('User is caught up with this series');
}
```

## Type Definitions

### `WatchStatusType`

Base type that includes all possible watch statuses. Used mainly for type checking and as a foundation for more specific
types.

```typescript
type WatchStatusType = keyof typeof WatchStatus;
// Results in: 'NOT_WATCHED' | 'WATCHING' | 'WATCHED' | 'UP_TO_DATE'
```

### `FullWatchStatusType`

Status type for content that supports all watch statuses (Shows and Seasons). These can have progressive status like
`UP_TO_DATE` for ongoing series.

```typescript
type FullWatchStatusType = WatchStatusType;

// Usage examples
const showStatus: FullWatchStatusType = WatchStatus.UP_TO_DATE;
const seasonStatus: FullWatchStatusType = WatchStatus.WATCHING;
```

### `BinaryWatchStatusType`

Status type for content that can only be completely watched or not (Movies and Episodes). Binary watch status - either
watched or not watched.

```typescript
type BinaryWatchStatusType = Extract<WatchStatusType, 'NOT_WATCHED' | 'WATCHED'>;

// Usage examples
const movieStatus: BinaryWatchStatusType = WatchStatus.WATCHED;
const episodeStatus: BinaryWatchStatusType = WatchStatus.NOT_WATCHED;

// These would cause TypeScript errors:
// const invalidMovie: BinaryWatchStatusType = WatchStatus.WATCHING; // Error!
// const invalidEpisode: BinaryWatchStatusType = WatchStatus.UP_TO_DATE; // Error!
```

## Type Guards

### `isBinaryWatchStatus()`

Helper type guard to check if a given status is valid for binary watch status content (Movies and Episodes).

**Signature:**

```typescript
function isBinaryWatchStatus(status: WatchStatusType): status is BinaryWatchStatusType;
```

**Parameters:**

- `status: WatchStatusType` - The status to check

**Returns:**

- `boolean` - True if the status is valid for movies and episodes

**Usage Examples:**

```typescript
import { WatchStatus, isBinaryWatchStatus } from '@ajgifford/keepwatching-types';

// Validate movie status
const movieStatus = WatchStatus.WATCHED;
if (isBinaryWatchStatus(movieStatus)) {
  console.log('Valid movie status');
  // TypeScript now knows movieStatus is BinaryWatchStatusType
}

// Runtime validation
function setMovieStatus(status: WatchStatusType) {
  if (isBinaryWatchStatus(status)) {
    // Safe to use for movie
    updateMovieWatchStatus(status);
  } else {
    throw new Error(`Invalid movie status: ${status}`);
  }
}

// Filtering statuses
const allStatuses: WatchStatusType[] = ['NOT_WATCHED', 'WATCHING', 'WATCHED', 'UP_TO_DATE'];
const binaryStatuses = allStatuses.filter(isBinaryWatchStatus);
// Result: ['NOT_WATCHED', 'WATCHED']
```

### `isFullWatchStatus()`

Helper type guard to check if a given status is valid for full watch status content (Shows and Seasons).

**Signature:**

```typescript
function isFullWatchStatus(status: WatchStatusType): status is FullWatchStatusType;
```

**Parameters:**

- `status: WatchStatusType` - The status to check

**Returns:**

- `boolean` - True if the status is valid for shows and seasons

**Usage Examples:**

```typescript
import { WatchStatus, isFullWatchStatus } from '@ajgifford/keepwatching-types';

// Validate show status
const showStatus = WatchStatus.UP_TO_DATE;
if (isFullWatchStatus(showStatus)) {
  console.log('Valid show status');
  // TypeScript now knows showStatus is FullWatchStatusType
}

// Content type determination
function handleContentStatus(status: WatchStatusType, contentType: string) {
  if (contentType === 'show' || contentType === 'season') {
    if (isFullWatchStatus(status)) {
      updateShowSeasonStatus(status);
    } else {
      // This should never happen since all statuses are valid for shows/seasons
      console.error('Unexpected status validation failure');
    }
  } else if (contentType === 'movie' || contentType === 'episode') {
    if (isBinaryWatchStatus(status)) {
      updateMovieEpisodeStatus(status);
    } else {
      throw new Error(`Invalid ${contentType} status: ${status}`);
    }
  }
}
```

## Utility Functions

### `getDefaultStatus()`

Helper function to get the default status for a content type. Currently returns `NOT_WATCHED` for all content types but
provides a centralized place for future customization.

**Signature:**

```typescript
function getDefaultStatus(contentType: 'show' | 'season' | 'episode' | 'movie'): WatchStatusType;
```

**Parameters:**

- `contentType: 'show' | 'season' | 'episode' | 'movie'` - The type of content

**Returns:**

- `WatchStatusType` - The default status for the content type (currently always `NOT_WATCHED`)

**Usage Examples:**

```typescript
import { getDefaultStatus } from '@ajgifford/keepwatching-types';

// Initialize content with default status
const newShow = {
  id: 1,
  title: 'New Show',
  watchStatus: getDefaultStatus('show'), // Returns WatchStatus.NOT_WATCHED
};

const newMovie = {
  id: 1,
  title: 'New Movie',
  watchStatus: getDefaultStatus('movie'), // Returns WatchStatus.NOT_WATCHED
};

// Factory function for content creation
function createContentWithDefaults(type: 'show' | 'season' | 'episode' | 'movie', data: any) {
  return {
    ...data,
    watchStatus: getDefaultStatus(type),
    createdAt: new Date(),
  };
}
```

## Content Type Mapping

### Shows and Seasons (FullWatchStatusType)

Shows and seasons support all four watch statuses because they represent collections of content that can be partially
consumed:

```typescript
import { FullWatchStatusType, WatchStatus } from '@ajgifford/keepwatching-types';

interface Show {
  id: number;
  title: string;
  watchStatus: FullWatchStatusType;
}

interface Season {
  id: number;
  showId: number;
  seasonNumber: number;
  watchStatus: FullWatchStatusType;
}

// All valid show/season statuses
const showStatuses: FullWatchStatusType[] = [
  WatchStatus.NOT_WATCHED, // Haven't started watching
  WatchStatus.WATCHING, // Currently watching episodes
  WatchStatus.WATCHED, // Finished all available episodes
  WatchStatus.UP_TO_DATE, // Caught up with ongoing series
];

// Status progression examples
function updateShowProgress(show: Show, watchedEpisodes: number, totalEpisodes: number, isOngoing: boolean) {
  if (watchedEpisodes === 0) {
    show.watchStatus = WatchStatus.NOT_WATCHED;
  } else if (watchedEpisodes < totalEpisodes) {
    show.watchStatus = WatchStatus.WATCHING;
  } else if (isOngoing) {
    show.watchStatus = WatchStatus.UP_TO_DATE;
  } else {
    show.watchStatus = WatchStatus.WATCHED;
  }
}
```

### Movies and Episodes (BinaryWatchStatusType)

Movies and episodes only support binary statuses because they represent discrete content that is either watched or not:

```typescript
import { BinaryWatchStatusType, WatchStatus } from '@ajgifford/keepwatching-types';

interface Movie {
  id: number;
  title: string;
  watchStatus: BinaryWatchStatusType;
}

interface Episode {
  id: number;
  showId: number;
  episodeNumber: number;
  watchStatus: BinaryWatchStatusType;
}

// Valid movie/episode statuses (only two options)
const binaryStatuses: BinaryWatchStatusType[] = [
  WatchStatus.NOT_WATCHED, // Haven't watched
  WatchStatus.WATCHED, // Have watched
];

// Simple status toggle
function toggleWatchStatus(status: BinaryWatchStatusType): BinaryWatchStatusType {
  return status === WatchStatus.WATCHED ? WatchStatus.NOT_WATCHED : WatchStatus.WATCHED;
}

// Bulk episode updates
function markEpisodesWatched(episodes: Episode[], episodeIds: number[]) {
  episodes.forEach((episode) => {
    if (episodeIds.includes(episode.id)) {
      episode.watchStatus = WatchStatus.WATCHED;
    }
  });
}
```

## Real-World Usage Patterns

### Status Validation

```typescript
import { WatchStatus, isBinaryWatchStatus, isFullWatchStatus } from '@ajgifford/keepwatching-types';

// API endpoint validation
function validateStatusUpdate(contentType: string, newStatus: string) {
  // First check if it's a valid status at all
  if (!Object.values(WatchStatus).includes(newStatus as WatchStatus)) {
    throw new Error(`Invalid watch status: ${newStatus}`);
  }

  const status = newStatus as WatchStatusType;

  // Validate based on content type
  if (contentType === 'movie' || contentType === 'episode') {
    if (!isBinaryWatchStatus(status)) {
      throw new Error(`Movies and episodes only support WATCHED/NOT_WATCHED statuses. Received: ${status}`);
    }
  } else if (contentType === 'show' || contentType === 'season') {
    if (!isFullWatchStatus(status)) {
      // This should never happen since all statuses are valid for shows/seasons
      throw new Error(`Unexpected validation error for ${contentType}`);
    }
  } else {
    throw new Error(`Unsupported content type: ${contentType}`);
  }

  return status;
}
```

### Progress Calculation

```typescript
import { BinaryWatchStatusType, FullWatchStatusType, WatchStatus } from '@ajgifford/keepwatching-types';

// Calculate show progress based on episode statuses
function calculateShowStatus(
  episodes: { watchStatus: BinaryWatchStatusType }[],
  isOngoing: boolean,
): FullWatchStatusType {
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

// Calculate overall progress percentage
function calculateWatchProgress(statuses: (FullWatchStatusType | BinaryWatchStatusType)[]): number {
  const weights = {
    [WatchStatus.NOT_WATCHED]: 0,
    [WatchStatus.WATCHING]: 0.5,
    [WatchStatus.WATCHED]: 1,
    [WatchStatus.UP_TO_DATE]: 1,
  };

  const totalWeight = statuses.reduce((sum, status) => sum + weights[status], 0);
  return (totalWeight / statuses.length) * 100;
}
```

### Status Filtering and Sorting

```typescript
import { WatchStatus, WatchStatusType } from '@ajgifford/keepwatching-types';

interface ContentItem {
  id: number;
  title: string;
  watchStatus: WatchStatusType;
  lastUpdated: Date;
}

// Filter content by watch status
function filterByWatchStatus(items: ContentItem[], statuses: WatchStatusType[]): ContentItem[] {
  return items.filter((item) => statuses.includes(item.watchStatus));
}

// Get content user is currently watching
function getCurrentlyWatching(items: ContentItem[]): ContentItem[] {
  return filterByWatchStatus(items, [WatchStatus.WATCHING]);
}

// Get unwatched content
function getUnwatched(items: ContentItem[]): ContentItem[] {
  return filterByWatchStatus(items, [WatchStatus.NOT_WATCHED]);
}

// Sort by watch status priority
function sortByWatchPriority(items: ContentItem[]): ContentItem[] {
  const priorityOrder = {
    [WatchStatus.WATCHING]: 1, // Highest priority - currently watching
    [WatchStatus.NOT_WATCHED]: 2, // Second priority - new content
    [WatchStatus.UP_TO_DATE]: 3, // Third priority - caught up
    [WatchStatus.WATCHED]: 4, // Lowest priority - already finished
  };

  return [...items].sort((a, b) => {
    const priorityDiff = priorityOrder[a.watchStatus] - priorityOrder[b.watchStatus];
    if (priorityDiff !== 0) return priorityDiff;

    // If same priority, sort by last updated (most recent first)
    return b.lastUpdated.getTime() - a.lastUpdated.getTime();
  });
}
```

## API Integration Examples

### Controller Implementation

```typescript
import { WatchStatus, validateStatusUpdate } from '@ajgifford/keepwatching-types';

// Express controller for updating watch status
export const updateWatchStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId, contentId, contentType, watchStatus } = req.body as UpdateWatchStatusRequest;

    // Validate the status for the content type
    const validatedStatus = validateStatusUpdate(contentType, watchStatus);

    // Update in database
    const updatedContent = await watchStatusService.updateStatus(profileId, contentId, contentType, validatedStatus);

    // Calculate any cascading updates (e.g., show status based on episode statuses)
    const relatedUpdates = await watchStatusService.calculateRelatedUpdates(profileId, contentId, contentType);

    const response: WatchStatusResponse = {
      message: 'Watch status updated successfully',
      updatedContent,
      relatedUpdates,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
```

## Dependencies

This module has no external dependencies and provides the foundation for other type modules:

- **Used by**: `profileTypes.ts`, `showTypes.ts`, `movieTypes.ts`, `episodeTypes.ts`, `seasonTypes.ts`
- **Imports**: None (pure TypeScript types)

## Best Practices

1. **Type Safety**: Always use the specific watch status types (`BinaryWatchStatusType` or `FullWatchStatusType`) rather
   than the general `WatchStatusType`
2. **Validation**: Use type guards (`isBinaryWatchStatus`, `isFullWatchStatus`) for runtime validation
3. **Default Values**: Use `getDefaultStatus()` for consistent initialization
4. **Error Handling**: Implement proper validation before status updates
5. **Status Progression**: Consider logical status transitions (e.g., NOT_WATCHED → WATCHING → WATCHED)
6. **Cascade Updates**: Update related content statuses when appropriate (e.g., show status when all episodes are
   watched)

## Related Types

- **Profile Types** (`profileTypes.ts`) - Uses watch status for user content
- **Show Types** (`showTypes.ts`) - Uses `FullWatchStatusType` for shows
- **Movie Types** (`movieTypes.ts`) - Uses `BinaryWatchStatusType` for movies
- **Episode Types** (`episodeTypes.ts`) - Uses `BinaryWatchStatusType` for episodes
- **Season Types** (`seasonTypes.ts`) - Uses `FullWatchStatusType` for seasons
- **Statistics Types** (`statisticsTypes.ts`) - Aggregates watch status data
