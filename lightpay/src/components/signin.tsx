import React, {ChangeEvent, useState} from 'react'
import { useForm } from "react-hook-form";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Signin = () => {
const [formData, setFormData]= useState({
    email: "",
    password: ""
})

const [passwordShown, setPasswordShown] = useState(false);
const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

const [submitted, setSubmitted] = useState(false);

const handleSubmit=(e:React.SyntheticEvent)=>{
e.preventDefault()
setSubmitted(true)
console.log(formData)
Axios.post("http://localhost:3000/login", formData)
.then(response => {
	console.log(response.data)
	localStorage.setItem("userToken", response.data)
	})

};

return (
        <div className="container">
		<div className="wrap-signin">
			<form action="#" onSubmit={handleSubmit}  className="signin-form validate-form" >
		
				<span className="signin-form-title">
					Sign In
				</span>

				<div className="wrap-input validate-email" data-validate="Please enter email-address">
					<label className="email" htmlFor="email">Email Address</label>
					<input className="input" 
					type="text" 
					name="email"
					onChange={(e: ChangeEvent<HTMLInputElement>)=> setFormData({...formData, email: e.target.value})} 
					value={formData.email}
					 placeholder="Email Address" 
					 id="email-address"/>
				</div>
				<div className="wrap-input validate-password" data-validate="Please enter password">
					<label className="password" htmlFor="password">Password</label>
					<input className="input"
					name="password"
					value={formData.password}
					onChange={(e: ChangeEvent<HTMLInputElement>)=> setFormData({...formData, password: e.target.value})} 
					 placeholder="Password" 
					 id="password"
					 type={passwordShown ? "text" : "password"}
					 />
					 <i className="eye" onClick={togglePasswordVisiblity}>{eye}</i>
				</div>
				
				<div className="text-right">
					<a href="forget-password">Forgot Password?</a>
				</div>

				<button className="signin-btn" type="submit">Sign In</button>

				<button className="signup-btn">Sign Up</button>


			</form>
			
		</div>
	</div>
    );
}

export default Signin;