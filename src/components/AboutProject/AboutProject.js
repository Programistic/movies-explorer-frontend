import '../App/App.css';
import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about" className="about">
      <h2 className="title">О проекте</h2>
      <div className="line line_color_black"></div>
      <div className="about__content">
        <div className="about__column-left">
          <p className="about__content-title">Дипломный проект включал 5 этапов</p>
          <p className="about__content-text">
            Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и
            финальные доработки.
          </p>
        </div>
        <div className="about__column-right">
          <p className="about__content-title">На выполнение диплома ушло 5 недель</p>
          <p className="about__content-text">
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
