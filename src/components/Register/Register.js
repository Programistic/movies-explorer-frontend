import { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../App/App.css';
import './Register.css';

class Register extends Component {
  constructor({ props, onRegister }) {
    super(props);

    this.onRegister = onRegister;

    this.state = {
      name: '',
      email: '',
      password: '',
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
      formErrors: { name: '', email: '', password: '' },
      buttonState: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.onRegister(this.state.name, this.state.email, this.state.password);
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
    let { nameValid } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    const fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case 'name':
        nameValid = value.match(/([А-ЯЁа-яёa-z-\s]+)/ig);
        if (nameValid !== null) {
          fieldValidationErrors.name = nameValid[0].length === value.length ? '' : 'Имя может содержать только кирилицу, латиницу, пробел или дефис!';
        } else if (value === '') {
          fieldValidationErrors.name = '';
        } else {
          fieldValidationErrors.name = 'Имя может содержать только кирилицу, латиницу, пробел или дефис!';
        }
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailValid !== null) {
          fieldValidationErrors.email = emailValid[0].length === value.length ? '' : 'Введён некорректный email!';
        } else if (value === '') {
          fieldValidationErrors.email = '';
        } else {
          fieldValidationErrors.email = 'Введён некорректный email!';
        }
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : 'Пароль не должен быть короче шести символов!';
        if (value === '') {
          fieldValidationErrors.password = '';
        }
        break;
      default:
        break;
    }

    this.setState({
      nameValid,
      emailValid,
      passwordValid,
      formErrors: fieldValidationErrors,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid,
      buttonState: this.state.formValid ? '' : 'disabled',
    });
  }

  render() {
    return (
      <form className="register" onSubmit={this.handleSubmit}>
        <Logo></Logo>
        <h2 className="register__title">Добро пожаловать!</h2>
        <div className="register__form">
          <label className="register__label">Имя</label>
          <input
            className="register__input"
            type="text"
            name="name"
            required
            minLength="1"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <div className="register__line line_color_grey"></div>
          <span className="register__text-warning">{this.state.formErrors.name}</span>
          <label className="register__label">E-mail</label>
          <input
            className="register__input"
            type="email"
            name="email"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div className="register__line line_color_grey"></div>
          <span className="register__text-warning">{this.state.formErrors.email}</span>
          <label className="register__label">Пароль</label>
          <input
            className="register__input"
            type="password"
            name="password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="register__line line_color_grey"></div>
          <span className="register__text-warning">{this.state.formErrors.password}</span>
        </div>
        <button type="submit" className={` register__button_role_signup ${!this.state.formValid ? 'button_inactive' : 'button_active'} register__button`} disabled={!this.state.formValid}>Зарегистрироваться</button>
        <div className="register__link-container">
          <p className="register__link-label">Уже зарегистрированы?</p>
          <Link to="/signin" className="menu__link register__link_role_signin">Войти</Link>
        </div>
      </form>
    );
  }
}

export default Register;
