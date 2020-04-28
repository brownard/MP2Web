import { Component, OnInit } from '@angular/core';
import { WebFIleType, WebMediaItem, WebMovieDetailed } from "../../mp2-extended/web-media-items";
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: [
    './movies.component.css',
    '../../common/styles/media-common.styles.css'
  ]
})
export class MoviesComponent implements OnInit {
  public movies: WebMovieDetailed[];
  doShowDetails: boolean;

  constructor(public moviesService: MoviesService) { }

  ngOnInit(): void {
    //this.moviesService.getMovies().subscribe(result => { this.movies = result });
  }

  public showMovieDetails(movie: WebMovieDetailed) {
    this.moviesService.setSelectedMovie(movie);
  }

  public getImageUrl(mediaItem: WebMediaItem, fileType: WebFIleType, index = 0) {
    return this.moviesService.getMovieCoverUrl(mediaItem, index);
  }

  public showDetails() {
    this.doShowDetails = true;
  }

  public hideDetails() {
    this.doShowDetails = false;
  }
}
