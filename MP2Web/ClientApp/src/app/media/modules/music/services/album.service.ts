import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AbstractMediaService } from 'src/app/media/services/abstract-media.service';
import { ViewState } from 'src/app/media/store/media.state';
import { WebMusicAlbumBasic, WebSortField, WebSortOrder, WebMusicTrackDetailed } from 'src/app/models/web-media-items';
import { MediaAccessService } from 'src/app/services/media-access.service';
import * as MusicAlbumStore from '../store/music.store';

export const albumSortFields = [
  { name: 'Title', field: WebSortField.Title },
  { name: 'Date Added', field: WebSortField.DateAdded },
  { name: 'Rating', field: WebSortField.Rating },
  { name: 'Year', field: WebSortField.Year }
];

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends AbstractMediaService<WebMusicAlbumBasic> {

  constructor(private mediaAccessService: MediaAccessService, store: Store) {
    super(store, MusicAlbumStore.MusicAlbumSelectors, MusicAlbumStore.MusicAlbumActions);
  }

  public getAlbumListState(): Observable<ViewState> {
    return this.getViewState();
  }

  public setAlbumListState(state: ViewState): void {
    this.setViewState(state);
  }

  public getSelectedAlbum(id: string): Observable<WebMusicAlbumBasic> {
    return this.getSelectedItem().pipe(
      switchMap(m => m && m.Id === id ? of(m) : this.mediaAccessService.getMusicAlbumBasicById(id))
    );
  }

  public setSelectedAlbum(album: WebMusicAlbumBasic): void {
    this.setSelectedItem(album);
  }

  public getAlbums(): Observable<WebMusicAlbumBasic[]> {
    return this.getItemsWithState((filter, sort, order) => this.mediaAccessService.getMusicAlbumsBasic(filter, sort, order));
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
