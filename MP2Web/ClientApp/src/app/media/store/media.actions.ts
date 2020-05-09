import { createAction } from '@ngrx/store';
import { WebSortField, WebSortOrder } from '../../models/web-media-items';

export class MediaActions<T> {

  constructor(private featureName: string) { }

  public getItems = createAction(
    '[' + this.featureName + '] Get Items'
  );

  public setItemsFilter = createAction(
    '[' + this.featureName + '] Set Items Filter',
    (filter: string, sort: WebSortField, order: WebSortOrder) => ({ filter, sort, order })
  );

  public setItems = createAction(
    '[' + this.featureName + '] Set Items',
    (items: T[]) => ({ items })
  );

  public setSelectedItem = createAction(
    '[' + this.featureName + '] Select Item',
    (item: T) => ({ item })
  );
}
