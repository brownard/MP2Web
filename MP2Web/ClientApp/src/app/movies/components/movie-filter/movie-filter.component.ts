import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';
import * as MoviesStore from '../../store/movies.store';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit, OnDestroy {
  
  currentSort = WebSortField.Title;
  currentOrder = WebSortOrder.Asc;

  moviesStateSubscription: Subscription;
  moviesState: MoviesStore.MoviesState;

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
    this.moviesStateSubscription = this.store.select(MoviesStore.MovieSelectors.selectCurrentFilter)
      .subscribe(state => {
        this.currentSort = state.currentSort;
        this.currentOrder = state.currentOrder;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.moviesStateSubscription.unsubscribe();
  }

  onSortFieldChanged(field: string) {
    let sortField = this.sortFields.find(s => s.name == field);
    if (sortField == undefined) {
      console.error('Invalid movie sort field - ' + field);
      return;
    }
    if (sortField.field == this.currentSort)
      return;
    this.currentSort = sortField.field;
    this.updateMoviesFilter();
  }

  onSortOrderChanged(order: string) {
    let sortOrder = this.sortOrders.find(s => s.name == order);
    if (!sortOrder) {
      console.error('Invalid movie sort order - ' + order);
      return;
    }
    if (sortOrder.order == this.currentOrder)
      return;
    this.currentOrder = sortOrder.order;
    this.updateMoviesFilter();
  }

  private updateMoviesFilter() {
    this.store.dispatch(MoviesStore.MovieActions.setItemsFilter('', this.currentSort, this.currentOrder));
  }
}
