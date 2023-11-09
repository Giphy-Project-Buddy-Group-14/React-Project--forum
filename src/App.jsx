import './App.css';
import NavBar from './views/NavBar/NavBar';
import Home from './views/Home/Home';
import Forum from './views/Forum/Forum';
import About from './views/About/About';
import Footer from './views/Footer/Footer';
import Profile from './views/Profile/Profile';
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
import ForumContainer from './views/Forum/ForumContainer/ForumContainer';
import Post from './views/Forum/Post/Post';
import SubCategory from './components/SubCategory/SubCategory';
import NewPost from './views/Forum/Post/NewPost/NewPost';
import AccountSettings from './components/AccountSettings/AccountSettings.jsx';
import ManageUsers from './components/ManageUsers/ManageUsers.jsx';
import EditPost from './views/EditPost/EditPost';
function App() {
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user,
    userData: {},
    isLoggedIn: false,
  });

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) {
      setAppState({
        ...appState,
        userData: {},
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
  }, [user]);

  const location = useLocation();
  const authRoutes = ['/sign-in', '/sign-up'];
  const showNavBar = !authRoutes.includes(location.pathname);

  return (
    <>
      <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
        {showNavBar && <NavBar />}
        <Routes>
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
            exact
            path="/"
            element={<Home />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/forum"
            element={<ForumContainer />}
          >
            <Route
              index
              element={<Forum />}
            />
            <Route
              path=":categoryId"
              element={<ForumContainer />}
            >
              <Route
                index
                element={<SubCategory />}
              />

              <Route path="posts">
                <Route
                  path=":postId"
                  element={<ForumContainer />}
                >
                  <Route
                    index
                    element={<Post />}
                  />
                  <Route
                    path="edit"
                    element={<EditPost />}
                  />
                </Route>
                <Route
                  path="new"
                  element={<NewPost />}
                />
              </Route>
            </Route>
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
            element={<AccountSettings />}
          />
          <Route
            path="/manage-users"
            element={<ManageUsers />}
          />
        </Routes>

        <Footer />
      </AuthContext.Provider>
      <Toaster />
    </>
  );
}

export default App;
