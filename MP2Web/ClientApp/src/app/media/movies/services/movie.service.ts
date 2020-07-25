import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { BaseMediaViewService } from 'src/app/media/media-shared/services/base-media-view.service';
import { ViewState } from 'src/app/media/media-shared/store/media-view.state';
import { WebMovieDetailed, WebSortField } from 'src/app/core/models/web-media-items';
import { MediaAccessService } from 'src/app/core/api/media-access.service';
import { moviesStore } from '../store/movies.store';


export const movieSortFields = [
  { name: 'Title', field: WebSortField.Title },
  { name: 'Date Added', field: WebSortField.DateAdded },
  { name: 'Rating', field: WebSortField.Rating },
  { name: 'Year', field: WebSortField.Year }
];

@Injectable({
  providedIn: 'root'
})
export class MovieService extends BaseMediaViewService<WebMovieDetailed> {

  constructor(private mediaAccessService: MediaAccessService, store: Store) {
    super(store, moviesStore.movies);
  }

  protected loadItems(viewState: ViewState): Observable<WebMovieDetailed[]> {
    return this.mediaAccessService.getMoviesDetailed(viewState.filter, viewState.sort, viewState.order);
  }

  protected loadItem(id: string): Observable<WebMovieDetailed> {
    return this.mediaAccessService.getMovieDetailedById(id);
  }
}


