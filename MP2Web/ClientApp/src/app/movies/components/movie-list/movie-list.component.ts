import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaListState } from 'src/app/shared/components/media-list-bar/media-list.state';
import { WebMovieDetailed, WebSortField } from '../../../models/web-media-items';
import { ArtworkService } from '../../../services/artwork.service';
import * as MoviesStore from '../../store/movies.store';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: [
    './movie-list.component.css',
    '../../../shared/styles/media.styles.css'
  ]
})
export class MovieListComponent {
  
  public movies$: Observable<WebMovieDetailed[]>;
  public movieListState$: Observable<MediaListState>

  sortFields = [
    { name: 'Title', field: WebSortField.Title },
    { name: 'Date Added', field: WebSortField.DateAdded },
    { name: 'Rating', field: WebSortField.Rating },
    { name: 'Year', field: WebSortField.Year }
  ];

  constructor(public artworkService: ArtworkService, private store: Store) {

    this.movieListState$ = this.store.select(MoviesStore.MovieSelectors.selectState).pipe(
      map(s => {
        this.store.dispatch(MoviesStore.MovieActions.getItems());
        return { search: s.currentFilter, sort: s.currentSort, order: s.currentOrder };
      })
    );

    this.store.dispatch(MoviesStore.MovieActions.getItems());
    this.movies$ = this.store.select(MoviesStore.MovieSelectors.selectCurrentItems);
  }

  public onFilterChanged(mediaListState: MediaListState) {
    this.store.dispatch(MoviesStore.MovieActions.setItemsFilter(mediaListState.search, mediaListState.sort, mediaListState.order));
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.store.dispatch(MoviesStore.MovieActions.setSelectedItem(movie));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
