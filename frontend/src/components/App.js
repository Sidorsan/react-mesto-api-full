import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import RegistrationConfirmPopup from "./RegistrationConfirmPopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import union_confirm from "../images/union_confirm.svg";
import union_fail from "../images/union_fail.svg";
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isRegistrationConfirmPopupOpen, setRegistrationConfirmPopupOpen] =
    useState(false);
  const [dataRegistrationConfirmPopup, setRegistrationConfirmPopup] = useState({
    img: "",
    alt: "",
    title: "",
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then(setLoggedIn(true)).catch(handleError);
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, [loggedIn]);

  const handleError = () => {
    setRegistrationConfirmPopup({
      img: union_fail,
      alt: "Крестик в круге",
      title: "Что-то пошло не так! Попробуйте ещё раз.",
    });
    setRegistrationConfirmPopupOpen(!isRegistrationConfirmPopupOpen);
  };

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== id));
      })
      .catch(handleError);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((newCards) =>
          newCards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(handleError);
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(handleError);
  }

  function handleUpdateAvatar(avatarInfo) {
    api
      .setAvatar(avatarInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(handleError);
  }

  function handleAddPlaceSubmit(card) {
    api
      .postInitialCards(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setRegistrationConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  const handleLogin = ({ email, password }) => {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (!data) {
          return handleError;
        }
        if (data) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("userEmail", email);
          setLoggedIn(true);
        }
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (loggedIn) {
      setIsloading(true);
      api
        .getAllNeededData()
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
          setIsloading(false);
        })
        .catch(handleError);
    }
  }, [loggedIn]);

  const handleRegister = ({ password, email }) => {
    auth
      .register({ password, email })
      .then(() => {
        setRegistrationConfirmPopup({
          img: union_confirm,
          alt: "Галочка в круге",
          title: "Вы успешно зарегистрировались!",
        });
        setRegistrationConfirmPopupOpen(!isRegistrationConfirmPopupOpen);
        history.push("/signin");
      })
      .catch(handleError);
  };

  const handleLogaout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("userEmail");
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header loggedIn={loggedIn} onLogout={handleLogaout} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditAvatar={() => {
              setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
            }}
            onEditProfile={() => {
              setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
            }}
            onAddPlace={() => {
              setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
            }}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            isLoading={isLoading}
            loggedIn={loggedIn}
          />

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <RegistrationConfirmPopup
          data={dataRegistrationConfirmPopup}
          isOpen={isRegistrationConfirmPopupOpen}
          onClose={closeAllPopups}
        />

        <div className="popup popup_deleteCard">
          <form className="popup__container">
            <button className="popup__close" type="button"></button>
            <h2 className="popup__title">Вы уверены?</h2>
            <button
              className="popup__submit-button popup__submit-button-deleteCard"
              type="submit"
            >
              Да
            </button>
          </form>
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
