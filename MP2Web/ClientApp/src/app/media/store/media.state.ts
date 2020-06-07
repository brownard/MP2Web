import { WebSortField, WebSortOrder } from '../../models/web-media-items';

export class ListState {
  public currentFilter: string = '';
  public currentSort: WebSortField = WebSortField.Title;
  public currentOrder: WebSortOrder = WebSortOrder.Asc;
}

export class MediaState<T> extends ListState {
  public currentItems: T[] = null;
  public selectedItem: T = null;
}
