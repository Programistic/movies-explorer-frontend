import './Menu.css';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu">
      <Link to="" className="menu__link menu__link_role_signup">Регистрация</Link>
      <Link to="" className="menu__link menu__link_role_signin">Войти</Link>
    </nav>
  );
}

export default Menu;
