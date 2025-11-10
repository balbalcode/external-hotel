import cookies from "js-cookie";
import storeAuth from '../store/modules/auth/storeAuth'

export function authHeader() {
    let token = cookies.get('token')

    if (token) {
        return {'Authorization': `Bearer ${token}`};
    } else {
        return {};
    }
}

export function authLocator(response) {
    if (response.status === 401) {
        storeAuth.actions.logout()
        return Promise.reject(response);
    } else {
        return response.data;
    }
}