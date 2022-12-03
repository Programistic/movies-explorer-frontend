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
import {
  UPDATE_SUCCESS_MESSAGE,
  REQUEST_INVALID_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
} from '../../utils/constants';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      currentUser: {},
      isTooltipOpen: false,
      isSaved: false,
      isShowPreloader: false,
      isMoviesLoaded: false,
      isFirstLoad: false,
      isShowNotFoundMessage: false,
      isShowRequestErrorMessage: false,
      allMovies: [],
      searchText: '',
      checkboxStatus: false,
      lang: 'Ru',
      moviesFiltered: [],
      isShowCardList: false,
      savedMovies: [],
      savedMoviesLang: 'Ru',
      savedMoviesSearchText: '',
      savedMoviesFiltered: [],
      isShowSavedMoviesCardList: true,
      isShowNotFoundSavedMoviesMessage: false,
      isShowSavedMoviesRequestErrorMessage: false,
      isShowErrorMessage: false,
      tooltipMessage: '',
    };

    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount = () => {
    this.getCurrentUser();
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

  componentWillUnmount = () => {
    localStorage.setItem('SavedMovies', JSON.stringify(this.state.savedMovies));
  };

  handleLogin = (email, password) => {
    Auth
      .authorize(email, password)
      .then((data) => {
        if (data !== undefined && data.token) {
          localStorage.setItem('jwt', data.token);
          this.getCurrentUser();
        }
      })
      .catch((err) => {
        this.handleError(err);
      });
  };

  handleRegister = (name, email, password) => {
    Auth
      .register(name, email, password)
      .then((data) => {
        if (data !== undefined) {
          this.handleLogin(data.email, password);
        }
      })
      .catch((err) => {
        this.handleError(err);
      });
  };

  getCurrentUser = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        MainApi
          .getCurrentUser(jwt)
          .then((res) => {
            this.setState({
              loggedIn: true,
              currentUser: res.user,
            });
            this.getAllSavedMovies();
            this.props.history.push('/movies');
          })
          .catch((err) => {
            this.handleError(err);
          });
      }
    }
  };

  editCurrentUser = (email, name) => {
    MainApi
      .editCurrentUser(email, name)
      .then((res) => {
        this.setState({
          currentUser: res.user,
        });
        this.openTooltip(UPDATE_SUCCESS_MESSAGE);
      })
      .catch((err) => {
        this.handleError(err);
      });
  };

  getAllMovies = () => {
    if (this.state.loggedIn) {
      this.setState({
        isShowPreloader: true,
        isShowRequestErrorMessage: false,
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
          this.setState({
            isShowPreloader: false,
            isShowRequestErrorMessage: true,
          });
        });
    }
  };

  getAllSavedMovies = () => {
    MainApi
      .getAllSavedMovies()
      .then((savedMovies) => {
        if (savedMovies.length > 0) {
          this.setState({
            savedMovies,
            savedMoviesFiltered: savedMovies,
          });
          localStorage.setItem('SavedMovies', JSON.stringify(savedMovies));
        }
      })
      .catch((err) => {
        this.handleError(err);
      });
  };

  saveMovie = (movie) => {
    MainApi
      .saveMovie(movie)
      .then((res) => {
        if (res.movie) {
          this.setState({
            savedMoviesFiltered: [res.movie, ...this.state.savedMovies],
            savedMovies: [res.movie, ...this.state.savedMovies],
          });
        }
      })
      .catch((err) => {
        this.handleError(err);
      });
  };

  deleteSavedMovie = (movie, isInSavedMovies) => {
    const deleteMovie = isInSavedMovies ? movie : this.state.savedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.id,
    );
    MainApi
      .deleteMovie(deleteMovie._id)
      .then(() => {
        this.setState({
          savedMoviesFiltered: this.state.savedMovies.filter(
            (item) => item._id !== deleteMovie._id,
          ),
          savedMovies: this.state.savedMovies.filter(
            (item) => item._id !== deleteMovie._id,
          ),
        });
      })
      .catch((err) => {
        this.handleError(err);
      });
  };

  updateSavedMoviesCardList = () => {
    this.setState({
      isShowNotFoundSavedMoviesMessage: false,
      savedMoviesFiltered: this.state.savedMovies,
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

  searchSavedMovies = (searchText, checkboxStatus) => {
    this.setState({
      isShowNotFoundSavedMoviesMessage: false,
      savedMoviesSearchText: searchText,
    });
    if (checkboxStatus) {
      const {
        moviesFilteredBySearchText,
        lang,
      } = FilterMoviesBySearchText(this.state.savedMovies, searchText);
      this.setState({
        savedMoviesLang: lang,
      });
      const moviesFilteredByDuration = FilterMoviesByDuration(moviesFilteredBySearchText);
      if (moviesFilteredByDuration.length > 0) {
        this.setState({
          savedMoviesFiltered: moviesFilteredByDuration,
          isShowSavedMoviesCardList: true,
        });
      } else {
          this.setState({
            savedMoviesFiltered: [],
            isShowNotFoundSavedMoviesMessage: true,
          });
      }
    } else {
        const {
          moviesFilteredBySearchText,
          lang,
        } = FilterMoviesBySearchText(this.state.savedMovies, searchText);
        if (moviesFilteredBySearchText.length > 0) {
          this.setState({
            savedMoviesLang: lang,
            savedMoviesFiltered: moviesFilteredBySearchText,
            isShowSavedMoviesCardList: true,
          });
        } else {
            this.setState({
              savedMoviesFiltered: [],
              isShowNotFoundSavedMoviesMessage: true,
            });
        }
    }
  };

  handleSearchByDuration = (checkboxStatus) => {
    const searchText = localStorage.getItem('SearchText');
    if (searchText) {
      this.handleSearch(searchText, checkboxStatus);
    }
  };

  handleSearchSavedMoviesByDuration = (checkboxStatus) => {
    const searchText = this.state.savedMoviesSearchText;
    this.searchSavedMovies(searchText, checkboxStatus);
  };

  handleLogout = () => {
    this.resetState();
    this.clearLocalStorage();
    this.props.history.push('/');
  };

  resetState = () => {
    this.setState({
      allMovies: [],
      searchText: '',
      moviesFiltered: [],
      savedMovies: [],
      savedMoviesFiltered: [],
      isMoviesLoaded: false,
      isShowNotFoundMessage: false,
      isShowNotFoundSavedMoviesMessage: false,
      isShowRequestErrorMessage: false,
      isShowSavedMoviesRequestErrorMessage: false,
      currentUser: {},
      loggedIn: false,
    });
  };

  clearLocalStorage = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('MoviesFromBeatfilm');
    localStorage.removeItem('SavedMovies');
    localStorage.removeItem('FilteredMovies');
    localStorage.removeItem('SearchText');
    localStorage.removeItem('CheckboxStatus');
    localStorage.removeItem('Lang');
  };

  openTooltip = (message) => {
    this.setState({
      isTooltipOpen: true,
      tooltipMessage: message,
    });
  };

  closeTooltip = () => {
    this.setState({
      isTooltipOpen: false,
    });
  };

  handleError = (err) => {
    switch (err.status) {
      case 400:
        this.openTooltip(REQUEST_INVALID_ERROR_MESSAGE);
        break;
      case 401 || 403:
        this.openTooltip(AUTH_ERROR_MESSAGE);
        this.handleLogout();
        break;
      case 404:
        this.openTooltip(NOT_FOUND_ERROR_MESSAGE);
        break;
      case 409:
        this.openTooltip(CONFLICT_ERROR_MESSAGE);
        break;
      default:
        this.openTooltip(`${DEFAULT_ERROR_MESSAGE} ${err.status !== undefined ? err.status : ''}`);
        this.handleLogout();
        break;
    }
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
                  <Footer />
                </Route>

                <ProtectedRoute
                  path="/movies">
                  <Header path="/movies" />
                  <Movies
                    path="/movies"
                    onSearch={this.handleSearch}
                    onSearchByDuration={this.handleSearchByDuration}
                    checkboxStatus={this.state.checkboxStatus}
                    searchText={this.state.searchText}
                    moviesFiltered={this.state.moviesFiltered}
                    savedMovies={this.state.savedMovies}
                    lang={this.state.lang}
                    isShowCardList={this.state.isShowCardList}
                    isShowNotFoundMessage={this.state.isShowNotFoundMessage}
                    isShowRequestErrorMessage={this.state.isShowRequestErrorMessage}
                    isShowPreloader={this.state.isShowPreloader}
                    isSaved={this.state.isSaved}
                    onSaveMovie={this.saveMovie}
                    onDeleteMovie={this.deleteSavedMovie}
                  />
                  <Footer />
                </ProtectedRoute>

                <ProtectedRoute
                  path="/saved-movies">
                  <Header path="/saved-movies" />
                  <SavedMovies
                    path="/saved-movies"
                    onSearch={this.searchSavedMovies}
                    onSearchByDuration={this.handleSearchSavedMoviesByDuration}
                    searchText={''}
                    savedMovies={this.state.savedMoviesFiltered}
                    lang={this.state.savedMoviesLang}
                    isShowCardList={this.state.isShowSavedMoviesCardList}
                    isShowNotFoundMessage={this.state.isShowNotFoundSavedMoviesMessage}
                    isShowRequestErrorMessage={this.state.isShowSavedMoviesRequestErrorMessage}
                    isSaved={true}
                    onDeleteMovie={this.deleteSavedMovie}
                    updateSavedMoviesCardList={this.updateSavedMoviesCardList}
                  />
                  <Footer />
                </ProtectedRoute>

                <ProtectedRoute
                  path="/profile">
                  <Header path="/profile" />
                  <Profile
                    handleLogout={this.handleLogout}
                    editCurrentUser={this.editCurrentUser}
                  />
                </ProtectedRoute>

                <Route
                  path="/signin">
                  <Login onLogin={this.handleLogin} />
                </Route>

                <Route
                  path="/signup">
                  <Register
                    onRegister={this.handleRegister}
                    isShowErrorMessage={this.state.isShowErrorMessage}
                  />
                </Route>

                <Route
                  path="*">
                  <NotFound />
                </Route>

              </Switch>

              <Tooltip
                onConfirm={this.closeTooltip}
                isOpen={this.state.isTooltipOpen}
                tooltipMessage={this.state.tooltipMessage}/>

            </LoggedInContext.Provider>

          </CurrentUserContext.Provider>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
