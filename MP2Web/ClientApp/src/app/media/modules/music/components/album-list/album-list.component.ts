import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewState } from 'src/app/media/store/media.state';
import { WebMusicAlbumBasic } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AlbumService, albumSortFields } from '../../services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: [
    './album-list.component.css',
    '../../../../../shared/styles/media.styles.css'
  ]
})
export class AlbumListComponent {
  
  public albums$: Observable<WebMusicAlbumBasic[]>;
  public albumListState$: Observable<ViewState>;

  sortFields = albumSortFields;

  constructor(public artworkService: ArtworkService, private albumService: AlbumService) {

    this.albumListState$ = this.albumService.getViewState();
    this.albums$ = this.albumService.getItems();
  }

  public onFilterChanged(state: ViewState) {
    this.albumService.setViewState(state);
  }

  public showAlbumDetails(album: WebMusicAlbumBasic) {
    this.albumService.setSelectedItem(album);
  }
}
