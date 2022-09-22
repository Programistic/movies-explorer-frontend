import './Promo.css';
import logo from '../../images/logo-promo.svg';

function Promo() {
  return (
    <div className="promo">
      <img className="promo__logo" src={logo} alt="Логотип 'Практикум'" />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </div>
  );
}

export default Promo;
