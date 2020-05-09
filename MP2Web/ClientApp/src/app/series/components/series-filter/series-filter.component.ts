import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';
import * as SeriesActions from '../../store/series.actions';
import * as SeriesSelectors from '../../store/series.selectors';

@Component({
  selector: 'app-series-filter',
  templateUrl: './series-filter.component.html',
  styleUrls: ['./series-filter.component.css']
})
export class SeriesFilterComponent implements OnInit, OnDestroy {
  
  currentSort = WebSortField.Title;
  currentOrder = WebSortOrder.Asc;

  stateSubscription$: Subscription;

  sortFields = [
    { name: 'Title', field: WebSortField.Title },
    { name: 'Date Added', field: WebSortField.DateAdded },
    { name: 'Rating', field: WebSortField.Rating },
    { name: 'Year', field: WebSortField.Year }
  ];

  sortOrders = [
    { name: 'Ascending', order: WebSortOrder.Asc },
    { name: 'Descending', order: WebSortOrder.Desc }
  ];

  constructor(private store: Store) {
    this.stateSubscription$ = this.store.select(SeriesSelectors.selectCurrentFilter)
      .subscribe(state => {
        this.currentSort = state.currentSort;
        this.currentOrder = state.currentOrder;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.stateSubscription$.unsubscribe();
  }

  onSortFieldChanged(field: string) {
    let sortField = this.sortFields.find(s => s.name == field);
    if (sortField == undefined) {
      console.error('Invalid series sort field - ' + field);
      return;
    }
    if (sortField.field == this.currentSort)
      return;
    this.currentSort = sortField.field;
    this.updateSeriesFilter();
  }

  onSortOrderChanged(order: string) {
    let sortOrder = this.sortOrders.find(s => s.name == order);
    if (!sortOrder) {
      console.error('Invalid series sort order - ' + order);
      return;
    }
    if (sortOrder.order == this.currentOrder)
      return;
    this.currentOrder = sortOrder.order;
    this.updateSeriesFilter();
  }

  private updateSeriesFilter() {
    this.store.dispatch(SeriesActions.setSeriesFilter('', this.currentSort, this.currentOrder));
  }
}
