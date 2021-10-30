class Api {
    constructor(options) {
        this._options = options;
    }

    _checkResStatus(res) {
        if (res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getProfile() {
        return fetch(`${this._options.baseUrl}/user/me`, {
            headers: this._options.headers
        })
            .then(res => {
                return this._checkResStatus(res);
            });
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers
        })
            .then(res => {
                return this._checkResStatus(res);
            })
    }

    profileUpdate(name, description) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
            .then(res => {
                return this._checkResStatus(res);
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
            .then(res => {
                return this._checkResStatus(res);
            })
    }

    addCard(name, link) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                return this._checkResStatus(res);
            })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._options.headers
            })
                .then(res => {
                    return this._checkResStatus(res);
                })
        }
        else {
            return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._options.headers
            })
                .then(res => {
                    return this._checkResStatus(res);
                })
        }
    }

    profileAvatarUpdate(link) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(res => {
                return this._checkResStatus(res);
            })
    }
}

export default Api;