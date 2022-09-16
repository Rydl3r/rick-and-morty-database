export interface CharacterData {
  results: ICharacter[];
  info: DataInfo;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface EpisodeData {
  results: IEpisode[];
  info: DataInfo;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface LocationData {
  results: ILocation[];
  info: DataInfo;
}

export interface DataInfo {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface IWatchlistItem {
  id: number;
  value: string;
  checked: boolean;
}

export interface IFilters {
  species?: string;
  status?: string;
  gender?: string;
  type?: string;
  dimension?: string;
  episode?: string;
  name?: string;
}
