import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  path,
  onSearch,
  onSearchByDuration,
  searchText,
  moviesFiltered,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFoundMessage,
  isShowRequestErrorMessage,
  isShowPreloader,
  isSaved,
  onSaveMovie,
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
        movies={moviesFiltered}
        savedMovies={savedMovies}
        lang={lang}
        isShowCardList={isShowCardList}
        isShowNotFoundMessage={isShowNotFoundMessage}
        isShowRequestErrorMessage={isShowRequestErrorMessage}
        isShowPreloader={isShowPreloader}
        isSaved={isSaved}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </>
  );
}

export default Movies;
