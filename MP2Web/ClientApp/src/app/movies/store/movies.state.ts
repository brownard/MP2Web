import { WebMovieDetailed, WebSortField, WebSortOrder } from 'src/app/mp2-extended/web-media-items';

export const featureKey = 'movies';

export interface MoviesState {
  currentFilter: string,
  currentSort: WebSortField,
  currentOrder: WebSortOrder,
  currentMovies: WebMovieDetailed[],
  selectedMovie: WebMovieDetailed,
}

export const initialState: MoviesState = {
  currentFilter: '',
  currentSort: WebSortField.Title,
  currentOrder: WebSortOrder.Asc,
  currentMovies: null,
  selectedMovie: null
};
