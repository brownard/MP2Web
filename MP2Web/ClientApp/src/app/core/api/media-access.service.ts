import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequestCache } from '../cache/api-request.cache';
import { AppConfigService } from '../config/app-config.service';
import { Logger } from '../logging/logger.service';
import { WebMovieBasic, WebMovieDetailed, WebMusicAlbumBasic, WebMusicArtistDetailed, WebMusicTrackDetailed, WebSortField, WebSortOrder, WebTVEpisodeDetailed, WebTVSeasonDetailed, WebTVShowBasic, WebTVShowDetailed } from '../models/web-media-items';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MediaAccessService extends ApiService {
  
  constructor(http: HttpClient, logger: Logger, config: AppConfigService, cache: ApiRequestCache) {
    const url = config.appConfig.mp2ExtendedBasePath + config.appConfig.mediaAccessServicePath;
    // Just cache all MAS requests
    cache.addCacheUrls([url]);

    super(http, logger, url);
  }

  public getMoviesBasic(filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    return this.getData<WebMovieBasic[]>('GetMoviesBasic', {
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getMoviesDetailed(filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    return this.getData<WebMovieDetailed[]>('GetMoviesDetailed', {
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getMovieDetailedById(id: string) {
    return this.getData<WebMovieDetailed>('GetMovieDetailedById', {
      'id': id
    });
  }

  public getTVShowsBasic(filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    return this.getData<WebTVShowBasic[]>('GetTVShowsBasic', {
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getTVShowsDetailed(filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    return this.getData<WebTVShowDetailed[]>('GetTVShowsDetailed', {
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getTVShowDetailedById(id: string) {
    return this.getData<WebTVShowDetailed>('GetTVShowDetailedById', {
      'id': id
    });
  }

  public getTVSeasonsDetailedForTVShow(id: string, sort = WebSortField.TVSeasonNumber, order = WebSortOrder.Asc) {
    return this.getData<WebTVSeasonDetailed[]>('GetTVSeasonsDetailedForTVShow', {
      'id': id,
      'sort': sort,
      'order': order
    });
  }

  public getTVEpisodesDetailedForSeason(id: string, sort = WebSortField.TVEpisodeNumber, order = WebSortOrder.Asc) {
    return this.getData<WebTVEpisodeDetailed[]>('GetTVEpisodesDetailedForSeason', {
      'id': id,
      'sort': sort,
      'order': order
    });
  }

  public getMusicAlbumsBasic(filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    return this.getData<WebMusicAlbumBasic[]>('GetMusicAlbumsBasic', {
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getMusicAlbumsBasicForArtist(id: string, filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    return this.getData<WebMusicAlbumBasic[]>('GetMusicAlbumsBasicForArtist', {
      'id': id,
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getMusicAlbumBasicById(id: string) {
    return this.getData<WebMusicAlbumBasic>('GetMusicAlbumBasicById', {
      'id': id
    });
  }

  public getMusicArtistsDetailed(filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    return this.getData<WebMusicArtistDetailed[]>('GetMusicArtistsDetailed', {
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getMusicTracksDetailed(filter = '', sort = WebSortField.MusicTrackNumber, order = WebSortOrder.Asc) {
    return this.getData<WebMusicArtistDetailed[]>('GetMusicTracksDetailed', {
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getMusicTracksDetailedForAlbum(id: string, filter = '', sort = WebSortField.MusicTrackNumber, order = WebSortOrder.Asc) {
    return this.getData<WebMusicTrackDetailed[]>('GetMusicTracksDetailedForAlbum', {
      'id': id,
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }

  public getMusicTracksDetailedForArtist(id: string, filter = '', sort = WebSortField.MusicTrackNumber, order = WebSortOrder.Asc) {
    return this.getData<WebMusicTrackDetailed[]>('GetMusicTracksDetailedForArtist', {
      'id': id,
      'filter': filter,
      'sort': sort,
      'order': order
    });
  }
}
