import { API_URL } from '../../utils/constants';
import TimeConversion from '../TimeConversion/TimeConversion';
import '../App/App.css';
import './MoviesCard.css';

function MoviesCard({
  path,
  isSaved,
  movie,
  lang,
  onSaveMovie,
  onDeleteMovie,
}) {
  const duration = TimeConversion(movie.duration);
  const isInSavedMovies = path === '/saved-movies';
  const movieName = lang === 'Ru' ? movie.nameRU : movie.nameEN;
  const movieImage = !isInSavedMovies ? `${API_URL}${movie.image.url}` : movie.image;

  const handleSaveMovie = () => {
    onSaveMovie(movie);
  };

  const handleDeleteMovie = () => {
    onDeleteMovie(movie, isInSavedMovies);
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
            <button className={`card__movie-selector ${isInSavedMovies ? 'card__movie-selector_type_delete' : 'card__movie-selector_type_saved'}`} type="button" aria-label="Удалить из сохранённых" onClick={handleDeleteMovie}></button>
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
