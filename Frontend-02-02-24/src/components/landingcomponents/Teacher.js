import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetch1teacher } from '../../store/actions/teachersActions';
// import { fetch1course } from '../../store/actions/coursesActions';

const Teacher = () => {
  const navigate = useNavigate();
  const NavigationHandler = () => {
    navigate('/Scedule-Meeting');
  };
  const dispatch = useDispatch();
  const teacherDetail = useSelector((state) => state.teachers.Teacher);
  useEffect(() => {
    dispatch(fetch1teacher());
    // console.log(teacherDetail)
  }, [dispatch]);

  return (
    <div className='col-md-12 teachers_main_div' id='Teacher'>
      {teacherDetail.map((teacher) => (
      <>
          <div key={teacher._id} className=' teachers_left_div'>
            <div className='teachers_left_img_div'>
             <img src={`http://localhost:3000/images/${teacher.Profile_Image}`} alt='' />
            </div>
          </div>
          <div className='teachers_right_div '>
            <Link to={`/TeacherDetails/${teacher._id}`} className='teachers_right_div_link'>
              <h3>{teacher.Username.split(' ')[0]}</h3>
            </Link>
            <p>{teacher.Description}</p>
            <button
              onClick={NavigationHandler}
              className='btn btn-outline-success  teachers_right_div_btn   mt-4 '
            >
              Book a free trial
            </button>
          </div>
      </>
      ))}
    </div>
  );
};

export default Teacher;
