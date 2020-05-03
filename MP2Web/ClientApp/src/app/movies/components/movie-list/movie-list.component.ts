import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WebMovieDetailed, WebSortField, WebSortOrder } from '../../../models/web-media-items';
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

  public movies$: Observable<WebMovieDetailed[]>;

  constructor(public artworkService: ArtworkService, private store: Store) {
    this.movies$ = this.store.select(MoviesSelectors.selectCurrentMovies);
  }

  ngOnInit(): void {
    this.store.dispatch(MoviesActions.getMovies('', WebSortField.Title, WebSortOrder.Asc));
  }

  ngOnDestroy(): void {
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.store.dispatch(MoviesActions.setSelectedMovie(movie));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
