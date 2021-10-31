export const BASE_URL = 'https://api.wownick.nomoredomains.work';

function checkResStatus(response) {
    if (response.ok) {
        return response.json();
    }
    else {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => {
            return checkResStatus(response);
        })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
    .then((response) => {
        return checkResStatus(response);
    })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
    .then((response) => {
        return checkResStatus(response);
    })
}
