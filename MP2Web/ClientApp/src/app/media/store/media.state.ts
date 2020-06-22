import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';

export enum Layout {
  Grid = 'Grid',
  List = 'List'
}

export class ViewState {
  public currentFilter: string = '';
  public currentSort: WebSortField = WebSortField.Title;
  public currentOrder: WebSortOrder = WebSortOrder.Asc;
  public currentLayout: Layout = Layout.Grid;
}

export class MediaState<T> extends ViewState {
  public selectedItem: T = null;
}
