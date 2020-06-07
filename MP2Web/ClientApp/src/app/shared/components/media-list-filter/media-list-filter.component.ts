import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListState } from 'src/app/media/store/media.state';
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

  @Input() listState: ListState = {
    currentFilter: '',
    currentSort: WebSortField.Title,
    currentOrder: WebSortOrder.Asc
  };

  @Input() sortFields: { name: string, field: WebSortField }[];

  @Input() sortOrders: { name: string, order: WebSortOrder }[] = [
    { name: 'Ascending', order: WebSortOrder.Asc },
    { name: 'Descending', order: WebSortOrder.Desc }
  ];

  @Output() filterChanged = new EventEmitter<ListState>();

  onSortFieldChanged(field: string) {
    let sortField = this.sortFields.find(s => s.name == field);
    if (!sortField) {
      console.error('Invalid movie sort field - ' + field);
      return;
    }
    if (sortField.field !== this.listState.currentSort)
      this.onFIlterChanged({ ...this.listState, currentSort: sortField.field });
  }

  onSortOrderChanged(order: string) {
    let sortOrder = this.sortOrders.find(s => s.name == order);
    if (!sortOrder) {
      console.error('Invalid movie sort order - ' + order);
      return;
    }
    if (sortOrder.order !== this.listState.currentOrder)
      this.onFIlterChanged({ ...this.listState, currentOrder: sortOrder.order });
  }

  private onFIlterChanged(state: ListState) {
    this.filterChanged.emit(state);
  }
}
