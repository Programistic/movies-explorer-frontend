import findIcon from '../../images/find-icon.svg';
import './SearchForm.css';
import '../App/App.css';

function SearchForm() {
  return (
    <>
      <div className="search-form">
        <div className="search-form__search-container">
          <img className="search-form__find-icon" src={findIcon} alt="Иконка 'Найти'" />
          <form className="search-form__form">
            <input
              className="search-form__input"
              type="text"
              name="search"
              required
              placeholder="Фильм"
              minLength="1"
            />
          </form>
          <button className="search-form__button">Найти</button>
        </div>
        <div className="search-form__select-container">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="checkbox"
          />
          <label className="search-form__checkbox-label">Короткометражки</label>
        </div>
      </div>
      <div className="line line_color_grey"></div>
    </>
  );
}

export default SearchForm;
