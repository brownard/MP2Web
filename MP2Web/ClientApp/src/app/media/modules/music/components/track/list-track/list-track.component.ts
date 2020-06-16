import { Component } from '@angular/core';
import { BaseMediaItemComponent } from 'src/app/media/containers/base-media-item.component';
import { WebMusicTrackDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: [
    './list-track.component.css',
    '../../../../shared/styles/media.styles.css'
  ]
})
export class ListTrackComponent extends BaseMediaItemComponent<WebMusicTrackDetailed> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
