import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  isLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__editor-photo" onClick={onEditAvatar}>
        {currentUser.avatar && (<img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />)}
          
        </div>

        <div className="profile__info">
          <div className="profile__string">
            <h1 className="profile__title" id="#">
              {currentUser.name}
            </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="element">
        <ul className="element__container">
          {isLoading ? (
            <Spinner />
          ) : (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
