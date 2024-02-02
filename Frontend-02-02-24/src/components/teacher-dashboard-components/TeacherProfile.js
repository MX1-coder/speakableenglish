import React from 'react'
import { useSelector } from 'react-redux'
import AdminNav from '../admin-dashboard-components/AdminNav'

const TeacherProfile = () => {
  const student = useSelector((state) => state.students.user)
  // console.log(student.Profile_Image)


  return (
    <>
    <AdminNav/>
    <div className='StudentProfile_mainPage_style'>
      
        <div className='StudentProfile_header_style'>
          <div className='Profile_header_imgdiv'>
            <img src={`http://localhost:3000/images/${student?.Profile_Image}`} alt=''/>
          </div>
        </div>
        
        <div className='row StudentName_style mt-5'>
            <h1 className='studentName'>{student?.Username}</h1>
            <p className='studenttext'>{student?.UserType}</p>
        </div> 

        <div className='row'>
          <div className='col-md-6 col-xs-12 '>
            <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-person userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Email:</p>
            <p  className='userDetailTextData'>{student?.Email}</p>
            </div>
            </div>
        </div>
          
          <div className='col-md-6 col-xs-12'>
          <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-geo-alt userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Address:</p>
            <p  className='userDetailTextData'>{student?.Address}</p>
            </div>
        </div>
        </div>

        <div className='col-md-6 col-xs-12'>
          <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-telephone userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Phone:</p>
            <p  className='userDetailTextData'>{student?.Phone_Number}</p>
            </div>
        </div>
        </div>

        <div className='col-md-6 col-xs-12'>
          <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-telephone userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Teacher Id:</p>
            <p  className='userDetailTextData'>{student?._id}</p>
            </div>
        </div>
        </div>
          </div>
        </div>
        </>  
  )
}

export default TeacherProfile