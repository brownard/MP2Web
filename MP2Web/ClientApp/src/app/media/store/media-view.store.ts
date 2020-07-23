import { createAction, createReducer, createSelector, on } from '@ngrx/store';

import { MediaState, ViewState } from './media.state';

export class MediaViewStore<T> {

  constructor(private featureName: string, private selectState: (state: any) => MediaState<T>) { }

  initialState: MediaState<T> = new MediaState<T>();

  // Actions
  public setViewState = createAction(
    '[' + this.featureName + '] Set View State',
    ({ filter, sort, order, layout }: ViewState) => ({ filter, sort, order, layout })
  );

  public setSelectedItem = createAction(
    '[' + this.featureName + '] Select Item',
    (item: T) => ({ item })
  );

  // Selectors
  public selectViewState = createSelector(
    this.selectState,
    ({ filter, sort, order, layout }: MediaState<T>) => ({ filter, sort, order, layout })
  );

  public selectSelectedItem = createSelector(
    this.selectState,
    (state: MediaState<T>) => state.selectedItem
  );

  // Reducer
  public reducer = createReducer(
    this.initialState,
    on(this.setSelectedItem, (state, { item }) => ({ ...state, selectedItem: item })),
    on(this.setViewState, (state, { filter, sort, order, layout }) => ({ ...state, filter, sort, order, layout }))
  );
}
