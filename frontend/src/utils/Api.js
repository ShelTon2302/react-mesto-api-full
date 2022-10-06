class Api {
    constructor ( {baseUrl, headers} ) {
        this._UrlProfile = `${baseUrl}/users/me`;
        this._UrlAvatar = `${baseUrl}/users/me/avatar`;
        this._UrlCards = `${baseUrl}/cards`;
        this._headers = headers;
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getProfileInfo () {
        return fetch(this._UrlProfile, {
            headers: this._headers
        })
            .then(this._checkResponce)
    }

    setProfileInfo ({name, about}) {
        return fetch(this._UrlProfile, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._checkResponce)
    }

    changeAvatar (avatar) {
        return fetch(this._UrlAvatar, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._checkResponce)
    }

    getCardList () {
        return fetch(this._UrlCards, {
        headers: this._headers
        })
            .then(this._checkResponce)
    }

    addCard (Data) {
        return fetch(this._UrlCards, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: Data.name,
                link: Data.link
            })
        })
            .then(this._checkResponce)

    }

    deleteCard (cardId) {
        return fetch(`${this._UrlCards}/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponce)
    }

    changeLikeCardStatus (cardId, isLiked) {
        console.log(cardId, isLiked)
        return fetch(`${this._UrlCards}/${cardId}/Likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponce)
    }
}

const api = new Api ({
    baseUrl: 'https://api.project-mesto.nomoredomains.icu',
    headers: {
        authorization: '3bce1e7f-df73-4941-a38f-482936fa7c03',
        'Content-Type': 'application/json'
        }
    });

export default api;