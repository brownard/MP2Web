import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { BaseMediaViewService } from 'src/app/media/media-shared/services/base-media-view.service';
import { ViewState } from 'src/app/media/media-shared/store/media-view.state';
import { WebSortField, WebTVEpisodeDetailed, WebTVSeasonDetailed, WebTVShowDetailed } from 'src/app/core/models/web-media-items';
import { MediaAccessService } from 'src/app/core/api/media-access.service';
import { seriesStore } from '../store/series.store';


export const seriesSortFields = [
  { name: 'Title', field: WebSortField.Title },
  { name: 'Date Added', field: WebSortField.DateAdded },
  { name: 'Rating', field: WebSortField.Rating },
  { name: 'Year', field: WebSortField.Year }
];

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends BaseMediaViewService<WebTVShowDetailed> {

  constructor(private mediaAccessService: MediaAccessService, store: Store) {
    super(store, seriesStore.series);
  }

  protected loadItems(viewState: ViewState): Observable<WebTVShowDetailed[]> {
    return this.mediaAccessService.getTVShowsDetailed(viewState.filter, viewState.sort, viewState.order);
  }

  protected loadItem(id: string): Observable<WebTVShowDetailed> {
    return this.mediaAccessService.getTVShowDetailedById(id);
  }

  public getSeasonsForSeries(seriesId: string): Observable<WebTVSeasonDetailed[]> {
    return this.mediaAccessService.getTVSeasonsDetailedForTVShow(seriesId);
  }

  public getEpisodesForSeason(seasonId: string): Observable<WebTVEpisodeDetailed[]> {
    return this.mediaAccessService.getTVEpisodesDetailedForSeason(seasonId);
  }
}