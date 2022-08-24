import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };
  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };
  const handleDeleteClick = () => {
    props.onCardDelete(props.card._id);
  };

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : " "
  }`;
  return (
    <li className="element__item">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className="element__delete"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__content">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__group">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <h2 className="element__counter">{props.card.likes.length}</h2>
        </div>
      </div>
    </li>
  );
}
export default Card;
