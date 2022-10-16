import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import { AuthContext } from "./context/auth.context";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Feed from "./pages/Feed";
import axios from "axios";
import React, { useContext } from "react";
import Compartiment from "./component/Compartiment";
import SignupSuccess from "./component/SignupSuccess";
import Profile from "./pages/Profile";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function App() {
  // const navigate = useNavigate();
  // const {
  //   beverage,
  //   setBeverage,
  //   showBasket,
  //   user,
  //   errorMessage,
  //   setErrorMessage,
  // } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-sucess" element={<SignupSuccess />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Compartiment />
    </div>
  );
}

export default App;
