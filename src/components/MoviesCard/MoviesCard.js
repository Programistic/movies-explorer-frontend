import { useContext } from 'react';
import { API_URL } from '../../utils/constants';
import TimeConversion from '../TimeConversion/TimeConversion';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import '../App/App.css';
import './MoviesCard.css';

function MoviesCard({
  path,
  isSaved,
  movie,
  lang,
  onSaveMovie,
}) {
  const currentUser = useContext(CurrentUserContext);
  const movieImage = `${API_URL}${movie.image.url}`;
  const duration = TimeConversion(movie.duration);
  const isInSavedMovies = path === '/saved-movies';
  const movieName = lang === 'Ru' ? movie.nameRU : movie.nameEN;

  const handleSaveMovie = () => {
    onSaveMovie(movie);
  };

  return (
    <li className="card list-item">
      <div className="card__header">
        <div className="card__inner-container">
          <h2 className="card__movie-title">{movieName}</h2>
          <p className="card__movie-duration">{duration}</p>
        </div>
        {
          (isSaved ? (
            <button className={`card__movie-selector ${isInSavedMovies ? 'card__movie-selector_type_delete' : 'card__movie-selector_type_saved'}`} type="button" aria-label="Удалить из сохранённых"></button>
          ) : (
            <button className="card__movie-selector card__movie-selector_type_unsaved" type="button" aria-label="Добавить в сохранённые" onClick={handleSaveMovie}></button>
          ))
        }
      </div>
      <a href={movie.trailerLink || '#'} className="card__movie-link" target="_blank" rel="noreferrer">
        <img src={movieImage} className="card__movie-image" alt={movieName || 'Изображение не загружено'} />
      </a>
    </li>
  );
}

export default MoviesCard;
