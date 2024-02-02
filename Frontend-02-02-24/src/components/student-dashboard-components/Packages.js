import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllpackages } from '../../store/actions/packagesActions'
// import {Link } from 'react-router-dom'
import AdminNav from '../admin-dashboard-components/AdminNav'
import { useNavigate } from 'react-router-dom'

const Packages = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const packages = useSelector((state) => state.packages.packageslist)
  // console.log(packages)

  const CheckPageHandler = (Package_ID) =>{
    navigate(`/Student-dashboard/Packages/${Package_ID}`)
  }

  useEffect(() => {
    dispatch(fetchAllpackages())
  }, [dispatch])
  

  return (
    <>
    <AdminNav/>
    <div className='Package_mainPage_style'>
      <div className='Package_header_style'>
        <h6 className='text-dark'>Packages</h6>
      </div>
      <div className='Package_list_style mt-3'>
        {packages?.map((pack,index) =>{
          return(
          <div className='Package_card'>
            <h6 style={{fontSize:"18px"}}>{pack.Package_Name}</h6>
            {pack.Course_IDs.map((val) => <img className='packagegimg' src={val.Course_Images} alt=''/>)}
            <h6>{pack.Course_IDs.map((val) => val.Course_Name)}</h6>
            <p>{pack.Course_IDs.map((val) => val.Description.substring(0,220))}</p>
            <h6>Teachers Assigned</h6>
            <div className='d-flex flex-wrap justify-content-center w-100'>
                {pack?.Teacher_IDs?.map((teacher) => (
                  <span className='Courses_card_teacher_span mx-1' key={teacher._id}>{teacher.Username}</span>
                ))}
            </div>
            <div className='d-flex flex-wrap justify-content-center w-100 mt-3'>
                <span className='Courses_card_teacher_span mx-1' >Number_of_Lectures : {pack?.Number_of_Lectures}</span>
                <span className='Courses_card_teacher_span mx-1' >Package_Amount : {pack?.Package_Amount}</span>
            </div>
            <button onClick={() => CheckPageHandler(pack._id)} className='btn btn-outline-danger'>Book Now</button>                     
          </div>
        )})}
      </div>
    </div>
    </>
  )
}

export default Packages