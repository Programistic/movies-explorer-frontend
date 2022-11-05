import { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import FilterMoviesBySearchText from '../FilterMovies/FilterMoviesBySearchText';
import FilterMoviesByDuration from '../FilterMovies/FilterMoviesByDuration';
import './Movies.css';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesFiltered: [],
      isShortMovies: false,
      checkboxStatus: true,
      isShowPreloader: false,
      isShowCardList: false,
      isShowMessage: false,
      isMoviesLoaded: false,
      searchText: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('CheckboxStatus')) {
      const checkboxStatus = localStorage.getItem('CheckboxStatus');
      this.setState({
        checkboxStatus,
      });
    }
    if (localStorage.getItem('SearchText')) {
      const searchText = localStorage.getItem('SearchText');
      this.setState({
        searchText,
      });
    }
    if (localStorage.getItem('FilteredMovies')) {
      const movies = JSON.parse(localStorage.getItem('FilteredMovies'));
      this.setState({
        movies,
        isShowCardList: true,
      });
    }
  }

  getMovies() {
    moviesApi.getMovies()
      .then((moviesArray) => {
        if (moviesArray.length) {
          setTimeout(() => (this.setState({
            isShowPreloader: false,
            isMoviesLoaded: true,
          })), 2500);
          localStorage.setItem('MoviesFromBeatfilm', JSON.stringify(moviesArray));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch = (searchText, checkboxStatus) => {
    this.setState({
      isShowPreloader: true,
    });
    if (!this.state.isMoviesLoaded) {
      this.getMovies();
    }
    const movies = JSON.parse(localStorage.getItem('MoviesFromBeatfilm'));
    const moviesFilteredBySearchText = FilterMoviesBySearchText(movies, searchText);
    this.setState({
      moviesFiltered: moviesFilteredBySearchText,
    });
    if (checkboxStatus) {
      const moviesFilteredByDuration = FilterMoviesByDuration(this.state.moviesFiltered);
      setTimeout(() => (this.setState({
        isShowPreloader: false,
        movies: moviesFilteredByDuration,
      })), 2500);
      localStorage.setItem('FilteredMovies', JSON.stringify(moviesFilteredByDuration));
    } else {
        setTimeout(() => (this.setState({
          isShowPreloader: false,
          movies: moviesFilteredBySearchText,
        })), 2500);
        localStorage.setItem('FilteredMovies', JSON.stringify(moviesFilteredBySearchText));
    }
    localStorage.setItem('CheckboxStatus', checkboxStatus);
    localStorage.setItem('SearchText', searchText);
  };

  render() {
    return (
      <>
        <SearchForm
          onSearch={this.handleSearch}
          searchText={this.state.searchText}
          checkboxStatus={this.state.checkboxStatus}
        />
        <MoviesCardList
          isMoreCards={true}
          movies={this.state.movies}
          isShowCardList={this.state.isShowCardList}
          isShowMessage={this.state.isShowMessage}
          isShowPreloader={this.state.isShowPreloader}
        />
      </>
    );
  }
}

export default Movies;
