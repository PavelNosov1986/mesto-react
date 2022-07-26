export class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  async fetchApi(url, method = 'GET', data = null) {
    return fetch(this._baseUrl + url, {
      headers: {
        'Content-Type': "application/json",
        'accept': "text/plain",
        'authorization': this._token,
      },
      method,
      body: data ? JSON.stringify(data) : null
    }).then(async response => {

      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : "";

      if (!response.ok) {
        const error = (data && data.massage) || response.status;
        return Promise.reject(error);
      }
      return data;
    });
  }

  fetchGetMe() { return this.fetchApi("users/me", "GET"); }
  fetchUpdateMe(data) { return this.fetchApi("users/me", "PATCH", data); }
  fetchUpdateAvatar(data) { return this.fetchApi("users/me/avatar", "PATCH", data); }
  fetchGetCards() { return this.fetchApi("cards", "GET"); }
  fetchPostCards(data) { return this.fetchApi("cards", "POST", data); }
  fetchDeleteCards(cardId) { return this.fetchApi(`cards/${cardId}`, "DELETE"); }
  fetchAddLikeCards(cardId) { return this.fetchApi(`cards/${cardId}/likes`, "PUT"); }
  fetchDeleteLikeCards(cardId) { return this.fetchApi(`cards/${cardId}/likes`, "DELETE"); }
}

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-52/", " a616ae4a-e48b-45d5-bb84-b54bbaa2d914");

export default api;