import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({
  path,
  onSearch,
  checkboxStatus,
  searchText,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFoundMessage,
  isShowPreloader,
  isSaved,
  onDeleteMovie,
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
        movies={savedMovies}
        lang={lang}
        isShowCardList={isShowCardList}
        isShowNotFoundMessage={isShowNotFoundMessage}
        isShowPreloader={isShowPreloader}
        isSaved={isSaved}
        onDeleteMovie={onDeleteMovie}
      />
    </>
  );
}

export default SavedMovies;
