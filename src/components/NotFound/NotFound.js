import { Link, useHistory } from 'react-router-dom';
import '../App/App.css';
import './NotFound.css';

function NotFound() {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className="not-found-error">
      <h2 className="not-found-error__title">404</h2>
      <p className="not-found-error__text">Страница не найдена</p>
      <button className="not-found-error__button" onClick={handleClick}>Назад</button>
    </div>
  );
}

export default NotFound;
