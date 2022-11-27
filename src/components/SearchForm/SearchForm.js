import { useEffect, useState } from 'react';
import findIcon from '../../images/find-icon.svg';
import './SearchForm.css';
import '../App/App.css';

function SearchForm({ onSearch, searchText }) {
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('CheckboxStatus') === 'true') {
      setCheckboxStatus(true);
    } else {
      setCheckboxStatus(false);
    }
  }, []);

  const [textWarning, setTextWarning] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (event.target.querySelector('input').value === '') {
      setTextWarning('Нужно ввести ключевое слово');
    } else {
      setTextWarning('');
      onSearch(event.target.querySelector('input').value, checkboxStatus);
      localStorage.setItem('CheckboxStatus', checkboxStatus);
    }
  };

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus);
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSearch} noValidate>
        <div className="search-form__search-container">
          <img className="search-form__find-icon" src={findIcon} alt="Найти" />
          <div className="search-form__input-container">
            <input
              className="search-form__input"
              type="text"
              name="search"
              required
              placeholder="Фильм"
              defaultValue={searchText}
            />
            <span className="text-warning">{textWarning}</span>
          </div>
          <button className="search-form__button" type="submit">Найти</button>
        </div>
        <div className="search-form__select-container">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="checkbox"
            checked={checkboxStatus}
            onChange={handleCheckboxChange}
          />
          <label className="search-form__checkbox-label">Короткометражки</label>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
