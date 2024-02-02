import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetch5Teachers } from '../../store/actions/teachersActions';

const Ourteacher = () => {
  const dispatch = useDispatch();
  const teachersData = useSelector((state) => state.teachers.Teacherslist);

  useEffect(() => {
    dispatch(fetch5Teachers());
  }, [dispatch]);

  return (
    <div className='col-md-12 col-sm-6 ourteacher_main_page_div' id='OurTeachers'>
      <div className='ourteacher_main_upper_div'>
        <h2>Teachers</h2>
        <small>Meet Professional Trainers</small>
      </div>
      <div className='ourteacher_main_lower_div p-2 col-md-11 '>
        {teachersData?.map((teacher) => (
          <div key={teacher._id} className='col-sm-6 ourteacher_main_lower_box'>
            <img className='ourteacher_main_lower_div_img' src={`http://localhost:3000/images/${teacher.Profile_Image}`} alt='' />
            <div className='ourteacher_main_lower_box_div'>
              <Link to={`/TeacherDetails/${teacher._id}`} style={{ textDecoration: 'none', color: '#252020' }}>
                {/* <h3 >{teacher.Username}</h3> */}
                <h3 className='ourteacher_main_lower_box_Link_h3' >{teacher.Username.split(' ')[0]}</h3>
              </Link>
              <small>{teacher.Short_Title}</small>
            </div>
            {/* <div className='ourteacher_main_lower_box_lower_div'>
              {teacher.SocialLinks?.map((socialLink, index) => (
                <Link key={index} to={socialLink.link}>
                  <div className='hoverlink'>
                    <i className={`bi bi-${socialLink.platform}`}></i>
                  </div>
                </Link>
              ))}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourteacher;
