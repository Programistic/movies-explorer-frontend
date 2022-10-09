import { useState } from 'react';
import findIcon from '../../images/find-icon.svg';
import './SearchForm.css';
import '../App/App.css';

function SearchForm({ onSearch, searchText, checkbox }) {
  const [checkboxStatus, setCheckboxStatus] = useState(checkbox);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(event.target.querySelector('input').value, checkboxStatus);
  };

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus);
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSearch} noValidate>
        <div className="search-form__search-container">
          <img className="search-form__find-icon" src={findIcon} alt="Найти" />
          <input
            className="search-form__input"
            type="text"
            name="search"
            required
            placeholder="Фильм"
            minLength="1"
            defaultValue={searchText}
          />
          <button className="search-form__button" type="submit">Найти</button>
        </div>
        <div className="search-form__select-container">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="search-form__checkbox-label">Короткометражки</label>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
