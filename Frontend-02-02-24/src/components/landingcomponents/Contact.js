import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Create_Enquiry } from '../../store/actions/enquiryActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
const dispatch = useDispatch()
const [Fullname, setFullname] = useState("")
const [Email, setEmail] = useState("")
const [Message, setMessage] = useState("")

const SubmitHandler = async (e) => {
  e.preventDefault();
  try {
    await dispatch(Create_Enquiry({
      Name: Fullname,
      Email: Email,
      Message: Message,
    }));
    toast.success('Enquiry submitted successfully!', {
      position: 'top-right',
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setFullname("");
    setEmail("");
    setMessage("");
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    toast.error('Error submitting enquiry. Please try again later.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

  return (
    <div className='contact_main_page_div col-md-12 col-sm-12' id='Contact'>
      <form  onSubmit={SubmitHandler}>
          <div className='contact_main_page_left_div'>
              <div className='contact_main_page_left_div_header'>
                <h2>Contact us</h2>
                <small>we love conversations. let us talk!</small>
              </div>
              <input
                type='text'
                className='contact_main_page_left_div_input'
                placeholder='Enter Full Name'
                name='Fullname'
                value={Fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type='Email'
                className='contact_main_page_left_div_input'
                placeholder='Enter email address'
                name='Email'
                value={Email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className='contact_main_page_left_div_input-textaraa'
                placeholder='Tell us about your message'
                name='Message'
                value={Message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type='Submit' className='contact_main_page_left_div_submit_btn btn btn-outline-success'>Send Message</button>
          </div>
        </form>
        <div className='contact_main_page_right_div'>
              <div className='contact_main_page_right_img_div'>
                  <img src='https://themewagon.github.io/known/images/contact-image.jpg' alt='' />
              </div>
        </div>
    </div>
  )
}

export default Contact