import { Link } from 'react-router-dom';
import accauntIcon from '../../images/accaunt.svg';
import '../App/App.css';
import './MenuSignIn.css';

function MenuSignIn() {
  return (
    <nav className="menu">
      <div className="menu__inner-container">
        <Link to="/movies" className="menu__link menu__link_role_movies">Фильмы</Link>
        <Link to="/saved-movies" className="menu__link menu__link_role_saved-movies">Сохранённые фильмы</Link>
      </div>
      <Link to="/" className="menu__link menu__link_role_accaunt">
        <p className="accaunt-text">Аккаунт</p>
        <div className="accaunt-icon__container">
          <img className="accaunt-icon" src={accauntIcon} alt="Логотип аккаунт" />
        </div>
      </Link>
    </nav>
  );
}

export default MenuSignIn;
