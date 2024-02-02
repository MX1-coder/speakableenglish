import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { async_removeuser } from '../store/actions/studentsActions'
      

const StudentDashboard = () => {
const location = useLocation()
const navigate = useNavigate()
const dispatch = useDispatch()
const logoutHandler = () => {
  dispatch(async_removeuser())
}

useEffect(() => {
  navigate('/Student-dashboard/dash')
}, [])


  return (
       <div className='col-md-12  Admin-Dashboard_main_div'>
       <div className='Admin-Dashboard_main_left_div'>
           <NavLink to='/Student-dashboard/dash'
                    className='Admin-Dashboard_main_left_header_div'>
                   <h5>Speakable English</h5>
                   <h6 style={{fontSize:"12px"}}>Welcome to Student Panel !</h6>
           </NavLink>
           <div className='Admin-Dashboard_main_left_router_div'>
             <NavLink
                to='/Student-dashboard/dash'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Student-dashboard/dash' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-person-fill-gear"></i></span>
                 <span>Dashboard</span>
               </NavLink>
               <NavLink
                to='/Student-dashboard/profile'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Student-dashboard/profile' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-person-fill-gear"></i></span>
                 <span>Profile</span>
               </NavLink>
               <NavLink
                to='/Student-dashboard/Packages'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Student-dashboard/Packages' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-basket3-fill"></i></span>
                 <span>Packages</span>
               </NavLink>
               <NavLink
                to='/Student-dashboard/Bookings'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Student-dashboard/Bookings' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-bookmark-dash-fill"></i></span>
                 <span>Bookings</span>
               </NavLink>
               <NavLink
                to='/Student-dashboard/Payments'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Student-dashboard/Payments' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-currency-dollar"></i></span>
                 <span>Payments</span>
               </NavLink>
               <NavLink
                to='/Student-dashboard/Enquirys'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/Student-dashboard/Enquirys' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-chat-right-quote-fill"></i></span>
                 <span>Enquiries</span>
               </NavLink>
               <NavLink
                onClick={logoutHandler}
                className={ `Admin-Dashboard_router_col_ inactive `
                }
               >
                 <span><i className="bi bi-box-arrow-right"></i></span>
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

export default StudentDashboard