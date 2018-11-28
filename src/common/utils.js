export const getProfiles = () => {
    const profile = window.localStorage.getItem('profile');
    if (profile) {
        return JSON.parse(profile).profiles;
    }
    if (window.location.href !== '/')
        window.location.href = '/';
    return null;
};

export const getUser = () => {
    const profile = window.localStorage.getItem('profile');
    if (profile) {
        return JSON.parse(profile);
    }
    return null;
};


export const parseJwt = (token) => {
    if (!token) return false;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export const profileList = {
};

export const fechaFormateada = (date) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dia = date.getDate()
    const m = date.getMonth();
    // const mes = (m + 1) < 10 ? `0${m}` : m ;
    const mesFormateado = meses[m];
    const anio = date.getFullYear()
    // return `${dia}/${mes}/${anio}`;
    return `${dia} de ${mesFormateado} de ${anio}`;
};

export const isFunction = fn => fn && typeof fn === 'function';

export const setToken = token => window.localStorage.setItem('token', token);
export const getToken = () => parseJwt(window.localStorage.getItem('token'));

export const saveTokenAndReturn = (token) => {
    setToken(token);
    return getToken();
};

export const storageEmail = () => {
    const data = getToken();
    if (data) {
        return data.email;
    }
    return '';
};

export const createRange = n => Array.from(Array(n).keys());


export const objectToQuerystring = params => Object.keys(params).map(key => key + '=' + params[key]).join('&');