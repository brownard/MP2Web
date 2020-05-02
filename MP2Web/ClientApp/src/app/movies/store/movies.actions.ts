import { createAction, props } from '@ngrx/store';
import { WebMovieDetailed, WebSortField, WebSortOrder } from 'src/app/mp2-extended/web-media-items';

export const getMovies = createAction(
  '[Movies] Get Movies',
  (filter: string, sort: WebSortField, order: WebSortOrder) => ({ filter, sort, order })
);

export const setMovies = createAction(
  '[Movies] Set Movies',
  (filter: string, sort: WebSortField, order: WebSortOrder, movies: WebMovieDetailed[]) => ({ filter, sort, order, movies })
);

export const setSelectedMovie = createAction(
  '[Movies] Select Movie',
  (movie: WebMovieDetailed) => ({ movie })
);
