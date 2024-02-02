import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Signin_user } from '../store/actions/studentsActions'

const SigninFormPopup = ({ handleClose }) => {

const dispatch = useDispatch()
const [Username, setUsername] = useState("")
const [Password, setPassword] = useState("")


const SubmitHandler = (e) =>{
    e.preventDefault()
    dispatch(Signin_user({
        Username:Username,
        Password:Password,
    }))
    
    // console.log(Username)
    // console.log(Password)

}

    return (
        <div className="form-popup">
          <div className="form-popup-content">
            {/* Add your signup form fields here, for example: */}
          <form onSubmit={SubmitHandler}>
          <h5>Signin</h5>
          <div className="form-group-sign ">
              {/* <label htmlFor="username">Username:</label> */}
              <input 
              type="text" 
              id="username"
              name="username"
              placeholder='Username'
              value={Username}
              onChange={(e) => setUsername(e.target.value) }
              />
              <input 
              type="password" 
              id="password"
              name="password"
              placeholder='Password'
              value={Password}
              onChange={(e) => setPassword(e.target.value) }
              />
            </div>          
            {/* Add other form fields as needed */}
           <div className='d-flex mt-4'>
                <button type='submit' className="btn btn-outline-success mx-3">Submit</button>
                <button onClick={handleClose} className="btn btn-outline-success mx-3">Close</button>
           </div>
           </form>
          </div>
        </div>
      );
}

export default SigninFormPopup