import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaListState } from 'src/app/shared/components/media-list-filter/media-list.state';
import { WebSortField, WebTVShowDetailed } from '../../../models/web-media-items';
import { ArtworkService } from '../../../services/artwork.service';
import * as SeriesStore from '../../store/series.store';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [
    './series-list.component.css',
    '../../../shared/styles/media.styles.css'
  ]
})
export class SeriesListComponent {
  
  public series$: Observable<WebTVShowDetailed[]>;
  public seriesListState$: Observable<MediaListState>;

  sortFields = [
    { name: 'Title', field: WebSortField.Title },
    { name: 'Date Added', field: WebSortField.DateAdded },
    { name: 'Rating', field: WebSortField.Rating },
    { name: 'Year', field: WebSortField.Year }
  ];

  constructor(public artworkService: ArtworkService, private store: Store) {

    this.seriesListState$ = this.store.select(SeriesStore.SeriesSelectors.selectState).pipe(
      map(s => {
        this.store.dispatch(SeriesStore.SeriesActions.getItems());
        return { search: s.currentFilter, sort: s.currentSort, order: s.currentOrder };
      })
    );

    this.store.dispatch(SeriesStore.SeriesActions.getItems());
    this.series$ = this.store.select(SeriesStore.SeriesSelectors.selectCurrentItems);
  }

  public onFilterChanged(mediaListState: MediaListState) {
    this.store.dispatch(SeriesStore.SeriesActions.setItemsFilter(mediaListState.search, mediaListState.sort, mediaListState.order));
  }

  public showSeriesDetails(series: WebTVShowDetailed) {
    this.store.dispatch(SeriesStore.SeriesActions.setSelectedItem(series));
  }
}
