import React, { useState } from "react";
import register from '../assets/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import validator from 'validator';


const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    }catch(err){
      setErr(true);
      setLoading(false);
    }
  }

  const validate = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 8
    })) {
      setErrorMessage('Is Strong Password')
      return true;
    } else {
      setErrorMessage('Minimum password length should be 8')
      return false;
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">weChat</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Enter your name"/>
          <input required type="email" placeholder="Enter your email"/>
          <input required type="password" placeholder="Enter your password" onChange={(e) => validate(e.target.value)}/>
          {errorMessage === '' ? null : <span style={{color: 'red',fontSize: "13px"}}>{errorMessage}</span>}
          <input required style={{display:"none"}} type="file" id="file"/>
          <label htmlFor="file">
            <img src={register} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && <p>Uploading and compressing your avatar please wait...</p>}
          {err && <span>Something went wrong!</span>}
        </form>
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  )
}

export default Register;