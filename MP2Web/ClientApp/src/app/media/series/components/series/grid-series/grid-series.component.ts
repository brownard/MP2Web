import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseMediaItemComponent } from 'src/app/media/media-shared/components/base-media-item.component';
import { WebTVShowDetailed } from 'src/app/core/models/web-media-items';
import { ArtworkService } from 'src/app/core/api/artwork.service';

@Component({
  selector: 'app-grid-series',
  templateUrl: './grid-series.component.html',
  styleUrls: [
    './grid-series.component.css',
    '../../../../media-shared/styles/media.styles.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridSeriesComponent extends BaseMediaItemComponent<WebTVShowDetailed> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
