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
import Tooltip from '../Tooltip/Tooltip';
import * as Auth from '../../utils/Auth';
import * as MainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import withRouter from '../../utils/WithRouter';
import FilterMoviesBySearchText from '../FilterMovies/FilterMoviesBySearchText';
import FilterMoviesByDuration from '../FilterMovies/FilterMoviesByDuration';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMovies: [],
      moviesFiltered: [],
      loggedIn: false,
      isRegister: false,
      currentUser: {},
      isTooltipOpen: false,
      isSaved: false,
      isShowPreloader: false,
      isMoviesLoaded: false,
      isShowNotFoundMessage: false,
      isShowCardList: false,
      savedMovie: [],
      searchText: '',
      checkboxStatus: false,
      lang: 'Ru',
      isFirstLoad: false,
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
    if (localStorage.getItem('CheckboxStatus') !== null) {
      if (localStorage.getItem('CheckboxStatus') === 'true') {
        this.setState({
          checkboxStatus: true,
        });
      } else {
        this.setState({
          checkboxStatus: false,
        });
      }
    }
    if (localStorage.getItem('SearchText')) {
      this.setState({
        searchText: localStorage.getItem('SearchText'),
      });
    }
    if (localStorage.getItem('FilteredMovies')) {
      this.setState({
        moviesFiltered: JSON.parse(localStorage.getItem('FilteredMovies')),
        isShowCardList: true,
      });
    }
    if (localStorage.getItem('Lang')) {
      this.setState({
        lang: localStorage.getItem('Lang'),
      });
    }
  };

  componentDidUpdate = () => {
    if (this.state.isFirstLoad) {
      this.searchMovies(this.state.searchText, this.state.checkboxStatus);
      this.setState({ isFirstLoad: false });
    }
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

  getAllMovies = () => {
    this.setState({
      isShowPreloader: true,
    });
    moviesApi
      .getMovies()
      .then((allMovies) => {
        if (allMovies.length > 0) {
          this.setState({
            isShowPreloader: false,
            isMoviesLoaded: true,
            allMovies,
            isFirstLoad: true,
          });
          localStorage.setItem('MoviesFromBeatfilm', JSON.stringify(allMovies));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editCurrentUser = (email, name) => {
    MainApi
      .editCurrentUser(email, name)
      .then((res) => {
        if (res) {
          this.setState({
            currentUser: res.user,
            isTooltipOpen: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveMovie = (movie) => {
    MainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        console.log(savedMovie);
        if (savedMovie) {
          this.setState({
            savedMovie,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSearch = (searchText, checkboxStatus) => {
    this.setState({
      searchText,
      checkboxStatus,
    });
    if (this.state.isMoviesLoaded === false) {
      this.getAllMovies();
    } else {
      this.searchMovies(searchText, checkboxStatus);
    }
  };

  searchMovies = (searchText, checkboxStatus) => {
    this.setState({
      isShowNotFoundMessage: false,
    });
    if (checkboxStatus) {
      const {
        moviesFilteredBySearchText,
        lang,
      } = FilterMoviesBySearchText(this.state.allMovies, searchText);
      this.setState({
        lang,
        checkboxStatus: true,
      });
      const moviesFilteredByDuration = FilterMoviesByDuration(moviesFilteredBySearchText);
      if (moviesFilteredByDuration.length > 0) {
        this.setState({
          moviesFiltered: moviesFilteredByDuration,
          isShowCardList: true,
        });
        localStorage.setItem('FilteredMovies', JSON.stringify(moviesFilteredByDuration));
        localStorage.setItem('SearchText', searchText);
        localStorage.setItem('Lang', lang);
      } else {
          this.setState({
            moviesFiltered: [],
            isShowNotFoundMessage: true,
          });
      }
    } else {
        const {
          moviesFilteredBySearchText,
          lang,
        } = FilterMoviesBySearchText(this.state.allMovies, searchText);
        if (moviesFilteredBySearchText.length > 0) {
          this.setState({
            lang,
            moviesFiltered: moviesFilteredBySearchText,
            isShowCardList: true,
          });
          localStorage.setItem('FilteredMovies', JSON.stringify(moviesFilteredBySearchText));
          localStorage.setItem('SearchText', searchText);
          localStorage.setItem('Lang', lang);
        } else {
            this.setState({
              moviesFiltered: [],
              isShowNotFoundMessage: true,
            });
        }
    }
  };

  resetLoggedIn = () => {
    this.setState({
      loggedIn: false,
    });
  };

  closeTooltip = () => {
    this.setState({
      isTooltipOpen: false,
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
                <Movies
                  onSearch={this.handleSearch}
                  checkboxStatus={this.state.checkboxStatus}
                  searchText={this.state.searchText}
                  moviesFiltered={this.state.moviesFiltered}
                  lang={this.state.lang}
                  isShowCardList={this.state.isShowCardList}
                  isShowNotFoundMessage={this.state.isShowNotFoundMessage}
                  isShowPreloader={this.state.isShowPreloader}
                  isSaved={this.state.isSaved}
                  onSaveMovie={this.saveMovie}
                />
              </ProtectedRoute>

              <ProtectedRoute
                path="/saved-movies">
                <Header path="/saved-movies" />
                <SavedMovies savedMovie={this.state.savedMovie}/>
              </ProtectedRoute>

              <ProtectedRoute
                path="/profile">
                <Header path="/profile" />
                <Profile
                  resetLoggedIn={this.resetLoggedIn}
                  editCurrentUser={this.editCurrentUser}
                />
              </ProtectedRoute>

              <Route
                path="/signin">
                <Login onLogin={this.handleLogin} />
              </Route>

              <Route
                path="/signup">
                <Register onRegister={this.handleRegister} />
              </Route>

              <Route
                path="/notfound">
                <NotFound />
              </Route>

            </Switch>

            <Tooltip onConfirm={this.closeTooltip} isOpen={this.state.isTooltipOpen} />

            <Footer />
          </LoggedInContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
