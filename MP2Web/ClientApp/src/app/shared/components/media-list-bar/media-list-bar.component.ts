import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';
import { MediaListState } from './media-list.state';

@Component({
  selector: 'app-media-list-bar',
  templateUrl: './media-list-bar.component.html',
  styleUrls: ['./media-list-bar.component.css']
})
export class MediaListBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() mediaListState: MediaListState = { search: '', sort: WebSortField.Title, order: WebSortOrder.Asc };

  @Input() sortFields: { name: string, field: WebSortField }[];

  @Input() sortOrders: { name: string, order: WebSortOrder }[] = [
    { name: 'Ascending', order: WebSortOrder.Asc },
    { name: 'Descending', order: WebSortOrder.Desc }
  ];

  @Output() filterChanged = new EventEmitter<MediaListState>();

  onSortFieldChanged(field: string) {
    let sortField = this.sortFields.find(s => s.name == field);
    if (!sortField) {
      console.error('Invalid movie sort field - ' + field);
      return;
    }
    if (sortField.field !== this.mediaListState.sort)
      this.onFIlterChanged(this.mediaListState.search, sortField.field, this.mediaListState.order);
  }

  onSortOrderChanged(order: string) {
    let sortOrder = this.sortOrders.find(s => s.name == order);
    if (!sortOrder) {
      console.error('Invalid movie sort order - ' + order);
      return;
    }
    if (sortOrder.order !== this.mediaListState.order)
      this.onFIlterChanged(this.mediaListState.search, this.mediaListState.sort, sortOrder.order);
  }

  private onFIlterChanged(search: string, sort: WebSortField, order: WebSortOrder) {
    this.filterChanged.emit({ search, sort, order });
  }
}
