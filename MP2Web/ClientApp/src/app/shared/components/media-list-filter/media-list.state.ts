import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';

export interface MediaListState {
  filter: string;
  sort: WebSortField;
  order: WebSortOrder;
}
