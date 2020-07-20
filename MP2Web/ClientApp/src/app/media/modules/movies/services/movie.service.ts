import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AbstractMediaViewService } from 'src/app/media/services/abstract-media-view.service';
import { ViewState } from 'src/app/media/store/media.state';
import { WebMovieDetailed, WebSortField } from 'src/app/models/web-media-items';
import { MediaAccessService } from 'src/app/services/media-access.service';
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
export class MovieService extends AbstractMediaViewService<WebMovieDetailed> {

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


