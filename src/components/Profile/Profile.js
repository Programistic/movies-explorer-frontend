import { Component } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import withRouter from '../../utils/WithRouter';
import {
  NAME_PATTERN,
  EMAIL_PATTERN,
  NAME_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
} from '../../utils/constants';
import '../App/App.css';
import './Profile.css';

class Profile extends Component {
  constructor({ props, editCurrentUser, resetLoggedIn }) {
    super(props);

    this.editCurrentUser = editCurrentUser;
    this.resetLoggedIn = resetLoggedIn;

    this.state = {
      name: '',
      email: '',
      nameValid: false,
      emailValid: false,
      formValid: false,
      formErrors: { name: '', email: '' },
      buttonState: '',
    };
  }

  static contextType = CurrentUserContext;

  handleSubmit = (event) => {
    event.preventDefault();
    this.editCurrentUser(this.state.email, this.state.name);
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
    const fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case 'name':
        nameValid = value.match(NAME_PATTERN);
        if (nameValid !== null) {
          fieldValidationErrors.name = nameValid[0].length === value.length ? '' : NAME_ERROR_MESSAGE;
        } else if (value === '') {
          fieldValidationErrors.name = '';
        } else {
          fieldValidationErrors.name = NAME_ERROR_MESSAGE;
        }
        break;
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
      default:
        break;
    }

    this.setState({
      nameValid,
      emailValid,
      formErrors: fieldValidationErrors,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.emailValid,
      buttonState: this.state.formValid ? '' : 'disabled',
    });
  }

  handleSignOut = () => {
    localStorage.removeItem('jwt');
    this.resetLoggedIn();
    this.props.history.push('/');
  };

  render() {
    return (
      <form className="profile" onSubmit={this.handleSubmit}>
        <h2 className="profile__title">{`Привет, ${this.context.name}!`}</h2>
        <div className="profile__form">
          <div className="profile__container">
            <label className="profile__label">Имя</label>
            <input
              className="profile__input"
              type="text"
              name="name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="line line_color_grey"></div>
          <span className="text-warning">{this.state.formErrors.name}</span>
          <div className="profile__container">
            <label className="profile__label">E-mail</label>
            <input
              className="profile__input"
              type="email"
              name="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <span className="text-warning">{this.state.formErrors.email}</span>
        </div>
        <button type="submit" className={`profile__button_role_edit ${!this.state.formValid ? 'button_inactive' : 'profile-button_active'} profile__button`} disabled={!this.state.formValid}>Редактировать</button>
        <button onClick={this.handleSignOut} className="profile__button profile__button_role_signout">Выйти из аккаунта</button>
      </form>
    );
  }
}

export default withRouter(Profile);
