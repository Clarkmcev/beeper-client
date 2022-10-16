import React from 'react'
import { MdOutlineGppGood } from "react-icons/md";
import { Link } from "react-router-dom";


function SignupSuccess() {
  return (<>
    <div className="container interface">
        <div className="title">Welcome to Beeper</div>
        <MdOutlineGppGood size={50} className="icon-success"/>
            <p>Your account has been successfully created.</p>
            <p>
                Start browsing through your <Link>feed</Link> and
                complete your user profile <Link>here</Link>.
            </p>
    </div>
    </>
  )
}

export default SignupSuccess