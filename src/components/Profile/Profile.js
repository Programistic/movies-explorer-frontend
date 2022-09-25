import '../App/App.css';
import './Profile.css';
import studentFoto from '../../images/student-foto.svg';

function Profile() {
  return (
    <section className="profile">
      <h2 className="title">Студент</h2>
      <div className="line line_color_black"></div>
      <div className="profile__content">
        <div className="profile__column-left">
          <p className="profile__content-title">Максим</p>
          <p className="profile__content-about">Фронтенд-разработчик, 46 лет</p>
          <p className="profile__content-text">
            Я родился и живу в городе Тайшет Иркутской области, закончил
            электротехнический факультет ОМГуПС по специальности радиосвязь.
            У меня есть жена и сын. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href="" className="profile__link" target="_blank" rel="">Github</a>
        </div>
        <div className="profile__column-right">
        <img className="profile__foto" src={studentFoto} alt="Фотография студента" />
        </div>
      </div>
    </section>
  );
}

export default Profile;
