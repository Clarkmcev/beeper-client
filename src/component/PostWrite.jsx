import { AiOutlineFileGif, AiOutlineFileImage } from "react-icons/ai";
import { VscSmiley } from "react-icons/vsc";
import React, { useState, useRef } from 'react'
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function PostWrite() {
  const [textContent, setTextContent] = useState("")
  const [imageUrl, setImageUrl] = useState("");
  const[newPost, setNewPost] = useState({
    text: '',
  })
  const hiddenFileInput = React.useRef(null);

  const handleTextCreation = (e) => {
    e.preventDefault()
    const value = e.target.value;
    const name = e.target.name;
    setNewPost({...newPost,[name]:value});
    console.log(newPost)
  }

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    axios
      .post(`${API_URL}/post/upload`,uploadData)
      .then(response => {
        console.log("response is: ", response.data);
        setImageUrl(response.data.fileUrl);
        setNewPost({...newPost,imageUrl:response.data.fileUrl})
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

    const handleSelect = (file) => {
      console.log(file)
    }

  function handleBeepCreation() {

  }

  return (
    <>
    <div className="title">Home</div>
    <input name="text" type="text" placeholder="What's happening?" onChange={handleTextCreation}></input>
    <div className="tools">
    {imageUrl.length > 0 && <div className="img-prev"><img src={imageUrl} alt="new-image"/></div>}
      <div className='post-options'>
      <input className="w-60" ref={hiddenFileInput} type="file" name="imageUrl" onChange={(e)=>{handleFileUpload(e)}} style={{display: 'none'}}></input>
        <button onClick={handleClick}><AiOutlineFileImage className="post-icon"></AiOutlineFileImage></button>
        <button><AiOutlineFileGif className="post-icon"/></button>
        <button><VscSmiley className="post-icon"/></button>
        </div>
      <button onClick={()=>handleBeepCreation()} className="btn w-fit py-2">Beep</button>
    </div>
    </>
  )
}

export default PostWrite