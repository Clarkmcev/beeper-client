import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { AuthContext } from '../auth/../../context/auth.context';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);

      
        const [newUser, setNewUser] = useState({
            email: '',
            password : '',
        })

        const addNewUser = (e, newUser) => {
          e.preventDefault();
          axios
            .post(`${API_URL}/auth/signup`, newUser)
            .then((response) => {
              navigate("/signup-sucess");
            })
            .catch((error) => {
              const errorDescription = error.response.data.errorMessage;
              setErrorMessage(errorDescription);
              console.log(errorDescription)
            });
          navigate("/signup");
        }
    
        const handleChange = (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setNewUser({...newUser,[name]:value})
        }
    

  return (
    <div className="container interface">
        <div className="title">Signup</div>
        <div>
        <form onSubmit={(e)=>{addNewUser(e,newUser)}}>
          <div>
            <div>
                </div>
                <div>
                  <div>
                  <div>
                  <label>Email</label>
                    </div>
                      <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                  />
                  </div>
                  <div>
                  <div>
                  <label>Password</label>
                    </div>
                      <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  </div>
                  <button type="submit" className="btn">Create Account</button>
                  { errorMessage && <p className="error-message">{errorMessage}</p> }
                </div>
          </div>
        </form>
        </div>
    </div>
  )
}

export default Signup