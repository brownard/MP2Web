import { createReducer, on } from '@ngrx/store';
import { MediaActions } from './media.actions';
import { MediaState } from './media.state';

export class MediaReducer<T> {
  constructor(private initialState: MediaState<T>, private actions: MediaActions<T>) { }

  public mediaReducer = createReducer(
    this.initialState,
    on(this.actions.setSelectedItem, (state, { item }) => ({ ...state, selectedItem: item })),
    // If the item filters are updated, set currentItems to null so they are reloaded the next time they are requested
    on(this.actions.setItemsFilter, (state, { filter, sort, order }) => ({ ...state, currentFilter: filter, currentSort: sort, currentOrder: order, currentItems: null })),
    on(this.actions.setItems, (state, { items }) => ({ ...state, currentItems: items }))
  );
}
