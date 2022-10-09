import './MoviesCard.css';
import '../App/App.css';
import { API_URL } from '../../utils/constants';
import TimeConversion from '../TimeConversion/TimeConversion';

function MoviesCard({ isSaved, isInSavedMovies, movie }) {
  const movieImage = `${API_URL}${movie.image.url}`;
  const duration = TimeConversion(movie.duration);
  return (
    <li className="card list-item">
      <div className="card__header">
        <div className="card__inner-container">
          <h2 className="card__movie-title">{movie.nameRU}</h2>
          <p className="card__movie-duration">{duration}</p>
        </div>
        {
          (isSaved ? (
            <button className={`card__movie-selector ${isInSavedMovies ? 'card__movie-selector_type_delete' : 'card__movie-selector_type_saved'}`} type="button" aria-label="Удалить из сохранённых"></button>
          ) : (
            <button className="card__movie-selector card__movie-selector_type_unsaved" type="button" aria-label="Добавить в сохранённые"></button>
          ))
        }
      </div>
      <a href={movie.trailerLink || '#'} className="card__movie-link" target="_blank" rel="noreferrer">
        <img src={movieImage} className="card__movie-image" alt={movie.nameRU || 'Изображение не загружено'} />
      </a>
    </li>
  );
}

export default MoviesCard;
