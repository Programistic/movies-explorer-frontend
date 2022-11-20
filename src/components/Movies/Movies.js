import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  path,
  onSearch,
  checkboxStatus,
  searchText,
  moviesFiltered,
  lang,
  isShowCardList,
  isShowNotFoundMessage,
  isShowPreloader,
  isSaved,
  onSaveMovie,
}) {
  return (
    <>
      <SearchForm
        onSearch={onSearch}
        checkboxStatus={checkboxStatus}
        searchText={searchText}
      />
      <MoviesCardList
        path={path}
        movies={moviesFiltered}
        lang={lang}
        isShowCardList={isShowCardList}
        isShowNotFoundMessage={isShowNotFoundMessage}
        isShowPreloader={isShowPreloader}
        isSaved={isSaved}
        onSaveMovie={onSaveMovie}
      />
    </>
  );
}

export default Movies;
