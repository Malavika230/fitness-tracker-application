import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Goals from './components/Goals/Goals';
import Achivements from './components/Achivements/Achivements';
import Activity from './components/Activity/Activity';
import Profiles from './components/Profile/Profiles';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"element={<Navbar children={<Home />} />}
          />
          <Route
            path="/activity"element={<Navbar children={<Activity />} />}
          />
          <Route
            path="/goals"element={<Navbar children={<Goals />} />}
          />
          <Route
            path="/achivements"element={<Navbar children={<Achivements />} />}
          />
          <Route
            path="/profile"element={<Navbar children={<Profiles />} />}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
