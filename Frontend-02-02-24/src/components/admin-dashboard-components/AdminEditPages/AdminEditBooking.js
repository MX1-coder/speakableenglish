import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../AdminNav';
import { useNavigate, useParams } from 'react-router-dom';
import { Updatebooking } from '../../../store/actions/bookingActions';


const AdminEditBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { BookingID }  = useParams()
  const [status, setStatus] = useState('');
  const booking = useSelector((state) => state.bookings.Allbookinglist);
  const currentbooking = booking.find((booking) => booking._id === BookingID );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { status }; 
    try {
      await dispatch(Updatebooking({ BookingID, updatedData }));
      navigate('/Admin-Dashboard/Bookings')
    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
  };


  useEffect(() => {
    if (currentbooking) {
      setStatus(currentbooking.Status);
    }
  }, [currentbooking]);


  return (
    <>
      <AdminNav />
      <div className='AddCoursestyle'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Status">Select Status</label> &nbsp;&nbsp;
            <select
              name="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminEditBooking;
