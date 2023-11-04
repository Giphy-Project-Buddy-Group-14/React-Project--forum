import './App.css';
import NavBar from './views/NavBar/NavBar';
import Home from './views/Home/Home';
import Forum from './views/Forum/Forum';
import About from './views/About/About';
import Login from './views/Login/LogIn';
import Footer from './views/Footer/Footer';
import Profile from './views/Profile/Profile';
import Settings from './views/Settings/Settings';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
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
        <Route
          path="/forum"
          element={<Forum />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/login"
          element={<Login />}
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
      <Footer></Footer>
    </div>
  );
}

export default App;
