# Discovery and Search Types Documentation

This module provides TypeScript type definitions for content discovery and search operations in the KeepWatching
application. It handles search results, discovery queries, and media type categorization for the content exploration
features.

## Overview

The discovery and search types module defines interfaces for:

- Search and discovery result structures
- Media type categorization
- API response patterns for paginated content
- Content metadata and popularity metrics

## Core Interfaces

### `DiscoverAndSearchResult`

The primary interface representing a single piece of content returned from search or discovery operations.

**Properties:**

- `id: string` - Unique identifier in format "tv-{id}" or "movie-{id}"
- `title: string` - Display title of the content
- `genres: string[]` - Array of genre names associated with the content
- `premiered: string` - Release or premiere date in ISO format (YYYY-MM-DD)
- `summary: string` - Brief description or synopsis of the content
- `image: string` - URL to the content's poster or promotional image
- `rating: number` - Content rating score (typically 0-10 scale)
- `popularity?: number` - Optional popularity metric (higher values = more popular)

**Usage Example:**

```typescript
const searchResult: DiscoverAndSearchResult = {
  id: 'tv-12345',
  title: 'Breaking Bad',
  genres: ['Drama', 'Crime', 'Thriller'],
  premiered: '2008-01-20',
  summary: 'A chemistry teacher turned methamphetamine manufacturer...',
  image: 'https://example.com/breaking-bad-poster.jpg',
  rating: 9.5,
  popularity: 95.8,
};
```

### `DiscoverAndSearchResponse`

API response wrapper for search and discovery operations that extends the base response pattern to include paginated
results with metadata.

**Key Features:**

- Paginated result sets for large content libraries
- Total count metadata for pagination controls
- Current page tracking for navigation
- Standardized response format across all discovery endpoints

**Structure:**

```typescript
interface DiscoverAndSearchResponse extends BaseResponse {
  message: string; // From BaseResponse
  results: DiscoverAndSearchResult[]; // Current page results
  totalResults: number; // Total available results
  totalPages: number; // Total available pages
  currentPage: number; // Current page (1-based)
}
```

**Usage Example:**

```typescript
const searchResponse: DiscoverAndSearchResponse = {
  message: 'Search completed successfully',
  results: [
    {
      id: 'tv-12345',
      title: 'Breaking Bad',
      genres: ['Drama', 'Crime'],
      premiered: '2008-01-20',
      summary: 'A chemistry teacher turned meth manufacturer...',
      image: 'https://example.com/poster.jpg',
      rating: 9.5,
      popularity: 95.8,
    },
  ],
  totalResults: 147,
  totalPages: 15,
  currentPage: 1,
};
```

## Enumerations

### `MediaType`

Enumeration of supported media types for search and discovery operations. Maps to external API values (e.g., TMDB API)
for consistent media type identification.

**Values:**

- `MediaType.SHOW = 'tv'` - Television shows and series
- `MediaType.MOVIE = 'movie'` - Movies and films

**Usage Examples:**

```typescript
// Using in search requests
const searchMovies = (query: string) => {
  return searchContent(query, MediaType.MOVIE);
};

const searchShows = (query: string) => {
  return searchContent(query, MediaType.SHOW);
};

// Type checking and conditional logic
if (mediaType === MediaType.SHOW) {
  // Handle TV show specific logic
  console.log("Processing TV show content");
} else if (mediaType === MediaType.MOVIE) {
  // Handle movie specific logic
  console.log("Processing movie content");
}

// Switch statement usage
switch (mediaType) {
  case MediaType.SHOW:
    return processShowContent(content);
  case MediaType.MOVIE:
    return processMovieContent(content);
  default:
    throw new Error(`Unsupported media type: ${mediaType}`);
}
```

## Real-World Usage Examples

Based on the actual controller implementations in the KeepWatching application:

### Search Controller Implementation

```typescript
import { SearchQuery } from '@ajgifford/keepwatching-common-server/schema';
import { contentDiscoveryService } from '@ajgifford/keepwatching-common-server/services';
import { MediaType } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

/**
 * Search for shows
 * @route GET /api/v1/search/shows
 */
export const searchShows = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { searchString, year, page = 1 } = req.query as unknown as SearchQuery;
    const searchResults = await contentDiscoveryService.searchMedia(MediaType.SHOW, searchString, year, page);
    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};

/**
 * Search for movies
 * @route GET /api/v1/search/movies
 */
export const searchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { searchString, year, page = 1 } = req.query as unknown as SearchQuery;
    const searchResults = await contentDiscoveryService.searchMedia(MediaType.MOVIE, searchString, year, page);
    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};
```

### Discovery Controller Implementation

```typescript
import {
  DiscoverChangesQuery,
  DiscoverTopQuery,
  DiscoverTrendingQuery,
} from '@ajgifford/keepwatching-common-server/schema';
import { contentDiscoveryService } from '@ajgifford/keepwatching-common-server/services';
import { NextFunction, Request, Response } from 'express';

// GET /api/v1/discover/top
export const discoverTopContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { showType, service } = req.query as DiscoverTopQuery;
    const topContent = await contentDiscoveryService.discoverTopContent(showType, service);
    res.status(200).json(topContent);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/discover/trending
export const discoverTrendingContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { showType, page = 1 } = req.query as unknown as DiscoverTrendingQuery;
    const trendingContent = await contentDiscoveryService.discoverTrendingContent(showType, page);
    res.status(200).json(trendingContent);
  } catch (error) {
    next(error);
  }
};
```

## API Integration Patterns

### Search Endpoints

These types support RESTful search API patterns:

```typescript
// Movie search endpoint
async function searchMovies(query: SearchQuery): Promise<DiscoverAndSearchResponse> {
  const { searchString, year, page = 1 } = query;
  return await contentDiscoveryService.searchMedia(MediaType.MOVIE, searchString, year, page);
}

// TV show search endpoint
async function searchShows(query: SearchQuery): Promise<DiscoverAndSearchResponse> {
  const { searchString, year, page = 1 } = query;
  return await contentDiscoveryService.searchMedia(MediaType.SHOW, searchString, year, page);
}
```

### Discovery Endpoints

```typescript
// Top content discovery
async function getTopContent(showType: string, service?: string): Promise<DiscoverAndSearchResponse> {
  return await contentDiscoveryService.discoverTopContent(showType, service);
}

// Trending content discovery
async function getTrendingContent(showType: string, page: number = 1): Promise<DiscoverAndSearchResponse> {
  return await contentDiscoveryService.discoverTrendingContent(showType, page);
}

// Recent changes discovery
async function getRecentChanges(
  showType: string,
  service?: string,
  changeType?: string,
): Promise<DiscoverAndSearchResponse> {
  return await contentDiscoveryService.discoverChangesContent(showType, service, changeType);
}
```

## Pagination Handling

The response structure supports comprehensive pagination:

```typescript
function handleSearchResults(response: DiscoverAndSearchResponse) {
  const { results, totalResults, totalPages, currentPage } = response;

  console.log(`Showing ${results.length} results from page ${currentPage} of ${totalPages}`);
  console.log(`Total results available: ${totalResults}`);

  // Process current page results
  results.forEach((result) => {
    console.log(`${result.title} (${result.rating}/10) - ${result.genres.join(', ')}`);
  });

  // Determine pagination controls
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  if (hasNextPage) {
    console.log('Next page available');
  }

  if (hasPreviousPage) {
    console.log('Previous page available');
  }
}
```

## Content Processing

### Genre and Metadata Handling

```typescript
function processSearchResult(result: DiscoverAndSearchResult) {
  // Extract media type from ID
  const mediaType = result.id.startsWith('tv-') ? MediaType.SHOW : MediaType.MOVIE;

  // Process genres
  const primaryGenre = result.genres[0];
  const isPopular = result.popularity && result.popularity > 80;

  // Format premiere date
  const premiereYear = new Date(result.premiered).getFullYear();

  return {
    ...result,
    mediaType,
    primaryGenre,
    isPopular,
    premiereYear,
  };
}
```

### Content Filtering and Sorting

```typescript
function filterAndSortResults(results: DiscoverAndSearchResult[]) {
  return results
    .filter((result) => result.rating >= 7.0) // High-rated content only
    .sort((a, b) => {
      // Sort by popularity, then by rating
      if (a.popularity && b.popularity) {
        return b.popularity - a.popularity;
      }
      return b.rating - a.rating;
    });
}
```

## Error Handling

When working with these types, consider:

- **Empty Results**: Handle cases where no content matches search criteria
- **Pagination Bounds**: Validate page numbers within available range
- **Media Type Validation**: Ensure MediaType enum values are used consistently
- **Image Loading**: Handle cases where image URLs may be invalid

```typescript
function validateSearchResponse(response: DiscoverAndSearchResponse): boolean {
  if (!response.results || !Array.isArray(response.results)) {
    console.error('Invalid results array in response');
    return false;
  }

  if (response.currentPage < 1 || response.currentPage > response.totalPages) {
    console.error('Current page out of bounds');
    return false;
  }

  if (response.totalResults < 0 || response.totalPages < 0) {
    console.error('Invalid pagination metadata');
    return false;
  }

  return true;
}

function validateMediaType(mediaType: string): mediaType is MediaType {
  return Object.values(MediaType).includes(mediaType as MediaType);
}
```

## Dependencies

This module depends on:

- `./responseTypes` - For BaseResponse interface
- External content APIs (TMDB, etc.) - For media data sourcing

## Best Practices

1. **Type Safety**: Always use MediaType enum instead of string literals
2. **Pagination**: Implement proper pagination controls using response metadata
3. **Error Handling**: Validate response structure before processing results
4. **Performance**: Consider implementing result caching for popular searches
5. **Image Handling**: Implement fallbacks for missing or broken image URLs
6. **Genre Processing**: Handle varying genre formats from different content sources

## Common Patterns

### Search with Filters

```typescript
interface SearchFilters {
  mediaType: MediaType;
  genres?: string[];
  minRating?: number;
  year?: number;
  page?: number;
}

async function searchWithFilters(searchString: string, filters: SearchFilters): Promise<DiscoverAndSearchResult[]> {
  const response = await contentDiscoveryService.searchMedia(
    filters.mediaType,
    searchString,
    filters.year,
    filters.page || 1,
  );

  let results = response.results;

  // Apply client-side filters
  if (filters.genres) {
    results = results.filter((result) => result.genres.some((genre) => filters.genres!.includes(genre)));
  }

  if (filters.minRating) {
    results = results.filter((result) => result.rating >= filters.minRating!);
  }

  return results;
}
```

### Content Recommendation

```typescript
function getContentRecommendations(
  userPreferences: { genres: string[]; minRating: number },
  results: DiscoverAndSearchResult[],
): DiscoverAndSearchResult[] {
  return results
    .filter((result) => {
      // Match user preferences
      const hasPreferredGenre = result.genres.some((genre) => userPreferences.genres.includes(genre));
      const meetsRatingThreshold = result.rating >= userPreferences.minRating;

      return hasPreferredGenre && meetsRatingThreshold;
    })
    .sort((a, b) => {
      // Prioritize by rating and popularity
      const scoreA = a.rating + (a.popularity || 0) / 10;
      const scoreB = b.rating + (b.popularity || 0) / 10;
      return scoreB - scoreA;
    });
}
```

## Related Types

- `Show` and `Movie` types (from showTypes.ts and movieTypes.ts) - For detailed content information
- `BaseResponse` (from responseTypes.ts) - For API response structure
- External API types - For integration with content databases (TMDB, etc.)

## Future Considerations

- **Advanced Filtering**: Extended filter options for streaming services, content ratings
- **Personalization**: User-specific recommendation scoring
- **Multi-language Support**: Localized content titles and descriptions
- **Content Availability**: Integration with streaming service availability data
