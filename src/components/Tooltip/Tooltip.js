import './Tooltip.css';

function Tooltip({
  isOpen,
  onConfirm,
  tooltipMessage,
}) {
  const popupOpened = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_role_tooltip ${popupOpened}`}>
      <div className="popup__container">
        <button className="button popup__button-success" onClick={onConfirm}></button>
        <h2 className="popup__message">{tooltipMessage}</h2>
      </div>
      <button className="button popup__button-close" type="button" aria-label="Закрыть" onClick={onConfirm}></button>
    </div>
  );
}

export default Tooltip;
