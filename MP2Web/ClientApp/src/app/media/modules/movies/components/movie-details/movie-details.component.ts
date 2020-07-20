import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebMovieDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: [
    './movie-details.component.css',
    '../../../../../shared/styles/media.styles.css'
  ]
})
export class MovieDetailsComponent implements OnInit {

  public movie$: Observable<WebMovieDetailed>;

  constructor(private route: ActivatedRoute, public artworkService: ArtworkService, private movieService: MovieService) {
    this.movie$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.movieService.getItem(params.get('id'))
      ));
  }

  ngOnInit(): void {
  }

  mapProperty(array: any[], property: string) {
    return array.map(a => a[property]);
  }
}
