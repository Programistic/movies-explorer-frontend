import { useEffect, useState } from 'react';
import Card from '../MoviesCard/MoviesCard';
import WindowWidthMonitor from '../WindowWidthMonitor/WindowWidthMonitor';
import Preloader from '../Preloader/Preloader';
import { NOT_FOUND_MESSAGE } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({
  path,
  movies,
  lang,
  isShowCardList,
  isShowNotFoundMessage,
  isShowPreloader,
  isSaved,
  onSaveMovie,
}) {
  const windowWidth = WindowWidthMonitor();
  const [numberCardsLoaded, setNumberCardsLoaded] = useState(3);
  const [numberCardsDisplayed, setNumberCardsDisplayed] = useState(12);

  useEffect(() => {
    if (windowWidth.width < 1280 && windowWidth.width > 769) {
      setNumberCardsDisplayed(12);
      setNumberCardsLoaded(3);
    }
    if (windowWidth.width <= 769 && windowWidth.width > 480) {
      setNumberCardsDisplayed(8);
      setNumberCardsLoaded(2);
    }
    if (windowWidth.width <= 480) {
      setNumberCardsDisplayed(5);
      setNumberCardsLoaded(2);
    }
  }, [windowWidth]);

  const isMoreCards = (numberCardsDisplayed < movies.length)
  && (numberCardsDisplayed >= 3) && (isShowCardList);
  const handleButtonMore = () => {
    setNumberCardsDisplayed(numberCardsDisplayed + numberCardsLoaded);
  };

  const moviesList = movies.map((movie) => (
    <Card
      key={movie.id}
      path={path}
      isSaved={isSaved}
      movie={movie}
      lang={lang}
      onSaveMovie={onSaveMovie}
    />
  ))
  .slice(0, numberCardsDisplayed);

  return (
    <section className="cards-container">
      { isShowNotFoundMessage && <p className="message">{NOT_FOUND_MESSAGE}</p> }
      { isShowPreloader && <Preloader /> }
      <ul className="cards">
        {isShowCardList && moviesList}
      </ul>
      { isMoreCards && <button className="cards__button-more" type="button" aria-label="Ещё" onClick={handleButtonMore}>Ещё</button> }
    </section>
  );
}

export default MoviesCardList;
