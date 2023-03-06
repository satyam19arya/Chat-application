import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">We Chat</span>
      <div className="user">
        <img src="https://funylife.in/wp-content/uploads/2022/11/20221105_164643-1024x1024.jpg" alt=""/>
        <span>Satyam</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;