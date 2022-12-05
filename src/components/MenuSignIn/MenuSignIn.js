import { Link } from 'react-router-dom';
import { useState } from 'react';
import WindowWidthMonitor from '../WindowWidthMonitor/WindowWidthMonitor';
import accauntIconBlack from '../../images/accaunt.svg';
import '../App/App.css';
import './MenuSignIn.css';

function MenuSignIn({ path }) {
  const isHomePage = path === '/';
  const isMovies = path === '/movies';
  const isSavedMovies = path === '/saved-movies';
  const isProfile = path === '/profile';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const windowWidth = WindowWidthMonitor();

  const isDesctop = (windowWidth.width > 769);

  return (
    <>
      {
        isDesctop && (
          <nav className="menu menu_place_header">
            <div className="menu__inner-container">
              <Link to="/movies" className={`menu__link menu__link_role_movies ${isMovies ? 'menu__link_active' : ''} ${isHomePage ? 'menu__link_place_homepage' : ''}`}>Фильмы</Link>
              <Link to="/saved-movies" className={`menu__link menu__link_role_saved-movies ${isSavedMovies ? 'menu__link_active' : ''} ${isHomePage ? 'menu__link_place_homepage' : ''}`}>Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className={`menu__link menu__link_role_accaunt ${isProfile ? 'menu__link_active' : ''} ${isHomePage ? 'menu__link_place_homepage' : ''}`}>
              <p className="accaunt-text">Аккаунт</p>
              <div className="accaunt-icon__container">
                <img className="accaunt-icon" src={accauntIconBlack} alt="Логотип аккаунт" />
              </div>
            </Link>
          </nav>
        )
      }
      {
        isMenuOpen ? (
          <div className="mobile-menu__underlay">
            <nav className="mobile-menu">
              <button className="mobile-menu__close-button" type="button" aria-label="Закрыть меню" onClick={handleMenuClose}></button>
              <ul className="mobile-menu__list">
                <li className="mobile-menu__item list-item">
                  <Link to="/" className="menu__link mobile-menu__link_role_homepage">Главная</Link>
                </li>
                <li className="mobile-menu__item list-item">
                  <Link to="/movies" className="menu__link mobile-menu__link_role_movies">Фильмы</Link>
                </li>
                <li className="mobile-menu__item list-item">
                  <Link to="/saved-movies" className="menu__link mobile-menu__link_role_saved-movies">Сохранённые фильмы</Link>
                </li>
                <li className="mobile-menu__item list-item">
                  <Link to="/profile" className="menu__link mobile-menu__link_role_accaunt">
                    <p className="accaunt-text">Аккаунт</p>
                    <div className="accaunt-icon__container">
                      <img className="accaunt-icon" src={accauntIconBlack} alt="Логотип аккаунт" />
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <button className={`burger-menu ${isHomePage ? 'burger-menu_place_homepage' : ''}`} type="button" aria-label="Меню" onClick={handleMenuOpen}></button>
        )
      }
    </>
  );
}

export default MenuSignIn;
