import './Header.css';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
// import Navigation from '../Navigation/Navigation';

function Header() {
  const isHomePage = true;

  return (
    <header className={`header ${isHomePage ? 'header_color_dark' : ''}`}>
      <Logo />
      <Menu />
    </header>
  );
}

export default Header;
