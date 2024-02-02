import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Signup_Student } from '../store/actions/studentsActions';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const SignupFormPopup = ({ handleClose }) => {

  
const dispatch = useDispatch()
const [Username, setUsername] = useState("")
const [Password, setPassword] = useState("")
const [Email, setEmail] = useState("")
const [Phone_Number, setPhone_Number] = useState("")
const [verified, setverified] = useState(false)
const [recaptcha, setrecaptcha] = useState('')
const recaptchref = useRef()

const SubmitHandler = (e) =>{
  e.preventDefault()
  dispatch(Signup_Student({
    Username:Username,
    Email:Email,
    Phone_Number:Phone_Number,
    Password:Password,
    recaptcha
  }))
  recaptchref.current.reset()

  // console.log("----------Student SignUp successful from the landing page ---------")
}

const onChange = (value) => {
  console.log("Captcha value:", value);
  setrecaptcha(value)
  setverified(true)
}

  return (
    <div className="form-popup">
      <div className="form-popup-content">
        {/* Add your signup form fields here, for example: */}
        <form onSubmit={SubmitHandler}>
          <h5>Please SignUp!</h5>
          <div className="form-group-sign">
            {/* <label htmlFor="username">Username:</label> */}
            <input 
            type="text" 
            id="Username"
            name="Username"
            placeholder='Username'
            autoComplete='off'
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
             <input 
            type="Email" 
            id="Email"
            name="Email"
            placeholder='Email'
            autoComplete='off'
            value={Email}
            onChange={(e) => setEmail(e.target.value) }
            required
            />
            <PhoneInput
                country={'us'}
                className="mt-2"
                value={Phone_Number}
                onChange={(phone, country, e, formattedValue) => {
                  console.log(formattedValue)
                  setPhone_Number(formattedValue)}}
                inputProps={{
                  name: 'Phone_number',
                  required: true,
                  autoFocus: true,
                  style: { marginLeft: '40px',width:"260px" } 
                }}
                required
              />
            <input 
            type="Password" 
            id="Password"
            name="Password"
            placeholder='Password'
            autoComplete='off'
            value={Password}
            onChange={(e) => setPassword(e.target.value) }
            required
            />
            <ReCAPTCHA
              sitekey="6LdYpVspAAAAACZq-3zIQN6AWTmiUDw6eoByjr_f"
              onChange={onChange}
              ref={recaptchref}
            />   
          </div>
            <div className='d-flex mt-4'>
                  <button type='submit' disabled={!verified} className="btn btn-outline-success mx-3">SignUp</button>
                  <button onClick={handleClose} className="btn btn-outline-success mx-3">Close</button>
            </div>
        </form>
        {/* Add other form fields as needed */}
      </div>
    </div>
  );
};

export default SignupFormPopup;
