import React from "react";
function PopupWithForm({name, isOpen, onClose, title, onSubmit, children, buttonSubmitTitle }) {
  return (
    <div
      className={`popup popup_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          className={`form form_${name}`}
          name={`form_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className="popup__submit-button"
            type="submit"
            value={buttonSubmitTitle}
          >
            {buttonSubmitTitle}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
