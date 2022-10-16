import React, {useState, useContext} from 'react';
import { AuthContext } from '../auth/../../context/auth.context';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef } from 'react';
import jwt_decode from "jwt-decode"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const navigate = useNavigate();

    const { storeToken, authenticateUser, setIsLoading, setUser, user } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    
    const loginUser = (e) => {
      setIsLoading(true)
      e.preventDefault();
      const requestBody = { email, password };
      axios
        .post(`${API_URL}/auth/login`, requestBody)
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
          navigate("/feed");
          localStorage.setItem("userId", response.data.user._id)
          setUser(response.data.user)
        })
        .catch((error) => {
          setIsLoading(false)
          const errorDescription = error.response;
          setErrorMessage(errorDescription);
        });
        ref1.current.value = ''
        ref2.current.value = ''
    };

    function handleCallBackResponse(response) {
      var userObject = jwt_decode(response.credential)
      setUser(userObject)

      axios
      .post(`${API_URL}/auth/signup-with-google`, user)
      .then((response) => {
        navigate("/feed");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
    navigate("/login");
    }

    useEffect(() => {
          /* global google */
      google.accounts.id.initialize({client_id: '939729247140-1e6l2trk86r9sebdme81t4b53kdn55k1.apps.googleusercontent.com', callback: handleCallBackResponse})
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"), {theme: "outline", size: "large"}
      )

    }, [])

  return (
    <div className="container interface">
    <div className="title">Login</div>
    <form  onSubmit={loginUser}>
        <div> 
            <label>Email</label>
            <input ref={ref1} type="text" name="email" onChange={handleEmail}/>
        </div>
        <div>
            <label>Password</label>
            <input ref={ref2} type="password" name="password" onChange={handlePassword} />
        </div>
        <button className="btn" type="submit">Login</button>
        <div id="signInDiv"></div>
        <div className="my-2">No account yet? <Link to="/signup" className="hover:underline">Register</Link> here</div>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
      </form>
    </div>
  )
}

export default Login