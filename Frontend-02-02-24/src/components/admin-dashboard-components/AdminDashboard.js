import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { async_removeuser } from '../../store/actions/studentsActions'

const AdminDashboard = () => {

    const location = useLocation()
    const dispatch = useDispatch()


    const logoutHandler = () => {
      dispatch(async_removeuser())
      // console.log("logout ----------")
    }
    
  return (
    <div className='col-md-12  Admin-Dashboard_main_div'>
            <div className='Admin-Dashboard_main_left_div'>
                <NavLink to='/Admin-Dashboard/Dashboard'
                         className='Admin-Dashboard_main_left_header_div'>
                        <h5>Speakable English</h5>
                        <span>Welcome Admin !</span>
                </NavLink>
                <div className='Admin-Dashboard_main_left_router_div'>
                    <NavLink
                     to='/Admin-Dashboard/Dashboard'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Dashboard' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-speedometer2"></i></span>
                      <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                     to='/Admin-Dashboard/Teachers'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Teachers'  ||
                     location.pathname === '/Admin-Dashboard/Teachers/add-teacher'
                     ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-person-fill-add"></i></span>
                      <span>Teachers</span>
                    </NavLink>
                    <NavLink
                     to='/Admin-Dashboard/Students'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Students' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-person-fill-gear"></i></span>
                      <span>Students</span>
                    </NavLink>
                    <NavLink
                     to='/Admin-Dashboard/Courses'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Courses' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-box-fill"></i></span>
                      <span>Courses</span>
                    </NavLink>
                    <NavLink
                     to='/Admin-Dashboard/Meetings'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Meetings' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-clipboard-check-fill"></i></span>
                      <span>Meetings</span>
                    </NavLink>
                    <NavLink
                     to='/Admin-Dashboard/Bookings'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Bookings' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-bookmark-dash-fill"></i></span>
                      <span>Bookings</span>
                    </NavLink>
                    {/* <NavLink
                     to='/Admin-Dashboard/Feedbacks'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Feedbacks' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-chat-left-dots-fill"></i></span>
                      <span>Feedback</span>
                    </NavLink> */}
                    <NavLink
                     to='/Admin-Dashboard/Enquirys'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Enquirys' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-chat-right-quote-fill"></i></span>
                      <span>Enquirys</span>
                    </NavLink>
                    <NavLink
                     to='/Admin-Dashboard/Payments'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Payments' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-currency-dollar"></i></span>
                      <span>Payments</span>
                    </NavLink>
                    <NavLink
                     to='/Admin-Dashboard/Packages'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Packages' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-basket3-fill"></i></span>
                      <span>Packages</span>
                    </NavLink>
                    {/* <NavLink
                     to='/Admin-Dashboard/Settings'
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Settings' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-gear-fill"></i></span>
                      <span>Settings</span>
                    </NavLink> */}
                    <NavLink
                     onClick={logoutHandler}
                     className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Admin-Dashboard/Logout' ? 'active' : 'inactive'}`
                     }
                    >
                      <span><i class="bi bi-box-arrow-right"></i></span>
                      <span>Logout</span>
                    </NavLink>
                </div>
            </div>
            <div className='Admin-Dashboard_main_right_div'>
                        <Outlet/>
            </div>  
    </div>
  )
}

export default AdminDashboard