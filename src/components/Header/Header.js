import './Header.css';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
// import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className="header">
      <Logo />
      <Menu />
    </header>
  );
}

export default Header;
