import '../App/App.css';
import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className="navTab">
        <li className="list-item">
          <a href="#" className="navTab__item">О проекте</a>
        </li>
        <li className="list-item">
          <a href="#" className="navTab__item">Технологии</a>
        </li>
        <li className="list-item">
          <a href="#" className="navTab__item">Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
