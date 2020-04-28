import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WebMovieDetailed } from 'src/app/mp2-extended/web-media-items';
import { MoviesService } from '../../movies.service';
import * as moviesActions from '../../store/movies.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: [
    './movie-list.component.css',
    '../../../common/styles/media-common.styles.css'
  ]
})
export class MovieListComponent implements OnInit {
  public movies: WebMovieDetailed[];

  moviesSubscription: Subscription;

  constructor(public moviesService: MoviesService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.moviesSubscription = this.moviesService.getMovies().subscribe(result => { this.movies = result });
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.store.dispatch(moviesActions.setSelectedMovie(movie));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
