
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from './AdminNav';
import { Deletemeeting, fetchAllmeetings } from '../../store/actions/meetingActions';


const AdminMeetings = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const meetings = useSelector((state) => state.meetings.Allmeetinglist);
  console.log(meetings)
 
   useEffect(()=>{
    dispatch(fetchAllmeetings())
   },[dispatch])

  const EditMeeting = (id) => {
    navigate(`/Admin-Dashboard/Meetings/edit-Meetings/${id}`)
  }

  const DeleteMeeting = (id) =>{
    dispatch(Deletemeeting(id))
  }

  // const roomHandler = () => {
  //   navigate('/rooom/meeting')
  // }

  return (
    <>
    <AdminNav/>
    <div className='Meeting_mainPage_style'>
      <div className='Meeting_header_style'>
        <h6 className='text-dark'>Meetings Table</h6>
        <Link to='/Admin-Dashboard/Meetings/add-meeting'>
          <button className='btn btn-outline-success'>Add Meetings</button>
        </Link>
      </div>
      <div className='Meeting_list_style d-flex flex-wrap flex-row'>
        {meetings && meetings.length > 0 ? (
              <table className="table table-hover table-responsive table-borderless">
                <thead className='table-transparent'>
                  <tr>
                    <th className='th'>Attendees</th>
                    <th className='th'>Teacher ID</th>
                    {/* <th className='th'>Joining URL</th> */}
                    <th className='th'>Status</th>
                    <th className='th'>Created By</th>
                    <th className='th'>Actions</th>
                    {/* <th className='th'>Join Button</th> */}
                    {/* Add more table headers based on your schema */}
                  </tr>
                </thead>
                <tbody>
                  {meetings?.map(meeting => (
                    <tr style={{ boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)', borderRadius: '8px' }} key={meeting._id}>
                      <td className='td'>{meeting?.Atande_ID}</td>
                      <td className='td'>{meeting?.Teacher_ID}</td>
                      {/* <td className='td'>{meeting?.Joining_Url?.substring(0,15)}...</td> */}
                      <td className='td'>{meeting?.Status}</td>
                      <td className='td'>{meeting?.Created_By}</td>
                      <td className='td'>
                      <button className='mx-2' onClick={()=>EditMeeting(meeting._id)} style={{border:'none', backgroundColor:'transparent'}}><i class="bi bi-pen-fill"></i></button>
                      <button onClick={()=>DeleteMeeting(meeting._id)} style={{border:'none', backgroundColor:'transparent'}}><i class="bi bi-trash-fill"></i></button>
                      {/* Add more table data based on your schema */}
                      </td>
                      {/* <td onClick={() => roomHandler()} className='td'><button className='btn btn-outline-success meetingbtn'>Join Room</button></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>
                <p>No meetings available.</p>
              </div>
         )}
      </div>
    </div>
    </>
  );
}

export default AdminMeetings