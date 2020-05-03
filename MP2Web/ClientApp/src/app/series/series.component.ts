import { Component, OnInit } from '@angular/core';
import { MediaAccessService } from '../services/media-access.service';
import { StreamingStreamService } from '../services/streaming-stream.service';
import { WebFIleType, WebMediaItem, WebMediaType, WebTVShowDetailed } from '../models/web-media-items';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: [
    './series.component.css',
    '../shared/styles/media.styles.css'
  ]
})
export class SeriesComponent implements OnInit {
  public seriesItems: WebTVShowDetailed[];
  public errorMessage: string;

  constructor(private mediaAccessService: MediaAccessService, private streamingStreamService: StreamingStreamService) { }

  ngOnInit(): void {
    this.mediaAccessService.getTVShowsDetailed().subscribe(
      result => { this.seriesItems = result },
      error => {
        this.errorMessage = 'There was a problem getting TV series. Check the console for details.'
      });
  }

  public getImageUrl(mediaItem: WebMediaItem, fileType: WebFIleType, index = 0) {
    return this.streamingStreamService.getArtworkResizedUrl(WebMediaType.TVShow, mediaItem.Id, fileType, 256, 256, index);
  }
}
