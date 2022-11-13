import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import * as Auth from '../../utils/Auth';
import * as MainApi from '../../utils/MainApi';
import withRouter from '../../utils/WithRouter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isRegister: false,
      currentUser: {},
    };

    this.tokenCheck = this.tokenCheck.bind(this);
  }

  handleLogin = (email, password) => {
    Auth
      .authorize(email, password)
      .then((data) => {
        if (data !== undefined && data.token) {
          localStorage.setItem('jwt', data.token);
          this.setState({
            loggedIn: true,
          });
          this.props.history.push('./movies');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRegister = (userName, userEmail, userPassword) => {
    Auth
      .register(userName, userEmail, userPassword)
      .then(() => {
        this.props.history.push('./movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.tokenCheck();
  };

  tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        MainApi
          .getCurrentUser(jwt)
          .then((res) => {
            if (res) {
              this.setState({
                loggedIn: true,
                currentUser: res.user,
              }, () => {
                this.props.history.push('/');
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  editCurrentUser = (email, name) => {
    MainApi
      .editCurrentUser(email, name)
      .then((res) => {
        if (res) {
          this.setState({
            currentUser: res.user,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  resetLoggedIn = () => {
    this.setState({
      loggedIn: false,
    });
  };

  render() {
    return (
      <div className="page">
        <div className="container">
          <CurrentUserContext.Provider value={this.state.currentUser}>
          <LoggedInContext.Provider value={this.state.loggedIn}>

            <Switch>

              <Route
                exact path="/">
                <Header path="/" />
                <Main />
              </Route>

              <ProtectedRoute
                path="/movies">
                <Header path="/movies" />
                <Movies />
              </ProtectedRoute>

              <ProtectedRoute
                path="/saved-movies">
                <Header path="/saved-movies" />
                <SavedMovies />
              </ProtectedRoute>

              <ProtectedRoute
                path="/profile">
                <Header path="/profile" />
                <Profile resetLoggedIn={this.resetLoggedIn} editCurrentUser={this.editCurrentUser}/>
              </ProtectedRoute>

              <Route
                path="/signin">
                <Login onLogin={this.handleLogin}/>
              </Route>

              <Route
                path="/signup">
                <Register onRegister={this.handleRegister}/>
              </Route>

              <Route
                path="/notfound">
                <NotFound />
              </Route>

            </Switch>

            <Footer />
          </LoggedInContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
