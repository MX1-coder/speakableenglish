import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteStudent, fetchStudentDetails } from '../../../store/actions/studentsActions';
import AdminNav from '../AdminNav';

const AdminStudentsDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const studentData = useSelector((state) => state.students.studentDetails);
    // console.log(studentData)
    useEffect(() => {
      dispatch(fetchStudentDetails(id));
    }, [dispatch, id]);
  
  
    const EditStudentHandler = (id) =>{
      // console.log(id)
      // e.preventDefault()
      navigate(`/Admin-Dashboard/Students/edit-student/${id}`)
    }
  
    const DeleteStudentHandler = (id) => {
      // console.log(id)
      dispatch(DeleteStudent(id))
      navigate(`/Admin-Dashboard/Students`)
    }


  return (
    <div className='Admin_teachers_detail_main_page'>
    <AdminNav/>
  {studentData && (
    <div className='Admin_teachers_detail_section w-100'>
       <div className='Admin_teachers_detail_section_header_div'>
            {studentData.Profile_Image!="" 
                          ?<div className='Admin_teachers_detail_section_img_div'>
                            <img src={`http://localhost:3000/images/${studentData.Profile_Image}`} alt=''/>
                          </div>
                          :<div className='Admin_teachers_detail_section_no_img'>{studentData.Username.slice(0,1).toUpperCase()}</div>}
                    

            <div className='Admin_teachers_detail_section_header'>
                <div className='Admin_teachers_detail_section_header_name'>
                    <p>{studentData.Username}</p>
                    <p>{studentData.Email}</p>
                    <p>{studentData.Phone_Number}</p>
                
                {studentData?.Courses_assign?.map((course) => (
                              <span className='teacher_card_course_span_details' key={course._id}>{course.Course_Name}</span>
                         ))}
                
                </div>
            </div>
            <div className='Admin_teachers_detail_section_col'>
                <div className='Admin_teachers_detail_section_col_text text-center'>
                    <h6>Total Sessions</h6>
                    <span>160</span>
                </div>
                <div className='Admin_teachers_detail_section_col_text text-center'>
                    <h6>Completed Sessions</h6>
                    <span className='text-success'>120</span>
                </div>
                <div className='Admin_teachers_detail_section_col_text text-center'>
                    <h6>Remaining Sessions</h6>
                    <span className='text-warning'>2023</span>
                </div>
                <div className='Admin_teachers_detail_section_col_text text-center'>
                    <h6>Cancelled Sessions</h6>
                    <span className='text-danger'>2023</span>
                </div>
            </div>
       </div>
        <div className='w-100 d-flex mt-2 justify-content-end'>
            <button onClick={(e) => EditStudentHandler(studentData._id)} className='btn btn-outline-success mx-3 w-25'>Edit Student</button>
            <button onClick={(e) => DeleteStudentHandler(studentData._id)} className='btn btn-outline-danger w-25 '>Delete Student</button>
        </div>
      {/* Add other properties as needed */}
    </div>
  )}
</div>
  )
}

export default AdminStudentsDetails