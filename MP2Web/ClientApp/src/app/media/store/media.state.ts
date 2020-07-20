import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';

export enum Layout {
  Grid = 'Grid',
  List = 'List'
}

export class ViewState {
  public filter: string = '';
  public sort: WebSortField = WebSortField.Title;
  public order: WebSortOrder = WebSortOrder.Asc;
  public layout: Layout = Layout.Grid;
}

export class MediaState<T> extends ViewState {
  public selectedItem: T = null;
}
