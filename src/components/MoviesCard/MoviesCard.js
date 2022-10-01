import './MoviesCard.css';
import '../App/App.css';
import movieImage from '../../images/img-movie-1.svg';

function MoviesCard({ isSaved }) {
  return (
    <li className="card list-item">
      <div className="card__header">
        <div className="card__inner-container">
          <h2 className="card__movie-title">33 слова о дизайне</h2>
          <p className="card__movie-duration">1ч 47м</p>
        </div>
        {
          isSaved ? (
            <button className="card__movie-selector card__movie-selector_type_saved" type="button" aria-label="Удалить из сохранённых" onClick=""></button>
          ) : (
            <button className="card__movie-selector card__movie-selector_type_unsaved" type="button" aria-label="Добавить в сохранённые" onClick=""></button>
          )
        }
      </div>
      <a href="#" className="card__movie-link" target="_blank" rel="">
        <img src={movieImage} className="card__movie-image" alt="" onClick="" />
      </a>
    </li>
  );
}

export default MoviesCard;
