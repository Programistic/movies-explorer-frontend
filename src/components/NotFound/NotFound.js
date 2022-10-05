import { Link } from 'react-router-dom';
import '../App/App.css';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-error">
      <h2 className="not-found-error__title">404</h2>
      <p className="not-found-error__text">Страница не найдена</p>
      <Link to="/" className="menu__link not-found-error__link">Назад</Link>
    </div>
  );
}

export default NotFound;
