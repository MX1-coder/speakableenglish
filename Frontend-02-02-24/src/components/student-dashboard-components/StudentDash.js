import React, { useEffect } from 'react'
import Calendar from 'react-calendar';
import AdminNav from '../admin-dashboard-components/AdminNav'
import { useDispatch, useSelector } from 'react-redux';
import { GetBookingsByStudentID } from '../../store/actions/bookingActions';
import { useNavigate } from 'react-router-dom';


const StudentDash = () => {
  
  const student = useSelector((state) => state.students.user)
  const Bookings = useSelector((state) => state.bookings.StudentID_Booking)
  // console.log(student._id)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(Bookings)

   useEffect(() => {
    dispatch(GetBookingsByStudentID(student._id));
  }, [student._id, dispatch]);
  
  // const roomHandler = () => {
  //   console.log("---------open-------------------")
  //   navigate('/rooom/meeting')
  // }
  
  // Function to count the total number of lectures based on bookings
  const countTotalLectures = (Bookings) => {
    return Bookings.reduce((total, booking) => {
      const numberOfLectures = booking.Package_ID.Number_of_Lectures || 0;
      return total + numberOfLectures;
    }, 0);
  };

  const totalLectures = countTotalLectures(Bookings);
  
// --------------------------------------------------------------------------------------------- Completed Sessions  ----------------------
// Function to count completed sessions
function countCompletedSessions(Bookings) {
  let completedSessionsCount = 0;
  // Iterate through each booking
  for (const Booking of Bookings) {
    // Check if the status is "Completed"
    if (Booking.Status === 'Completed') {
      completedSessionsCount++;
    }
  }
  return completedSessionsCount;
}

const completedSessions = countCompletedSessions(Bookings);

// ---------------------------------------------------------------------------------------------- Pending Sessions -------------------------
// Function to count sessions with "Pending" or "Scheduled" status
function countPendingOrScheduledSessions(Bookings) {
  let pendingOrScheduledSessionsCount = 0;
  // Iterate through each booking
  for (const Booking of Bookings) {
    // Check if the status is either "Pending" or "Scheduled"
    if (Booking.Status === 'Pending' || Booking.Status === 'Scheduled') {
      pendingOrScheduledSessionsCount++;
    }
  }
  return pendingOrScheduledSessionsCount;
}

// Call the function with your bookings data
const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);

// ------------------------------------------------------------------------------------------------ Cancelled Sessions ----------------------
// Function to count sessions with "Cancelled" status
function countCancelledSessions(Bookings) {
  let cancelledSessionsCount = 0;
  // Iterate through each booking
  for (const Booking of Bookings) {
    // Check if the status is "Cancelled"
    if (Booking.Status === 'Cancelled') {
      cancelledSessionsCount++;
    }
  }
  return cancelledSessionsCount;
}

// Call the function with your bookings data
const cancelledSessions = countCancelledSessions(Bookings);

// ---------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
    <AdminNav/>
    <div className='Dash_mainPage_style'>
    <h6>Student Dashboard</h6>
        <div className='Admin-Dash_contnet_box'>
            <div className='Admin-Dash_contnet_section_div'>
                <img className='Admin-Dash_contnet_div_img'
                      src='https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph'
                      alt=''
                />
                <span className='Admin-Dash_contnet_head_div_span'>Total Lectures</span>
                <span style={{color:"grey"}}>{totalLectures}</span>
            </div>
            <div className='Admin-Dash_contnet_section_div'>
                    <img className='Admin-Dash_contnet_head_div_img'
                        src='https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais'
                        alt=''
                    />
                    <span className='Admin-Dash_contnet_head_div_span'>Complete Sessions</span>
                    <span style={{color:"grey"}}>{completedSessions}</span>
            </div>
            <div className='Admin-Dash_contnet_section_div'>
                    <img className='Admin-Dash_contnet_head_div_img'
                        src='https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287'
                        alt=''
                    />
                    <span className='Admin-Dash_contnet_head_div_span'>Remaining Sessions</span>
                    <span style={{color:"grey"}}>{pendingOrScheduledSessions}</span>
            </div>
            <div className='Admin-Dash_contnet_section_div'>
         
                    <img className='Admin-Dash_contnet_head_div_img'
                        src='https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287'
                        alt=''
                    />
                    <span className='Admin-Dash_contnet_head_div_span'>Cancelled Income</span>
                    <span style={{color:"grey"}}>{cancelledSessions}</span>
            </div>
        </div>
        <div className='Admin-Dash_list_box'>
            <div className='Admin-Dash_student_list_box'>
                <h6>Meetings</h6>
                 <div className='Admin-Dash_student_list_div'>
                    <table className="table table-hover table-responsive table-borderless">
                        <thead className='table-transparent'>
                            <tr>
                                <th className='th'>#</th>
                                <th className='th'>Teacher Name</th>
                                {/* <th className='th'>Joining_Url</th> */}
                                <th className='th'>Scheduled_Date</th>
                                <th className='th'>Start_time</th>
                                <th className='th'>End_time</th>
                                <th className='th'>Status</th>
                                {/* <th className='th'>Join Button</th> */}
                            </tr>
                        </thead>
                        <tbody>
                          {Bookings?.length > 0 ? (
                              Bookings?.map((Booking, index) => (
                                <tr style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)' }} key={Booking?._id}>
                                  <td className='td'>{index + 1}</td>
                                  <td className='td'>{Booking?.Teacher_ID?.Username}</td>
                                  {/* <td style={{cursor:"pointer",color:"royalblue"}} className='td'>{Booking?.Meeting_ID.Joining_Url.substring(0,20)}</td> */}
                                  <td className='td'>{Booking?.Scheduled_Date}</td>
                                  <td className='td'>
                                    {Booking?.Time_Slot?.Start_time} 
                                  </td>
                                  <td className='td'>
                                   {Booking?.Time_Slot?.End_time}
                                  </td>
                                  <td className='td'>{Booking?.Status}</td>
                                  {/* <td onClick={() => roomHandler()} className='td'><button className='btn btn-outline-success meetingbtn'>Join Room</button></td> */}
                                </tr>
                              ))

                            ) : (
                              <tr>
                                <td colSpan="4">No Bookings available</td>
                              </tr>
                            )}
                      </tbody>
                    </table>  
                 </div>   
            </div>
            <div className='Admin-Dash_student_calender_box'>
            <h6>Events - 2023 to 2024</h6>
            <br/>
              <Calendar/>                      
            </div>
        </div>
        
    </div>
    </>
  ) 
}

export default StudentDash