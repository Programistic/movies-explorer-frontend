const FilterMoviesBySearchText = (movies, searchText) => {
  const text = searchText.toLowerCase().trim();
  return movies.filter((movie) => {
    const nameRU = String(movie.nameRU).toLowerCase().trim();
    const nameEN = String(movie.nameEN).toLowerCase().trim();
    return (nameRU === text || nameEN === text);
  });
};

export default FilterMoviesBySearchText;
