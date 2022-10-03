import { useState } from 'react';
import findIcon from '../../images/find-icon.svg';
import Preloader from '../Preloader/Preloader';
import './SearchForm.css';
import '../App/App.css';

function SearchForm() {
  const [isPreloaderStart, setIsPreloaderStart] = useState(false);

  const handleSearch = () => {
    setIsPreloaderStart(true);
  };

  return (
    <>
      <form className="search-form">
        <div className="search-form__search-container">
          <img className="search-form__find-icon" src={findIcon} alt="Найти" />
          <input
            className="search-form__input"
            type="text"
            name="search"
            required
            placeholder="Фильм"
            minLength="1"
          />
          <button className="search-form__button" onClick={handleSearch}>Найти</button>
        </div>
        <div className="search-form__select-container">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="checkbox"
          />
          <label className="search-form__checkbox-label">Короткометражки</label>
        </div>
      </form>
      {
        isPreloaderStart && <Preloader />
      }
    </>
  );
}

export default SearchForm;
