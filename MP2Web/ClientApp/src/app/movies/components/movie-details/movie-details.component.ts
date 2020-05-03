import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebMovieDetailed } from '../../../models/web-media-items';
import { ArtworkService } from '../../../services/artwork.service';
import { MediaAccessService } from '../../../services/media-access.service';
import * as MoviesSelectors from '../../store/movies.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: [
    './movie-details.component.css',
    '../../../shared/styles/media.styles.css'
  ]
})
export class MovieDetailsComponent implements OnInit {

  public movie$: Observable<WebMovieDetailed>;

  constructor(private route: ActivatedRoute, public artworkService: ArtworkService, private mediaAccessService: MediaAccessService, private store: Store) {
    this.movie$ = this.store.select(MoviesSelectors.selectSelectedMovie).pipe(
      switchMap(selectedMovie => {
        if (selectedMovie)
          return of(selectedMovie);
        else
          return this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
              this.mediaAccessService.getMovieDetailedById(params.get('id'))
            ))
      }));
  }

  ngOnInit(): void {
  }

  mapProperty(array: any[], property: string) {
    return array.map(a => a[property]);
  }
}
