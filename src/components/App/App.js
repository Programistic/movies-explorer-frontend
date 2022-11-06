import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import withRouter from '../../utils/WithRouter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isRegister: false,
    };
    // this.handleLogin = this.handleLogin.bind(this);
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
        this.props.history.push('./signin');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="page">
        <div className="container">
          <Switch>

            <Route
              exact path="/">
              <Header path="/" loggedIn={this.state.loggedIn} />
              <Main />
            </Route>

            <ProtectedRoute
              path="/movies"
              loggedIn={this.state.loggedIn}>
              <Header path="/movies" loggedIn={this.state.loggedIn} />
              <Movies />
            </ProtectedRoute>

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={this.state.loggedIn}>
              <Header path="/saved-movies" loggedIn={this.state.loggedIn} />
              <SavedMovies />
            </ProtectedRoute>

            <ProtectedRoute
              path="/profile">
              <Header loggedIn={this.state.loggedIn} />
              <Profile />
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
        </div>
      </div>
    );
  }
}

export default withRouter(App);
