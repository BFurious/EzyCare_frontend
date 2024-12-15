import React, { createContext, useState, useEffect, useContext } from 'react';
import { ROLE_KEY } from '../../constant/storageKey';
import { getFromLocalStorage, setLocalStorage } from '../../utils/local-storage';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [userRole, setRole] = useState(() => {
        // Get initial userRole from localStorage if available
        return getFromLocalStorage(ROLE_KEY) || "patient";
    });

    useEffect(() => {
        if (userRole) {
            localStorage.setItem(ROLE_KEY, userRole);
        } else {
            localStorage.removeItem(ROLE_KEY);
        }

    }, [userRole]);

    return (
        <RoleContext.Provider value={{ setRole, userRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);
