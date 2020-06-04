import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';

export interface MediaListState {
  search: string;
  sort: WebSortField;
  order: WebSortOrder;
}
