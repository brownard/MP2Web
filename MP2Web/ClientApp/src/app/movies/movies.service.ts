import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MediaAccessService } from '../mp2-extended/media-access.service';
import { StreamingStreamService } from '../mp2-extended/streaming-stream.service';
import { WebFIleType, WebMediaItem, WebMovieDetailed, WebSortField, WebSortOrder } from '../mp2-extended/web-media-items';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private currentFilter: string = null;
  private currentSort = WebSortField.Title;
  private currentOrder = WebSortOrder.Asc;

  private movies$: Subject<WebMovieDetailed[]> = new BehaviorSubject<WebMovieDetailed[]>(null);
  private selectedMovie$: Subject<WebMovieDetailed> = new BehaviorSubject<WebMovieDetailed>(null);

  constructor(private mediaAccessService: MediaAccessService, private streamingStreamService: StreamingStreamService) {
  }

  public getMovies(filter = '', sort = WebSortField.Title, order = WebSortOrder.Asc) {
    if (filter != this.currentFilter || sort != this.currentSort || order != this.currentOrder) {
      this.currentFilter = filter;
      this.currentSort = sort;
      this.currentOrder = order;
      this.mediaAccessService.getMoviesDetailed(filter, sort, order).subscribe(
        result => this.movies$.next(result)
      );
    }
    return this.movies$.asObservable();
  }

  public setSelectedMovie(selectedMovie: WebMovieDetailed) {
    this.selectedMovie$.next(selectedMovie);
  }

  public getSelectedMovie() {
    return this.selectedMovie$.asObservable();
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
