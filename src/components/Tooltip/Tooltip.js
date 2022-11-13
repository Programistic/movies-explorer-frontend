import {
  UPDATE_SUCCESS_MESSAGE,
} from '../../utils/constants';
import './Tooltip.css';

function Tooltip({
  isOpen,
  onConfirm,
}) {
  const popupOpened = isOpen ? 'popup_opened' : '';
  const buttonName = 'success';

  return (
    <div className={`popup popup_role_tooltip ${popupOpened}`}>
      <div className="popup__container">
        <button className={`button popup__button-${buttonName}`} onClick={onConfirm}></button>
        <h2 className="popup__message">{UPDATE_SUCCESS_MESSAGE}</h2>
      </div>
      <button className="button popup__button-close" type="button" aria-label="Закрыть" onClick={onConfirm}></button>
    </div>
  );
}

export default Tooltip;
