import { useEffect, useState } from 'react';
import findIcon from '../../images/find-icon.svg';
import './SearchForm.css';
import '../App/App.css';

function SearchForm({ onSearch }) {
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const searchText = localStorage.getItem('SearchText');

  useEffect(() => {
    if (localStorage.getItem('CheckboxStatus') === 'true') {
      setCheckboxStatus(true);
    } else {
      setCheckboxStatus(false);
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(event.target.querySelector('input').value, !checkboxStatus);
    localStorage.setItem('CheckboxStatus', checkboxStatus);
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
            defaultValue={searchText}
          />
          <button className="search-form__button" type="submit">Найти</button>
        </div>
        <div className="search-form__select-container">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="checkbox"
            checked={!checkboxStatus}
            onChange={handleCheckboxChange}
          />
          <label className="search-form__checkbox-label">Короткометражки</label>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
