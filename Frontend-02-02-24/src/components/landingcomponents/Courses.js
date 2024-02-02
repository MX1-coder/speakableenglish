import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch5courses } from '../../store/actions/coursesActions';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = useSelector((state) => state.courses.courseslist);
  // console.log(courses)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch5courses());
  }, [dispatch]);

  return (
    <div className='Home_main_lower_div mt-3' id='Courses'>
      {courses.map((course, index) => (
        <div key={index} className='Home_main_lower_box'>
          <div className='Home_main_lower_box_circle'>
            <img src={`http://localhost:3000/images/${course.Course_Images}`} alt='' />
          </div>
          <Link className='Home_main_lower_box_Link' to={`/CourseDetails/${course._id}`}>{course.Course_Name}</Link>
          <p>{course.Description}</p>
          <p className='text-success'>${course.Purchase_Price}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
