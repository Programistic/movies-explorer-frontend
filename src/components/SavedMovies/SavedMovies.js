import { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import FilterMoviesBySearchText from '../FilterMovies/FilterMoviesBySearchText';
import FilterMoviesByDuration from '../FilterMovies/FilterMoviesByDuration';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

class SavedMovies extends Component {
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
      searchText: '',
    };
  }

  handleSearch = (searchText, checkboxStatus) => {
    this.setState({
      isShowPreloader: true,
      isShowMessage: false,
    });
    this.getMovies();
    const movies = JSON.parse(localStorage.getItem('MoviesFromBeatfilm'));
    const moviesFilteredBySearchText = FilterMoviesBySearchText(movies, searchText);
    this.setState({
      moviesFiltered: moviesFilteredBySearchText,
    });
    if (checkboxStatus) {
      const moviesFilteredByDuration = FilterMoviesByDuration(this.state.moviesFiltered);
      this.setState({
        movies: moviesFilteredByDuration,
        isShowPreloader: false,
      });
      localStorage.setItem('FilteredMovies', JSON.stringify(moviesFilteredByDuration));
    } else {
      this.setState({
        movies: moviesFilteredBySearchText,
        isShowPreloader: false,
      });
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
        />
      </>
    );
  }
}

export default SavedMovies;
