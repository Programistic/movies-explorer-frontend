import { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import {
  EMAIL_PATTERN,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from '../../utils/constants';
import '../App/App.css';
import './Login.css';

class Login extends Component {
  constructor({ props, onLogin }) {
    super(props);

    this.onLogin = onLogin;

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      formValid: false,
      formErrors: { email: '', password: '' },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.onLogin(this.state.email, this.state.password);
  };

  handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState(
      { [name]: value },
        () => { this.validateField(name, value); },
    );
  };

  validateField(fieldName, value) {
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    const fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(EMAIL_PATTERN);
        if (emailValid !== null) {
          fieldValidationErrors.email = emailValid[0].length === value.length ? '' : EMAIL_ERROR_MESSAGE;
        } else if (value === '') {
          fieldValidationErrors.email = '';
        } else {
          fieldValidationErrors.email = EMAIL_ERROR_MESSAGE;
        }
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : PASSWORD_ERROR_MESSAGE;
        if (value === '') {
          fieldValidationErrors.password = '';
        }
        break;
      default:
        break;
    }

    this.setState({
      emailValid,
      passwordValid,
      formErrors: fieldValidationErrors,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <Logo></Logo>
        <h2 className="login__title">Рады видеть!</h2>
        <div className="login__form">
          <label className="login__label">E-mail</label>
          <input
            className="login__input"
            type="email"
            name="email"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div className="login__line line_color_grey"></div>
          <span className="text-warning">{this.state.formErrors.email}</span>
          <label className="login__label">Пароль</label>
          <input
            className="login__input"
            type="password"
            name="password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="login__line line_color_grey"></div>
          <span className="text-warning">{this.state.formErrors.password}</span>
        </div>
        <button type="submit" className={`login__button_role_signin ${!this.state.formValid ? 'button_inactive' : 'button_active'} login__button`} disabled={!this.state.formValid}>Войти</button>
        <div className="login__link-container">
          <p className="login__link-label">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="menu__link login__link_role_signup">Регистрация</Link>
        </div>
      </form>
    );
  }
}

export default Login;
