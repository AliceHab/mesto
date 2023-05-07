class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this.checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this.checkResponse(res));
  }

  like(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this.checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '2123c628-f1b5-4ce0-be41-8740d5e266d9',
    'Content-Type': 'application/json',
  },
});

export default api;
