import '../App/App.css';
import './AboutMe.css';
import studentFoto from '../../images/student-foto.jpg';

function AboutMe() {
  return (
    <section className="profile">
      <h2 className="title">Студент</h2>
      <div className="line line_color_black"></div>
      <div className="profile__content">
        <div className="profile__column-left">
          <p className="profile__content-title">Максим</p>
          <p className="profile__content-about">Инженер, 46 лет</p>
          <p className="profile__content-text">
            Я живу в городе Тайшет Иркутской области, закончил
            электротехнический факультет Омского госуниверситета путей сообщения
            по специальности радиосвязь, работаю инженером АСУТП в крупной компании.
            Мне нравится собирать электронные самоделки, программировать микроконтроллеры
            и создавать веб-сайты. А в свободное время люблю пробежаться по лесу. После того,
            как прошёл курс по веб-разработке, активно ищу работу по новой специальности.
          </p>
          <a href="" className="link profile__link" target="_blank" rel="">Github</a>
        </div>
        <div className="profile__column-right">
        <img className="profile__foto" src={studentFoto} alt="Фотография студента" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
