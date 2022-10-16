import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [editPage, setEditPage] = useState(false);
  const [myProfile, setMyProfile] = useState({});

  const showEditPage = () => {
    setEditPage(!editPage);
  };

  const navigate = useNavigate();

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    setIsLoading(true);
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
  };

  const addNewUser = (e, newUser) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then((response) => {
        navigate("/feed");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.log(errorDescription);
      });
    navigate("/signup");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        setIsLoading,
        user,
        authenticateUser,
        logOutUser,
        setUser,
        addNewUser,
        setErrorMessage,
        storeToken,
        removeToken,
        editPage,
        setEditPage,
        myProfile,
        setMyProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
