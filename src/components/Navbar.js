import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="user">
        <div className="nav">
          <img src={currentUser.photoURL} alt=""/>
          <span>{currentUser.displayName}</span>
        </div>
        <div>
          <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;