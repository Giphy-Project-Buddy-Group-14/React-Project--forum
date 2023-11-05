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
import { getUserByEmail, getUserData } from './services/users.services.js';
import { useToast } from './components/ui/use-toast.js';
import { AuthContext } from './context/AuthContext.jsx';
import { Toaster } from './components/ui/toaster.jsx';
import Welcome from './views/Forum/Welcome/Welcome';
import ForumContainer from './views/Forum/ForumContainer/ForumContainer';
import ForumRules from './views/Forum/ForumRules/ForumRules';
import BgSea from './views/Forum/BgSea/BgSea';
import WorldSea from './views/Forum/WorldSea/WorldSea';
import BgMountains from './views/Forum/BgMountains/BgMountains';
import WorldMountains from './views/Forum/WorldMountains/WorldMountains';
import BgLandmarks from './views/Forum/BgLandmarks/BgLandmarks';
import WorldLandmarks from './views/Forum/WorldLandmarks/WorldLandmarks';
import Post from './views/Forum/Post/Post';

function App() {
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user,
    userData: false,
  });

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) {
      setAppState({
        ...appState,
        userData: null,
        isLoggedIn: false,
      });
      return;
    }
    (async () => {
      try {
        const result = await getUserByEmail(user.email);
        setAppState({
          ...appState,
          userData: Object.values(result.val())[0],
          isLoggedIn: !!result,
        });
      } catch (error) {
        toast({
          title: 'Error authentication',
          description: error.message,
        });
        console.log(error);
      }
    })();
  }, [appState, user]);

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
            <Route
              path="/sign-in"
              element={<Signin />}
            />
            <Route
              path="/sign-up"
              element={<Signup />}
            />
          </Route>
          <Route
            path="/forum"
            element={<ForumContainer />}
          >
            <Route
              index
              element={<Forum />}
            />
            <Route
              path="welcome"
              element={<ForumContainer />}
            >
              <Route
                index
                element={<Welcome />}
              />
              <Route
                path=":postId"
                element={<Post />}
              />
            </Route>
            <Route
              path="forum_rules"
              element={<ForumRules />}
            />

            <Route
              path="bg_sea"
              element={<BgSea />}
            />
            <Route
              path="world_sea"
              element={<WorldSea />}
            />

            <Route
              path="bg_mountains"
              element={<BgMountains />}
            />
            <Route
              path="world_mountains"
              element={<WorldMountains />}
            />

            <Route
              path="bg_landmarks"
              element={<BgLandmarks />}
            />
            <Route
              path="world_landmarks"
              element={<WorldLandmarks />}
            />
          </Route>
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
