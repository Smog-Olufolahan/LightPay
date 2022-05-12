import React, { ChangeEvent } from "react";
import "./Signup.css";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import axios from "axios";


const Signup = () => {
const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [profile, setProfile] = useState({
    email: "",
    fullname: "",
    mobile: "",
    password: ""
  })
 
  const handleProfile =(e:ChangeEvent<HTMLInputElement>) => {
  const {value,name} =e.target
  setProfile((prevState) =>({...prevState, [name] : value})
  )

  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let response: any = await axios.post(
        "http://localhost:3000/auth/register",
        {
          email:profile.email,
          fullname: profile.fullname,
          mobile: profile.mobile,
          password: profile.password,
        }
      ); 
      
setSuccessMessage(response.data.message);
setErrorMessage('')

    } catch (e: any) {
      let error = e.response.data;

     
        setErrorMessage(e.response.data);
        setSuccessMessage('')
        console.log(error);

    }
  };
  //password toggle function
  const [state, setState] = useState(true);

  const toggleBtn = () => {
    setState((prevState) => !prevState);
  };
  console.log(errorMessage)

  return (
    <>
      <div className="container2">
        <div className="heading">
          <h2>
            <SiGnuprivacyguard></SiGnuprivacyguard>Signup
          </h2>
        </div>
        <div className="form">
          <form onSubmit={onSubmit}>
            {/* name */}
            {/* {showError && <h4>{error}</h4>} */}
            <div className="form-group">
              <div id="name-label">
                <label>Enter your full name</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="fullname"
                value={profile.fullname}
                placeholder="Full name"
                // onChange={(e) => {
                //   setFullname(e.target.value);
                // }}
                onChange={handleProfile}
              />
            </div>

            {/* email */}
            <div className="form-group">
              <div id="email-label">
                <label>Email address</label>
              </div>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={profile.email}
                placeholder="Email address"
                onChange={handleProfile}
              />
            </div>

            {/* password */}
            <div className="form-group">
              <div id="password-label">
                <label>Password</label>
              </div>
              <div id="password-toggle">
                <input
                  type={state ? "password" : "text"}
                  className="form-control"
                  id="password"
                  name="password"
                  value={profile.password}
                  placeholder="Password"
                  onChange={handleProfile}
                />
                <button className="togglebtn" onClick={toggleBtn}>
                  <FaEye></FaEye>
                </button>
              </div>
            </div>

            {/* phone */}
            <div className="form-group">
              <div id="phone-label">
                <label>Enter your phone number</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="mobile"
                value={profile.mobile}
                placeholder="Phone"
                onChange={handleProfile}
              />
            </div>

            {/* submit */}
            <div className="form-group">
              <button type="submit" className="btn-signup">
                Signup
              </button>
            </div>
            <div className="form-group">
              <button type="submit" className="btn-signin">
                Signin
              </button>
              {errorMessage.length > 0 ? (
                <div className="error-msg"> {errorMessage} </div>
              ) : null}
              {successMessage.length > 0 ? (
                <div className="success-msg"> {successMessage} </div>
              ): null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
