import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">We Chat</span>
        <form>
          <input type="text" placeholder="Enter your name"/>
          <input type="email" placeholder="Enter your email"/>
          <input type="password" placeholder="Enter your password"/>
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login;