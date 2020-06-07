import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AbstractMediaService } from 'src/app/media/services/abstract-media.service';
import { WebSortField, WebSortOrder, WebTVShowDetailed, WebTVSeasonDetailed, WebTVEpisodeDetailed } from 'src/app/models/web-media-items';
import { MediaAccessService } from 'src/app/services/media-access.service';
import * as SeriesStore from '../store/series.store';
import { ListState } from 'src/app/media/store/media.state';
import { switchMap } from 'rxjs/operators';

export const seriesSortFields = [
  { name: 'Title', field: WebSortField.Title },
  { name: 'Date Added', field: WebSortField.DateAdded },
  { name: 'Rating', field: WebSortField.Rating },
  { name: 'Year', field: WebSortField.Year }
];

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends AbstractMediaService<WebTVShowDetailed> {

  constructor(private mediaAccessService: MediaAccessService, store: Store) {
    super(store, SeriesStore.SeriesSelectors, SeriesStore.SeriesActions);
  }

  public getSeriesListState(): Observable<ListState> {
    return this.getListState();
  }

  public setSeriesListState(state: ListState): void {
    this.setListState(state);
  }

  public getSelectedSeries(id: string): Observable<WebTVShowDetailed> {
    return this.getSelectedItem().pipe(
      switchMap(m => m && m.Id === id ? of(m) : this.mediaAccessService.getTVShowDetailedById(id))
    );
  }

  public setSelectedSeries(series: WebTVShowDetailed): void {
    this.setSelectedItem(series);
  }

  public getSeries(): Observable<WebTVShowDetailed[]> {
    return this.getItemsWithState((filter, sort, order) => this.mediaAccessService.getTVShowsDetailed(filter, sort, order));
  }

  public getSeasonsForSeries(seriesId: string): Observable<WebTVSeasonDetailed[]> {
    return this.mediaAccessService.getTVSeasonsDetailedForTVShow(seriesId);
  }

  public getEpisodesForSeason(seasonId: string): Observable<WebTVEpisodeDetailed[]> {
    return this.mediaAccessService.getTVEpisodesDetailedForSeason(seasonId);
  }
}
