import { WebSortField, WebSortOrder } from '../../models/web-media-items';

export class MediaState<T> {
  public currentFilter: string = '';
  public currentSort: WebSortField = WebSortField.Title;
  public currentOrder: WebSortOrder = WebSortOrder.Asc;
  public currentItems: T[] = null;
  public selectedItem: T = null;
}
