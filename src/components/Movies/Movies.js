import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  path,
  onSearch,
  searchText,
  moviesFiltered,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFoundMessage,
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
      />
      <MoviesCardList
        path={path}
        movies={moviesFiltered}
        savedMovies={savedMovies}
        lang={lang}
        isShowCardList={isShowCardList}
        isShowNotFoundMessage={isShowNotFoundMessage}
        isShowPreloader={isShowPreloader}
        isSaved={isSaved}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </>
  );
}

export default Movies;
