import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { ApiService } from './api.service';
import { WebMovieBasic, WebMovieDetailed, WebSortField, WebSortOrder, WebTVShowBasic, WebTVShowDetailed } from './web-media-items';

@Injectable({
  providedIn: 'root'
})
export class MediaAccessService extends ApiService {
  
  constructor(http: HttpClient, config: AppConfigService) {
    super(http, config.appConfig.mp2ExtendedBasePath + config.appConfig.mediaAccessServicePath);
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
}
