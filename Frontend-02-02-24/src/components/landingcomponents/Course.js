import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch5courses } from '../../store/actions/coursesActions';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Courses = () => {
  const courses = useSelector((state) => state.courses.courseslist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch5courses());
  }, [dispatch]);

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Set the number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const course_main_lower_div =  {
    padding:"50px"
  }
  

  return (
    <div  style={course_main_lower_div} id='Courses'>
      <Slider {...sliderSettings}>
        {courses.map((course, index) => (
          <div key={index} className='Home_main_lower_box d-flex'>
            <div className='Home_main_lower_box_circle'>
              <img src={`http://localhost:3000/images/${course.Course_Images}`} alt='' />
            </div>
            <Link className='Home_main_lower_box_Link' to={`/CourseDetails/${course._id}`}>{course.Course_Name}</Link>
            <p>{course.Description}</p>
            <p className='text-success'>${course.Purchase_Price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Courses;
