import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { WebMovieDetailed } from '../../../models/web-media-items';
import { ArtworkService } from '../../../services/artwork.service';
import * as MoviesActions from '../../store/movies.actions';
import * as MoviesSelectors from '../../store/movies.selectors';

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
    this.moviesStateSubscription$ = this.store.select(MoviesSelectors.selectMoviesState)
      .subscribe(state =>
        this.store.dispatch(MoviesActions.getMovies()));

    this.movies$ = this.store.select(MoviesSelectors.selectCurrentMovies);
  }

  ngOnInit(): void {
    //this.store.dispatch(MoviesActions.getMovies('', WebSortField.Title, WebSortOrder.Asc));
  }

  ngOnDestroy(): void {
    this.moviesStateSubscription$.unsubscribe();
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.store.dispatch(MoviesActions.setSelectedMovie(movie));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
