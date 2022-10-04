import { Link } from 'react-router-dom';
import { useState } from 'react';
import WindowWidthMonitor from '../WindowWidthMonitor/WindowWidthMonitor';
import accauntIcon from '../../images/accaunt.svg';
import '../App/App.css';
import './MenuSignIn.css';

function MenuSignIn() {
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
          <nav className="menu">
            <div className="menu__inner-container">
              <Link to="/movies" className="menu__link menu__link_role_movies">Фильмы</Link>
              <Link to="/saved-movies" className="menu__link menu__link_role_saved-movies">Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className="menu__link menu__link_role_accaunt">
              <p className="accaunt-text">Аккаунт</p>
              <div className="accaunt-icon__container">
                <img className="accaunt-icon" src={accauntIcon} alt="Логотип аккаунт" />
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
                      <img className="accaunt-icon" src={accauntIcon} alt="Логотип аккаунт" />
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <button className="burger-menu" type="button" aria-label="Меню" onClick={handleMenuOpen}></button>
        )
      }
    </>
  );
}

export default MenuSignIn;
