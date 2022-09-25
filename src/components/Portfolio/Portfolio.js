import '../App/App.css';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="" className="portfolio__link" target="_blank" rel="">
            <p className="portfolio__link-text">Статичный сайт</p>
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
        <div className="line line_color_grey"></div>
        <li className="portfolio__list-item">
          <a href="" className="portfolio__link" target="_blank" rel="">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
        <div className="line line_color_grey"></div>
        <li className="portfolio__list-item">
          <a href="" className="portfolio__link" target="_blank" rel="">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <div className="portfolio__link-arrow"></div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
