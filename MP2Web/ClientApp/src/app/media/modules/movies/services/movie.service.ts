import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AbstractMediaService } from 'src/app/media/services/abstract-media.service';
import { ViewState } from 'src/app/media/store/media.state';
import { WebMovieDetailed, WebSortField } from 'src/app/models/web-media-items';
import { MediaAccessService } from 'src/app/services/media-access.service';
import * as MoviesStore from '../store/movies.store';

export const movieSortFields = [
  { name: 'Title', field: WebSortField.Title },
  { name: 'Date Added', field: WebSortField.DateAdded },
  { name: 'Rating', field: WebSortField.Rating },
  { name: 'Year', field: WebSortField.Year }
];

@Injectable({
  providedIn: 'root'
})
export class MovieService extends AbstractMediaService<WebMovieDetailed> {

  constructor(private mediaAccessService: MediaAccessService, store: Store) {
    super(store, MoviesStore.MovieSelectors, MoviesStore.MovieActions);
  }

  public getMoviesListState(): Observable<ViewState> {
    return this.getViewState();
  }

  public setMoviesListState(state: ViewState): void {
    this.setViewState(state);
  }

  public getSelectedMovie(id: string): Observable<WebMovieDetailed> {
    return this.getSelectedItem().pipe(
      switchMap(m => !!m && m.Id === id ? of(m) : this.mediaAccessService.getMovieDetailedById(id))
    );
  }

  public setSelectedMovie(movie: WebMovieDetailed): void {
    this.setSelectedItem(movie);
  }

  public getMovies(): Observable<WebMovieDetailed[]> {
    return this.getItemsWithState((filter, sort, order) => this.mediaAccessService.getMoviesDetailed(filter, sort, order));
  }
}


