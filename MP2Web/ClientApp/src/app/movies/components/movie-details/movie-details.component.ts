import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { MediaAccessService } from 'src/app/mp2-extended/media-access.service';
import { WebMovieDetailed } from 'src/app/mp2-extended/web-media-items';
import { MoviesService } from '../../movies.service';
import * as moviesSelectors from '../../store/movies.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: [
    './movie-details.component.css',
    '../../../common/styles/media-common.styles.css'
  ]
})
export class MovieDetailsComponent implements OnInit {

  public movie: WebMovieDetailed;

  constructor(private route: ActivatedRoute, public moviesService: MoviesService, private mediaAccessService: MediaAccessService, private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(moviesSelectors.selectSelectedMovie).pipe(
      first(),
      switchMap(selectedMovie => {
        if (selectedMovie)
          return of(selectedMovie);
        else
          return this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
              this.mediaAccessService.getMovieDetailedById(params.get('id'))
            ))
      })).subscribe(result => this.movie = result);

    //this.route.paramMap.pipe(
    //  switchMap((params: ParamMap) =>

    //    history.state.movie ? of(history.state.movie) : this.mediaAccessService.getMovieDetailedById(params.get('id'))
    //  )
    //).subscribe(result => this.movie = result);
  }

  mapProperty(array: any[], property: string) {
    return array.map(a => a[property]);
  }
}
