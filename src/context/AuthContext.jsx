import { createContext } from 'react';

export const AuthContext = createContext({
    userIsLoggedIn: false,
    setLoggedIn: () => { },

});