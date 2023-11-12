import { AuthContext } from '@/context/AuthContext.jsx';
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthenticatedRoute({ children }) {

    const { user, isLoggedIn } = useContext(AuthContext);
    const location = useLocation();

    if (user === null && !isLoggedIn) {
        return <Navigate to="/sign-in" path={location.pathname} ></Navigate>;
    }
    return children;
}
