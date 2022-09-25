import '../App/App.css';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__content">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="line line_color_grey"></div>
      <div className="footer__info">
        <div className="data footer__data">
          &copy; { new Date().getFullYear() }
        </div>
        <ul className="footer__links">
          <li className="list-item">
            <a href="" className="link footer__link" target="_blank" rel="">Яндекс.Практикум</a>
          </li>
          <li className="list-item">
            <a href="" className="link footer__link" target="_blank" rel="">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
