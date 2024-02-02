import React, { useState, useEffect } from 'react';
import Navbar from './landingcomponents/Navbar';
// import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { Signup_Student } from '../store/actions/studentsActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const SceduleMeeting = () => {
  const [date, setDate] = useState(new Date());
  const [selectedtimeSlot, setSelectedTimeSlot] = useState(null);
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date(), null));
  const [showPopup, setShowPopup] = useState(false);
  const [Username, setUsername] = useState("")
  const [Phone_number, setPhone_number] = useState('')
  const [Password, setPassword] = useState("")
  const [Email, setEmail] = useState("")
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const isAuthenticated = useSelector((state) => state.students.isAuthenticated);
  useEffect(() => {
    // console.log(isAuthenticated)
    isAuthenticated > 0 ? (navigate('/Student-dashboard')) : (navigate('/Scedule-Meeting'))
  }, [isAuthenticated,navigate])

  useEffect(() => {
    setFormattedDate(formatDate(date, selectedtimeSlot));
  }, [date, selectedtimeSlot]);


/* ---------------------------------------------------------------------------------------------------------------------------- */

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(Signup_Student({
        Username: Username,
        Phone_Number: Phone_number,
        Password: Password,
        Email:Email,
      }));

      // If dispatch is successful, show a success toast
      await toast.success("Student signup successful");

      setUsername('');
      setPhone_number('');
      setPassword('');
      setEmail('');
    } catch (error) {
      // Handle error, and optionally show an error toast
      console.error("Error during signup:", error);
      toast.error("Error during student signup");
    }
  };

/*---------------------------------------------------------------------------------------------------------------------------- */

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // console.log(newDate);
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    // console.log(timeSlot);
  };

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  ];

  function formatDate(selectedDate, selectedTimeSlot) {
    const formattedDateString = selectedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    return selectedTimeSlot ? `${formattedDateString}, ${selectedTimeSlot}` : formattedDateString;
  }

  const handleNextButtonClick = () => {
    // console.log(`ashdihadhas  ${formattedDate} & ${selectedtimeSlot}`)
    if (formattedDate !== '' && selectedtimeSlot !== null) {
      setShowPopup(true);
    } else {
      toast.warning("Formatted date string and selected time slot cannot be empty.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="col-md-12 col-sm-6 scheduledpage_main_div">
            <div className='scheduledpage_calender_div'>
                <h6>Select the Date</h6>
                <Calendar
                onChange={handleDateChange}
                className='scheduledpage_calender'
                value={date}
                prev2Label={false}
                next2Label={false}
                />
            </div>
          <>
            {date > new Date() ? (
                    <div className='scheduledpage_time_div'>
                    <h6>Select the time</h6>
                    <div className='scheduledpage_timeslot'>
                        {timeSlots.map((timeSlot) => (
                        <button
                            key={timeSlot}
                            className="btn btn-outline-success p-1"
                            value={timeSlot}
                            onClick={() => handleTimeSlotChange(timeSlot)}
                        >
                            {timeSlot}
                        </button>
                        ))}
                    </div>
                    </div>
                    ) : (
                    <p>No availability</p>
                )}
          </>
            <div className="accordion scheduledpage_display_section">
                <h6>Details</h6>
                <p>Free Meeting</p>
                <p>{formattedDate}</p>
                <p>
                    Google Meets meeting - you will receive the link at least <span style={{color:"#258754"}}><b>5 minutes </b></span>before the meeting
                </p>
                <button className="btn btn-outline-success " onClick={handleNextButtonClick} >

                    Next
                </button>
            </div>
      </div>

     {/* Pop-up  Signup_Student */}
      {showPopup && (
        <div className="popup">
          <div className='popup_header'>
            <h5>Please SignUp!</h5>
          </div>
          <div className='popup_form_div'>
            <form method='post' onSubmit={SubmitHandler}>
              {/* <label>Username</label> */}
              <input
                type='text'
                name='Username'
                placeholder='Username'
                value={Username}
                onChange={(e)=>setUsername(e.target.value)}
                autoComplete='off'
                required
              />
               <input
                type='Email'
                placeholder='Email'
                name='Email'
                value={Email}
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete='off'
                required
              />
              {/* <label>Phone number</label> */}
              {/* <input
                type='text'
                className='no-spinners'
                name='Phone_number'
                placeholder='Phone number'
                value={Phone_number}
                onChange={(e)=>setPhone_number(e.target.value)}
                autoComplete='off'
                required
              /> */}
             <PhoneInput
                country={'us'}
                value={Phone_number}
                onChange={(phone, country, e, formattedValue) => {
                  setPhone_number(formattedValue)}}
                inputProps={{
                  name: 'Phone_number',
                  required: true,
                  autoFocus: true,
                  style: { marginLeft: '40px' } 
                }}
              />
              {/* <label>Password</label> */}
              <input
                type='password'
                placeholder='Password'
                name='Password'
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete='off'
                required
              />
              <>
                <button type="submit" className="btn btn-outline-success popup_closebtn" >Submit</button>
                <button type="button" className="btn btn-outline-success popup_closebtn" onClick={() => setShowPopup(false)}>Close</button>
              </>
            </form>
          </div>
        </div>
      )}
      
        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />

    </>
  );
};

export default SceduleMeeting;
