import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  return (
    <PopupWithForm
      name="add_user"
      title="Редактировать профиль"
      buttonSubmitTitle="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          className="form__input form__input_meaning_name"
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          placeholder="Введите имя"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span className="form__input-error"></span>
      </section>
      <section className="form__section">
        <input
          className="form__input form__input_meaning_job"
          type="text"
          value={description || ""}
          minLength="2"
          maxLength="40"
          name="about"
          placeholder="Укажите профессию"
          onChange={handleChangeDescription}
          required
        />
        <span className="form__input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
