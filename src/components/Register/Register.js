import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../App/App.css';
import './Register.css';

function Register({ onRegister }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userName || !userEmail || !userPassword) {
      return;
    }
    onRegister(userName, userEmail, userPassword);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <Logo></Logo>
      <h2 className="register__title">Добро пожаловать!</h2>
      <div className="register__form">
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          type="text"
          name="register-name"
          required
          minLength="1"
          onChange={handleNameChange}
        />
        <div className="register__line line_color_grey"></div>
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          type="email"
          name="register-email"
          required
          minLength="3"
          onChange={handleEmailChange}
        />
        <div className="register__line line_color_grey"></div>
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          type="password"
          name="register-password"
          required
          minLength="3"
          onChange={handlePasswordChange}
        />
        <div className="register__line line_color_grey"></div>
        <span className="register__text-warning">Что-то пошло не так...</span>
      </div>
      <button className="register__button register__button_role_signup" type="submit">Зарегистрироваться</button>
      <div className="register__link-container">
        <p className="register__link-label">Уже зарегистрированы?</p>
        <Link to="/signin" className="menu__link register__link_role_signin">Войти</Link>
      </div>
    </form>
  );
}

export default Register;
