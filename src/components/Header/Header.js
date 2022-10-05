import Logo from '../Logo/Logo';
import MenuSignOut from '../MenuSignOut/MenuSignOut';
import MenuSignIn from '../MenuSignIn/MenuSignIn';
import './Header.css';

function Header({ path, loggedIn }) {
  const isHomePage = path === '/';
  return (
    <header className={`header ${isHomePage ? 'header_color_dark' : ''}`}>
      <Logo />
      {
        loggedIn ? <MenuSignIn /> : <MenuSignOut />
      }
    </header>
  );
}

export default Header;
