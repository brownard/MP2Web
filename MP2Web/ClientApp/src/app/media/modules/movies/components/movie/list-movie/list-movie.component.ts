import { Component, OnInit } from '@angular/core';
import { BaseMediaItemComponent } from 'src/app/media/components/base-media-item.component';
import { WebMovieDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: [
    './list-movie.component.css',
    '../../../../../../shared/styles/media.styles.css'
  ]
})
export class ListMovieComponent extends BaseMediaItemComponent<WebMovieDetailed> {
  constructor(artworkService: ArtworkService) {
    super(artworkService);
  }
}
