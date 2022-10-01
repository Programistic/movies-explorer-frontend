import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';

function MoviesCardList({ isMoreCards, path }) {
  const isSavedMoviesPage = path === '/saved-movies';
  return (
    <section className="cards-container">
      <ul className="cards">
        <Card isSaved={true} isInSavedMovies={isSavedMoviesPage} />
        <Card />
        <Card isSaved={true} isInSavedMovies={isSavedMoviesPage} />
        <Card isSaved={true} isInSavedMovies={isSavedMoviesPage} />
        <Card />
        <Card />
      </ul>
      { isMoreCards && <button className="cards__button-more" type="button" aria-label="Ещё" onClick="">Ещё</button> }
    </section>
  );
}

export default MoviesCardList;
