import { createAction } from '@ngrx/store';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';
import { Layout } from './media.state';

export class MediaActions<T> {

  constructor(private featureName: string) { }

  public setViewState = createAction(
    '[' + this.featureName + '] Set View State',
    (filter: string, sort: WebSortField, order: WebSortOrder, layout: Layout) => ({ filter, sort, order, layout })
  );

  public setSelectedItem = createAction(
    '[' + this.featureName + '] Select Item',
    (item: T) => ({ item })
  );
}
