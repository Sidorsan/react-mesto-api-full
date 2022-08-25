class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
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
    return fetch(`https://${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkJson(res));

  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }).then((res) => this._checkJson(res));
    } else {
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
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkJson(res));
  }

  disLikeCard(id) {
    return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkJson(res));
  }

  setAvatar(data) {
    return fetch(`https://${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
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
  baseUrl: "api.sidorsan.nomoredomains.sbs",
});
export default api;
