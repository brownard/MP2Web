import { Injectable } from '@angular/core';
import { StreamingStreamService } from '../mp2-extended/streaming-stream.service';
import { WebFIleType, WebMediaItem } from '../mp2-extended/web-media-items';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private streamingStreamService: StreamingStreamService) {
  }

  public getMovieCoverUrl(mediaItem: WebMediaItem, index = 0) {
    return this.getArtworkUrl(mediaItem, WebFIleType.Cover, index);
  }

  public getMovieScreenshotUrl(mediaItem: WebMediaItem, index = 0) {
    return this.getArtworkUrl(mediaItem, WebFIleType.Content, index);
  }

  getArtworkUrl(mediaItem: WebMediaItem, fileType: WebFIleType, index = 0, maxWidth = 256, maxHeight = 256) {
    return this.streamingStreamService.getArtworkResizedUrl(mediaItem.Type, mediaItem.Id, fileType, maxWidth, maxHeight, index);
  }
}
