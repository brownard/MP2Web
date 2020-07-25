import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseMediaItemComponent } from 'src/app/media/components/base-media-item.component';
import { WebMovieDetailed } from 'src/app/core/models/web-media-items';
import { ArtworkService } from 'src/app/core/api/artwork.service';

@Component({
  selector: 'app-grid-movie',
  templateUrl: './grid-movie.component.html',
  styleUrls: [
    './grid-movie.component.css',
    '../../../../../../shared/styles/media.styles.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridMovieComponent extends BaseMediaItemComponent<WebMovieDetailed> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
