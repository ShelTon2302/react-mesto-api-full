class Api {
    constructor ( {baseUrl, headers} ) {
        this._UrlProfile = `${baseUrl}/users/me`;
        this._UrlAvatar = `${baseUrl}/users/me/avatar`;
        this._UrlCards = `${baseUrl}/cards`;
        this._headers = headers;
    }

    _checkResponce(res) {
        try {
            if (res.status === 200){
                return res.json();
            }
        } 
        catch(e) {
            return (e)
        }
    }

    getProfileInfo () {
        return fetch(this._UrlProfile, {
            mode: 'cors',
            headers: this._headers,
            credentials: 'include'
        })
            .then(this._checkResponce)
    }

    setProfileInfo ({name, about}) {
        return fetch(this._UrlProfile, {
            method: 'PATCH',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            }),
            credentials: 'include'
        })
            .then(this._checkResponce)
    }

    changeAvatar (avatar) {
        return fetch(this._UrlAvatar, {
            method: 'PATCH',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            }),
            credentials: 'include'
        })
            .then(this._checkResponce)
    }

    getCardList () {
        return fetch(this._UrlCards, {
        headers: this._headers,
        mode: 'cors',
        credentials: 'include'
        })
            .then(this._checkResponce)
    }

    addCard (Data) {
        return fetch(this._UrlCards, {
            method: 'POST',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({
                name: Data.name,
                link: Data.link
            }),
            credentials: 'include'
        })
            .then(this._checkResponce)

    }

    deleteCard (cardId) {
        return fetch(`${this._UrlCards}/${cardId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: this._headers,
            credentials: 'include'
        })
            .then(this._checkResponce)
    }

    changeLikeCardStatus (cardId, isLiked) {
        return fetch(`${this._UrlCards}/${cardId}/Likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            mode: 'cors',
            headers: this._headers,
            credentials: 'include'
        })
            .then(this._checkResponce)
    }
}

const api = new Api ({
    baseUrl: 'https://api.project-mesto.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
        }
    });

export default api;