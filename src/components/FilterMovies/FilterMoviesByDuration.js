import { SHORT_MOVIE_DURATION } from '../../utils/constants';

const FilterMoviesByDuration = (movies) => movies.filter(
  (movie) => movie.duration < SHORT_MOVIE_DURATION,
);

export default FilterMoviesByDuration;
