import { Component } from '@angular/core';
import { BaseMediaItemComponent } from 'src/app/media/containers/base-media-item.component';
import { WebMusicAlbumBasic } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-grid-album',
  templateUrl: './grid-album.component.html',
  styleUrls: [
    './grid-album.component.css',
    '../../../../shared/styles/media.styles.css'
  ]
})
export class GridAlbumComponent extends BaseMediaItemComponent<WebMusicAlbumBasic> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
