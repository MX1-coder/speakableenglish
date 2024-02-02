// Navbar component
import React, { useState } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Speakableimg from "../../Speakableimg.jpg"
import SignupFormPopup from '../SignupFormPopup';
import SigninFormPopup from '../SigninFormPopup';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [SignupformPopup, setSignupformPopup] = useState(false)
  const [SigninformPopup, setSigninformPopup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navigateHandler = () => {
    navigate('/')
  }
  const openSignupFormPopup = () => {
    setSignupformPopup(true);
  };

  const closeSignupFormPopup = () => {
    setSignupformPopup(false);
  };

  const openSigninFormPopup = () => {
    setSigninformPopup(true);
  };

  const closeSigninFormPopup = () => {
    setSigninformPopup(false);
  };

  const scrollTo = (elementId) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      scroll.scrollTo(targetElement.offsetTop - 70, {
        smooth: true,
        duration: 500,
      });
    }
  };

  const handleLinkClick = (elementId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollTo(elementId);
      }, 100);
    } else {
      scrollTo(elementId);
    }
  };

  return (
    <div className='col-md-12 col-sm-12 Navbar_main'>
      <div className='Navbar_nav_firstdiv'>
        <img style={{cursor:"pointer"}} onClick={navigateHandler} src={Speakableimg} alt='' />
      </div>
      <div className='Navbar_nav_div'>
        <ScrollLink
          to='Home'
          onClick={() => handleLinkClick('Home')}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{cursor:'pointer'}}
          className='d_center text-decoration-none Navlink '
          activeClass='active'
        >
          Home
        </ScrollLink>
        <ScrollLink
          to='Courses'
          onClick={() => handleLinkClick('Courses')}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{cursor:'pointer'}}
          className='d_center text-decoration-none Navlink'
          activeClass='active'
        >
          Courses
        </ScrollLink>
        <ScrollLink
          to='Teacher'
          onClick={() => handleLinkClick('Teacher')}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{cursor:'pointer'}}
          className='d_center text-decoration-none Navlink'
          activeClass='active'
        >
          Teacher
        </ScrollLink>
        <ScrollLink
          to='About'
          onClick={() => handleLinkClick('About')}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{cursor:'pointer'}}
          className='d_center text-decoration-none Navlink'
          activeClass='active'
        >
          About
        </ScrollLink>
        <ScrollLink
          to='OurTeachers'
          onClick={() => handleLinkClick('OurTeachers')}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{cursor:'pointer'}}
          className='d_center text-decoration-none Navlink'
          activeClass='active'
        >
          OurTeachers
        </ScrollLink>
        <ScrollLink
          to='Reviews'
          onClick={() => handleLinkClick('Reviews')}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{cursor:'pointer'}}
          className='d_center text-decoration-none Navlink'
          activeClass='active'
        >
          Reviews
        </ScrollLink>
        <ScrollLink
          to='Contact'
          onClick={() => handleLinkClick('Contact')}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{cursor:'pointer'}}
          className='d_center text-decoration-none Navlink'
          activeClass='active'
        >
          Contact
        </ScrollLink>
        {/* Repeat for other links */}
      </div>
      <div className='Navbar_nav_lastdiv'>
        <button className='btn btn-outline-success nav-btn-sign mx-3' onClick={openSignupFormPopup}>Signup</button>
        <button className='btn btn-outline-success nav-btn-sign' onClick={openSigninFormPopup}>Signin</button>
      </div>

      {SignupformPopup && <SignupFormPopup handleClose={closeSignupFormPopup} />}
      {SigninformPopup && <SigninFormPopup handleClose={closeSigninFormPopup} />}
    </div>
  );
}

export default Navbar;
