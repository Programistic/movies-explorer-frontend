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
      checkboxStatus: false,
      isShowPreloader: false,
      isShowCardList: false,
      isShowNotFoundMessage: false,
      isMoviesLoaded: false,
      searchText: '',
      lang: 'Ru',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('CheckboxStatus') !== undefined) {
      this.setState({
        checkboxStatus: localStorage.getItem('CheckboxStatus'),
      });
    } else {
      localStorage.setItem('CheckboxStatus', false);
      this.setState({
        checkboxStatus: false,
      });
    }
    if (localStorage.getItem('SearchText').length !== 0) {
      this.setState({
        searchText: localStorage.getItem('SearchText'),
      });
    }
    if (localStorage.getItem('FilteredMovies').length !== 0) {
      this.setState({
        moviesFiltered: JSON.parse(localStorage.getItem('FilteredMovies')),
        isShowCardList: true,
      });
    }
  }

  getMovies() {
    moviesApi.getMovies()
      .then((moviesArray) => {
        if (moviesArray.length !== 0) {
          this.setState({
            isShowPreloader: false,
            isMoviesLoaded: true,
          });
          localStorage.setItem('MoviesFromBeatfilm', JSON.stringify(moviesArray));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch = (searchText, checkboxStatus) => {
    this.setState({
      isShowNotFoundMessage: false,
      isShowPreloader: true,
    });
    if (!this.state.isMoviesLoaded) {
      this.getMovies();
    }
    const movies = JSON.parse(localStorage.getItem('MoviesFromBeatfilm'));
    if (checkboxStatus) {
      const { moviesFilteredBySearchText, lang } = FilterMoviesBySearchText(movies, searchText);
      this.setState({
        lang,
        checkboxStatus: true,
      });
      const moviesFilteredByDuration = FilterMoviesByDuration(moviesFilteredBySearchText);
      if (moviesFilteredByDuration.length !== 0) {
        this.setState({
          isShowPreloader: false,
          moviesFiltered: moviesFilteredByDuration,
        });
        localStorage.setItem('FilteredMovies', JSON.stringify(moviesFilteredByDuration));
        localStorage.setItem('SearchText', searchText);
      } else {
          this.setState({
            isShowPreloader: false,
            moviesFiltered: [],
            isShowNotFoundMessage: true,
          });
      }
    } else {
        const { moviesFilteredBySearchText, lang } = FilterMoviesBySearchText(movies, searchText);
        if (moviesFilteredBySearchText.length !== 0) {
          this.setState({
            isShowPreloader: false,
            lang,
            moviesFiltered: moviesFilteredBySearchText,
          });
          localStorage.setItem('FilteredMovies', JSON.stringify(moviesFilteredBySearchText));
          localStorage.setItem('SearchText', searchText);
        } else {
            this.setState({
              isShowPreloader: false,
              moviesFiltered: [],
              isShowNotFoundMessage: true,
            });
        }
    }
  };

  render() {
    return (
      <>
        <SearchForm
          onSearch={this.handleSearch}
        />
        <MoviesCardList
          isMoreCards={true}
          movies={this.state.moviesFiltered}
          lang={this.state.lang}
          isShowCardList={this.state.isShowCardList}
          isShowNotFoundMessage={this.state.isShowNotFoundMessage}
          isShowPreloader={this.state.isShowPreloader}
        />
      </>
    );
  }
}

export default Movies;
