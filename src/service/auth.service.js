import { AUTH_KEY, ROLE_KEY } from '../constant/storageKey';
import { decodeToken } from '../utils/jwt';
import { getFromLocalStorage, setLocalStorage } from '../utils/local-storage';
import { useRole } from './RoleCheck';

export const SetUserInfo = ({ accessToken, role }) => {
    // let { setRole } = useRole();
    // setRole(role);
    setLocalStorage(AUTH_KEY, accessToken);
    setLocalStorage(ROLE_KEY, role);
    return ;
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
export const loggedOut = () => {
    localStorage.removeItem(ROLE_KEY)   
    return localStorage.removeItem(AUTH_KEY)
}