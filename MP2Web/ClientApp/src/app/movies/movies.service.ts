import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MediaAccessService } from '../mp2-extended/media-access.service';
import { StreamingService } from '../mp2-extended/streaming.service';
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

  constructor(private mediaAccessService: MediaAccessService, private streamingService: StreamingService) {
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
    return this.streamingService.getArtworkResizedUrl(mediaItem.Type, mediaItem.Id, WebFIleType.Cover, 256, 256, index);
  }
}
