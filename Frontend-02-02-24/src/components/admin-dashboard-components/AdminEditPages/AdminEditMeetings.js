import React, { useState, useEffect } from 'react';
import { GetTeachers } from '../../../store/actions/teachersActions';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../AdminNav'
import { updatemeeting } from '../../../store/actions/meetingActions';


const AdminEditMeetings = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const meetings = useSelector((state) => state.meetings.Allmeetinglist);
  const students = useSelector((state) => state.students.AllStudentlist)
  const currentMeeting = meetings.find((meeting) => meeting._id === id);

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (currentMeeting) {
      setFormData(currentMeeting);
    }
  }, [currentMeeting]);

  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meeting_ID = id;
    const updatedData = formData
    // console.log(updatedData)
    try {
      await dispatch(updatemeeting({ meeting_ID, updatedData }));
      navigate('/Admin-Dashboard/Meetings');
    } catch (error) {
      console.error('Error editing meeting:', error);
    }
  };

  return (
    <>
    <AdminNav/>
    <div className='EditCoursestyle'>
    <form onSubmit={handleSubmit}>
          
           <div className="form-group">
           <label htmlFor="Teacher_ID">Select Teacher</label> &nbsp;&nbsp;
           <select
               name="Teacher_ID"
               value={formData.Teacher_ID} 
               onChange={(e) => setFormData((prevData) => ({ ...prevData, Teacher_ID: e.target.value }))}
           >
               {teachers?.map((values, index) => (
               <option key={values._id} value={values._id}>
                   {values.Username}
               </option>
               ))}
           </select>
           </div>

           {/* <div className="form-group">
           <label htmlFor="Created_By">Created By</label>
           <input
               type="text"
               className="form-control"
               id="Created_By"
               name="Created_By"
               value={formData.Created_By}
               onChange={(e) => setFormData((prevData) => ({ ...prevData, Created_By: e.target.value }))}
               required
           />
           </div> */}

           <div className="form-group">
           <label htmlFor="Teacher_ID">Select Student / Created By</label> &nbsp;&nbsp;
           <select
               name="Created_By"
               value={formData.Created_By} 
               onChange={(e) => setFormData((prevData) => ({ ...prevData, Created_By: e.target.value }))}
           >
               {students?.map((values, index) => (
               <option key={values._id} value={values._id}>
                   {values.Username}
               </option>
               ))}
           </select>
           </div>

           <div className="form-group">
           <label htmlFor="Status">Select Status</label> &nbsp;&nbsp;
           <select
               name="Status"
               value={formData.Status}
               onChange={(e) => setFormData((prevData) => ({ ...prevData, Status: e.target.value }))}
           >
               <option>Select Status</option>
               <option value="Scheduled">Scheduled</option>
               <option value="Completed">Completed</option>
               <option value="Pending">Pending</option>
               <option value="Cancelled">Cancelled</option>
           </select>
           </div>

           <button type="submit" className="btn btn-outline-success mt-3 btn-course">
           Submit
           </button>
       </form>
    </div>
    </>
  );
};

export default AdminEditMeetings;

