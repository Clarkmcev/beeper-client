import { NavLink, useNavigate } from "react-router-dom";
import React, {useState, useContext} from 'react';
import { AuthContext } from '../context/auth.context'
import { MdExplore, MdCircleNotifications, MdMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const { logOutUser, user, isLoggedIn, removeToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutUserAccount = () => {
    removeToken();
    logOutUser();
    navigate("/feed");
  }

  return (
    <>
        <div className="navbar">
        <NavLink to="feed">Beeper</NavLink>
        <div className="inside-navbar">
          <MdExplore className="icon"/>
          <NavLink to="feed">Explore</NavLink>
        </div>
        <div className="inside-navbar">
          <MdCircleNotifications className="icon"/>
          <NavLink to="feed">Notification</NavLink>
        </div>
        <div className="inside-navbar">
          <MdMessage className="icon"/>
          <NavLink to="feed">Messages</NavLink>
        </div>
        <div className="inside-navbar">
          <CgProfile className="icon"/>
          <NavLink to="profile">Profile</NavLink>
        </div>
        {!isLoggedIn && <NavLink className="btn text-center" to="login">Login</NavLink>}
        {isLoggedIn && <button className="btn" onClick={()=>logOutUserAccount()}>Logout</button>}
        <button className="btn" onClick={()=>logOutUserAccount()}>BEEP</button>
        </div>
    </>
  )
}

export default Navbar