import React, { createContext, useState, useEffect, useContext } from 'react';
import { ROLE_KEY } from '../constant/storageKey';
import { getFromLocalStorage, setLocalStorage } from '../utils/local-storage';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(() => {
        // Get initial role from localStorage if available
        return getFromLocalStorage(ROLE_KEY) || "patient";
    });

    useEffect(() => {
        const storageRole = localStorage.getItem(ROLE_KEY);
        if (storageRole) setRole(storageRole);
        if (!role) {
            localStorage.removeItem(ROLE_KEY);
        }

    }, [role]);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);
