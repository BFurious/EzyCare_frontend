import { authKey } from '../constant/storageKey';

export const setUserInfo = ({ accessToken }) => {
    return setLocalStorage(authKey, accessToken)
}

export const setLocalStorage = (key, token) => {
    if (!key || typeof window === 'undefined') {
        return ''
    }
    return localStorage.setItem(key, token)
}

export const getFromLocalStorage = (key) => {
    if (!key || typeof window === 'undefined') {
        return ''
    }
    return localStorage.getItem(key)
}