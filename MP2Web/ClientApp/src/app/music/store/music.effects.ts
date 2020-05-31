import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaEffects } from 'src/app/media/store/media.effects';
import { MediaState } from 'src/app/media/store/media.state';
import { WebMusicAlbumBasic } from 'src/app/models/web-media-items';
import { MediaAccessService } from '../../services/media-access.service';
import * as MusicStore from './music.store';

@Injectable()
export class MusicAlbumEffects extends MediaEffects<WebMusicAlbumBasic> {
  constructor(private mediaAccessService: MediaAccessService, actions$: Actions, store: Store) {
    super(actions$, store, MusicStore.MusicAlbumActions, MusicStore.MusicAlbumSelectors);
  }

  protected getItems(state: MediaState<WebMusicAlbumBasic>): Observable<WebMusicAlbumBasic[]> {
    return this.mediaAccessService.getMusicAlbumsBasic(state.currentFilter, state.currentSort, state.currentOrder);
  }
}
