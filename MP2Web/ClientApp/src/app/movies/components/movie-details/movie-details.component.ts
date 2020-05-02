import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaAccessService } from 'src/app/mp2-extended/media-access.service';
import { WebMovieDetailed } from 'src/app/mp2-extended/web-media-items';
import { MoviesService } from '../../movies.service';
import * as MoviesSelectors from '../../store/movies.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: [
    './movie-details.component.css',
    '../../../common/styles/media-common.styles.css'
  ]
})
export class MovieDetailsComponent implements OnInit {

  public movie$: Observable<WebMovieDetailed>;

  constructor(private route: ActivatedRoute, public moviesService: MoviesService, private mediaAccessService: MediaAccessService, private store: Store) {
  }

  ngOnInit(): void {
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

  mapProperty(array: any[], property: string) {
    return array.map(a => a[property]);
  }
}
