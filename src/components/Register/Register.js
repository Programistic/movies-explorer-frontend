import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../App/App.css';
import './Register.css';

function Register() {
  return (
    <section className="register">
      <Logo></Logo>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          type="text"
          name="register-name"
          required
          minLength="1"
        />
        <div className="register__line line_color_grey"></div>
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          type="email"
          name="register-email"
          required
          minLength="6"
        />
        <div className="register__line line_color_grey"></div>
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          type="password"
          name="register-password"
          required
          minLength="6"
        />
        <div className="register__line line_color_grey"></div>
        <span className="register__text-warning">Что-то пошло не так...</span>
      </form>
      <button className="register__button register__button_role_signup">Зарегистрироваться</button>
      <div className="register__link-container">
        <p className="register__link-label">Уже зарегистрированы?</p>
        <Link to="/signin" className="menu__link register__link_role_signin">Войти</Link>
      </div>
    </section>
  );
}

export default Register;
