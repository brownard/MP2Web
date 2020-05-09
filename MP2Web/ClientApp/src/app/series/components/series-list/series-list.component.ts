import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { WebTVShowDetailed } from '../../../models/web-media-items';
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
export class SeriesListComponent implements OnInit, OnDestroy {

  private stateSubscription$: Subscription;
  public series$: Observable<WebTVShowDetailed[]>;

  constructor(public artworkService: ArtworkService, private store: Store) {
    this.stateSubscription$ = this.store.select(SeriesStore.SeriesSelectors.selectState)
      .subscribe(state =>
        this.store.dispatch(SeriesStore.SeriesActions.getItems()));

    this.series$ = this.store.select(SeriesStore.SeriesSelectors.selectCurrentItems);
  }

  ngOnInit(): void {
    //this.store.dispatch(MoviesActions.getMovies('', WebSortField.Title, WebSortOrder.Asc));
  }

  ngOnDestroy(): void {
    this.stateSubscription$.unsubscribe();
  }

  public showSeriesDetails(series: WebTVShowDetailed) {
    this.store.dispatch(SeriesStore.SeriesActions.setSelectedItem(series));
  }
}
