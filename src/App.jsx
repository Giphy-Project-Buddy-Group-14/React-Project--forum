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
import { auth, db } from './config/firebase-config.js';
import { useEffect, useState } from 'react';
import { getUserByEmail } from './services/users.services.js';
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
import AuthenticatedRoute from './hoc/AuthenticatedRoute.jsx';
import _ from 'lodash';
import { onValue, ref } from 'firebase/database';
import SuccessEmailChange from './views/SuccessEmailChange/SuccessEmailChange.jsx';

function App() {
  const { toast } = useToast();
  const [user, loading] = useAuthState(auth);
  const [appState, setAppState] = useState({
    userData: {},
    isLoggedIn: undefined,
    user,
  });

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null && !loading) {
      setAppState({
        ...appState,
        userData: {},
        isLoggedIn: false,
      });
      return;
    }
    !loading && (async () => {
      try {
        const result = await getUserByEmail(user.email);
        setAppState((prev) => ({
          ...prev,
          userData: Object.values(result.val())[0],
          isLoggedIn: !!result,
        }));
      } catch (error) {
        toast({
          title: 'Error authentication',
          description: error.message,
        });
        console.log(error);
      }
    })();
  }, [user, loading, appState.userData?.profilePictureURL]);

  useEffect(() => {
    if (appState.userData && user) {
      const userRef = ref(db, `users/${appState.userData.username}`);
  
      const userListener = onValue(userRef, (snapshot) => {
        setAppState((prev) => ({...prev, userData: snapshot.val()}))
      });
      return () => {
        userListener();
      };
    }
  }, [appState.userData?.profilePictureURL]);

  const location = useLocation();
  const authRoutes = ['/sign-in', '/sign-up'];
  const showNavBar = !authRoutes.includes(location.pathname);

  return (
    <div className='flex flex-col min-h-screen'>
      {((!loading && user && !_.isEmpty(appState.userData)) || (!loading && !user)) && (<AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
        {showNavBar && <NavBar />}
        <div className='flex-1'>
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
              path="/about"
              element={<About />}
            />
            <Route
            path="/success-email-change"
            element={<SuccessEmailChange />}
          />
            <Route
              path="/forum"
              element={<AuthenticatedRoute><ForumContainer /></AuthenticatedRoute>}
            >
              <Route
                index
                element={<AuthenticatedRoute><Forum /></AuthenticatedRoute>}
              />
              <Route
                path=":categoryId"
                element={<AuthenticatedRoute><ForumContainer /></AuthenticatedRoute>}
              >
                <Route
                  index
                  element={<AuthenticatedRoute><SubCategory /></AuthenticatedRoute>}
                />

                <Route path="posts">
                  <Route
                    path=":postId"
                    element={<AuthenticatedRoute><ForumContainer /></AuthenticatedRoute>}
                  >
                    <Route
                      index
                      element={<AuthenticatedRoute><Post /></AuthenticatedRoute>}
                    />
                    <Route
                      path="edit"
                      element={<AuthenticatedRoute><EditPost /></AuthenticatedRoute>}
                    />
                  </Route>
                  <Route
                    path="new"
                    element={<AuthenticatedRoute><NewPost /></AuthenticatedRoute>}
                  />
                </Route>
              </Route>
            </Route>
            <Route
              path="/profile"
              element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>}
            />
            <Route
              path="/settings"
              element={<AuthenticatedRoute><AccountSettings /></AuthenticatedRoute>}
            />
            <Route
              path="/manage-users"
              element={<AuthenticatedRoute><ManageUsers /></AuthenticatedRoute>}
            />
          </Routes>
        </div>
        <Footer />
      </AuthContext.Provider>)}
      <Toaster />
    </div>
  );
}

export default App;
