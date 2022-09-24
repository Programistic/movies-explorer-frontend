import '../App/App.css';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="inner-container inner-container_color_light">
      <h2 className="subtitle">О проекте</h2>
      <div className="line line_color_black"></div>
      <div className="about-content">
        <div className="column">
          <p className="about-content__header">Дипломный проект включал 5 этапов</p>
          <p className="about-content__text">
            Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и
            финальные доработки.
          </p>
        </div>
        <div className="column column_right">
          <p className="about-content__header">На выполнение диплома ушло 5 недель</p>
          <p className="about-content__text">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="timeline">
        <div className="timeline__column-left">
          <p className="timeline__period timeline__period_color_green">1 неделя</p>
          <p className="timeline__course">Back-end</p>
        </div>
        <div className="timeline__column-right">
          <p className="timeline__period timeline__period_color_grey">4 недели</p>
          <p className="timeline__course">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
