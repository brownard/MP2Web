import { Component } from '@angular/core';

import { BaseMediaItemComponent } from 'src/app/media/components/base-media-item.component';
import { WebTVShowDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-list-series',
  templateUrl: './list-series.component.html',
  styleUrls: [
    './list-series.component.css',
    '../../../../../../shared/styles/media.styles.css'
  ]
})
export class ListSeriesComponent extends BaseMediaItemComponent<WebTVShowDetailed> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
