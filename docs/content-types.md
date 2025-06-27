[< Back](../README.md)

# Content Types Documentation

This module provides TypeScript type definitions for content reference operations in the KeepWatching application. It handles lightweight content identification and cross-referencing for scenarios where full content data is not needed.

## Overview

The content types module defines interfaces for:

- Lightweight content references with essential identification
- Cross-referencing content across different contexts
- Minimizing API payload sizes for list operations
- Supporting content removal and cleanup operations

## Core Interfaces

### `ContentReference`

Lightweight reference interface for content that contains only essential identification information. Used in contexts where full content data is not needed, such as lists, recommendations, cross-references, or API responses that need to minimize payload size.

**Properties:**

- `id: number` - Unique identifier for the content
- `tmdbId: number` - TMDB identifier for external API operations
- `title: string` - Display title of the content
- `releaseDate: string` - Release date in ISO format (YYYY-MM-DD)

**Key Features:**

- **Minimal Data**: Contains only essential information for identification
- **External Integration**: Includes TMDB ID for API operations
- **Display Ready**: Includes title for immediate user display
- **Temporal Context**: Release date for chronological sorting

**Usage Example:**

```typescript
const tmdbRef: ContentReference = {
  id: 1,
  tmdbId: 1399,
  title: "Game of Thrones",
  releaseDate: "2011-04-17"
};

// Used for removed references
const removedContentRef: ContentReference = {
  id: 15,
  tmdbId: 1396,
  title: "Breaking Bad",
  releaseDate: "2008-01-20"
};

// Used in recommendation lists
const recentContent: ContentReference[] = [
  { id: 1, title: "Inception", tmdbId: 27205, releaseDate: "2010-07-16" },
  { id: 2, title: "The Matrix", tmdbId: 603, releaseDate: "1999-03-31" },
  { id: 3, title: "Interstellar", tmdbId: 157336, releaseDate: "2014-11-07" }
];
```

## Use Cases

### 1. Content Removal Operations

When content is removed from a user's library, only essential reference information is needed:

```typescript
interface RemovalResponse {
  removedContent: ContentReference;
  message: string;
}

async function removeFromFavorites(contentId: number): Promise<RemovalResponse> {
  const contentRef = await getContentReference(contentId);
  await removeContent(contentId);
  
  return {
    removedContent: contentRef,
    message: "Content removed successfully"
  };
}
```

### 2. Recent/Upcoming Content Lists

For timeline displays where only basic information is needed:

```typescript
interface ContentTimeline {
  recentContent: ContentReference[];
  upcomingContent: ContentReference[];
}

async function getContentTimeline(): Promise<ContentTimeline> {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  return {
    recentContent: await getContentByDateRange(threeMonthsAgo, now),
    upcomingContent: await getContentByDateRange(now, threeMonthsFromNow)
  };
}
```

### 3. Search Results and Discovery

For search operations where lightweight results improve performance:

```typescript
interface SearchResults {
  query: string;
  results: ContentReference[];
  totalCount: number;
}

async function searchContent(query: string, limit: number = 20): Promise<SearchResults> {
  const results = await performSearch(query, limit);
  
  return {
    query,
    results: results.map(content => ({
      id: content.id,
      tmdbId: content.tmdbId,
      title: content.title,
      releaseDate: content.releaseDate
    })),
    totalCount: results.length
  };
}
```

### 4. Cross-Reference Operations

For linking content across different contexts:

```typescript
interface RecommendationResult {
  baseContent: ContentReference;
  similarContent: ContentReference[];
  personalizedRecommendations: ContentReference[];
}

async function getRecommendations(contentId: number): Promise<RecommendationResult> {
  const baseContent = await getContentReference(contentId);
  const similar = await findSimilarContent(contentId);
  const personalized = await getPersonalizedRecommendations(contentId);

  return {
    baseContent,
    similarContent: similar.map(toContentReference),
    personalizedRecommendations: personalized.map(toContentReference)
  };
}

function toContentReference(content: any): ContentReference {
  return {
    id: content.id,
    tmdbId: content.tmdbId,
    title: content.title,
    releaseDate: content.releaseDate
  };
}
```

## Integration Patterns

### API Response Optimization

ContentReference is designed to minimize API payload sizes:

```typescript
// Heavy response with full content data
interface HeavyContentResponse {
  content: {
    id: number;
    tmdbId: number;
    title: string;
    description: string;
    releaseDate: string;
    posterImage: string;
    backdropImage: string;
    runtime: number;
    userRating: number;
    genres: string[];
    streamingServices: string[];
    // ... many more fields
  }[];
}

// Lightweight response using ContentReference
interface LightContentResponse {
  content: ContentReference[];
}

// Typical size reduction: ~80-90% smaller payload
```

### External API Integration

ContentReference maintains TMDB compatibility for external operations:

```typescript
class TMDBService {
  async fetchContentDetails(reference: ContentReference) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${reference.tmdbId}?api_key=${this.apiKey}`
    );
    return await response.json();
  }

  async updateContentFromTMDB(reference: ContentReference) {
    const tmdbData = await this.fetchContentDetails(reference);
    return await this.updateLocalContent(reference.id, tmdbData);
  }
}
```

### Caching Strategies

Lightweight references are ideal for caching:

```typescript
class ContentCacheService {
  private referenceCache = new Map<number, ContentReference>();
  private readonly CACHE_TTL = 60 * 60 * 1000; // 1 hour

  async getCachedReference(contentId: number): Promise<ContentReference | null> {
    return this.referenceCache.get(contentId) || null;
  }

  setCachedReference(reference: ContentReference): void {
    this.referenceCache.set(reference.id, reference);
    
    // Auto-expire cache entry
    setTimeout(() => {
      this.referenceCache.delete(reference.id);
    }, this.CACHE_TTL);
  }

  // Batch operations for better performance
  setCachedReferences(references: ContentReference[]): void {
    references.forEach(ref => this.setCachedReference(ref));
  }
}
```

## Performance Benefits

### Memory Usage

ContentReference significantly reduces memory footprint:

```typescript
// Full content object: ~2-5KB per item
interface FullContent {
  // 20+ properties with large strings, arrays, etc.
}

// ContentReference: ~200-300 bytes per item
interface ContentReference {
  // 4 essential properties only
}

// For 1000 items:
// Full content: ~2-5MB
// ContentReference: ~200-300KB
// Memory savings: 85-95%
```

### Network Transfer

Reduced bandwidth usage for mobile and slow connections:

```typescript
// API endpoint returning recent content
app.get('/api/recent-content', async (req, res) => {
  const recentContent = await getRecentContent(100); // 100 items
  
  // Using ContentReference reduces response size by ~90%
  const lightweightResponse = recentContent.map(toContentReference);
  
  res.json({
    message: "Recent content retrieved successfully",
    content: lightweightResponse,
    totalCount: lightweightResponse.length
  });
});
```

## Best Practices

### 1. When to Use ContentReference

**Use ContentReference for:**
- List operations (search results, recent content, recommendations)
- Cross-references between different content types
- Removal confirmations and cleanup operations
- Mobile API responses where bandwidth is limited
- Caching scenarios where memory is constrained

**Don't use ContentReference for:**
- Detailed content views requiring full metadata
- Content creation or modification operations
- User interfaces requiring rich content information

### 2. Conversion Patterns

Always provide utility functions for converting between full content and references:

```typescript
// Convert full content to reference
function toContentReference(content: Show | Movie): ContentReference {
  return {
    id: content.id,
    tmdbId: content.tmdbId,
    title: content.title,
    releaseDate: content.releaseDate
  };
}

// Batch conversion
function toContentReferences(content: (Show | Movie)[]): ContentReference[] {
  return content.map(toContentReference);
}

// Expand reference to full content (when needed)
async function expandContentReference(reference: ContentReference): Promise<Show | Movie> {
  return await getFullContentById(reference.id);
}
```

### 3. Error Handling

Handle cases where referenced content may no longer exist:

```typescript
async function validateContentReference(reference: ContentReference): Promise<boolean> {
  try {
    const exists = await contentExists(reference.id);
    return exists;
  } catch (error) {
    console.warn(`Content reference validation failed for ID ${reference.id}:`, error);
    return false;
  }
}

async function cleanupInvalidReferences(references: ContentReference[]): Promise<ContentReference[]> {
  const validReferences: ContentReference[] = [];
  
  for (const ref of references) {
    if (await validateContentReference(ref)) {
      validReferences.push(ref);
    } else {
      console.info(`Removing invalid content reference: ${ref.title} (ID: ${ref.id})`);
    }
  }
  
  return validReferences;
}
```

### 4. Type Safety

Maintain type safety when working with references:

```typescript
// Type guard for ContentReference
function isContentReference(obj: any): obj is ContentReference {
  return obj &&
    typeof obj.id === 'number' &&
    typeof obj.tmdbId === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.releaseDate === 'string';
}

// Validate arrays of references
function validateContentReferences(references: unknown[]): ContentReference[] {
  return references.filter(isContentReference);
}
```

## Dependencies

This module has minimal dependencies:

- No external dependencies
- Used by: `movieTypes.ts`, `showTypes.ts` (as reference types)
- Core to: Lightweight API operations, caching systems, mobile applications

## Related Types

- **Movie Types** (`movieTypes.ts`) - Uses MovieReference (extends ContentReference concept)
- **Show Types** (`showTypes.ts`) - Uses ShowReference (extends ContentReference concept)
- **Response Types** (`responseTypes.ts`) - For API response structures
- **Search Types** (`discoverAndSearchTypes.ts`) - For content discovery operations

## Migration Guide

If upgrading from full content objects to ContentReference:

### Before (Heavy)
```typescript
interface ApiResponse {
  content: FullContentObject[];
}
```

### After (Lightweight)
```typescript
interface ApiResponse {
  content: ContentReference[];
}

// Provide expansion endpoint for when full data is needed
interface DetailedContentResponse {
  content: FullContentObject;
}
```

### Gradual Migration Strategy
```typescript
// Support both during transition
interface FlexibleApiResponse {
  content: ContentReference[];
  expandedContent?: FullContentObject[]; // Optional full data
  canExpand: boolean; // Indicates if expansion is available
}
```