import jscookie from 'js-cookie';

export const authService = {
    login,
    logout,
    forgot,
    reset,
    checkToken,
    refresh
};
import axios from 'axios'


async function checkToken(id, token) {
    let axios = window.$nuxt.$axios
    return axios.get(process.env.baseUrl + `/v1/mgmt/forgot/${id}?token=${token}`, {timeout: 25500}).then((data) => {
        return data.data
    }).catch(error => {
        return Promise.reject(error.response.data.message);
    });
}

async function login(email, password) {
    return axios.post(process.env.baseUrl + '/v1/mgmt/login', {"email": email, "password": password}, {timeout : 25500})
        .then((data) => {
            return data.data
        }).catch(error => {
            return Promise.reject(error.response);
        });
}

async function forgot(email) {
    return axios.post(process.env.baseUrl + '/v1/mgmt/forgot', {"email": email}, {timeout : 25500})
        .then((data) => {
            return data.data
        }).catch(error => {
            return Promise.reject(error.response);
        });
}

async function reset(payload) {
    let id = payload.id
    delete payload.id
    return axios.post(process.env.baseUrl + `/v1/mgmt/forgot/${id}`, payload)
        .then((data) => {
            return data.data
        }).catch(error => {
            return Promise.reject(error.response);
        });
}

async function refresh(payload) {
    return axios.post(process.env.baseUrl + `/v1/mgmt/refresh/token`, payload)
        .then((data) => {
            return data.data
        }).catch(error => {
            return Promise.reject(error.response);
        });
}

function logout() {
    jscookie.remove('token');
}