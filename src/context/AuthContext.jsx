import { createContext } from 'react';

export const AuthContext = createContext({
    setLoggedIn: () => { },
    setUser: () => {},
    userData: {},
    user: {}
});