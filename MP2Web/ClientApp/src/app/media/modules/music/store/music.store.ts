import { Action } from '@ngrx/store';
import { MediaActions } from 'src/app/media/store/media.actions';
import { MediaReducer } from 'src/app/media/store/media.reducers';
import { MediaSelectors } from 'src/app/media/store/media.selectors';
import { MediaState } from 'src/app/media/store/media.state';
import { WebMusicAlbumBasic } from 'src/app/models/web-media-items';

export const featureKey = 'music-albums';

export class MusicAlbumState extends MediaState<WebMusicAlbumBasic>{ }

export const initialState: MusicAlbumState = new MusicAlbumState();

export const MusicAlbumActions = new MediaActions<WebMusicAlbumBasic>(featureKey);
export const MusicAlbumSelectors = new MediaSelectors<WebMusicAlbumBasic>(featureKey);

const musicAlbumReducer = new MediaReducer<WebMusicAlbumBasic>(initialState, MusicAlbumActions);

export function reducer(state: MusicAlbumState | undefined, action: Action) {
  return musicAlbumReducer.mediaReducer(state, action);
}
