import { useContext } from 'react';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import Logo from '../Logo/Logo';
import MenuSignOut from '../MenuSignOut/MenuSignOut';
import MenuSignIn from '../MenuSignIn/MenuSignIn';
import './Header.css';

function Header({ path }) {
  const isHomePage = path === '/';
  const loggedIn = useContext(LoggedInContext);
  return (
    <header className={`header ${isHomePage ? 'header_color_dark' : ''}`}>
      <Logo />
      {
        loggedIn ? <MenuSignIn path={path} /> : <MenuSignOut />
      }
    </header>
  );
}

export default Header;
