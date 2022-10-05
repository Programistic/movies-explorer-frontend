import { Link } from 'react-router-dom';
import '../App/App.css';
import './MenuSignOut.css';

function MenuSignOut() {
  return (
    <nav>
      <ul className="menu">
        <li className="list-item">
          <Link to="/signup" className="menu__link menu__link_role_signup">Регистрация</Link>
        </li>
        <li className="list-item">
          <Link to="/signin" className="menu__link menu__link_role_signin">Войти</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuSignOut;
