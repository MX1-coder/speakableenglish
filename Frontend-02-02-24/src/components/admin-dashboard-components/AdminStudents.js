import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav'
import { fetchAllstudents } from '../../store/actions/studentsActions';


const AdminStudents = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const students = useSelector((state) => state.students.studentslist)

  useEffect(() => {
    dispatch(fetchAllstudents());
  }, [dispatch]);


  const ProfileHandler = (id) => {
    // console.log(id)
    navigate(`/Admin-Dashboard/Students/studentsDetails/${id}`)
  }
 
  return (
    <>
    <AdminNav/>
    <div className='Student_mainPage_style'>
      <div className='Student_header_style'>
        <h6 className='text-dark'>Students Table</h6>
        <Link to='/Admin-Dashboard/Students/add-student'>
          <button className='btn btn-outline-success'>Add Students</button>
        </Link>
      </div>
      <div className='Student_list_style mt-3'>
                    {students?.map((Student) => (
                        <div key={Student._id} className='Student_card'>
                          {Student.Profile_Image.length>0
                          ?<div className='Student_card_img_div'>
                            <img src={`http://localhost:3000/images/${Student.Profile_Image}`} alt=""/>
                            </div>
                            :<div className='Student_card_no_img'>{Student.Username.slice(0,1).toUpperCase()}</div>}
                          <h5>{Student.Username}</h5>
                          <h6>{Student.UserType}</h6>
                          <div className='d-flex flex-wrap w-100'>
                              {Student?.Courses_assign?.map((course) => (
                                      <span className='Student_card_course_span mx-1' key={course._id}>{course.Course_Name}</span>
                                ))}
                           </div>
                          <button onClick={(e) => ProfileHandler(Student._id) } className='btn btn-outline-success'>Profile</button>
                        </div>         
                    ))}
      </div>
    </div>
    </>
  );
};


export default AdminStudents