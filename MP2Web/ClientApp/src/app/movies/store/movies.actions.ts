import { createAction, props } from '@ngrx/store';
import { WebMovieDetailed } from 'src/app/mp2-extended/web-media-items';

export const setSelectedMovie = createAction(
  '[Movies] Select Movie',
  (movie: WebMovieDetailed) => ({ movie })
);
