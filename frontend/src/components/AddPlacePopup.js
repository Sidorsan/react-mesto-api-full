import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const titleRef = React.useRef("");
  const linkRef = React.useRef("");

  React.useEffect(() => {
    titleRef.current.value = "";
    linkRef.current.value = "";
  }, [props.onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add_card"
      title="Новое место"
      buttonSubmitTitle="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          className="form__input form__input_card_title"
          type="text"
          defaultValue=""
          placeholder="Название"
          minLength="2"
          maxLength="30"
          name="title"
          ref={titleRef}
          required
        />
        <span className="form__input-error"></span>
      </section>
      <section className="form__section">
        <input
          className="form__input form__input_card_link"
          type="url"
          defaultValue=""
          placeholder="Ссылка на картинку"
          name="link"
          ref={linkRef}
          required
        />
        <span className="form__input-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
