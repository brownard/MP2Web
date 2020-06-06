import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebMusicAlbumBasic, WebSortField } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { MediaListState } from 'src/app/shared/components/media-list-filter/media-list.state';
import * as MusicAlbumStore from '../../store/music.store';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: [
    './album-list.component.css',
    '../../../shared/styles/media.styles.css'
  ]
})
export class AlbumListComponent {
  
  public albums$: Observable<WebMusicAlbumBasic[]>;
  public albumListState$: Observable<MediaListState>;

  sortFields = [
    { name: 'Title', field: WebSortField.Title },
    { name: 'Date Added', field: WebSortField.DateAdded },
    { name: 'Rating', field: WebSortField.Rating },
    { name: 'Year', field: WebSortField.Year }
  ];

  constructor(public artworkService: ArtworkService, private store: Store) {

    this.albumListState$ = this.store.select(MusicAlbumStore.MusicAlbumSelectors.selectState).pipe(
      map(s => {
        this.store.dispatch(MusicAlbumStore.MusicAlbumActions.getItems());
        return { search: s.currentFilter, sort: s.currentSort, order: s.currentOrder };
      })
    );

    this.store.dispatch(MusicAlbumStore.MusicAlbumActions.getItems());
    this.albums$ = this.store.select(MusicAlbumStore.MusicAlbumSelectors.selectCurrentItems);
  }

  public onFilterChanged(mediaListState: MediaListState) {
    this.store.dispatch(MusicAlbumStore.MusicAlbumActions.setItemsFilter(mediaListState.search, mediaListState.sort, mediaListState.order));
  }

  public showAlbumDetails(album: WebMusicAlbumBasic) {
    this.store.dispatch(MusicAlbumStore.MusicAlbumActions.setSelectedItem(album));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
