import { WebSortField, WebSortOrder } from 'src/app/core/models/web-media-items';
import { Layout } from 'src/app/shared/components/list-view/layout.enum';

export class ViewState {
  public filter: string = '';
  public sort: WebSortField = WebSortField.Title;
  public order: WebSortOrder = WebSortOrder.Asc;
  public layout: Layout = Layout.Grid;
}

export class MediaViewState<T> extends ViewState {
  public selectedItem: T = null;
}