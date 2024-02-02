
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Getcourses } from '../../../store/actions/coursesActions';
import { GetTeachers, imageUpload, updateTeacher } from '../../../store/actions/teachersActions';
import AdminNav from '../AdminNav';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';


const AdminEditTeacher = () => {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courseslist);
  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const currentTeacher = teachers.find((teacher) => teacher._id === id);

  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Phone_Number: '',
    Address: '',
    Courses_assign: [],
    Purchase_Price: '',
    Description: '',  
    Short_Title: '',
    Email: '',
    Availability:[],
    Profile_Image: [],
    SocialLinks: [
      { platform: 'facebook', link: '' },
      { platform: 'twitter', link: '' },
      { platform: 'instagram', link: '' },
      // Add more social media platforms if needed
    ],
  });

  useEffect(() => {
    setFormData({
      Username: currentTeacher.Username || '',
      Password: currentTeacher.Password || '',
      Phone_Number: currentTeacher.Phone_Number || '',
      Address: currentTeacher.Address || '',
      Courses_assign: currentTeacher.Courses_assign || [],
      Purchase_Price: currentTeacher.Purchase_Price || '',
      Description: currentTeacher.Description || '',
      Short_Title: currentTeacher.Short_Title || '',
      Email: currentTeacher.Email || '',
      Availability:currentTeacher.Availability || '',
      Profile_Image: currentTeacher.Profile_Image || [],
      SocialLinks: currentTeacher.SocialLinks || [
        { platform: 'facebook', link: '' },
        { platform: 'twitter', link: '' },
        { platform: 'instagram', link: '' },
      ],
    });
  }, [currentTeacher]);

  useEffect(() => {
    dispatch(Getcourses());
    dispatch(GetTeachers());
  
    // Cleanup function
    return () => {
      // Perform cleanup operations if needed
    };
  }, [dispatch]); 


   // console.log('Current Teacher Courses_assign:', currentTeacher.Courses_assign);
  // console.log(JSON.stringify(currentTeacher.Courses_assign))

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleCheckboxChange = (courseid) => {
    setFormData((prevData) => {
      const isSelected = prevData.Courses_assign.some((course) => course._id === courseid);
      if (isSelected) {
        return {
          ...prevData,
          Courses_assign: prevData.Courses_assign.filter((course) => course._id !== courseid),
        };
      } else {
        return {
          ...prevData,
          Courses_assign: [...prevData.Courses_assign, { _id: courseid }],
        };
      }
    });
  };  

  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData({
      ...formData,
      Profile_Image: formData.Profile_Image?.length
        ? [...formData.Profile_Image, uploadResult.payload]
        : [uploadResult.payload],
    });
  };

  const handleSocialLinkChange = (index, platform, value) => {
    setFormData((prevData) => {
      const updatedSocialLinks = [...prevData.SocialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        platform,
        link: value,
      };
      return {
        ...prevData,
        SocialLinks: updatedSocialLinks,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = id;
    try {
      await dispatch(
        updateTeacher({
          teacherId,
          updatedData: {
            Username: formData.Username,
            Password: formData.Password,
            Phone_Number: formData.Phone_Number,
            Address: formData.Address,
            Courses_assign: formData.Courses_assign,
            Description: formData.Description,
            Short_Title: formData.Short_Title,
            Purchase_Price: formData.Purchase_Price,
            Availability_Date: formData.Availability,
            Profile_Image: formData.Profile_Image,
            SocialLinks: formData.SocialLinks,
            Email: formData.Email,
          },
        })
      );
      navigate('/Admin-Dashboard/Teachers');
    } catch (error) {
      console.error('Error editing teacher:', error);
    }
  };
  
  
  

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img !== val)],
    });
  };

  const handleDeleteAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      Availability: [],
    }));
  };

  const handleAddAvailability = (id) => {
    navigate(`/Admin-Dashboard/Teachers/edit-teacher/add-availability/${id}`, { state: { formData } });
  }

  const hasAvailability = formData.Availability.length > 0;
  
  return (
    <>
      <AdminNav />
      <div className='Add_Teachers_main_div'>
        <form onSubmit={handleSubmit}>
          {/* Image div */}
          <div className='Addteacherimage_box'>
            {formData.Profile_Image?.map((md, index) => {
              return (
                <div
                  className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2"
                  key={index}
                >
                  <a href="#">
                    <img
                      className="w-100 active"
                      src={"http://localhost:3000/images/" + md}
                      alt={`Image ${index + 1}`}
                    />
                  </a>
                  <span
                    className="badge bg-danger badge-pill badge-round ml-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleImageRemoval(md);
                    }}
                  >
                    Delete
                  </span>
                </div>
              );
            })}
          </div>
          {/* Image input Links */}
          {formData.Profile_Image?.length < 10 && (
            <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
              <div className="card-body">
                <p style={{ fontSize: "12px" }} className="card-text">
                  Select image file to upload.
                </p>
                {/* Basic file uploader */}
                <input
                  className="form-control"
                  encType="multipart/form-data"
                  type="file"
                  name="images"
                  id="formFile"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
          <div className='form_group_div  mt-2'>
            {/* Teacher Links */}
            <div className="form-group w-25">
              <input
                type="text"
                className="form-control"
                id="Username"
                name="Username"
                placeholder='Teacher Name'
                value={formData.Username}
                onChange={handleChange}
                required
              />
            </div>
            {/* Description Links */}
            <div className="form-group w-25 mx-5">
              <input
                type="text"
                className="form-control"
                id="Description"
                name="Description"
                placeholder='Description'
                value={formData.Description}
                onChange={handleChange}
                required
              />
            </div>
            {/* Phone number Links */}
            <div className="form-group w-25">
              <input
                type="number"
                className="form-control"
                id="Phone_Number"
                name="Phone_Number"
                placeholder='Phone Number'
                value={formData.Phone_Number}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='form_group_div mt-2'>
            {/* Password Links */}
            <div className="form-group w-25">
              <input
                type="Password"
                className="form-control"
                id="Password"
                name="Password"
                placeholder='Password'
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address Links */}
            <div className="form-group w-25 mx-5">
              <input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                placeholder='Address'
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Short Title Links */}
            <div className="form-group w-25">
              <input
                type="text"
                className="form-control"
                id="Short_Title"
                placeholder='Short_Title'
                name="Short_Title"
                value={formData.Short_Title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
              <div className='form_group_div mt-2'>
                {/* Course Assign Links */}
                <div className="form-group">
                <label htmlFor="Status">Select Courses</label> &nbsp;&nbsp;
                {courses?.map((values) => (
                <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.Courses_assign.some((course) => course._id === values._id)}
                  onChange={() => handleCheckboxChange(values._id)}
                  className="form-check-input"
                />
                <label htmlFor={values._id} className="form-check-label">
                  {values.Course_Name}
                </label>
                </div>
              ))}
            </div>
            {/* Purchase Links */}
            <div className="form-group w-25 mx-5">
              <input
                type="number"
                className="form-control"
                id="Purchase_Price"
                name="Purchase_Price"
                placeholder='Purchase Price'
                value={formData.Purchase_Price}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email Links */}
            <div className="form-group w-25">
              <input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                placeholder='Email'
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Social Links */}
          <div className="form-group w-100 mt-2 d-flex justify-content-between">
            {formData.SocialLinks?.map((socialLink, index) => (
              <div key={index} className="social-link-item w-25">
                <div className="form-group justify-content-between">
                  <input
                    type="text"
                    className="form-control "
                    placeholder={socialLink.platform}
                    value={socialLink.link}
                    onChange={(e) =>
                      handleSocialLinkChange(
                        index,
                        socialLink.platform,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Availability Links */}
          <div className="form-group mt-2">
            <label htmlFor="availability">Availability</label>
            {formData.Availability?.map((slot, index) => (
              <div key={index} className="availability-item p-2 mb-2">
                <div className="form-group">
                  <label>Available Dates</label>
                  {slot.Dates.map((date, dateIndex) => (
                    <div key={dateIndex}>
                      <label>{date}</label>
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label>Start Time</label>
                  {slot.Time.map((time, timeIndex) => (
                    time.map((t, i) => (
                      <div key={i}>
                        <label>{t}</label>
                      </div>
                    ))
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-delete-teacher delete-time"
                  onClick={() => handleDeleteAvailability(index)}
                >
                  Delete
                </button>
              </div>
            ))}

            {!hasAvailability && (
              <button
                type="button"
                onClick={() => handleAddAvailability(id)}
                className="btn btn-outline-success mt-3 w-100"
              >
                Add Availability
              </button>
            )}
          </div>

          {/* Submit button */}
          {hasAvailability && (
            <button type="submit" className="btn btn-outline-success mt-3 w-100">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
  
}

export default AdminEditTeacher