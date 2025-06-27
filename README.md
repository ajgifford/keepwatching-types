# KeepWatching Types

Shared TypeScript type definitions for the KeepWatching application ecosystem. This package provides comprehensive type safety across all KeepWatching services and applications.

## Overview

This package contains type definitions for:
- User accounts and authentication
- Media content (shows, movies, episodes, seasons)
- User profiles and watch status
- API responses and requests
- Statistics and analytics
- Notifications and discovery

## Installation

```bash
npm install @ajgifford/keepwatching-types
# or
yarn add @ajgifford/keepwatching-types
```

## Usage

```typescript
import { Account, ProfileShow, WatchStatus } from '@ajgifford/keepwatching-types';

// Use types in your application
const account: Account = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  uid: "firebase-uid-123",
  image: "https://example.com/avatar.jpg",
  defaultProfileId: 5
};
```

## Documentation

### Core Modules

- **[Account Types](./docs/account-types.md)** - User accounts, authentication, and Firebase integration
- **[Profile Types](./docs/profile-types.md)** - User profiles and content management
- **[Show Types](./docs/show-types.md)** - TV shows, series, and related metadata
- **[Movie Types](./docs/movie-types.md)** - Movies and film-related data structures
- **[Episode Types](./docs/episode-types.md)** - Individual episodes and viewing progress
- **[Season Types](./docs/season-types.md)** - TV show seasons and episode collections
- **[Watch Status Types](./docs/watch-status-types.md)** - Content viewing states and progress tracking
- **[Statistics Types](./docs/statistics-types.md)** - Analytics and progress reporting
- **[Notification Types](./docs/notification-types.md)** - User notifications and messaging
- **[Discovery & Search Types](./docs/discover-search-types.md)** - Content discovery and search functionality
- **[Content Types](./docs/content-types.md)** - Lightweight content identification

### Admin Modules

- **[Log Types](./docs/log-types.md)** - logging and monitoring operations
- **[Service Health Types](./docs/log-types.md)** - service availability, performance metrics and health checks


### API Types

- **[Response Types](./docs/response-types.md)** - Standardized API response structures

## Type Categories

### Content Types
Handle media content across the platform:
- Shows, movies, episodes, seasons
- Metadata (ratings, genres, streaming services)
- Content discovery and search

### User Types
Manage user data and preferences:
- Accounts and authentication
- Profiles and personalization
- Watch history and progress

### API Types
Ensure consistent API communication:
- Request/response structures
- Error handling patterns
- Pagination and filtering

## File Structure

```
src/
├── types/
│   ├── accountTypes.ts      # User accounts and authentication
│   ├── profileTypes.ts      # User profiles and content management
│   ├── showTypes.ts         # TV shows and series
│   ├── movieTypes.ts        # Movies and films
│   ├── episodeTypes.ts      # Individual episodes
│   ├── seasonTypes.ts       # TV show seasons
│   ├── watchStatusTypes.ts  # Content viewing states
│   ├── statisticTypes.ts    # Analytics and reporting
│   ├── notificationTypes.ts # User notifications
│   ├── discoverAndSearchTypes.ts # Content discovery
│   └── responseTypes.ts     # Base API response structures
├── index.ts                 # Main export file
└── docs/
    ├── account-types.md     # Account types documentation
    ├── profile-types.md     # Profile types documentation
    └── ...                  # Additional documentation files
```

## Development

### Building

```bash
yarn build
```

### Linting

```bash
yarn lint
```

### Formatting

```bash
yarn format
```

### Publishing

```bash
# Patch version
yarn version:patch

# Minor version
yarn version:minor

# Major version
yarn version:major
```

## Contributing

1. Add new types to the appropriate module in `src/types/`
2. Export new types from `src/index.ts`
3. Add comprehensive JSDoc documentation
4. Create or update documentation in `docs/`
5. Update this README if adding new modules

## License

ISC

## Repository

[GitHub Repository](https://github.com/ajgifford/keepwatching-types)