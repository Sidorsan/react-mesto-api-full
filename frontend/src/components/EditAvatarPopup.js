import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="editor_photo"
      title="Обновить аватар"
      buttonSubmitTitle="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          className="form__input form__input_editor_photo"
          type="url"
          defaultValue=""
          name="avatar"
          placeholder="Введите ссылку на картинку"
          ref={avatarRef}
          required
        />
        <span className="form__input-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
