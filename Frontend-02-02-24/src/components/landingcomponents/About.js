import React from 'react'

const About = () => {
  return (
    <div className='col-md-12 About_main_div' id='About'>
      <div className='col-md-10  About_main_column_div'>
        <div className='col-md-6 col-sm-12 About_main_column_left_div'>
          <h2>Start your journey to a better life with online practical courses</h2>
          <div className='w-100 About_main_column_left_div_col'>
            <span>
              <i class="bi bi-people-fill"></i>
            </span>
             <div className='About_main_column_left_div_col_right'>
                <h3>Professional Trainers</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa <br/> voluptatibus.
                </p>
             </div>
          </div>
          <div className='w-100 About_main_column_left_div_col'>
            <span>
              <i class="bi bi-people-fill"></i>
            </span>
             <div className='About_main_column_left_div_col_right'>
                <h3>International Certifications</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa <br/> voluptatibus.
                </p>
             </div>
          </div>
          <div className='w-100 About_main_column_left_div_col'>
            <span>
              <i class="bi bi-people-fill"></i>
            </span>
             <div className='About_main_column_left_div_col_right'>
                <h3>Free for 3 months</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa <br/> voluptatibus.
                </p>
             </div>
          </div>


        </div>
        <div className='col-md-offset-1 col-md-5 col-sm-12 About_main_column_right_div'>
          <div className='About_main_column_right_form_div mt-2'>
            <h2>Signup today</h2>
            <form>
              <input 
                className=' w-100 input_style'
                placeholder='Full Name'
              />
               <input 
                className=' w-100 input_style'
                placeholder='Your Email address'
              />
               <input 
                className=' w-100 input_style'
                placeholder='Your Passowrd'
              />
              <button type='submit' className='btn btn-outline-light mt-3'>Get Started</button>
            </form>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default About