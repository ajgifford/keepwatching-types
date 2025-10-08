# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a TypeScript types-only package (`@ajgifford/keepwatching-types`) that provides shared type definitions for the KeepWatching application ecosystem. It contains no runtime code - only TypeScript interfaces, types, and enums. The package is published to GitHub's npm registry.

## Development Commands

### Build
```bash
yarn build
```
Compiles TypeScript to JavaScript and generates declaration files in `dist/`.

### Type Checking
```bash
yarn type-check
```
Runs TypeScript compiler without emitting files to validate type correctness.

### Linting & Formatting
```bash
yarn lint          # Check for linting issues
yarn lint:fix      # Auto-fix linting issues
yarn format        # Format code with Prettier
```

### Versioning & Publishing
```bash
yarn version:patch  # Bump patch version (0.4.0 -> 0.4.1)
yarn version:minor  # Bump minor version (0.4.0 -> 0.5.0)
yarn version:major  # Bump major version (0.4.0 -> 1.0.0)
```

The `prepare` script automatically runs `yarn build` before publishing.

## Architecture

### Type Organization

All types are located in `src/types/` with one file per domain area:
- **accountTypes.ts** - User accounts, authentication, Firebase integration
- **emailTypes.ts** - Email-related types
- **preferenceTypes.ts** - User preferences and settings
- **profileTypes.ts** - User profiles within accounts
- **movieTypes.ts** - Movie metadata, associations, and responses
- **showTypes.ts** - TV show/series metadata and responses
- **seasonTypes.ts** - TV show seasons and episode collections
- **episodeTypes.ts** - Individual episodes and viewing progress
- **personTypes.ts** - People (actors, directors, etc.) and their roles
- **watchStatusTypes.ts** - Content viewing states and progress tracking
- **statisticsTypes.ts** - Analytics and progress reporting
- **notificationTypes.ts** - User notifications and messaging
- **discoverAndSearchTypes.ts** - Content discovery and search functionality
- **contentTypes.ts** - Lightweight content identification
- **responseTypes.ts** - Base API response structures (extends BaseResponse)
- **logTypes.ts** - Logging and monitoring operations
- **serviceHealthTypes.ts** - Service health checks and metrics

### Key Design Patterns

1. **BaseResponse Pattern**: All API responses extend `BaseResponse` from `responseTypes.ts`, which provides a standardized `message` field for API communication.

2. **Reference Types**: Many entities have a lighter "Reference" variant (e.g., `AccountReference`) containing only essential fields (typically id, name) for use in foreign key relationships.

3. **Admin vs User Types**: Administrative interfaces (e.g., `AdminProfile`) extend base types with additional metadata like creation timestamps and aggregate counts.

4. **Watch Status Enum**: `WatchStatus` enum in `watchStatusTypes.ts` is the single source of truth for all content viewing states:
   - `UNAIRED` - Content not yet released
   - `NOT_WATCHED` - Available but not viewed
   - `WATCHING` - Currently in progress
   - `WATCHED` - Fully completed
   - `UP_TO_DATE` - All available episodes watched (shows/seasons only)

5. **Type Guards**: Watch status types include helper functions like `isSimpleWatchStatus()` and `parseStatusFromInput()` for runtime validation.

6. **Profile-Scoped Types**: Many content types have "Profile" variants (e.g., `ProfileShow`, `ProfileMovie`) that include watch status and associations for a specific user profile.

### Export Strategy

`src/index.ts` re-exports all types from all domain files using barrel exports (`export * from './types/*'`). Consumers import directly from the package root.

### TypeScript Configuration

- **Target**: ES2023
- **Module**: CommonJS (for broad compatibility)
- **Strict mode**: Enabled
- Generates both declaration files (`.d.ts`) and declaration maps (`.d.ts.map`)

## Code Style

### Linting
- Uses `typescript-eslint` with recommended configs
- Unused vars prefixed with `_` are allowed
- `no-explicit-any` and `no-empty-object-type` are warnings (not errors)
- Explicit return types not required

### Formatting
- **Prettier** with import sorting plugin
- Single quotes
- 120 character line width
- 2 space indentation
- Third-party imports separated from local imports

## Documentation Requirements

All types must include:
1. **JSDoc comments** with `@interface` or `@type` annotations
2. **Property descriptions** for each field
3. **`@example` blocks** showing realistic usage
4. **`@extends` tags** when extending other interfaces

See `responseTypes.ts` and `accountTypes.ts` for exemplary documentation.

## Adding New Types

When adding types to this package:

1. Create or update the appropriate file in `src/types/`
2. Add comprehensive JSDoc documentation with examples
3. Export new types from that file
4. Export from `src/index.ts` (use barrel export: `export * from './types/filename'`)
5. Create or update corresponding documentation in `docs/` directory
6. Update main `README.md` if adding a new module
7. Run `yarn type-check` and `yarn lint` before committing
8. Bump version appropriately before publishing

## Important Notes

- This package contains **no runtime code** - only type definitions
- Types should be generic enough to serve multiple KeepWatching services
- Avoid coupling types to specific implementation details
- Published to GitHub npm registry (`@ajgifford/keepwatching-types`)
