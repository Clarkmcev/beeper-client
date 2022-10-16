import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profileAnonym from '../img/105-1053345_comment-from-dj-buck-perfil-anonimo.png'
import { MdOutlinePhotoCamera, MdOutlineClose } from "react-icons/md";
import axios from 'axios';
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function EditProfile() {
    const { setEditPage, editPage, myProfile, setMyProfile } = useContext(AuthContext);
    const [profileInfo, setProfileInfo] = useState({
        name: '',
        bio: '',
        location: '',
        profileImg: '',
        backgroundImg: ''
    })
    const [profileImg, setProfileImg] = useState('')
  const navigate = useNavigate();


    const hiddenFileInput = React.useRef(null);

    const handleFileUpload = (e) => {
        e.preventDefault()
        const uploadData = new FormData()
        uploadData.append("profileImg", e.target.files[0]);
    axios
      .post(`${API_URL}/profile/upload-profileImg`,uploadData)
      .then(response => {
        setProfileImg(response.data.fileUrl);
        setProfileInfo({...profileInfo,profileImg:response.data.fileUrl})
      })
      .catch(err => console.log("Error while uploading the file: ", err));
    }

    const handleClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click();
        };

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setProfileInfo({...profileInfo,[name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        axios
          .post(`${API_URL}/profile/edit`, {profileInfo , userId})
          .then(() => {
            navigate("/profile");
            setEditPage(!editPage)
          })
          .catch((error) => {
            console.log(error);
          });
        navigate("/profile");
    }

    const handleBack = () => {
        console.log(editPage)
        setEditPage(!editPage)
    }

    useEffect(() => {

    }, [editPage])

  return (
    <>
    <div className="top-section-edit">
    <button className="close-btn" type="button" onClick={handleBack}><MdOutlineClose size="28px" className="icon-base"/></button>
    </div>
        <div className="">
            <form className="m-10 mt-2" onSubmit={(e)=>handleSubmit(e, profileInfo)}>
            <div className="background-picture">
            {/* <MdOutlinePhotoCamera size="40px" className="edit-background-photo"/> */}
            {profileImg.length < 1 ?  <img src={profileAnonym} className="profile-img" alt="ee"/> : <img src={profileImg} className="profile-img" alt="ee"/>}
            <button onClick={handleClick}>
            <MdOutlinePhotoCamera size="40px" className="edit-profile-img icon-base" />
            </button>
            </div>
                <div className="text-section">
                <input className="w-60" ref={hiddenFileInput} type="file" name="profileImg" onChange={(e)=>{handleFileUpload(e)}} style={{display: 'none'}}></input>
                <input type="text" name="name" placeholder="Name" onChange={handleChange}/>
                <input type="text" name="bio" placeholder="Bio" className="bio" onChange={handleChange}/>
                <input type="text" name="website" placeholder="Website" onChange={handleChange}/>
                </div>
                <button className="save-btn" type="submit">Save</button>
            </form>
        </div>
    </>
  )
}

export default EditProfile