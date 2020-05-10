import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaEffects } from 'src/app/media/store/media.effects';
import { MediaState } from 'src/app/media/store/media.state';
import { WebTVShowDetailed } from 'src/app/models/web-media-items';
import { MediaAccessService } from '../../services/media-access.service';
import * as SeriesStore from './series.store';

@Injectable()
export class SeriesEffects extends MediaEffects<WebTVShowDetailed> {
  constructor(private mediaAccessService: MediaAccessService, actions$: Actions, store: Store) {
    super(actions$, store, SeriesStore.SeriesActions, SeriesStore.SeriesSelectors);
  }

  protected getItems(state: MediaState<WebTVShowDetailed>): Observable<WebTVShowDetailed[]> {
    return this.mediaAccessService.getTVShowsDetailed(state.currentFilter, state.currentSort, state.currentOrder);
  }
}
