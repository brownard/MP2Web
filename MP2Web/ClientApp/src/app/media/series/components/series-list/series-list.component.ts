import { Component } from '@angular/core';

import { BaseMediaViewComponent } from 'src/app/media/media-shared/components/base-media-view.component';
import { WebTVShowDetailed } from 'src/app/core/models/web-media-items';
import { ArtworkService } from 'src/app/core/api/artwork.service';
import { SeriesService, seriesSortFields } from '../../services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [
    './series-list.component.css',
    '../../../media-shared/styles/media.styles.css'
  ]
})
export class SeriesListComponent extends BaseMediaViewComponent<WebTVShowDetailed> {
  
  sortFields = seriesSortFields;

  constructor(public artworkService: ArtworkService, seriesService: SeriesService) {
    super(seriesService)
  }
}
