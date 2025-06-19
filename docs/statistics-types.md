[< Back](../README.md)

# Statistics Types Documentation

This module provides TypeScript type definitions for analytics and statistics operations in the KeepWatching
application. It handles viewing progress tracking, content consumption metrics, and user behavior analytics across
shows, movies, and episodes.

## Overview

The statistics types module defines interfaces for:

- Show and movie consumption analytics
- Episode watching progress tracking
- Profile and account-level statistics
- Content distribution by genre and streaming service
- Watch status aggregations and progress metrics

## Core Interfaces

### `ShowStatisticsResponse`

Comprehensive statistics for show-related metrics and analytics, providing insights into viewing patterns and
preferences.

**Properties:**

- `total: number` - Total number of shows in the user's library
- `watchStatusCounts: object` - Count of shows by watch status category
  - `watched: number` - Completely watched shows
  - `watching: number` - Currently being watched
  - `notWatched: number` - Not yet started
  - `upToDate: number` - Up to date with latest episodes
- `genreDistribution: Record<string, number>` - Shows count by genre
- `serviceDistribution: Record<string, number>` - Shows count by streaming service
- `watchProgress: number` - Overall progress percentage (0-100)

**Usage Example:**

```typescript
const showStats: ShowStatisticsResponse = {
  total: 25,
  watchStatusCounts: {
    watched: 8,
    watching: 5,
    notWatched: 10,
    upToDate: 2,
  },
  genreDistribution: {
    Drama: 12,
    Comedy: 8,
    Action: 5,
  },
  serviceDistribution: {
    Netflix: 15,
    'Disney+': 6,
    'HBO Max': 4,
  },
  watchProgress: 68.5,
};
```

### `ShowProgress`

Individual show progress information containing detailed viewing metrics for specific shows.

**Properties:**

- `showId: number` - Unique identifier for the show
- `title: string` - Display title of the show
- `status: WatchStatus` - Current watch status
- `totalEpisodes: number` - Total episodes in the show
- `watchedEpisodes: number` - Episodes the user has watched
- `percentComplete: number` - Completion percentage (0-100)

**Usage Example:**

```typescript
const showProgress: ShowProgress = {
  showId: 12345,
  title: 'Breaking Bad',
  status: WatchStatus.WATCHED,
  totalEpisodes: 62,
  watchedEpisodes: 62,
  percentComplete: 100,
};
```

### `ProfileWatchProgressResponse`

Comprehensive watch progress aggregation for a user profile across all shows.

**Properties:**

- `totalEpisodes: number` - Total episodes across all shows
- `watchedEpisodes: number` - Total episodes watched
- `overallProgress: number` - Overall completion percentage (0-100)
- `showsProgress: ShowProgress[]` - Individual show progress details

**Usage Example:**

```typescript
const progressResponse: ProfileWatchProgressResponse = {
  totalEpisodes: 1247,
  watchedEpisodes: 856,
  overallProgress: 68.6,
  showsProgress: [
    {
      showId: 1,
      title: 'The Office',
      status: WatchStatus.WATCHED,
      totalEpisodes: 201,
      watchedEpisodes: 201,
      percentComplete: 100,
    },
    {
      showId: 2,
      title: 'Stranger Things',
      status: WatchStatus.WATCHING,
      totalEpisodes: 42,
      watchedEpisodes: 25,
      percentComplete: 59.5,
    },
  ],
};
```

### `MovieStatisticsResponse`

Statistics for movie-related metrics and analytics, providing insights into movie consumption patterns.

**Properties:**

- `movieReferences: MovieReference[]` - Array of movie references
- `total: number` - Total number of movies in library
- `watchStatusCounts: object` - Binary watch status counts
  - `watched: number` - Movies that have been watched
  - `notWatched: number` - Movies not yet watched
- `genreDistribution: Record<string, number>` - Movies count by genre
- `serviceDistribution: Record<string, number>` - Movies count by streaming service
- `watchProgress: number` - Overall progress percentage (0-100)

**Usage Example:**

```typescript
const movieStats: MovieStatisticsResponse = {
  movieReferences: [
    { id: 1, title: 'Inception', tmdbId: 27205 },
    { id: 2, title: 'The Matrix', tmdbId: 603 },
  ],
  total: 45,
  watchStatusCounts: {
    watched: 32,
    notWatched: 13,
  },
  genreDistribution: {
    Action: 18,
    Drama: 12,
    Comedy: 10,
    'Sci-Fi': 8,
  },
  serviceDistribution: {
    Netflix: 20,
    'Amazon Prime': 15,
    'Disney+': 10,
  },
  watchProgress: 71.1,
};
```

## Profile and Account Statistics

### `ProfileStatisticsResponse`

Comprehensive statistics response combining all metrics for a single user profile.

**Key Features:**

- Optional profile identification for anonymous statistics
- Complete show and movie analytics
- Detailed episode progress tracking
- Unified view of user's viewing habits

**Usage Example:**

```typescript
const profileStats: ProfileStatisticsResponse = {
  profileId: 123,
  profileName: "John's Profile",
  showStatistics: {
    total: 25,
    watchStatusCounts: { watched: 8, watching: 5, notWatched: 10, upToDate: 2 },
    genreDistribution: { Drama: 12, Comedy: 8 },
    serviceDistribution: { Netflix: 15, 'Disney+': 6 },
    watchProgress: 68.5,
  },
  movieStatistics: {
    movieReferences: [{ id: 1, title: 'Inception', tmdbId: 27205 }],
    total: 45,
    watchStatusCounts: { watched: 32, notWatched: 13 },
    genreDistribution: { Action: 18, Drama: 12 },
    serviceDistribution: { Netflix: 20, 'Amazon Prime': 15 },
    watchProgress: 71.1,
  },
  episodeWatchProgress: {
    totalEpisodes: 1247,
    watchedEpisodes: 856,
    overallProgress: 68.6,
    showsProgress: [],
  },
};
```

### `AccountStatisticsResponse`

Account-wide statistics aggregating data across all profiles within an account.

**Key Features:**

- Multi-profile aggregation
- Unique content tracking
- Account-level progress metrics
- Comprehensive content consumption insights

**Usage Example:**

```typescript
const accountStats: AccountStatisticsResponse = {
  profileCount: 4,
  uniqueContent: {
    showCount: 150,
    movieCount: 300,
  },
  showStatistics: {
    total: 125,
    watchStatusCounts: { watched: 45, watching: 25, notWatched: 40, upToDate: 15 },
    genreDistribution: { Drama: 50, Comedy: 35, Action: 25 },
    serviceDistribution: { Netflix: 60, 'Disney+': 30, 'HBO Max': 20 },
    watchProgress: 72.5,
  },
  movieStatistics: {
    movieReferences: [],
    total: 280,
    watchStatusCounts: { watched: 180, notWatched: 100 },
    genreDistribution: { Action: 80, Drama: 60, Comedy: 50 },
    serviceDistribution: { Netflix: 120, 'Amazon Prime': 80, 'Disney+': 50 },
    watchProgress: 64.3,
  },
  episodeStatistics: {
    totalEpisodes: 8000,
    watchedEpisodes: 5600,
    watchProgress: 70.0,
  },
};
```

## Supporting Interfaces

### `UniqueContentCounts`

Summary of unique content across an account, regardless of profile assignments.

```typescript
const contentCounts: UniqueContentCounts = {
  showCount: 150,
  movieCount: 300,
};
```

### `AccountEpisodeProgress`

Episode progress aggregation at the account level across all profiles.

```typescript
const accountProgress: AccountEpisodeProgress = {
  totalEpisodes: 5000,
  watchedEpisodes: 3200,
  watchProgress: 64.0,
};
```

## Real-World Usage Examples

### Statistics Controller Implementation

```typescript
import { statisticsService } from '@ajgifford/keepwatching-common-server/services';
import { AccountStatisticsResponse, ProfileStatisticsResponse } from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

/**
 * Get profile statistics
 * @route GET /api/v1/statistics/profile/:profileId
 */
export const getProfileStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId } = req.params;
    const statistics: ProfileStatisticsResponse = await statisticsService.getProfileStatistics(Number(profileId));
    res.status(200).json(statistics);
  } catch (error) {
    next(error);
  }
};

/**
 * Get account statistics
 * @route GET /api/v1/statistics/account/:accountId
 */
export const getAccountStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { accountId } = req.params;
    const statistics: AccountStatisticsResponse = await statisticsService.getAccountStatistics(Number(accountId));
    res.status(200).json(statistics);
  } catch (error) {
    next(error);
  }
};

/**
 * Get watch progress for profile
 * @route GET /api/v1/statistics/progress/:profileId
 */
export const getWatchProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { profileId } = req.params;
    const progress = await statisticsService.getProfileWatchProgress(Number(profileId));
    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};
```

### Statistics Service Implementation

```typescript
import { ProfileStatisticsResponse, ShowProgress, ShowStatisticsResponse } from '@ajgifford/keepwatching-types';

class StatisticsService {
  async getProfileStatistics(profileId: number): Promise<ProfileStatisticsResponse> {
    const [showStats, movieStats, episodeProgress] = await Promise.all([
      this.getShowStatistics(profileId),
      this.getMovieStatistics(profileId),
      this.getEpisodeProgress(profileId),
    ]);

    const profile = await this.getProfileInfo(profileId);

    return {
      profileId: profile.id,
      profileName: profile.name,
      showStatistics: showStats,
      movieStatistics: movieStats,
      episodeWatchProgress: episodeProgress,
    };
  }

  async calculateShowProgress(profileId: number): Promise<ShowProgress[]> {
    const shows = await this.getProfileShows(profileId);

    return shows.map((show) => ({
      showId: show.id,
      title: show.title,
      status: show.watchStatus,
      totalEpisodes: show.episodeCount,
      watchedEpisodes: this.countWatchedEpisodes(show),
      percentComplete: (this.countWatchedEpisodes(show) / show.episodeCount) * 100,
    }));
  }

  private countWatchedEpisodes(show: any): number {
    return show.episodes?.filter((ep) => ep.watchStatus === WatchStatus.WATCHED).length || 0;
  }
}
```

## Analytics and Reporting Patterns

### Progress Tracking

```typescript
function calculateProgressMetrics(statistics: ProfileStatisticsResponse) {
  const { showStatistics, movieStatistics, episodeWatchProgress } = statistics;

  // Overall completion rates
  const showCompletionRate = (showStatistics.watchStatusCounts.watched / showStatistics.total) * 100;
  const movieCompletionRate = (movieStatistics.watchStatusCounts.watched / movieStatistics.total) * 100;

  // Content consumption insights
  const totalContent = showStatistics.total + movieStatistics.total;
  const totalWatched = showStatistics.watchStatusCounts.watched + movieStatistics.watchStatusCounts.watched;
  const overallCompletionRate = (totalWatched / totalContent) * 100;

  return {
    showCompletionRate,
    movieCompletionRate,
    overallCompletionRate,
    episodeProgress: episodeWatchProgress.overallProgress,
    contentPreferences: {
      favoriteGenres: getFavoriteGenres(showStatistics, movieStatistics),
      preferredServices: getPreferredServices(showStatistics, movieStatistics),
    },
  };
}

function getFavoriteGenres(shows: ShowStatisticsResponse, movies: MovieStatisticsResponse): string[] {
  const combined = { ...shows.genreDistribution };

  Object.entries(movies.genreDistribution).forEach(([genre, count]) => {
    combined[genre] = (combined[genre] || 0) + count;
  });

  return Object.entries(combined)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([genre]) => genre);
}

function getPreferredServices(shows: ShowStatisticsResponse, movies: MovieStatisticsResponse): string[] {
  const combined = { ...shows.serviceDistribution };

  Object.entries(movies.serviceDistribution).forEach(([service, count]) => {
    combined[service] = (combined[service] || 0) + count;
  });

  return Object.entries(combined)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([service]) => service);
}
```

### Content Recommendations

```typescript
function generateContentRecommendations(statistics: ProfileStatisticsResponse): string[] {
  const recommendations: string[] = [];

  // Check completion rates
  if (statistics.episodeWatchProgress.overallProgress < 50) {
    recommendations.push('Consider finishing some of your started shows before adding new ones');
  }

  // Analyze watching patterns
  const { watching, notWatched } = statistics.showStatistics.watchStatusCounts;
  if (watching > 5) {
    recommendations.push('You have many shows in progress. Try focusing on 2-3 at a time');
  }

  if (notWatched > watching * 2) {
    recommendations.push('You have lots of unwatched content. Consider exploring your existing library');
  }

  // Genre diversity suggestions
  const topGenres = Object.entries(statistics.showStatistics.genreDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([genre]) => genre);

  if (topGenres.length > 0) {
    recommendations.push(`Try exploring content outside your usual ${topGenres.join(' and ')} preferences`);
  }

  return recommendations;
}
```

### Dashboard Metrics

```typescript
interface DashboardMetrics {
  watchingNow: ShowProgress[];
  recentlyCompleted: ShowProgress[];
  nextToWatch: ShowProgress[];
  progressSummary: {
    totalProgress: number;
    showsCompleted: number;
    moviesCompleted: number;
    episodesWatched: number;
  };
  insights: string[];
}

function createDashboardMetrics(statistics: ProfileStatisticsResponse): DashboardMetrics {
  const { showStatistics, movieStatistics, episodeWatchProgress } = statistics;

  return {
    watchingNow: episodeWatchProgress.showsProgress
      .filter((show) => show.status === WatchStatus.WATCHING)
      .sort((a, b) => b.percentComplete - a.percentComplete)
      .slice(0, 10),
  };
}
```

### React Component Integration

```typescript
import React from 'react';
import { ProfileStatisticsResponse } from '@ajgifford/keepwatching-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface StatisticsDashboardProps {
  statistics: ProfileStatisticsResponse;
}

const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({ statistics }) => {
  const chartData = prepareChartData(statistics);
  const metrics = calculateProgressMetrics(statistics);

  return (
    <div className="statistics-dashboard">
      <div className="progress-overview">
        <h2>Watch Progress Overview</h2>
        <div className="progress-cards">
          <div className="progress-card">
            <h3>Overall Progress</h3>
            <div className="progress-value">{metrics.episodeProgress.toFixed(1)}%</div>
          </div>
          <div className="progress-card">
            <h3>Shows Completed</h3>
            <div className="progress-value">{metrics.showCompletionRate.toFixed(1)}%</div>
          </div>
          <div className="progress-card">
            <h3>Movies Completed</h3>
            <div className="progress-value">{metrics.movieCompletionRate.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Watch Status Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData.watchStatusChart}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {chartData.watchStatusChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="chart-container">
          <h3>Genre Distribution</h3>
          <BarChart width={500} height={300} data={chartData.genreChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="shows" fill="#8884d8" name="Shows" />
            <Bar dataKey="movies" fill="#82ca9d" name="Movies" />
          </BarChart>
        </div>
      </div>

      <div className="recommendations">
        <h3>Personalized Recommendations</h3>
        <ul>
          {generateContentRecommendations(statistics).map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

## API Integration Patterns

### Statistics Endpoints

These types support comprehensive analytics API patterns:

```typescript
// Profile statistics endpoint
async function getProfileStatistics(profileId: number): Promise<ProfileStatisticsResponse> {
  const response = await fetch(`/api/v1/statistics/profile/${profileId}`);
  return await response.json();
}

// Account statistics endpoint
async function getAccountStatistics(accountId: number): Promise<AccountStatisticsResponse> {
  const response = await fetch(`/api/v1/statistics/account/${accountId}`);
  return await response.json();
}

// Watch progress endpoint
async function getWatchProgress(profileId: number): Promise<ProfileWatchProgressResponse> {
  const response = await fetch(`/api/v1/statistics/progress/${profileId}`);
  return await response.json();
}

// Comparative statistics across profiles
async function compareProfileStatistics(profileIds: number[]): Promise<ProfileStatisticsResponse[]> {
  const promises = profileIds.map((id) => getProfileStatistics(id));
  return await Promise.all(promises);
}
```

### Caching and Performance

```typescript
interface CachedStatistics {
  data: ProfileStatisticsResponse;
  timestamp: number;
  expiresAt: number;
}

class StatisticsCache {
  private cache = new Map<number, CachedStatistics>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async getProfileStatistics(profileId: number): Promise<ProfileStatisticsResponse> {
    const cached = this.cache.get(profileId);
    const now = Date.now();

    if (cached && now < cached.expiresAt) {
      return cached.data;
    }

    const statistics = await this.fetchProfileStatistics(profileId);

    this.cache.set(profileId, {
      data: statistics,
      timestamp: now,
      expiresAt: now + this.CACHE_DURATION,
    });

    return statistics;
  }

  private async fetchProfileStatistics(profileId: number): Promise<ProfileStatisticsResponse> {
    // Actual API call implementation
    const response = await fetch(`/api/v1/statistics/profile/${profileId}`);
    return await response.json();
  }

  invalidateProfile(profileId: number): void {
    this.cache.delete(profileId);
  }

  clearCache(): void {
    this.cache.clear();
  }
}
```

## Dependencies

This module depends on:

- `./movieTypes` - For MovieReference interface
- `./watchStatusTypes` - For WatchStatus
- Database models for shows, movies, episodes, and profiles
- Analytics and reporting services

## Best Practices

1. **Type Safety**: Always use proper interfaces for statistics operations
2. **Performance**: Implement caching for frequently accessed statistics
3. **Validation**: Validate data structure before processing statistics
4. **Error Handling**: Gracefully handle missing or invalid data
5. **Aggregation**: Use efficient algorithms for large data sets
6. **Visualization**: Prepare data in formats suitable for charting libraries
7. **Privacy**: Consider data anonymization for aggregate statistics

## Related Types

- `Show`, `Movie`, `Episode` types (from respective modules) - For content data
- `Profile` types (from profileTypes.ts) - For profile information
- `WatchStatus` types (from watchStatusTypes.ts) - For progress tracking
- `Account` types (from accountTypes.ts) - For account-level aggregations
