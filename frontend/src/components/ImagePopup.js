function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_big_picture ${card ? "popup_opened" : ""}`}>
      <div className="popup__picture">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
          className="popup__image"
        />
        <h2 className="popup__title popup__title_big_picture">
          {card ? card.name : ""}
        </h2>
      </div>
    </div>
  );
}
export default ImagePopup;
