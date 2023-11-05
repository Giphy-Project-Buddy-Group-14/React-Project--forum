import './App.css';
import NavBar from './views/NavBar/NavBar';
import Home from './views/Home/Home';
import Forum from './views/Forum/Forum';
import About from './views/About/About';
import Footer from './views/Footer/Footer';
import Profile from './views/Profile/Profile';
import Settings from './views/Settings/Settings';
import { Route, Routes, useLocation } from 'react-router-dom';
import Signin from './components/Signin/Signin.jsx';
import Signup from './components/Signup/Signup.jsx';
import AuthLayout from './views/AuthLayout/AuthLayout.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import { useEffect, useState } from 'react';
import { getUserData } from './services/users.services.js';
import { useToast } from './components/ui/use-toast.js';
import { AuthContext } from './context/AuthContext.jsx';
import { Toaster } from './components/ui/toaster.jsx';

function App() {

  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user,
    userData: false,
  })

  if (appState.user !== user) {
    setAppState({ user });
  }


  useEffect(() => {
    if (user === null) {
      return;
    }
    (async () => {
      try {
        const result = await getUserData(user.uid)
        setAppState({
          ...appState,
          userData: Object.keys(result.val())[0]
        })
      } catch (error) {
        toast({
          title: "Error authentication",
          description: error.message,
        })
      }
    })();
  }, [])

  const location = useLocation();
  const authRoutes = ['/sign-in', '/sign-up'];
  const showNavBar = !authRoutes.includes(location.pathname);

  return (
    <>
      <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
        {showNavBar && <NavBar />}
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<Signin />} />
            <Route path='/sign-up' element={<Signup />} />
          </Route>
          <Route
            path="/forum"
            element={<Forum />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
        <Footer />
      </AuthContext.Provider>
      <Toaster />
    </>
  );
}

export default App;
