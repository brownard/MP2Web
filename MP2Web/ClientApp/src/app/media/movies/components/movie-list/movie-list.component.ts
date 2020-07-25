import { Component } from '@angular/core';

import { BaseMediaViewComponent } from 'src/app/media/media-shared/components/base-media-view.component';
import { WebMovieDetailed } from 'src/app/core/models/web-media-items';
import { ArtworkService } from 'src/app/core/api/artwork.service';
import { MovieService, movieSortFields } from '../../services/movie.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: [
    './movie-list.component.css',
    '../../../media-shared/styles/media.styles.css'
  ]
})
export class MovieListComponent extends BaseMediaViewComponent<WebMovieDetailed> {
  
  sortFields = movieSortFields;

  constructor(public artworkService: ArtworkService, movieService: MovieService) {
    super(movieService);
  }
}
