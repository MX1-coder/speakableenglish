import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { DeleteCourses, Getcourses } from '../../store/actions/coursesActions';
import AdminNav from './AdminNav';


const AdminCourses = () => {

  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses.courseslist);

  useEffect(()=>{
   dispatch(Getcourses())
  },[dispatch])

 const DeleteCourse = (e) => {
  // console.log("course_id", e)
   dispatch(DeleteCourses(e))
   window.location.reload();
  }

  const navigate = useNavigate()
  const EditCourse= (e) => {
   navigate(`/Admin-Dashboard/Courses/edit-Courses/${e}`)
 }



  return (
    <>
    <AdminNav/>
    <div className='Course_mainPage_style'>
    <div className='Course_header_style'>
        <h6 className='text-dark'>Courses Table</h6>
        <Link to='/Admin-Dashboard/Courses/add-courses'>
          <button className='btn btn-outline-success'>Add Course</button>
        </Link>
      </div>
      <div className='Course_list_style mt-3'>
         {courses?.map((Courses) => (
                        <div key={Courses._id} className='Courses_card p-2'>
                          <div className='Courses_card_img_div'>
                            <img src={`http://localhost:3000/images/${Courses.Course_Images}`} alt=''/>
                          </div>
                          <h5>{Courses.Course_Name}</h5>
                          <p>{Courses.Description}</p>
                          <span>${Courses.Purchase_Price}</span>
                          <h6>Teachers Assigned</h6>
                          <div className='d-flex flex-wrap justify-content-center w-100'>
                              {Courses?.Teachers_Details?.map((teacher) => (
                                      <span className='Courses_card_teacher_span mx-1' key={teacher._id}>{teacher.Username}</span>
                                ))}
                           </div>
                          <div className='w-100 d-flex justify-content-center admincoursetbn_div'>
                          <button onClick={(e) => EditCourse(Courses._id) } className='btn btn-outline-success mx-3'>Edit Course</button>
                          <button onClick={(e) => DeleteCourse(Courses._id) } className='btn btn-outline-danger'>Delete Course</button>
                          </div>
                        </div>         
                    ))}
      </div>
    </div>
    </>
  )
}

export default AdminCourses