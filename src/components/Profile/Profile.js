import { Component } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import withRouter from '../../utils/WithRouter';
import {
  NAME_PATTERN,
  EMAIL_PATTERN,
  NAME_ERROR_MESSAGE,
  NAME_NOT_ENTERED_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  EMAIL_NOT_ENTERED_ERROR_MESSAGE,
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
      nameValid: [],
      emailValid: [],
      formValid: false,
      formErrors: { name: '', email: '' },
    };
  }

  static contextType = CurrentUserContext;

  componentDidMount() {
    this.setState({
      name: this.context.name,
      email: this.context.email,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.editCurrentUser(this.state.email, this.state.name);
    this.setState({ formValid: false });
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
          fieldValidationErrors.name = NAME_NOT_ENTERED_ERROR_MESSAGE;
        } else {
          fieldValidationErrors.name = NAME_ERROR_MESSAGE;
        }
        break;
      case 'email':
        emailValid = value.match(EMAIL_PATTERN);
        if (emailValid !== null) {
          fieldValidationErrors.email = emailValid[0].length === value.length ? '' : EMAIL_ERROR_MESSAGE;
        } else if (value === '') {
          fieldValidationErrors.email = EMAIL_NOT_ENTERED_ERROR_MESSAGE;
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
    if (this.state.name === this.context.name && this.state.email === this.context.email) {
      this.setState({ formValid: false });
    } else {
      this.setState({ formValid: this.state.formErrors.name === '' && this.state.formErrors.email === '' });
    }
  }

  handleSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('FilteredMovies');
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
          <span className="text-warning">{this.state.formErrors.name}</span>
          <div className="line line_color_grey"></div>
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
