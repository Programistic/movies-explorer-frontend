const FilterMoviesBySearchText = (movies, searchText) => {
  const reworkedSearchText = searchText.toLowerCase().trim();
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;
  let filteredMovies;
  let lang;
  if (cyrillicPattern.test(reworkedSearchText)) {
    lang = 'Ru';
    filteredMovies = movies.filter((movie) => {
      const nameRu = movie.nameRU.toLowerCase().trim();
      return nameRu.includes(reworkedSearchText);
    });
  } else {
    lang = 'En';
    filteredMovies = movies.filter((movie) => {
      const nameEn = movie.nameEN.toLowerCase().trim();
      return nameEn.includes(reworkedSearchText);
    });
  }
  return { moviesFilteredBySearchText: filteredMovies, lang };
};

export default FilterMoviesBySearchText;
