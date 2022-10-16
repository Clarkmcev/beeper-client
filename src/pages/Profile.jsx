import React, { useState, useContext, useEffect } from 'react'
import profileAnonym from '../img/105-1053345_comment-from-dj-buck-perfil-anonimo.png'
import { useNavigate, NavLink } from "react-router-dom";
import EditProfile from '../component/EditProfile';
import { AuthContext } from "../context/auth.context";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Profile() {
    const { editPage, setEditPage, isLoggedIn, myProfile, setMyProfile } = useContext(AuthContext);

    const showEditPage = () => {
        setEditPage(!editPage)
    }

    const getMyProfile = () => {
        const userId = localStorage.getItem("userId");

        axios.get(`${API_URL}/profile/${userId}`)
        .then(elem => {
            let info = elem.data.user
            setMyProfile(info)
            console.log(myProfile)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        getMyProfile()
    }, [editPage, isLoggedIn])

  return (
    <>
    {/* <button onClick={getMyProfile}>qwe</button> */}
    <div className="container interface profile p-0">
        {editPage && <EditProfile/>}
        {!editPage && <>
        <div className="background-picture">

        {myProfile.profileImg.length < 1 ? <img src={profileAnonym} className="profile-img" alt="ee"/> : <img src={myProfile.profileImg} className="profile-img" alt="ee"/>}
        <button className="btn edit-button" onClick={showEditPage}>Edit</button>
        </div>
        <div className="user-info">
            <div className="title">{myProfile.name}</div>
            <div className="text-fourth">
                <div className="my-2">@{myProfile.name}</div>
                <div className="my-2">Joined {myProfile.createdAt}</div>
                <div className="followings my-2">
                    <div>12 Following</div>
                    <div className="followings ml-2">90 Followers</div>
                </div>
                <div className="my-beeps">
                    <NavLink>Beeps</NavLink>
                    <NavLink>Beeps & Replies</NavLink>
                    <NavLink>Media</NavLink>
                    <NavLink>Liked</NavLink>
                </div>
            </div>
        </div>
        </>}
    </div>
    </>
  )
}

export default Profile