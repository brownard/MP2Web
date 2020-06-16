import { createAction } from '@ngrx/store';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';

export class MediaActions<T> {

  constructor(private featureName: string) { }

  public setItemsFilter = createAction(
    '[' + this.featureName + '] Set Items Filter',
    (filter: string, sort: WebSortField, order: WebSortOrder) => ({ filter, sort, order })
  );

  public setSelectedItem = createAction(
    '[' + this.featureName + '] Select Item',
    (item: T) => ({ item })
  );
}
