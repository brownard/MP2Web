import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { BaseMediaViewService } from 'src/app/media/services/base-media-view.service';
import { ViewState } from 'src/app/media/store/media-view.state';
import { WebMusicAlbumBasic, WebMusicTrackDetailed, WebSortField } from 'src/app/models/web-media-items';
import { MediaAccessService } from 'src/app/services/media-access.service';
import { musicStore } from '../store/music.store';


export const albumSortFields = [
  { name: 'Title', field: WebSortField.Title },
  { name: 'Date Added', field: WebSortField.DateAdded },
  { name: 'Rating', field: WebSortField.Rating },
  { name: 'Year', field: WebSortField.Year }
];

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseMediaViewService<WebMusicAlbumBasic> {

  constructor(private mediaAccessService: MediaAccessService, store: Store) {
    super(store, musicStore.albums);
  }

  protected loadItems(viewState: ViewState): Observable<WebMusicAlbumBasic[]> {
    return this.mediaAccessService.getMusicAlbumsBasic(viewState.filter, viewState.sort, viewState.order);
  }

  protected loadItem(id: string): Observable<WebMusicAlbumBasic> {
    return this.mediaAccessService.getMusicAlbumBasicById(id);
  }

  public getAlbumsByArtist(artistId: string): Observable<WebMusicAlbumBasic[]> {
    return this.getItemsWithState(
      (filter, sort, order) => this.mediaAccessService.getMusicAlbumsBasicForArtist(artistId, filter, sort, order)
    );
  }

  public getTracksForAlbum(albumId: string): Observable<WebMusicTrackDetailed[]> {
    return this.mediaAccessService.getMusicTracksDetailedForAlbum(albumId);
  }
}
