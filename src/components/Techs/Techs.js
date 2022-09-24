import '../App/App.css';
import './Techs.css';

function Techs() {
  return (
    <section className="inner-container inner-container_color_grey">
      <h2 className="subtitle">Технологии</h2>
      <div className="line line_color_black"></div>
      <div className="techs-content">
        <p className="techs-content__header">7 технологий</p>
        <p className="techs-content__text">
          На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.
        </p>
      </div>
      <div className="technologies">
        <div className="technologies__item">HTML</div>
        <div className="technologies__item">CSS</div>
        <div className="technologies__item">JS</div>
        <div className="technologies__item">React</div>
        <div className="technologies__item">Git</div>
        <div className="technologies__item">Express.js</div>
        <div className="technologies__item">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;
