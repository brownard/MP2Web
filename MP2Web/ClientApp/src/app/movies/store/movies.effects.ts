import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaEffects } from 'src/app/media/store/media.effects';
import { MediaState } from 'src/app/media/store/media.state';
import { WebMovieDetailed } from 'src/app/models/web-media-items';
import { MediaAccessService } from '../../services/media-access.service';
import * as MoviesStore from './movies.store';

@Injectable()
export class MovieEffects extends MediaEffects<WebMovieDetailed> {
  constructor(private mediaAccessService: MediaAccessService, actions$: Actions, store: Store) {
    super(actions$, store, MoviesStore.MovieActions, MoviesStore.MovieSelectors);
  }

  protected getItems(state: MediaState<WebMovieDetailed>): Observable<WebMovieDetailed[]> {
    return this.mediaAccessService.getMoviesDetailed(state.currentFilter, state.currentSort, state.currentOrder);
  }
}
