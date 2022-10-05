import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList isMoreCards={true} />
    </>
  );
}

export default Movies;
