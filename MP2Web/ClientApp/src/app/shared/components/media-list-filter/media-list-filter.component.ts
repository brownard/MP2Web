import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ViewState, Layout } from 'src/app/media/store/media.state';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';

@Component({
  selector: 'app-media-list-filter',
  templateUrl: './media-list-filter.component.html',
  styleUrls: ['./media-list-filter.component.css']
})
export class MediaListFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  layouts = Layout;

  @Input() viewState: ViewState = {
    currentFilter: '',
    currentSort: WebSortField.Title,
    currentOrder: WebSortOrder.Asc,
    currentLayout: Layout.Grid
  };

  @Input() sortFields: { name: string, field: WebSortField }[];

  @Input() sortOrders: { name: string, order: WebSortOrder }[] = [
    { name: 'Ascending', order: WebSortOrder.Asc },
    { name: 'Descending', order: WebSortOrder.Desc }
  ];

  @Output() filterChanged = new EventEmitter<ViewState>();

  onSortFieldChanged(field: string) {
    let sortField = this.sortFields.find(s => s.name == field);
    if (!sortField) {
      console.error('Invalid movie sort field - ' + field);
      return;
    }
    if (sortField.field !== this.viewState.currentSort)
      this.onFIlterChanged({ ...this.viewState, currentSort: sortField.field });
  }

  onSortOrderChanged(order: string) {
    let sortOrder = this.sortOrders.find(s => s.name == order);
    if (!sortOrder) {
      console.error('Invalid movie sort order - ' + order);
      return;
    }
    if (sortOrder.order !== this.viewState.currentOrder)
      this.onFIlterChanged({ ...this.viewState, currentOrder: sortOrder.order });
  }

  onLayoutChanged(layout: Layout) {
    if (layout !== this.viewState.currentLayout)
      this.onFIlterChanged({ ...this.viewState, currentLayout: layout });
  }

  private onFIlterChanged(state: ViewState) {
    this.filterChanged.emit(state);
  }
}
