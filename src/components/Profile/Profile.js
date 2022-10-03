import { Link } from 'react-router-dom';
import '../App/App.css';
import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Максим!</h2>
      <form className="profile__form">
        <div className="profile__container">
          <label className="profile__label">Имя</label>
          <input
            className="profile__input"
            type="text"
            name="name"
            required
            minLength="1"
          />
        </div>
        <div className="line line_color_grey"></div>
        <div className="profile__container">
          <label className="profile__label">E-mail</label>
          <input
            className="profile__input"
            type="email"
            name="email"
            required
            minLength="6"
          />
        </div>
      </form>
      <button className="profile__button profile__button_role_edit">Редактировать</button>
      <Link to="/" className="menu__link profile__link_role_signout">Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;
