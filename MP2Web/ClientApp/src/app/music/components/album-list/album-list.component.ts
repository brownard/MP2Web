import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListState } from 'src/app/media/store/media.state';
import { WebMusicAlbumBasic } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AlbumService, albumSortFields } from '../../services/album.service';

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
  public albumListState$: Observable<ListState>;

  sortFields = albumSortFields;

  constructor(public artworkService: ArtworkService, private albumService: AlbumService) {

    this.albumListState$ = this.albumService.getAlbumListState();
    this.albums$ = this.albumService.getAlbums();
  }

  public onFilterChanged(state: ListState) {
    this.albumService.setAlbumListState(state);
  }

  public showAlbumDetails(album: WebMusicAlbumBasic) {
    this.albumService.setSelectedAlbum(album);
  }
}
