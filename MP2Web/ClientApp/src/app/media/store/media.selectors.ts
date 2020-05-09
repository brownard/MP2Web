import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MediaState } from './media.state';

export class MediaSelectors<T> {
  constructor(private featureKey: string) { }

  public selectState = createFeatureSelector<any, MediaState<T>>(this.featureKey);

  public selectCurrentFilter = createSelector(
    this.selectState,
    (state: MediaState<T>) => {
      return {
        currentFIter: state.currentFilter,
        currentSort: state.currentSort,
        currentOrder: state.currentOrder
      }
    }
  );

  public selectCurrentItems = createSelector(
    this.selectState,
    (state: MediaState<T>) => state.currentItems
  );

  public selectSelectedItem = createSelector(
    this.selectState,
    (state: MediaState<T>) => state.selectedItem
  );
}
