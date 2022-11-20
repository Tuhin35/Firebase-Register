import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import app from "../../Hook/firebaseConfig";
import Swal from "sweetalert2";

const Registration = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [isDisabled,setIsDisabled] = useState(true);

  const auth =getAuth(app)
  const handleName = (event)=>{         // set user name
    setName(event.target.value);
  }
  const handleEmail = (event)=>{    // set Email
    const test = /\S+@\S+\.\S+/.test(event.target.value);
     if (!test) {
      setError("please give a valid email");
      return;
   }
    
     setEmail(event.target.value);
     setError(" ");
  }

  const handlePassword = (event)=>{         //password validation
     const pass = /(?=.{6,20})/.test(event.target.value);
     if (!pass) {
      setError("Password must be  6-20 character");
      return;
     }
     setPassword(event.target.value);
     setError(' ')
  }

   const handleRegister = (event) =>{
event.preventDefault();
    if (name,email,password) {
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateName();
    emailVerification();
    console.log(user);

    setError(" ");
    Swal.fire('Register done');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorMessage)
    // ..
  });
      
    }

    else{
      setError("Please fil all the input")
    }

    const updateName = () =>{

      updateProfile(auth.currentUser, {
        displayName: name, 
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });

    }

const emailVerification = () =>{

  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });


}




   }


  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/hYJTmVX/undraw-Mobile-login-re-9ntv-1.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <div className="input-box">
            <p className="text-danger">{error}</p>
            <form action="">
              <input
              onBlur={handleName}
                className="form-control p-3 m-2"
                type="text"
                placeholder="Enter your name"
                required
              />
              <input
              onBlur={handleEmail}
                className="form-control p-3 m-2"
                type="email"
                placeholder="Email"
                required
              />
              <input 
              onBlur={handlePassword}
                className="form-control p-3 m-2"
                type="password"
                placeholder="password"
                required
              />
              <p className="link ">
                <Link to="/login" className="text-decoration-none">
                  <small className="text-danger link">
                    already have an account? please login
                  </small>
                </Link>
              </p>
              <input
              onClick={()=>{setIsDisabled(!isDisabled)}}
               className="p-2" type="checkbox" />{" "}
              <span className="mb-3">accept term & condition</span>
              <br />
              <button
              onClick={handleRegister}
                type="submit"
                className="btn btn-info p-3 w-50 mt-3 fw-bold text-white"
                disabled={isDisabled}
              >
                Register
              </button>
            </form>
          </div>
          <button className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto">
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p className="fw-bold">Google SignIn</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
