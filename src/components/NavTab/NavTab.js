import '../App/App.css';
import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className="navTab">
        <li className="list-item">
          <a href="#about" className="navTab__item">О проекте</a>
        </li>
        <li className="list-item">
          <a href="#techs" className="navTab__item">Технологии</a>
        </li>
        <li className="list-item">
          <a href="#student" className="navTab__item">Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
