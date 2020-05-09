import { WebTVShowDetailed, WebSortField, WebSortOrder } from '../../models/web-media-items';

export const featureKey = 'series';

export interface SeriesState {
  currentFilter: string,
  currentSort: WebSortField,
  currentOrder: WebSortOrder,
  currentSeries: WebTVShowDetailed[],
  selectedSeries: WebTVShowDetailed,
}

export const initialState: SeriesState = {
  currentFilter: '',
  currentSort: WebSortField.Title,
  currentOrder: WebSortOrder.Asc,
  currentSeries: null,
  selectedSeries: null
};
