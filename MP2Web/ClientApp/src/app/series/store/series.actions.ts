import { createAction } from '@ngrx/store';
import { WebTVShowDetailed, WebSortField, WebSortOrder } from '../../models/web-media-items';

export const getSeries = createAction(
  '[Series] Get TV Series'
);

export const setSeriesFilter = createAction(
  '[Series] Set Series Filter',
  (filter: string, sort: WebSortField, order: WebSortOrder) => ({ filter, sort, order })
);

export const setSeries = createAction(
  '[Series] Set Series',
  (series: WebTVShowDetailed[]) => ({ series })
);

export const setSelectedSeries = createAction(
  '[Series] Select Series',
  (series: WebTVShowDetailed) => ({ series })
);
