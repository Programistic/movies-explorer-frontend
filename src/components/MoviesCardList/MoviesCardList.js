import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="cards-container">
      <ul className="cards">
        <Card isSaved={true} />
        <Card />
        <Card isSaved={true} />
        <Card isSaved={true} />
        <Card />
        <Card />
      </ul>
      <button className="cards__button-more" type="button" aria-label="Ещё" onClick="">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
