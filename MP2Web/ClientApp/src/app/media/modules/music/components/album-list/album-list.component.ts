import { Component } from '@angular/core';

import { BaseMediaViewComponent } from 'src/app/media/components/base-media-view.component';
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
export class AlbumListComponent extends BaseMediaViewComponent<WebMusicAlbumBasic> {

  sortFields = albumSortFields;

  constructor(public artworkService: ArtworkService, albumService: AlbumService) {
    super(albumService);
  }
}
