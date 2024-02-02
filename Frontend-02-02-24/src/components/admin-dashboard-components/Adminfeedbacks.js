
import React , {useEffect} from 'react'
import { Link } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {deleteFeedback,getfeedbacks} from '../../store/actions/feedbackAction'
import {useDispatch,useSelector} from 'react-redux'
import AdminNav from './AdminNav';

const Adminfeedbacks = () => {


  const dispatch = useDispatch()

  //  const feedbacks = useSelector((state) => state.feedback.feedbacks);
  //  console.log(feedbacks)
 
   useEffect(()=>{
    // dispatch(getfeedbacks())
   },[dispatch])


  const DeleteFeedback = (e) =>{
    // dispatch(deleteFeedback(e))
  }

  const feedbacks = [
    {
      _id: '1',
      Student_ID: 'student1',
      Student_name: 'Frank',
      Message: 'Great class!',
      Teachers_ID: 'teacher1',
      Teachers_name:'Annie',
      Rating: 5,
      Booking_ID: 'booking1',
    },
    {
      _id: '2',
      Student_ID: 'student2',
      Student_name: 'Robert',
      Message: 'Excellent teaching!',
      Teachers_ID: 'teacher2',
      Teachers_name:'Mark',
      Rating: 4,
      Booking_ID: 'booking2',
    },
    // Add more dummy feedbacks as needed
  ];


  return (
    <>
    <AdminNav/>
    
    <div className='Feedback_mainPage_style'>
      <div className='Feedback_header_style'>
        <h6 className='text-dark'>Feedback Table</h6>
        <Link to='/dashboard/Feedbacks/add-Feedbacks'>
            <button className='btn btn-outline-success'>Add Feedback</button>
        </Link>
      </div>
      <div className='Feedback_list_style d-flex flex-wrap flex-row'>
        <table className="table table-hover table-responsive table-borderless">
          <thead className='table-transparent'>
            <tr>
              <th className='th'>Student ID</th>
              <th className='th'>Student Name</th>
              <th className='th'>Message</th>
              <th className='th'>Teacher ID</th>
              <th className='th'>Teacher Name</th>
              <th className='th'>Rating</th>
              <th className='th'>Booking Details</th>
              <th className='th'>Actions</th>
              {/* Add more table headers based on your schema */}
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr style={{boxShadow:'0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)',borderRadius:"8px"}}  key={feedback._id}>
                <td className='td'>{feedback.Student_ID}</td>
                <td className='td'>{feedback.Student_name}</td>
                <td className='td'>{feedback.Message}</td>
                <td className='td'>{feedback.Teachers_ID}</td>
                <td className='td'>{feedback.Teachers_name}</td>
                <td className='td'>{feedback.Rating}</td>
                <td className='td'>{feedback.Booking_ID}</td>
                <td className='td'><button onClick={()=>DeleteFeedback(feedback._id)} 
                style={{border:'none', backgroundColor:'transparent'}}><i class="bi bi-trash-fill"></i></button></td>
                {/* Add more table data based on your schema */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Adminfeedbacks