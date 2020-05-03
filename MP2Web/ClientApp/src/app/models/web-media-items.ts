export interface WebStringResult {
  Result: string;
}

export interface WebBoolResult {
  Result: boolean;
}

export enum WebSortField {
  Title = 0,
  DateAdded = 1,
  Year = 2,
  Genre = 3,
  Rating = 4,
  Categories = 5,
  MusicTrackNumber = 6,
  MusicComposer = 7,
  TVEpisodeNumber = 8,
  TVSeasonNumber = 9,
  PictureDateTaken = 10,
  TVDateAired = 11,
  Type = 12,
  User = 15,
  Channel = 16,
  StartTime = 17,
  NaturalTitle = 18
}

export enum WebSortOrder {
  Asc = 0,
  Desc = 1,
  Custom = 2
}

export enum WebFIleType {
  Content = 0,
  Backdrop = 1,
  Banner = 2,
  Poster = 3,
  Cover = 4,
  Logo = 5
}

export enum WebMediaType {
  Movie = 0,
  MusicTrack = 1,
  Picture = 2,
  TVEpisode = 3,
  File = 4,
  TVShow = 5,
  TVSeason = 6,
  MusicAlbum = 7,
  MusicArtist = 8,
  Folder = 9,
  Drive = 10,
  Playlist = 11,
  TV = 12,
  Recording = 13,
  Radio = 14,
  Url = 15
}

export interface WebArtwork {
  Type: WebFIleType;
  Id: string;
  Rating: number;
  FileType: string;
  Offset: number;
  Path: string;
}

export interface WebActor {
  Title: string;
}

export interface WebMediaItem {
  Id: string;
  Path: string[];
  DateAdded: Date;
  Title: string;
  Artwork: WebArtwork[];
  Type: WebMediaType;
}

export interface WebExternalId {
  Site: string;
  Id: string;
}

export interface WebMovieBasic extends WebMediaItem {
  IsProtected: boolean;
  Genres: string[];
  ExternalId: WebExternalId[];
  Actors: WebActor[];
  Year: number;
  Rating: number;
  Runtime: number;
  Watched: boolean;
}

export interface WebMovieDetailed extends WebMovieBasic {
  Directors: string[];
  Writers: string[];
  Summary: string;
  Tagline: string;
  Language: string;
}

export interface WebTVShowBasic {
  Id: string;
  IsProtected: boolean;
  DateAdded: Date;
  Genres: string[];
  Artwork: WebArtwork[];
  Actors: WebActor[];
  Title: string;
  Year: number;
  EpisodeCount: number;
  UnwatchedEpisodeCount: number;
  SeasonCount: number;
  Rating: number;
  ContentRating: string;
  ExternalId: WebExternalId[];
}

export interface WebTVShowDetailed extends WebTVShowBasic {
  Summary: string;
  Status: string;
  Network: string;
  AirsDay: string;
  AirsTime: string;
  Runtime: number;
}

export interface WebTVSeasonBasic {
  Id: string;
  Title: string;
  ShowId: string;
  SeasonNumber: number;
  IsProtected: boolean;
  Year: number;
  EpisodeCount: number;
  UnwatchedEpisodeCount: number;
  DateAdded: Date;
  Artwork: WebArtwork[];
}

export interface WebTVSeasonDetailed extends WebTVSeasonBasic {
}
