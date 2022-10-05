import '../App/App.css';
import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="title">Технологии</h2>
      <div className="line line_color_black"></div>
      <div className="techs__content">
        <h3 className="techs__content-title">7 технологий</h3>
        <p className="techs__content-text">
          На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__list-item">
          HTML
        </li>
        <li className="techs__list-item">
          CSS
        </li>
        <li className="techs__list-item">
          JS
        </li>
        <li className="techs__list-item">
          React
        </li>
        <li className="techs__list-item">
          Git
        </li>
        <li className="techs__list-item">
          Express.js
        </li>
        <li className="techs__list-item">
          mongoDB
        </li>
      </ul>
    </section>
  );
}

export default Techs;
