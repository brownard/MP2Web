import { WebMovieDetailed } from 'src/app/mp2-extended/web-media-items';

export const featureKey = 'movies';

export interface MoviesState {
  selectedMovie: WebMovieDetailed
}

export const initialState: MoviesState = {
  selectedMovie: null
};
