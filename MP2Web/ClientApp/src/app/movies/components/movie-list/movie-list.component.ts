import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { WebMovieDetailed } from '../../../models/web-media-items';
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
export class MovieListComponent implements OnInit, OnDestroy {

  private moviesStateSubscription$: Subscription;
  public movies$: Observable<WebMovieDetailed[]>;

  constructor(public artworkService: ArtworkService, private store: Store) {
    this.moviesStateSubscription$ = this.store.select(MoviesStore.MovieSelectors.selectState)
      .subscribe(state =>
        this.store.dispatch(MoviesStore.MovieActions.getItems()));

    this.movies$ = this.store.select(MoviesStore.MovieSelectors.selectCurrentItems);
  }

  ngOnInit(): void {
    //this.store.dispatch(MoviesActions.getMovies('', WebSortField.Title, WebSortOrder.Asc));
  }

  ngOnDestroy(): void {
    this.moviesStateSubscription$.unsubscribe();
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.store.dispatch(MoviesStore.MovieActions.setSelectedItem(movie));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
