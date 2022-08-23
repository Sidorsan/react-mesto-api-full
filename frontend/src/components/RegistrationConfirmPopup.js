import React from "react";

function RegistrationConfirmPopup({ data, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_register-confirm ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={data.img}
          alt={data.src}
          className="popup_register-confirm__img"
        />
        <h2 className="popup__title popup__title_register-confirm">
          {data.title}
        </h2>
      </div>
    </div>
  );
}

export default RegistrationConfirmPopup;
