import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListState } from 'src/app/media/store/media.state';
import { WebMovieDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { MovieService, movieSortFields } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: [
    './movie-list.component.css',
    '../../../../../shared/styles/media.styles.css'
  ]
})
export class MovieListComponent {
  
  public movies$: Observable<WebMovieDetailed[]>;
  public movieListState$: Observable<ListState>;

  sortFields = movieSortFields;

  constructor(public artworkService: ArtworkService, private moviesService: MovieService) {
    this.movieListState$ = this.moviesService.getMoviesListState();
    this.movies$ = this.moviesService.getMovies();
  }

  public onFilterChanged(state: ListState) {
    this.moviesService.setMoviesListState(state);
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.moviesService.setSelectedMovie(movie);
  }
}
