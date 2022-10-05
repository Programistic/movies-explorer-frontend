import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ path }) {
  return (
    <>
      <SearchForm />
      <MoviesCardList isMoreCards={false} path={path} />
    </>
  );
}

export default SavedMovies;
