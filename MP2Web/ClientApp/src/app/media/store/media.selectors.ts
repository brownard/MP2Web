import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MediaState } from './media.state';

export class MediaSelectors<T> {
  constructor(private featureKey: string) { }

  public selectState = createFeatureSelector<any, MediaState<T>>(this.featureKey);

  public selectCurrentViewState = createSelector(
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
}
