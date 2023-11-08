import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setLoggedIn: () => { },

});



// const AuthContext = createContext(null);

// export default function AuthProvider({children}) {
//     const [user, setUser] = useState(null);

//     const login = (user) => {
//         setUser(user)
//     };

//     const logout = () => {
//         setUser(null)
//     };

//     return (
//         <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
//     )
// }

// export const useAuth = () => {
//     return useContext(AuthContext)
// }