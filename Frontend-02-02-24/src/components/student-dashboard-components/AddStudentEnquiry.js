import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
import { Create_Enquiry } from '../../store/actions/enquiryActions'
import AdminNav from '../admin-dashboard-components/AdminNav'

const AddStudentEnquiry = () => {
    // const { StudentID } = useParams()
    // console.log(StudentID)
    // console.log(student.Email)
    // console.log(student.Username)
    const student = useSelector((state) => state.students.user)
    const dispatch = useDispatch()
    const [formData, setformData] = useState({
        Name:"",
        Email:"",
        Message:""
    })

    useEffect(() => {
      if(student){
        setformData({
            Name:student.Username,
            Email:student.Email,
            Message:""
        })
      }
    }, [student])
    
    const SubmitHandler = () => {
        dispatch(Create_Enquiry({
            Name:formData.Name,
            Email:formData.Email,
            Message:formData.Message,
        }))
        setformData({
            Name:"",
            Email:"",
            Message:""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
  return (
    <>
    <AdminNav/>
    <div className='EnquiryStudent_mainPage_style'>
      <div className='EnquiryStudent_header_style'>
        <h6 className='text-dark'>Add Students Enquiry</h6>
      </div>
      <div className='EnquiryStudent_list_style d-flex flex-wrap flex-row'>
        <form className='w-100' onSubmit={SubmitHandler}>
            <div className='form-group mt-3 w-25'>
                <input
                    type='text'
                    className='form-control'
                    id='Name'
                    placeholder='Name of the student'
                    name='Name'
                    value={formData.Name}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group mt-2 w-25'>
                <input
                    type='Email'
                    className='form-control'
                    id='Email'
                    placeholder='Email of the student'
                    name='Email'
                    value={formData.Email}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group mt-2 w-50'>
                <input
                    type='text'
                    id='Message'
                    className='form-control'
                    placeholder='Message of the student'
                    name='Message'
                    value={formData.Message}
                    onChange={handleChange}
                />
            </div>
            <button type='submit' className='btn btn-outline-danger mt-2 w-25'>Submit</button>
        </form>    
      </div>
    </div>
    </>
  )

}

export default AddStudentEnquiry