import React, {ChangeEvent, useState} from 'react'
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../../src/pages/ResetPassword.css";
const eye = <FontAwesomeIcon icon={faEye} />;

const ResetPassword = () => {
const [formData, setFormData]= useState({
    password: "",
    confirmPassword: ""
})

const [passwordShown, setPasswordShown] = useState(false);
const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
};

const togglePasswordVisiblities = () => {
  setConfirmPasswordShown(confirmPasswordShown ? false : true);
}

const [submitted, setSubmitted] = useState(false);

const handleSubmit=(e:React.SyntheticEvent)=>{
e.preventDefault()
setSubmitted(true)
console.log(formData)
Axios.post("http://localhost:3001//auth/reset-password/:resetToken", formData)
.then(response => {
	console.log(response.data)
	localStorage.setItem("userToken", response.data)
	})

};

return (
    <div className="container">
		<div className="wrap-signin">
      <h1>Reset Password</h1>
			<form action="#" onSubmit={handleSubmit}  className="signin-form validate-form" >
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
        <div className="wrap-input validate-password" data-validate="Please enter password">
					<label className="password" htmlFor="confirmPassword">Confirm password</label>
					<input className="input"
					name="confirmPasswords"
					value={formData.confirmPassword}
					onChange={(e: ChangeEvent<HTMLInputElement>)=> setFormData({...formData, confirmPassword: e.target.value})} 
					 placeholder="confirmPassword" 
					 id="password"
					 type={confirmPasswordShown ? "text" : "password"}
					 />
					 <i className="eye" onClick={togglePasswordVisiblities}>{eye}</i>
				</div>

				<button className="signin-btn" type="submit">Reset Password</button>


			</form>

		</div>
	</div>
    );
}

export default ResetPassword;