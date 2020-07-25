import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { MediaViewStore } from 'src/app/media/store/media-view.store';
import { MediaViewState } from 'src/app/media/store/media-view.state';
import { WebMusicAlbumBasic } from 'src/app/core/models/web-media-items';

export const featureKey = 'music';

export interface MusicNavigationState {
  albums: MediaViewState<WebMusicAlbumBasic>;
}

const selectState = createFeatureSelector<any, MusicNavigationState>(featureKey);

const selectAlbumNavigationState = createSelector(
  selectState,
  (state: MusicNavigationState) => state.albums
);

export const musicStore = {
  albums: new MediaViewStore<WebMusicAlbumBasic>(featureKey + '->albums', selectAlbumNavigationState)
}

export const reducers: ActionReducerMap<MusicNavigationState> = {
  albums: musicStore.albums.reducer
}
