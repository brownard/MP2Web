import { Component, OnInit } from '@angular/core';
import { MediaAccessService } from '../mp2-extended/media-access.service';
import { StreamingService } from '../mp2-extended/streaming.service';
import { WebFIleType, WebMediaItem, WebMovieDetailed } from "../mp2-extended/web-media-items";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: [
    './movies.component.css',
    '../common/styles/cornor_ribbon.css'
  ]
})
export class MoviesComponent implements OnInit {
  public movies: WebMovieDetailed[];

  constructor(private mediaAccessService: MediaAccessService, private streamingService: StreamingService) { }

  ngOnInit(): void {
    this.mediaAccessService.getMoviesDetailed().subscribe(result => { this.movies = result });
  }

  public getImageUrl(mediaItem: WebMediaItem, fileType: WebFIleType, index = 0) {
    return this.streamingService.getArtworkResizedUrl(mediaItem.Type, mediaItem.Id, fileType, 256, 256, index);
  }
}
