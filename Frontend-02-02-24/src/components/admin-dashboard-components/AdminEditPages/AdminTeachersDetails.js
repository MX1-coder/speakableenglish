import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteTeacher, fetchTeacherDetails } from '../../../store/actions/teachersActions';
import AdminNav from '../AdminNav';

const AdminTeachersDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const teacherData = useSelector((state) => state.teachers.TeacherDetails);
    // console.log(teacherData)
  useEffect(() => {
    dispatch(fetchTeacherDetails(id));
  }, [dispatch, id]);


  const EditTeacherHandler = (id) =>{
    // console.log(id)
    // e.preventDefault()
    navigate(`/Admin-Dashboard/Teachers/edit-teacher/${id}`)
  }

  const DeleteTeacherHandler = (id) => {
    // console.log(id)
    dispatch(DeleteTeacher(id))
    navigate(`/Admin-Dashboard/Teachers`)
  }


  return (
    <div className='Admin_teachers_detail_main_page'>
        <AdminNav/>
      {teacherData && (
        <div className='Admin_teachers_detail_section w-100'>
           <div className='Admin_teachers_detail_section_header_div'>
               
                {teacherData.Profile_Image!="" 
                          ?<div className='Admin_teachers_detail_section_img_div'>
                            <img src={`http://localhost:3000/images/${teacherData.Profile_Image}`} alt=''/>
                          </div>
                          :<div className='Admin_teachers_detail_section_no_img'>{teacherData.Username.slice(0,1).toUpperCase()}</div>}
              
                <div className='Admin_teachers_detail_section_header'>
                    <div className='Admin_teachers_detail_section_header_name'>
                        <p>{teacherData.Username}</p>
                        <p>{teacherData.Email}</p>
                        <p>{teacherData.Phone_Number}</p>
                    <div className='sociallink_div'>
                       <Link to={teacherData?.SocialLinks && teacherData.SocialLinks[0]?.link}><i style={{textDecoration:"none" ,color:"black"}} className='bi bi-facebook'></i></Link>
                       <Link to={teacherData?.SocialLinks && teacherData.SocialLinks[1]?.link}><i style={{textDecoration:"none" ,color:"black"}} className='bi bi-twitter'></i></Link>
                       <Link to={teacherData?.SocialLinks && teacherData.SocialLinks[2]?.link}><i style={{textDecoration:"none" ,color:"black"}} className='bi bi-instagram'></i></Link>
                    </div>
                    
                    {teacherData?.Courses_assign?.map((course) => (
                                  <span className='teacher_card_course_span_details' key={course._id}>{course.Course_Name}</span>
                             ))}
                    
                    </div>
                </div>
                <div className='Admin_teachers_detail_section_col'>
                <div className='Admin_teachers_detail_section_col_text text-center'>
                        <h6>Total Earning</h6>
                        <span>$2323432</span>
                    </div>
                    <div className='Admin_teachers_detail_section_col_text text-center'>
                        <h6>Total Sessions</h6>
                        <span>192</span>
                    </div>
                    <div className='Admin_teachers_detail_section_col_text text-center'>
                        <h6>Completed Sessions</h6>
                        <span className='text-success'>100</span>
                    </div>
                    <div className='Admin_teachers_detail_section_col_text text-center'>
                        <h6>Pending Sessions</h6>
                        <span className='text-warning'>50</span>
                    </div>
                    <div className='Admin_teachers_detail_section_col_text text-center'>
                        <h6>Cancelled Sessions</h6>
                        <span className='text-danger'>42</span>
                    </div>
                </div>
           </div>
            <div className='Admin_teachers_detail_section_about_div mt-3 '>
                <h6>About ME</h6>
                <p>{teacherData.Description}</p>
            </div>
            <div className='w-100 d-flex mt-2 justify-content-end'>
                <button onClick={(e) => EditTeacherHandler(teacherData._id)} className='btn btn-outline-success mx-3 w-25'>Edit Teacher</button>
                <button onClick={(e) => DeleteTeacherHandler(teacherData._id)} className='btn btn-outline-danger w-25 '>Delete Teacher</button>
            </div>
          {/* Add other properties as needed */}
        </div>
      )}
    </div>
  )
};

export default AdminTeachersDetails;