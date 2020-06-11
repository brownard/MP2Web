import { Component } from '@angular/core';
import { BaseMediaItemComponent } from 'src/app/media/containers/base-media-item.component';
import { WebTVShowDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-grid-series',
  templateUrl: './grid-series.component.html',
  styleUrls: [
    './grid-series.component.css',
    '../../../../shared/styles/media.styles.css'
  ]
})
export class GridSeriesComponent extends BaseMediaItemComponent<WebTVShowDetailed> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
