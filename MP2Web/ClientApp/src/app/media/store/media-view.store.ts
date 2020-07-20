import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';
import { createAction, createReducer, on, createSelector } from '@ngrx/store';
import { MediaState, Layout } from './media.state';

export class MediaViewStore<T> {

  constructor(private featureName: string, private selectState: (state: any) => MediaState<T>) { }

  initialState: MediaState<T> = new MediaState<T>();

  public setViewState = createAction(
    '[' + this.featureName + '] Set View State',
    (filter: string, sort: WebSortField, order: WebSortOrder, layout: Layout) => ({ filter, sort, order, layout })
  );

  public setSelectedItem = createAction(
    '[' + this.featureName + '] Select Item',
    (item: T) => ({ item })
  );

  public selectViewState = createSelector(
    this.selectState,
    (state: MediaState<T>) => {
      return {
        currentFilter: state.currentFilter,
        currentSort: state.currentSort,
        currentOrder: state.currentOrder,
        currentLayout: state.currentLayout
      }
    }
  );

  public selectSelectedItem = createSelector(
    this.selectState,
    (state: MediaState<T>) => state.selectedItem
  );

  public reducer = createReducer(
    this.initialState,
    on(this.setSelectedItem, (state, { item }) => ({ ...state, selectedItem: item })),
    on(this.setViewState, (state, { filter, sort, order, layout }) => ({ ...state, currentFilter: filter, currentSort: sort, currentOrder: order, currentLayout: layout }))
  );
}
