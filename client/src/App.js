// App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPage from "./components/ProtectedPage";
import AboutUs from "./pages/AboutUs";
import BloodRequest from "./pages/BloodRequest";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile";
import Event from "./pages/Event";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedPage>
              <Profile />
            </ProtectedPage>
          }
        />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/requestBlood' element={<BloodRequest />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/donationevents' element={<Event />} />
      </Routes>
    </div>
  );
}

export default App;
