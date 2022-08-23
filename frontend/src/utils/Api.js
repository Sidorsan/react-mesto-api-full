class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
    // console.log(localStorage.getItem("jwt"));
    // console.log(options);
  }
  

  _checkJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialUser() {
   return fetch(`https://${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
    }).then((res) => this._checkJson(res));
  }

  getInitialCard() {
    // return fetch(`https://mesto.${this._baseUrl}/cards`, {
    return fetch(`https://${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  }
    }).then((res) => this._checkJson(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      // return fetch(`https://mesto.${this._baseUrl}/cards/${id}/likes`, {
      return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
      }).then((res) => this._checkJson(res));
    } else {
      // return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
      return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
      }).then((res) => this._checkJson(res));
    }
  }

  getAllNeededData() {
    return Promise.all([this.getInitialUser(), this.getInitialCard()]);
  }

  postInitialCards(data) {
    // return fetch(`https://mesto.${this._baseUrl}/cards`, {
    return fetch(`https://${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkJson(res));
  }

  setUserInfo(userInfo) {
    return fetch(`https://${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then((res) => this._checkJson(res));
  }

  deleteCard(id) {
    // return fetch(`https://mesto.${this._baseUrl}/cards/${id}`, {
    return fetch(`https://${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
    }).then((res) => this._checkJson(res));
  }

  likeCard(id) {
    return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
    // return fetch(`https://mesto.${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
     authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
    }).then((res) => this._checkJson(res));
  }

  disLikeCard(id) {
    // return fetch(`https://mesto.${this._baseUrl}/cards/${id}/likes`, {
    return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
     authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
    }).then((res) => this._checkJson(res));
  }

  setAvatar(data) {
    // return fetch(`https://mesto.${this._baseUrl}/users/me/avatar`, {
    return fetch(`https://${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers:{
     authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkJson(res));
  }
}

const api = new Api({
  // baseUrl: "nomoreparties.co/v1/cohort-40",
  baseUrl: "api.sidorsan.nomoredomains.sbs",
  // headers: {
  //   authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //   "Content-Type": "application/json",
  // },
});
export default api;
