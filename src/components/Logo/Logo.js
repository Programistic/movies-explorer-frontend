import { Link } from 'react-router-dom';
import logo from '../../images/logo-header.svg';
import './Logo.css';

function Logo() {
  return (
    <Link to="/" className="logo__link">
      <img className="logo__image" src={logo} alt="Логотип сайта" />
    </Link>
  );
}

export default Logo;
