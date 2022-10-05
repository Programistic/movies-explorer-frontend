import '../App/App.css';
import './AboutMe.css';
import studentFoto from '../../images/student-foto.jpg';

function AboutMe() {
  return (
    <section id="student" className="about-me">
      <h2 className="title">Студент</h2>
      <div className="line line_color_black"></div>
      <div className="about-me__content">
        <div className="about-me__column-left">
          <p className="about-me__name">Максим</p>
          <p className="about-me__info">Начинающий фронтенд-разработчик, 46 лет</p>
          <p className="about-me__text">
            Я живу в городе Тайшет Иркутской области, закончил
            электротехнический факультет Омского госуниверситета путей сообщения
            по специальности автоматика и телемеханика, работаю инженером АСУТП в крупной компании.
            Мне нравится собирать электронные самоделки, программировать микроконтроллеры
            и создавать веб-сайты. В свободное время люблю пробежаться по лесу. После того,
            как прошёл курс по веб-разработке, активно ищу работу по новой специальности.
          </p>
          <a href="https://github.com/Programistic" className="link about-me__link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <div className="about-me__column-right">
        <img className="about-me__foto" src={studentFoto} alt="Фотография студента" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
