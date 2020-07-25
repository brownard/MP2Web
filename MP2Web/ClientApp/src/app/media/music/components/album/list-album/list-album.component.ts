import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BaseMediaItemComponent } from 'src/app/media/media-shared/components/base-media-item.component';
import { WebMusicAlbumBasic } from 'src/app/core/models/web-media-items';
import { ArtworkService } from 'src/app/core/api/artwork.service';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: [
    './list-album.component.css',
    '../../../../media-shared/styles/media.styles.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAlbumComponent extends BaseMediaItemComponent<WebMusicAlbumBasic> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
