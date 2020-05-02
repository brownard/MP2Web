import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WebMovieDetailed, WebSortField, WebSortOrder } from 'src/app/mp2-extended/web-media-items';
import { MoviesService } from '../../movies.service';
import * as MoviesActions from '../../store/movies.actions';
import * as MoviesSelectors from '../../store/movies.selectors';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: [
    './movie-list.component.css',
    '../../../common/styles/media-common.styles.css'
  ]
})
export class MovieListComponent implements OnInit, OnDestroy {

  public movies$: Observable<WebMovieDetailed[]>;

  constructor(public moviesService: MoviesService, private store: Store) { }

  ngOnInit(): void {
    this.movies$ = this.store.select(MoviesSelectors.selectCurrentMovies);
    this.store.dispatch(MoviesActions.getMovies('', WebSortField.Title, WebSortOrder.Asc));
  }

  ngOnDestroy(): void {
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.store.dispatch(MoviesActions.setSelectedMovie(movie));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
