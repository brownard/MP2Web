import { Component } from '@angular/core';

import { BaseMediaViewComponent } from 'src/app/media/components/base-media-view.component';
import { WebTVShowDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { SeriesService, seriesSortFields } from '../../services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [
    './series-list.component.css',
    '../../../../../shared/styles/media.styles.css'
  ]
})
export class SeriesListComponent extends BaseMediaViewComponent<WebTVShowDetailed> {
  
  sortFields = seriesSortFields;

  constructor(public artworkService: ArtworkService, seriesService: SeriesService) {
    super(seriesService)
  }
}
