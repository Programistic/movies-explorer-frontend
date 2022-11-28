import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({
  path,
  onSearch,
  onSearchByDuration,
  searchText,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFoundMessage,
  isShowRequestErrorMessage,
  isSaved,
  onDeleteMovie,
}) {
  return (
    <>
      <SearchForm
        onSearch={onSearch}
        searchText={searchText}
        onSearchByDuration={onSearchByDuration}
      />
      <MoviesCardList
        path={path}
        movies={savedMovies}
        lang={lang}
        isShowCardList={isShowCardList}
        isShowNotFoundMessage={isShowNotFoundMessage}
        isShowRequestErrorMessage={isShowRequestErrorMessage}
        isSaved={isSaved}
        onDeleteMovie={onDeleteMovie}
      />
    </>
  );
}

export default SavedMovies;
