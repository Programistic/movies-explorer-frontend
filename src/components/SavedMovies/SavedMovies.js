import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({
  path,
  onSearch,
  searchText,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFoundMessage,
  isSaved,
  onDeleteMovie,
}) {
  return (
    <>
      <SearchForm
        onSearch={onSearch}
        searchText={searchText}
      />
      <MoviesCardList
        path={path}
        movies={savedMovies}
        lang={lang}
        isShowCardList={isShowCardList}
        isShowNotFoundMessage={isShowNotFoundMessage}
        isSaved={isSaved}
        onDeleteMovie={onDeleteMovie}
      />
    </>
  );
}

export default SavedMovies;
