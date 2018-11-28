import { apiHost } from '../../config/const';

const getHeadToken = (authenticated) => {

    if (authenticated) {
        return {
            authorization: `Bearer ${window.localStorage.getItem('token')}`,
        };
    }
    return {};
};

const responseControlA = (response, resolve, reject) => {
    const status = response.status;
    if (status >= 200 && status <= 299) {
        return response.json();
    } else
    if (status === 400) {
        response.json().then(e => {
            reject(e.non_field_errors);
        });
    } else
    if (status === 404) {
        response.json().then(e => {
            // reject(e.detail);
            window.location.href = '/';
        });
    } else {
        reject(response.statusText);
    }
}

const responseControlB = (data, resolve, reject) => {
    if (data) {
        resolve(data);
    } else {
        reject(data)
    }
}

class Service {
    static findAll(endpoint) {
        return new Promise((resolve, reject, authenticated = true) => {

            fetch(`${apiHost}${endpoint}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => responseControlA(resp, resolve, reject))
                .then((data) => responseControlB(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static get(endpoint) {
        return new Promise((resolve, reject, authenticated = true) => {
            fetch(`${apiHost}${endpoint}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => responseControlA(resp, resolve, reject))
                .then((data) => responseControlB(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static post(endpoint, data, authenticated = true) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${endpoint}`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => responseControlA(resp, resolve, reject))
                .then((data) => responseControlB(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static update(endpoint, data, authenticated = true) {
        return new Promise((resolve, reject) => {

            fetch(`${apiHost}${endpoint}/${data.id}`, {
                method: 'PUT', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControlB(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static delete(endpoint, id, authenticated = true) {
        return new Promise((resolve, reject) => {

            fetch(`${apiHost}${endpoint}/${id}`, {
                method: 'DELETE', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControlB(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }
}

export default Service;