[< Back](../README.md)

# Profile Types Documentation

This module provides TypeScript type definitions for profile-related operations in the KeepWatching application. It
handles user profile management, content associations, watch progress tracking, and administrative profile analytics.

## Overview

The profile types module defines interfaces for:

- Core profile data structures and content relationships
- Administrative profile management with detailed analytics
- Profile creation and modification operations
- Watch progress tracking and content aggregation
- API request/response patterns for profile operations

## Core Interfaces

### `Profile`

The primary interface representing a user profile within an account in the application.

**Properties:**

- `id: number` - Unique identifier for the profile
- `accountId: number` - ID of the parent account this profile belongs to
- `name: string` - Display name of the profile
- `image: string | undefined` - Optional URL to the profile's avatar image

**Usage Example:**

```typescript
const profile: Profile = {
  id: 1,
  accountId: 5,
  name: "John's Profile",
  image: 'https://example.com/john-avatar.jpg',
};

// Profile without image
const minimalProfile: Profile = {
  id: 2,
  accountId: 5,
  name: 'Guest Profile',
  image: undefined,
};
```

### `AdminProfile`

Extended profile interface for administrative purposes that includes creation metadata and content statistics. This
interface provides administrators with comprehensive insights into profile usage and content consumption patterns.

**Additional Properties:**

- `createdAt: string` - ISO timestamp of when the profile was created
- `favoritedShows: number` - Count of shows marked as favorites by this profile
- `favoritedMovies: number` - Count of movies marked as favorites by this profile

**Key Features:**

- **Content Metrics**: Track user engagement with shows and movies
- **Creation Tracking**: Monitor profile creation patterns
- **Administrative Insights**: Comprehensive view of profile activity

**Usage Example:**

```typescript
const adminProfile: AdminProfile = {
  id: 1,
  accountId: 5,
  name: "John's Profile",
  image: 'https://example.com/john-avatar.jpg',
  createdAt: '2023-01-15T10:30:00Z',
  favoritedShows: 25,
  favoritedMovies: 42,
};
```

## Content Association Interfaces

### `ContentProfiles`

Represents the relationship between content and profiles, showing which profiles have interacted with specific content
and their associated watch status.

**Properties:**

- `profileId: number` - ID of the profile
- `name: string` - Display name of the profile
- `image: string` - Profile avatar image URL
- `accountId: number` - ID of the parent account
- `accountName: string` - Display name of the parent account
- `watchStatus: WatchStatusType` - Current watch status for this content
- `addedDate: string` - ISO timestamp when content was added to profile
- `lastUpdated: string` - ISO timestamp of last status update

**Usage Example:**

```typescript
const contentProfile: ContentProfiles = {
  profileId: 123,
  name: "Sarah's Profile",
  image: 'https://example.com/sarah-avatar.jpg',
  accountId: 45,
  accountName: 'Smith Family',
  watchStatus: WatchStatus.WATCHING,
  addedDate: '2023-06-15T14:22:00Z',
  lastUpdated: '2023-12-01T09:45:00Z',
};
```

### `ProfileWithContent`

Comprehensive profile interface that aggregates a profile with all associated content including shows, episodes, and
movies.

**Properties:**

- `profile: Profile` - The base profile information
- `shows: ProfileShow[]` - Array of shows associated with this profile
- `episodes: EpisodesForProfile` - Episode collections (recent, upcoming, next unwatched)
- `movies: ProfileMovie[]` - Array of movies associated with this profile
- `recentUpcomingMovies: RecentUpcomingMoviesForProfile` - Recent and upcoming movie collections

**Usage Example:**

```typescript
const profileWithContent: ProfileWithContent = {
  profile: {
    id: 1,
    accountId: 5,
    name: "John's Profile",
    image: 'https://example.com/john-avatar.jpg',
  },
  shows: [
    {
      id: 101,
      title: 'Breaking Bad',
      profileId: 1,
      watchStatus: WatchStatus.WATCHED,
      // ... other show properties
    },
  ],
  episodes: {
    recentEpisodes: [],
    upcomingEpisodes: [],
    nextUnwatchedEpisodes: [],
  },
  movies: [
    {
      id: 201,
      title: 'Inception',
      profileId: 1,
      watchStatus: WatchStatus.WATCHED,
      // ... other movie properties
    },
  ],
  recentUpcomingMovies: {
    recentMovies: [],
    upcomingMovies: [],
  },
};
```

## Watch Progress Interfaces

### `AdminSeasonWatchProgress`

Detailed watch progress information for individual seasons, used in administrative analytics and progress tracking.

**Properties:**

- `seasonId: number` - Unique identifier for the season
- `seasonNumber: number` - Season number within the show
- `name: string` - Display name of the season
- `status: WatchStatusType | null` - Overall watch status for the season
- `episodeCount: number` - Total number of episodes in the season
- `watchedEpisodes: number` - Number of episodes watched
- `percentComplete: number` - Completion percentage (0-100)

**Usage Example:**

```typescript
const seasonProgress: AdminSeasonWatchProgress = {
  seasonId: 301,
  seasonNumber: 1,
  name: 'Season 1',
  status: WatchStatus.WATCHING,
  episodeCount: 13,
  watchedEpisodes: 8,
  percentComplete: 61.5,
};
```

### `AdminProfileWatchProgress`

Comprehensive watch progress aggregation for a profile across an entire show, including season-level breakdowns.

**Properties:**

- `profileId: number` - ID of the profile
- `name: string` - Display name of the profile
- `showStatus: WatchStatusType | null` - Overall show watch status
- `totalEpisodes: number` - Total episodes across all seasons
- `watchedEpisodes: number` - Total episodes watched
- `percentComplete: number` - Overall completion percentage
- `seasons: AdminSeasonWatchProgress[]` - Detailed progress for each season

**Usage Example:**

```typescript
const profileProgress: AdminProfileWatchProgress = {
  profileId: 123,
  name: "Sarah's Profile",
  showStatus: WatchStatus.WATCHING,
  totalEpisodes: 62,
  watchedEpisodes: 45,
  percentComplete: 72.6,
  seasons: [
    {
      seasonId: 301,
      seasonNumber: 1,
      name: 'Season 1',
      status: WatchStatus.WATCHED,
      episodeCount: 13,
      watchedEpisodes: 13,
      percentComplete: 100,
    },
    {
      seasonId: 302,
      seasonNumber: 2,
      name: 'Season 2',
      status: WatchStatus.WATCHING,
      episodeCount: 13,
      watchedEpisodes: 8,
      percentComplete: 61.5,
    },
  ],
};
```

## Request Types

### `CreateProfileRequest`

Defines the payload structure for creating new profiles within an account.

**Required Fields:**

- `accountId: number` - ID of the parent account
- `name: string` - Display name for the new profile

**Usage Example:**

```typescript
const createRequest: CreateProfileRequest = {
  accountId: 15,
  name: 'Kids Profile',
};
```

### Profile Update Requests

The module defines base and specific update request interfaces for flexible profile modifications.

#### `UpdateProfileNameRequest`

**Fields:**

- `id: number` - Profile ID to update
- `name: string` - New display name

**Usage Example:**

```typescript
const updateName: UpdateProfileNameRequest = {
  id: 123,
  name: 'Updated Profile Name',
};
```

#### `UpdateProfileImageRequest`

**Fields:**

- `id: number` - Profile ID to update
- `image: string` - New profile image URL

**Usage Example:**

```typescript
const updateImage: UpdateProfileImageRequest = {
  id: 123,
  image: 'https://example.com/new-avatar.jpg',
};
```

## Response Types

### `ProfileResponse`

API response wrapper for single profile operations that extends BaseResponse.

**Structure:**

```typescript
interface ProfileResponse extends BaseResponse {
  message: string; // From BaseResponse
  profile: Profile; // The profile data
}
```

**Usage Example:**

```typescript
const response: ProfileResponse = {
  message: 'Profile retrieved successfully',
  profile: {
    id: 1,
    accountId: 5,
    name: "John's Profile",
    image: 'https://example.com/john-avatar.jpg',
  },
};
```

### `ProfilesResponse`

API response wrapper for multiple profile operations.

**Structure:**

```typescript
interface ProfilesResponse extends BaseResponse {
  message: string; // From BaseResponse
  profiles: Profile[]; // Array of profiles
}
```

### `ProfileContentResponse`

API response wrapper for profile content aggregation operations.

**Structure:**

```typescript
interface ProfileContentResponse extends BaseResponse {
  message: string; // From BaseResponse
  profileWithContent: ProfileWithContent; // Profile with all associated content
}
```

## Type Aliases

### `AdminShowWatchProgressResult`

Type alias for arrays of profile watch progress data, commonly used in administrative analytics.

```typescript
type AdminShowWatchProgressResult = AdminProfileWatchProgress[];

// Usage example
const showProgressData: AdminShowWatchProgressResult = [
  {
    profileId: 123,
    name: 'Profile 1',
    showStatus: WatchStatus.WATCHING,
    totalEpisodes: 50,
    watchedEpisodes: 35,
    percentComplete: 70,
    seasons: [],
  },
  {
    profileId: 124,
    name: 'Profile 2',
    showStatus: WatchStatus.WATCHED,
    totalEpisodes: 50,
    watchedEpisodes: 50,
    percentComplete: 100,
    seasons: [],
  },
];
```

## Real-World Usage Examples

### Profile Controller Implementation

```typescript
import {
  CreateProfileRequest,
  ProfileContentResponse,
  ProfileResponse,
  ProfilesResponse,
  UpdateProfileImageRequest,
  UpdateProfileNameRequest,
} from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // GET /api/v1/profiles/:id
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.id);
      const profile = await this.profileService.getProfile(profileId);

      const response: ProfileResponse = {
        message: 'Profile retrieved successfully',
        profile,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/accounts/:accountId/profiles
  async getAccountProfiles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = parseInt(req.params.accountId);
      const profiles = await this.profileService.getProfilesByAccount(accountId);

      const response: ProfilesResponse = {
        message: 'Profiles retrieved successfully',
        profiles,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/profiles
  async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: CreateProfileRequest = req.body;
      const profile = await this.profileService.createProfile(request);

      const response: ProfileResponse = {
        message: 'Profile created successfully',
        profile,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/profiles/:id/name
  async updateProfileName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const request: UpdateProfileNameRequest = {
        id,
        name: req.body.name,
      };

      const profile = await this.profileService.updateProfileName(request);

      const response: ProfileResponse = {
        message: 'Profile name updated successfully',
        profile,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/profiles/:id/image
  async updateProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const request: UpdateProfileImageRequest = {
        id,
        image: req.body.image,
      };

      const profile = await this.profileService.updateProfileImage(request);

      const response: ProfileResponse = {
        message: 'Profile image updated successfully',
        profile,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/profiles/:id/content
  async getProfileContent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.id);
      const profileWithContent = await this.profileService.getProfileWithContent(profileId);

      const response: ProfileContentResponse = {
        message: 'Profile content retrieved successfully',
        profileWithContent,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/v1/profiles/:id
  async deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = parseInt(req.params.id);
      await this.profileService.deleteProfile(profileId);

      res.status(200).json({
        message: 'Profile deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
```

## Administrative Analytics

### Progress Tracking Implementation

```typescript
export class ProfileAnalyticsService {
  async getProfileWatchProgress(profileId: number): Promise<AdminProfileWatchProgress[]> {
    const shows = await this.showService.getProfileShows(profileId);

    const progressPromises = shows.map((show) => this.calculateShowProgress(profileId, show.id));

    return await Promise.all(progressPromises);
  }

  async calculateShowProgress(profileId: number, showId: number): Promise<AdminProfileWatchProgress> {
    const [show, seasons, profile] = await Promise.all([
      this.showService.getShow(showId),
      this.seasonService.getShowSeasons(showId),
      this.profileService.getProfile(profileId),
    ]);

    const seasonProgress = await Promise.all(
      seasons.map((season) => this.calculateSeasonProgress(profileId, season.id)),
    );

    const totalEpisodes = seasonProgress.reduce((sum, season) => sum + season.episodeCount, 0);
    const watchedEpisodes = seasonProgress.reduce((sum, season) => sum + season.watchedEpisodes, 0);
    const percentComplete = totalEpisodes > 0 ? (watchedEpisodes / totalEpisodes) * 100 : 0;

    return {
      profileId: profile.id,
      name: profile.name,
      showStatus: this.determineShowStatus(seasonProgress),
      totalEpisodes,
      watchedEpisodes,
      percentComplete: Math.round(percentComplete * 10) / 10,
      seasons: seasonProgress,
    };
  }

  private async calculateSeasonProgress(profileId: number, seasonId: number): Promise<AdminSeasonWatchProgress> {
    const [season, episodes] = await Promise.all([
      this.seasonService.getSeason(seasonId),
      this.episodeService.getSeasonEpisodes(seasonId, profileId),
    ]);

    const watchedEpisodes = episodes.filter((ep) => ep.watchStatus === WatchStatus.WATCHED).length;
    const percentComplete = episodes.length > 0 ? (watchedEpisodes / episodes.length) * 100 : 0;

    return {
      seasonId: season.id,
      seasonNumber: season.seasonNumber,
      name: season.name,
      status: this.determineSeasonStatus(episodes),
      episodeCount: episodes.length,
      watchedEpisodes,
      percentComplete: Math.round(percentComplete * 10) / 10,
    };
  }

  private determineShowStatus(seasons: AdminSeasonWatchProgress[]): WatchStatusType | null {
    if (seasons.length === 0) return null;

    const allWatched = seasons.every((season) => season.status === WatchStatus.WATCHED);
    const noneWatched = seasons.every((season) => season.status === WatchStatus.NOT_WATCHED);
    const someWatching = seasons.some((season) => season.status === WatchStatus.WATCHING);

    if (allWatched) return WatchStatus.WATCHED;
    if (noneWatched) return WatchStatus.NOT_WATCHED;
    if (someWatching) return WatchStatus.WATCHING;

    return WatchStatus.WATCHING; // Mixed states default to watching
  }

  private determineSeasonStatus(episodes: ProfileEpisode[]): WatchStatusType | null {
    if (episodes.length === 0) return null;

    const watchedCount = episodes.filter((ep) => ep.watchStatus === WatchStatus.WATCHED).length;

    if (watchedCount === 0) return WatchStatus.NOT_WATCHED;
    if (watchedCount === episodes.length) return WatchStatus.WATCHED;
    return WatchStatus.WATCHING;
  }
}
```

## Integration Patterns

### Frontend Component Integration

```typescript
import React, { useState, useEffect } from 'react';
import {
  Profile,
  ProfileWithContent,
  CreateProfileRequest,
  UpdateProfileNameRequest
} from '@ajgifford/keepwatching-types';

interface ProfileManagerProps {
  accountId: number;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({ accountId }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ProfileWithContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, [accountId]);

  const loadProfiles = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/accounts/${accountId}/profiles`);
      const data = await response.json();
      setProfiles(data.profiles);
    } catch (error) {
      console.error('Failed to load profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (name: string): Promise<void> => {
    try {
      const request: CreateProfileRequest = {
        accountId,
        name
      };

      const response = await fetch('/api/v1/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });

      if (response.ok) {
        await loadProfiles();
      }
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  const updateProfileName = async (profileId: number, newName: string): Promise<void> => {
    try {
      const request: UpdateProfileNameRequest = {
        id: profileId,
        name: newName
      };

      const response = await fetch(`/api/v1/profiles/${profileId}/name`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });

      if (response.ok) {
        await loadProfiles();
      }
    } catch (error) {
      console.error('Failed to update profile name:', error);
    }
  };

  const loadProfileContent = async (profileId: number): Promise<void> => {
    try {
      const response = await fetch(`/api/v1/profiles/${profileId}/content`);
      const data = await response.json();
      setSelectedProfile(data.profileWithContent);
    } catch (error) {
      console.error('Failed to load profile content:', error);
    }
  };

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  return (
    <div className="profile-manager">
      <div className="profile-list">
        <h2>Profiles</h2>
        {profiles.map(profile => (
          <div key={profile.id} className="profile-item">
            <img
              src={profile.image || '/default-avatar.png'}
              alt={profile.name}
              className="profile-avatar"
            />
            <span>{profile.name}</span>
            <button onClick={() => loadProfileContent(profile.id)}>
              View Content
            </button>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <div className="profile-content">
          <h3>{selectedProfile.profile.name}'s Content</h3>
          <div className="content-section">
            <h4>Shows ({selectedProfile.shows.length})</h4>
            {selectedProfile.shows.map(show => (
              <div key={show.id} className="content-item">
                {show.title} - {show.watchStatus}
              </div>
            ))}
          </div>
          <div className="content-section">
            <h4>Movies ({selectedProfile.movies.length})</h4>
            {selectedProfile.movies.map(movie => (
              <div key={movie.id} className="content-item">
                {movie.title} - {movie.watchStatus}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

## Dependencies

This module depends on:

- `./responseTypes` - For BaseResponse interface
- `./episodeTypes` - For EpisodesForProfile and related episode types
- `./movieTypes` - For ProfileMovie and RecentUpcomingMoviesForProfile
- `./showTypes` - For ProfileShow type
- `./watchStatusTypes` - For WatchStatusType
- Account management system - For profile ownership validation

## Best Practices

1. **Type Safety**: Always use specific profile types for operations
2. **Content Aggregation**: Use ProfileWithContent for comprehensive profile views
3. **Progress Tracking**: Leverage AdminProfileWatchProgress for analytics
4. **Validation**: Implement proper validation for profile operations
5. **Error Handling**: Handle missing profiles and content gracefully
6. **Performance**: Use parallel loading for content aggregation
7. **Security**: Validate profile ownership before operations

## Related Types

- `Account` types (from accountTypes.ts) - For profile ownership
- `Show`, `Movie`, `Episode` types (from respective modules) - For content associations
- `WatchStatus` types (from watchStatusTypes.ts) - For progress tracking
- `Statistics` types (from statisticsTypes.ts) - For analytics integration
