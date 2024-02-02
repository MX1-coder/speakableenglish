import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import AdminNav from '../AdminNav';
import { useDispatch } from 'react-redux';
import { Update_Teacher_By_Availability, updateTeacher } from '../../../store/actions/teachersActions';

const AdminEditTeacherEditAvailabilityTime = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = location.state.formDataFromPreviousComponent;
  const Dates = location.state.newEvent;

  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const handleTimeSlotChange = (timeSlot) => {
    if (!selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots((prevTimeSlots) => [...prevTimeSlots, timeSlot]);
    } else {
      setSelectedTimeSlots((prevTimeSlots) =>
        prevTimeSlots.filter((slot) => slot !== timeSlot)
      );
    }
  };

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM', 
    '12:00 PM - 1:00 PM', 
    '1:00 PM - 2:00 PM', 
    '2:00 PM - 3:00 PM', 
    '3:00 PM - 4:00 PM', 
    '4:00 PM - 5:00 PM', 
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 10:00 PM',
    '10:00 PM - 11:00 PM',
    '11:00 PM - 12:00 AM',
    '12:00 AM - 1:00 AM',
    '1:00 AM - 2:00 AM',
    '2:00 AM - 3:00 AM',
    '3:00 AM - 4:00 AM',
    '4:00 AM - 5:00 AM',
    '5:00 AM - 6:00 AM',
    '6:00 AM - 7:00 AM',
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = id;
    const updatedData = {
      ...formData,
      Availability_Date:[{
        Date:{
            Start_Date:Dates.start,
            End_Date:Dates.end
        },
        Time:[selectedTimeSlots]
      }],
    };
    try {
      await dispatch(Update_Teacher_By_Availability({ teacherId, updatedData }));
      // Reset selected time slots after submission if needed
      setSelectedTimeSlots([]);
      navigate('/Admin-Dashboard/Teachers');
    } catch (error) {
      console.error('Error editing teacher:', error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className='w-100 d-flex flex-column align-items-center mt-2'>
        <h6>Select the Time Slots</h6>
        <div className='timeslot_div'>
          {timeSlots.map((timeSlot) => (
            <button
              key={timeSlot}
              className={`btn ${
                selectedTimeSlots.includes(timeSlot)
                  ? 'btn-outline-success active'
                  : 'btn-outline-success'
              } p-1`}
              value={timeSlot}
              onClick={() => handleTimeSlotChange(timeSlot)}
            >
              {timeSlot}
            </button>
          ))}
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-outline-success w-100 mt-2'
        >
          Submit the form
        </button>
      </div>
    </>
  );
};

export default AdminEditTeacherEditAvailabilityTime;





