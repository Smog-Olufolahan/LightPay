import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../components/css/main.css';
const eye = <FontAwesomeIcon icon={faEye} />;

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [submitted, setSubmitted] = useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //setSubmitted(true);
    console.log(formData);
    Axios.post('http://localhost:3001/login', formData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('userToken', response.data);
        setMessage(response.data.msg);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          setMessage(error.response.data.msg);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setMessage('Error' + error.message);
        }
      });
  };

  const handleForgetPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formData);
    Axios.post('http://localhost:3001/auth/forgot-password', formData)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          setMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setMessage('Error' + error.message);
        }
      });
  };

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/signup/');
  };

  return (
    <div className="signin-form-container">
      <div className="container">
        <div className="wrap-signin">
          <form
            action="#"
            onSubmit={handleSubmit}
            className="signin-form validate-form"
          >
            <span className="signin-form-title">Sign In</span>

            <div
              className="wrap-input validate-email"
              data-validate="Please enter email-address"
            >
              <label className="email" htmlFor="email">
                Email Address
              </label>
              <input
                className="input"
                type="text"
                name="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                placeholder="Email Address"
                id="email-address"
              />
            </div>
            <div
              className="wrap-input validate-password"
              data-validate="Please enter password"
            >
              <label className="password" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                name="password"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                id="password"
                type={passwordShown ? 'text' : 'password'}
              />
              <i className="eye" onClick={togglePasswordVisiblity}>
                {eye}
              </i>
            </div>

            <div className="text-right">
              <a href="forgot-password" onClick={handleForgetPassword}>
                Forgot Password?
              </a>
            </div>

            <button className="signin-btn" type="submit">
              Sign In
            </button>

            <button className="signup-btn" onClick={handleSignup}>
              Sign Up
            </button>

            {message.length > 0 ? (
              <div>
                <br></br>
                <p style={{ textAlign: 'center' }}>{message}</p>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
