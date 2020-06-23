import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BaseMediaItemComponent } from 'src/app/media/components/base-media-item.component';
import { WebMusicAlbumBasic } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: [
    './list-album.component.css',
    '../../../../../../shared/styles/media.styles.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAlbumComponent extends BaseMediaItemComponent<WebMusicAlbumBasic> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
