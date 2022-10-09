import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
    };
  }

  render() {
    return (
      <div className="page">
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Header path="/" loggedIn={this.state.loggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route exact path="/movies">
              <Header loggedIn={this.state.loggedIn} />
              <Movies />
              <Footer />
            </Route>
            <Route exact path="/saved-movies">
              <Header loggedIn={this.state.loggedIn} />
              <SavedMovies path="/saved-movies" />
              <Footer />
            </Route>
            <Route exact path="/profile">
              <Header loggedIn={this.state.loggedIn} />
              <Profile />
            </Route>
            <Route exact path="/signin">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Register />
            </Route>
            <Route exact path="/notfound">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
