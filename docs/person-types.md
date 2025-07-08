[< Back](../README.md)

# Person Types Documentation

This module provides TypeScript type definitions for person and cast member operations in the KeepWatching application.
It handles actors, directors, creators, and other individuals involved in content production, along with their credits
and cast relationships.

## Overview

The person types module defines interfaces for:

- Core person data structures and biographical information
- Movie and TV show credits and filmography
- Cast member relationships and character portrayals
- Administrative person and cast management
- API request/response patterns for person operations

## Core Interfaces

### `PersonReference`

Lightweight reference interface for persons that contains only essential identification information. Used in contexts
where full person data is not needed, such as lists, cross-references, or API responses that need to minimize payload
size.

**Properties:**

- `id: number` - Unique identifier for the person
- `tmdbId: number` - TMDB identifier for external API operations
- `name: string` - Display name of the person

**Usage Example:**

```typescript
const personRef: PersonReference = {
  id: 1,
  tmdbId: 31,
  name: 'Tom Hanks',
};

// Used in cast lists
const castReferences: PersonReference[] = [
  { id: 1, tmdbId: 31, name: 'Tom Hanks' },
  { id: 2, tmdbId: 6384, name: 'Keanu Reeves' },
  { id: 3, tmdbId: 1245, name: 'Scarlett Johansson' },
];
```

### `Person`

Comprehensive interface representing a person (actor, director, creator, etc.) with complete biographical information
and filmography. Contains detailed metadata about individuals involved in content production.

**Properties:**

- `id: number` - Unique identifier for the person
- `tmdbId: number` - TMDB identifier for external API operations
- `name: string` - Full name of the person
- `gender: number` - Gender identifier (TMDB standard: 1=female, 2=male, 3=non-binary)
- `biography: string` - Biographical information and career overview
- `profileImage: string` - URL to the person's profile/headshot image
- `birthdate: string` - Birth date in ISO format (YYYY-MM-DD)
- `deathdate: string | null` - Death date in ISO format or null if alive
- `placeOfBirth: string` - Birth location (city, state/province, country)
- `movieCredits: Credit[]` - Array of movie appearances and roles
- `showCredits: ShowCredit[]` - Array of TV show appearances and roles

**Key Features:**

- **Complete Biography**: Full biographical and career information
- **Filmography**: Comprehensive movie and TV credits
- **External Integration**: TMDB compatibility for data synchronization
- **Visual Assets**: Profile images for display purposes

**Usage Example:**

```typescript
const person: Person = {
  id: 1,
  tmdbId: 31,
  name: 'Tom Hanks',
  gender: 2,
  biography:
    'Thomas Jeffrey Hanks is an American actor and filmmaker. Known for both his comedic and dramatic roles, he is one of the most popular and recognizable film stars worldwide...',
  profileImage: 'https://image.tmdb.org/t/p/w500/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg',
  birthdate: '1956-07-09',
  deathdate: null,
  placeOfBirth: 'Concord, California, USA',
  movieCredits: [
    {
      name: 'Forrest Gump',
      poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      year: '1994',
      character: 'Forrest Gump',
      rating: 8.8,
    },
    {
      name: 'Cast Away',
      poster: 'https://image.tmdb.org/t/p/w500/8OfWjDScjMuNYtAMKIWYosCZn6p.jpg',
      year: '2000',
      character: 'Chuck Noland',
      rating: 7.8,
    },
  ],
  showCredits: [
    {
      name: 'Band of Brothers',
      poster: 'https://image.tmdb.org/t/p/w500/poster.jpg',
      year: '2001',
      character: 'Narrator',
      rating: 9.4,
      episodeCount: 10,
    },
  ],
};
```

## Credit Interfaces

### `Credit`

Base interface for credits that contains essential information about a person's involvement in a show or movie.

**Properties:**

- `name: string` - Title of the content
- `poster: string` - URL to the content's poster image
- `year: string` - Release year
- `character: string` - Character name or role description
- `rating: number` - Content rating (0-10 scale)

**Usage Example:**

```typescript
const movieCredit: Credit = {
  name: 'The Green Mile',
  poster: 'https://image.tmdb.org/t/p/w500/poster.jpg',
  year: '1999',
  character: 'Paul Edgecomb',
  rating: 8.6,
};
```

### `ShowCredit`

Extended credit interface for TV show appearances that includes episode count information. Inherits all properties from
`Credit` and adds show-specific metadata.

**Additional Properties:**

- `episodeCount: number` - Number of episodes the person appeared in

**Usage Example:**

```typescript
const showCredit: ShowCredit = {
  name: 'The Pacific',
  poster: 'https://image.tmdb.org/t/p/w500/poster.jpg',
  year: '2010',
  character: 'Narrator',
  rating: 8.3,
  episodeCount: 10,
};
```

## Cast Member Interfaces

### `CastMember`

Interface representing a cast member's role in a specific piece of content (movie or show). Links persons to content
through character relationships.

**Properties:**

- `contentId: number` - ID of the movie or show
- `personId: number` - ID of the person/actor
- `characterName: string` - Name of the character portrayed
- `order: number` - Billing order (lower numbers = higher billing)
- `name: string` - Actor's name for display
- `profileImage: string` - URL to actor's profile image

**Key Features:**

- **Content Association**: Links actors to specific movies or shows
- **Character Mapping**: Connects actors to their portrayed characters
- **Billing Order**: Maintains cast order for display purposes
- **Display Ready**: Includes actor name and image for immediate use

**Usage Example:**

```typescript
const castMember: CastMember = {
  contentId: 550, // Fight Club movie ID
  personId: 287,
  characterName: 'Tyler Durden',
  order: 2,
  name: 'Brad Pitt',
  profileImage: 'https://image.tmdb.org/t/p/w500/profile.jpg',
};
```

### `ShowCastMember`

Extended cast member interface specifically for TV shows that includes additional metadata about the actor's involvement
across episodes and seasons.

**Additional Properties:**

- `episodeCount: number` - Total episodes the actor appeared in
- `active: boolean` - Whether the actor is currently active in the show

**Key Features:**

- **Episode Tracking**: Monitor actor appearances across episodes
- **Status Management**: Track whether actors are current or former cast
- **Series Continuity**: Maintain cast information for ongoing shows

**Usage Example:**

```typescript
const showCastMember: ShowCastMember = {
  contentId: 1399,
  personId: 12835,
  characterName: 'Jon Snow',
  order: 1,
  name: 'Kit Harington',
  profileImage: 'https://image.tmdb.org/t/p/w500/profile.jpg',
  episodeCount: 62,
  active: false,
};

// Current cast member in ongoing show
const activeCastMember: ShowCastMember = {
  contentId: 94997,
  personId: 2524240,
  characterName: 'Rhaenyra Targaryen',
  order: 1,
  name: "Emma D'Arcy",
  profileImage: 'https://image.tmdb.org/t/p/w500/profile.jpg',
  episodeCount: 8,
  active: true,
};
```

## Request Types

### `CreatePerson`

Request payload for creating new person records in the system. Uses snake_case field naming for database compatibility.

**Properties:**

- `tmdb_id: number` - TMDB identifier for data synchronization
- `name: string` - Full name of the person
- `gender: number` - Gender identifier (TMDB standard)
- `biography: string` - Biographical information
- `profile_image: string` - URL to profile image
- `birthdate: string` - Birth date in ISO format
- `deathdate: string | null` - Death date or null if alive
- `place_of_birth: string` - Birth location

**Usage Example:**

```typescript
const createPersonRequest: CreatePerson = {
  tmdb_id: 6384,
  name: 'Keanu Reeves',
  gender: 2,
  biography:
    'Keanu Charles Reeves is a Canadian actor. Born in Beirut and raised in Toronto, Reeves began acting in theatre productions and in television films before making his feature film debut in Youngblood...',
  profile_image: 'https://image.tmdb.org/t/p/w500/profile.jpg',
  birthdate: '1964-09-02',
  deathdate: null,
  place_of_birth: 'Beirut, Lebanon',
};
```

### `CreateCast`

Base request payload for creating cast member relationships between persons and content.

**Properties:**

- `content_id: number` - ID of the movie or show
- `person_id: number` - ID of the person/actor
- `character_name: string` - Character name
- `credit_id: string` - External credit identifier (TMDB)
- `cast_order: number` - Billing order position

**Usage Example:**

```typescript
const createCastRequest: CreateCast = {
  content_id: 603, // The Matrix movie ID
  person_id: 6384, // Keanu Reeves person ID
  character_name: 'Neo',
  credit_id: '52fe4232c3a36847f8014c11',
  cast_order: 1,
};
```

### `CreateShowCast`

Extended cast creation request specifically for TV shows that includes additional show-specific metadata.

**Additional Properties:**

- `total_episodes: number` - Total episodes the actor appeared in
- `active: number` - Active status (0 or 1 for database compatibility)

**Usage Example:**

```typescript
const createShowCastRequest: CreateShowCast = {
  content_id: 1399, // Game of Thrones show ID
  person_id: 12835, // Kit Harington person ID
  character_name: 'Jon Snow',
  credit_id: '5256c8af19c2956ff6046e77',
  cast_order: 1,
  total_episodes: 62,
  active: 0,
};
```

## Real-World Usage Examples

### Person Service Implementation

```typescript
import { CreatePerson, Credit, Person, PersonReference, ShowCredit } from '@ajgifford/keepwatching-types';

export class PersonService {
  constructor(
    private personRepository: PersonRepository,
    private creditRepository: CreditRepository,
    private tmdbService: TMDBService,
  ) {}

  async createPerson(request: CreatePerson): Promise<Person> {
    // Check if person already exists by TMDB ID
    const existingPerson = await this.personRepository.findByTmdbId(request.tmdb_id);
    if (existingPerson) {
      throw new Error(`Person with TMDB ID ${request.tmdb_id} already exists`);
    }

    // Create person record
    const personData = {
      tmdbId: request.tmdb_id,
      name: request.name,
      gender: request.gender,
      biography: request.biography,
      profileImage: request.profile_image,
      birthdate: request.birthdate,
      deathdate: request.deathdate,
      placeOfBirth: request.place_of_birth,
    };

    const person = await this.personRepository.create(personData);

    // Fetch and create credits from TMDB
    await this.syncCreditsFromTMDB(person.id, request.tmdb_id);

    // Return complete person with credits
    return await this.getPersonById(person.id);
  }

  async getPersonById(personId: number): Promise<Person> {
    const person = await this.personRepository.findById(personId);
    if (!person) {
      throw new Error(`Person with ID ${personId} not found`);
    }

    // Get movie and TV credits
    const [movieCredits, showCredits] = await Promise.all([
      this.creditRepository.getMovieCreditsForPerson(personId),
      this.creditRepository.getShowCreditsForPerson(personId),
    ]);

    return {
      ...person,
      movieCredits,
      showCredits,
    };
  }

  async searchPersons(query: string, limit: number = 20): Promise<PersonReference[]> {
    const persons = await this.personRepository.search(query, limit);

    return persons.map((person) => ({
      id: person.id,
      tmdbId: person.tmdbId,
      name: person.name,
    }));
  }

  async getPersonCredits(personId: number): Promise<{ movieCredits: Credit[]; showCredits: ShowCredit[] }> {
    const [movieCredits, showCredits] = await Promise.all([
      this.creditRepository.getMovieCreditsForPerson(personId),
      this.creditRepository.getShowCreditsForPerson(personId),
    ]);

    return { movieCredits, showCredits };
  }

  private async syncCreditsFromTMDB(personId: number, tmdbId: number): Promise<void> {
    try {
      const tmdbCredits = await this.tmdbService.getPersonCredits(tmdbId);

      // Process movie credits
      for (const movieCredit of tmdbCredits.cast) {
        await this.creditRepository.createMovieCredit({
          personId,
          tmdbMovieId: movieCredit.id,
          character: movieCredit.character,
          creditId: movieCredit.credit_id,
          order: movieCredit.order,
        });
      }

      // Process TV credits
      for (const tvCredit of tmdbCredits.tv_cast) {
        await this.creditRepository.createShowCredit({
          personId,
          tmdbShowId: tvCredit.id,
          character: tvCredit.character,
          creditId: tvCredit.credit_id,
          episodeCount: tvCredit.episode_count,
          order: tvCredit.order,
        });
      }
    } catch (error) {
      console.error(`Failed to sync credits for person ${personId}:`, error);
    }
  }
}
```

### Cast Service Implementation

```typescript
import { CastMember, CreateCast, CreateShowCast, ShowCastMember } from '@ajgifford/keepwatching-types';

export class CastService {
  constructor(
    private castRepository: CastRepository,
    private personService: PersonService,
  ) {}

  async getMovieCast(movieId: number): Promise<CastMember[]> {
    const castMembers = await this.castRepository.getMovieCast(movieId);

    return castMembers.map((cast) => ({
      contentId: cast.movieId,
      personId: cast.personId,
      characterName: cast.characterName,
      order: cast.castOrder,
      name: cast.person.name,
      profileImage: cast.person.profileImage,
    }));
  }

  async getShowCast(showId: number): Promise<{ activeCast: ShowCastMember[]; priorCast: ShowCastMember[] }> {
    const allCast = await this.castRepository.getShowCast(showId);

    const activeCast: ShowCastMember[] = [];
    const priorCast: ShowCastMember[] = [];

    allCast.forEach((cast) => {
      const castMember: ShowCastMember = {
        contentId: cast.showId,
        personId: cast.personId,
        characterName: cast.characterName,
        order: cast.castOrder,
        name: cast.person.name,
        profileImage: cast.person.profileImage,
        episodeCount: cast.totalEpisodes,
        active: cast.isActive,
      };

      if (cast.isActive) {
        activeCast.push(castMember);
      } else {
        priorCast.push(castMember);
      }
    });

    // Sort by billing order
    activeCast.sort((a, b) => a.order - b.order);
    priorCast.sort((a, b) => a.order - b.order);

    return { activeCast, priorCast };
  }

  async addMovieCast(request: CreateCast): Promise<CastMember> {
    // Validate person and movie exist
    const [person, movie] = await Promise.all([
      this.personService.getPersonById(request.person_id),
      this.movieRepository.findById(request.content_id),
    ]);

    if (!movie) {
      throw new Error(`Movie with ID ${request.content_id} not found`);
    }

    // Check if cast relationship already exists
    const existingCast = await this.castRepository.findMovieCast(request.content_id, request.person_id);
    if (existingCast) {
      throw new Error('Cast member already exists for this movie');
    }

    // Create cast relationship
    const castData = {
      movieId: request.content_id,
      personId: request.person_id,
      characterName: request.character_name,
      creditId: request.credit_id,
      castOrder: request.cast_order,
    };

    await this.castRepository.createMovieCast(castData);

    return {
      contentId: request.content_id,
      personId: request.person_id,
      characterName: request.character_name,
      order: request.cast_order,
      name: person.name,
      profileImage: person.profileImage,
    };
  }

  async addShowCast(request: CreateShowCast): Promise<ShowCastMember> {
    // Validate person and show exist
    const [person, show] = await Promise.all([
      this.personService.getPersonById(request.person_id),
      this.showRepository.findById(request.content_id),
    ]);

    if (!show) {
      throw new Error(`Show with ID ${request.content_id} not found`);
    }

    // Check if cast relationship already exists
    const existingCast = await this.castRepository.findShowCast(request.content_id, request.person_id);
    if (existingCast) {
      throw new Error('Cast member already exists for this show');
    }

    // Create cast relationship
    const castData = {
      showId: request.content_id,
      personId: request.person_id,
      characterName: request.character_name,
      creditId: request.credit_id,
      castOrder: request.cast_order,
      totalEpisodes: request.total_episodes,
      isActive: Boolean(request.active),
    };

    await this.castRepository.createShowCast(castData);

    return {
      contentId: request.content_id,
      personId: request.person_id,
      characterName: request.character_name,
      order: request.cast_order,
      name: person.name,
      profileImage: person.profileImage,
      episodeCount: request.total_episodes,
      active: Boolean(request.active),
    };
  }

  async updateShowCastStatus(showId: number, personId: number, active: boolean): Promise<void> {
    await this.castRepository.updateShowCastStatus(showId, personId, active);
  }

  async getPersonsForContent(contentId: number, contentType: 'movie' | 'show'): Promise<PersonReference[]> {
    const cast = contentType === 'movie' ? await this.getMovieCast(contentId) : await this.getShowCast(contentId);

    const allCast =
      contentType === 'movie' ? (cast as CastMember[]) : [...(cast as any).activeCast, ...(cast as any).priorCast];

    return allCast.map((member) => ({
      id: member.personId,
      tmdbId: 0, // Would need to fetch from person record
      name: member.name,
    }));
  }
}
```

### Controller Implementation

```typescript
import {
  CastMember,
  CreateCast,
  CreatePerson,
  CreateShowCast,
  Person,
  PersonReference,
  ShowCastMember,
} from '@ajgifford/keepwatching-types';
import { NextFunction, Request, Response } from 'express';

export class PersonController {
  constructor(
    private personService: PersonService,
    private castService: CastService,
  ) {}

  // GET /api/v1/persons/:id
  async getPerson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personId = parseInt(req.params.id);
      const person = await this.personService.getPersonById(personId);

      res.status(200).json({
        message: 'Person retrieved successfully',
        person,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/persons/search
  async searchPersons(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q: query, limit = 20 } = req.query;

      if (!query || typeof query !== 'string') {
        res.status(400).json({
          message: 'Query parameter "q" is required',
        });
        return;
      }

      const persons = await this.personService.searchPersons(query, parseInt(limit as string));

      res.status(200).json({
        message: 'Search completed successfully',
        persons,
        total: persons.length,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/persons
  async createPerson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: CreatePerson = req.body;
      const person = await this.personService.createPerson(request);

      res.status(201).json({
        message: 'Person created successfully',
        person,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/movies/:id/cast
  async getMovieCast(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const movieId = parseInt(req.params.id);
      const cast = await this.castService.getMovieCast(movieId);

      res.status(200).json({
        message: 'Movie cast retrieved successfully',
        cast,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/shows/:id/cast
  async getShowCast(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.id);
      const cast = await this.castService.getShowCast(showId);

      res.status(200).json({
        message: 'Show cast retrieved successfully',
        ...cast,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/movies/:id/cast
  async addMovieCast(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const movieId = parseInt(req.params.id);
      const request: CreateCast = {
        ...req.body,
        content_id: movieId,
      };

      const castMember = await this.castService.addMovieCast(request);

      res.status(201).json({
        message: 'Cast member added successfully',
        castMember,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/admin/shows/:id/cast
  async addShowCast(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.id);
      const request: CreateShowCast = {
        ...req.body,
        content_id: showId,
      };

      const castMember = await this.castService.addShowCast(request);

      res.status(201).json({
        message: 'Show cast member added successfully',
        castMember,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/admin/shows/:showId/cast/:personId/status
  async updateShowCastStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const showId = parseInt(req.params.showId);
      const personId = parseInt(req.params.personId);
      const { active } = req.body;

      await this.castService.updateShowCastStatus(showId, personId, active);

      res.status(200).json({
        message: 'Cast member status updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/persons/:id/credits
  async getPersonCredits(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personId = parseInt(req.params.id);
      const credits = await this.personService.getPersonCredits(personId);

      res.status(200).json({
        message: 'Person credits retrieved successfully',
        ...credits,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

## TMDB Integration

### Data Synchronization

```typescript
interface TMDBPerson {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  place_of_birth: string;
  profile_path: string;
}

interface TMDBCredit {
  id: number;
  title?: string;
  name?: string;
  character: string;
  credit_id: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  episode_count?: number;
}

export class TMDBIntegrationService {
  async importPersonFromTMDB(tmdbId: number): Promise<CreatePerson> {
    const tmdbPerson = await this.fetchPersonFromTMDB(tmdbId);

    return {
      tmdb_id: tmdbPerson.id,
      name: tmdbPerson.name,
      gender: tmdbPerson.gender,
      biography: tmdbPerson.biography || '',
      profile_image: this.buildImageUrl(tmdbPerson.profile_path),
      birthdate: tmdbPerson.birthday || '',
      deathdate: tmdbPerson.deathday,
      place_of_birth: tmdbPerson.place_of_birth || '',
    };
  }

  async getPersonCredits(tmdbId: number): Promise<{
    cast: TMDBCredit[];
    tv_cast: TMDBCredit[];
  }> {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${tmdbId}/combined_credits?api_key=${this.apiKey}`,
    );

    const data = await response.json();

    return {
      cast: data.cast.filter((credit: any) => credit.media_type === 'movie'),
      tv_cast: data.cast.filter((credit: any) => credit.media_type === 'tv'),
    };
  }

  private async fetchPersonFromTMDB(tmdbId: number): Promise<TMDBPerson> {
    const response = await fetch(`https://api.themoviedb.org/3/person/${tmdbId}?api_key=${this.apiKey}`);

    return await response.json();
  }

  private buildImageUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
  }
}
```

## Performance Considerations

### Caching Strategy

```typescript
class PersonCacheService {
  private personCache = new Map<number, Person>();
  private castCache = new Map<string, CastMember[] | ShowCastMember[]>();
  private readonly CACHE_TTL = 30 * 60 * 1000; // 30 minutes

  async getCachedPerson(personId: number): Promise<Person | null> {
    return this.personCache.get(personId) || null;
  }

  setCachedPerson(person: Person): void {
    this.personCache.set(person.id, person);

    setTimeout(() => {
      this.personCache.delete(person.id);
    }, this.CACHE_TTL);
  }

  async getCachedCast(contentId: number, contentType: 'movie' | 'show'): Promise<any | null> {
    const key = `${contentType}:${contentId}`;
    return this.castCache.get(key) || null;
  }

  setCachedCast(contentId: number, contentType: 'movie' | 'show', cast: any): void {
    const key = `${contentType}:${contentId}`;
    this.castCache.set(key, cast);

    setTimeout(() => {
      this.castCache.delete(key);
    }, this.CACHE_TTL);
  }

  invalidatePersonCache(personId: number): void {
    this.personCache.delete(personId);
  }

  invalidateCastCache(contentId: number, contentType: 'movie' | 'show'): void {
    const key = `${contentType}:${contentId}`;
    this.castCache.delete(key);
  }
}
```

## Dependencies

This module depends on:

- External APIs (TMDB) - For person and credit data
- Image CDN services - For profile and poster images
- Database ORM - For persistence operations

## Best Practices

1. **Type Safety**: Use specific interfaces for different context (PersonReference vs Person)
2. **Performance**: Implement caching for frequently accessed person data
3. **Validation**: Validate TMDB IDs and external data before persistence
4. **Error Handling**: Gracefully handle missing or invalid person data
5. **Consistency**: Maintain consistent naming between database fields and API responses
6. **Image Handling**: Implement fallbacks for missing profile images
7. **Credit Management**: Keep movie and TV credits separate for clarity
8. **Cast Status**: Properly track active vs. former cast members for shows

## Related Types

- **Movie Types** (`movieTypes.ts`) - For movie cast integration
- **Show Types** (`showTypes.ts`) - For TV show cast integration
- **Response Types** (`responseTypes.ts`) - For API response structure
- External API types - For TMDB integration

## Common Anti-Patterns to Avoid

### Over-Fetching Person Data

```typescript
// ❌ Don't: Always fetch complete person data
async function getMovieCastList(movieId: number): Promise<Person[]> {
  const cast = await this.castService.getMovieCast(movieId);
  return Promise.all(cast.map(member => this.personService.getPersonById(member.personId)));
}

// ✅ Do: Use appropriate data level for context
async function getMovieCastList(movieId: number): Promise<CastMember[]> {
  return await this.castService.getMovieCast(movieId); // Already includes necessary person data
}
```

### Inconsistent Gender Handling

```typescript
// ❌ Don't: Use inconsistent gender values
const person1 = { gender: 'male' };
const person2 = { gender: 'M' };
const person3 = { gender: 2 };

// ✅ Do: Use TMDB standard consistently
const person: Person = {
  gender: 2, // TMDB standard: 1=female, 2=male, 3=non-binary
  // ... other properties
};
```

### Poor Credit Management

```typescript
// ❌ Don't: Mix movie and TV credits
interface Credit {
  name: string;
  type: 'movie' | 'tv';
  episodeCount?: number; // Sometimes undefined
}

// ✅ Do: Use separate, specific interfaces
interface MovieCredit extends Credit {
  // Movie-specific properties only
}

interface ShowCredit extends Credit {
  episodeCount: number; // Always defined for shows
}
```
