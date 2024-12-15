import { Roles } from '../constant/role';
import { AUTH_KEY, ROLE_KEY } from '../constant/storageKey';
import { decodeToken } from '../utils/jwt';
import { getFromLocalStorage, setLocalStorage } from '../utils/local-storage';

export const SetUserInfo = ({ accessToken }) => {
    return setLocalStorage(AUTH_KEY, accessToken);
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(AUTH_KEY);
    if (authToken) {
        const decodedToken = decodeToken(authToken);
        return decodedToken;
    } else {
        return null
    }
}
export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(AUTH_KEY);
    return !!authToken;
}
export const loggedOut = (setRole) => {
    setRole(Roles.PATIENT);
    return localStorage.removeItem(AUTH_KEY)
}