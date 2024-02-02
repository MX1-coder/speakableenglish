import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Notifications, NotificationsOfAccountant, NotificationsOfAdmin, NotificationsOfTeacher } from '../../store/actions/notificationActions';

const AdminNav = () => {
    const user = useSelector(((state) => state.students.user))
    // console.log(user._id)
    const id = user._id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const NotifyHandler = async () => {
        console.log(user.UserType)
        if(user.UserType === 'student'){
            await dispatch(Notifications(id))
          navigate('/Student-dashboard/NotificationTab')
        }else if (user.UserType === 'teacher' ){
            await dispatch(NotificationsOfTeacher(id))
            navigate('/Teacher-dashboard/NotificationTab')
        } else if (user.UserType === 'accountant'){
            await dispatch(NotificationsOfAccountant()) 
            navigate('/Accontant-Dashboard/NotificationTab')
        } else if (user.UserType === 'admin'){
            await dispatch(NotificationsOfAdmin())
            navigate('/Admin-Dashboard/NotificationTab')
        }

    }
    

    
    // const decodedToken = await jwt.decode(token);
  return (
    <div className='Admin-Dashboard_main_right_nav_div'>
        <div className='Admin-Dashboard_nav_left_div'>
            <i class="bi bi-text-left"></i>
            <i style={{cursor:"pointer"}} onClick={NotifyHandler} class="bi bi-bell-fill"></i>   
            <i class="bi bi-envelope-fill"></i>
            {/* <i class="bi bi-chat-square-text-fill"></i> */}
            <i class="bi bi-calendar3"></i>
        </div>
        <div className='Admin-Dashboard_nav_search_div'>
                <i class="bi bi-search"></i>
                <input
                    name='search_Input'
                    placeholder='Search by Teacher, Student, Fees more details...'
                />
        </div>
        <div className='Admin-Dashboard_nav_right_div'>
                <div className='Admin-Dashboard_nav_right_Name_div'>
                    <span>{user?.Username}</span>
                    {/* <div className='Admin-Dashboard_nav_right_Name_status_div'>
                        <div></div>
                        <span>Online</span>
                    </div> */}
                </div>
                {user?.Profile_Image?.length > 0 ? (
                    <div className='Admin-Dashboard_nav_right_img_div'>
                        <img src={`http://localhost:3000/images/${user?.Profile_Image}`} alt='user' />
                    </div>
                    ) : (
                    <div className='Admin-Dashboard_nav_right_img_div'>
                        <img src="https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg" alt='user' />
                    </div>
                    )}
           
        </div>
   </div>
  )
}

export default AdminNav