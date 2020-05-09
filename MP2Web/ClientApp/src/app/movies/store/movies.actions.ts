import { createAction } from '@ngrx/store';
import { WebMovieDetailed, WebSortField, WebSortOrder } from '../../models/web-media-items';

export const getMovies = createAction(
  '[Movies] Get Movies'
);

export const setMoviesFilter = createAction(
  '[Movies] Set Movies Filter',
  (filter: string, sort: WebSortField, order: WebSortOrder) => ({ filter, sort, order })
);

export const setMovies = createAction(
  '[Movies] Set Movies',
  (movies: WebMovieDetailed[]) => ({ movies })
);

export const setSelectedMovie = createAction(
  '[Movies] Select Movie',
  (movie: WebMovieDetailed) => ({ movie })
);
