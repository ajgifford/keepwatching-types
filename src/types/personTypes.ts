export interface PersonReference {
  id: number;
  tmdbId: number;
  name: string;
}

export interface Person extends PersonReference {
  gender: number;
  biography: string;
  profileImage: string;
  birthdate: string;
  deathdate: string | null;
  placeOfBirth: string;
  movieCredits: Credit[];
  showCredits: ShowCredit[];
}

export interface Credit {
  name: string;
  poster: string;
  year: string;
  character: string;
  rating: number;
}

export interface ShowCredit extends Credit {
  episodeCount: number;
}

export interface CastMember {
  contentId: number;
  personId: number;
  characterName: string;
  order: number;
  name: string;
  profileImage: string;
}

export interface ShowCastMember extends CastMember {
  episodeCount: number;
  active: boolean;
}

export interface CreatePerson {
  tmdb_id: number;
  name: string;
  gender: number;
  biography: string;
  profile_image: string;
  birthdate: string;
  deathdate: string | null;
  place_of_birth: string;
}

export interface CreateCast {
  content_id: number;
  person_id: number;
  character_name: string;
  credit_id: string;
  cast_order: number;
}

export interface CreateShowCast extends CreateCast {
  total_episodes: number;
  active: number;
}
