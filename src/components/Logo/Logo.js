import './Logo.css';
import logo from '../../images/logo-header.svg';

function Logo() {
  return (
    <img className="logo" src={logo} alt="Логотип сайта" />
  );
}

export default Logo;
