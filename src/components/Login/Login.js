import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../App/App.css';
import './Login.css';

function Login({ onLogin }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userEmail || !userPassword) {
      return;
    }
    onLogin(userEmail, userPassword);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  return (
    <form className="login" onSubmit={handleSubmit} noValidate>
      <Logo></Logo>
      <h2 className="login__title">Рады видеть!</h2>
      <div className="login__form">
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          type="email"
          name="email"
          required
          minLength="6"
          value={userEmail || ''}
          onChange={handleEmailChange}
        />
        <div className="login__line line_color_grey"></div>
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          type="password"
          name="password"
          required
          minLength="6"
          value={userPassword || ''}
          onChange={handlePasswordChange}
        />
        <div className="login__line line_color_grey"></div>
      </div>
      <button className="login__button login__button_role_signin" type="submit">Войти</button>
      <div className="login__link-container">
        <p className="login__link-label">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="menu__link login__link_role_signup">Регистрация</Link>
      </div>
    </form>
  );
}

export default Login;
