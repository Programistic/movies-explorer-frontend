import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../App/App.css';
import './Login.css';

function Login() {
  return (
    <section className="login">
      <Logo></Logo>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          type="email"
          name="email"
          required
          minLength="6"
        />
        <div className="login__line line_color_grey"></div>
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          type="password"
          name="password"
          required
          minLength="6"
        />
        <div className="login__line line_color_grey"></div>
      </form>
      <button className="login__button login__button_role_signin">Войти</button>
      <div className="login__link-container">
        <p className="login__link-label">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="menu__link login__link_role_signup">Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;
