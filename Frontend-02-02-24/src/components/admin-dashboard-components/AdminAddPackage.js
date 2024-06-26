import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeachers } from '../../store/actions/teachersActions';
import { Getcourses } from '../../store/actions/coursesActions';
import AdminNav from './AdminNav';
import { ToastContainer, toast } from 'react-toastify';
import { CreatePackage } from '../../store/actions/packagesActions';
import { useNavigate } from 'react-router-dom';

const AdminAddPackage = () => {
  const teachers = useSelector((state) => state.teachers.Teacherslist);
  const courses = useSelector((state) => state.courses.courseslist );
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(GetTeachers());
    dispatch(Getcourses());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Package_Name:"",
    Teachers_ID: [],
    Course_ID: [],
    Package_Amount: 0,
    Number_of_Lectures: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Teachers_ID' || name === 'Course_ID') {
      // Use an array to store multiple IDs
      setFormData((prevData) => ({
        ...prevData,
        [name]: [value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any of the fields are empty or arrays are empty
    if (
      !formData.Package_Name ||
      !formData.Teachers_ID.length ||
      !formData.Course_ID.length ||
      !formData.Package_Amount ||
      !formData.Number_of_Lectures
    ) {
      // Find the name of the empty field
      const emptyFieldName = !formData.Package_Name ? 'Name of the Package' :
        formData.Teachers_ID.length === 0 ? 'Teacher' :
        formData.Course_ID.length === 0 ? 'Course' :
        !formData.Package_Amount ? 'Purchase Price' :
        !formData.Number_of_Lectures ? 'Number of Lectures' : '';
  
      // Display a toast with the name of the empty field
      toast.error(`Please fill in the ${emptyFieldName} field`);
      return;
    }
  
    // Additional check for numeric fields
    if (isNaN(formData.Package_Amount) || isNaN(formData.Number_of_Lectures)) {
      toast.error('Purchase Price and Number of Lectures should be numeric values');
      return;
    }
  
    // Your existing logic for dispatching and resetting the form
    await dispatch(CreatePackage(formData));
  
    // Reset form fields after submission
    setFormData({
      Package_Name: "",
      Teachers_ID: [],
      Course_ID: [],
      Package_Amount: 0,
      Number_of_Lectures: 0
    });
  
    // Redirect to the desired location
    navigate('/Admin-Dashboard/Packages');
  };

  const handleCheckboxChange = (id, type) => {
    setFormData((prevData) => {
      const selectedItems = prevData[type].includes(id)
        ? prevData[type].filter((item) => item !== id)
        : [...prevData[type], id];
  
      return {
        ...prevData,
        [type]: selectedItems,
      };
    });
  };
  return (
    <>
      <AdminNav />
      <div className='AddCoursestyle'>
        <form onSubmit={handleSubmit}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
        <div className="form-group">
            <label htmlFor="Number_of_Lectures">Name of the Package</label>
            <input
              type="text"
              className="form-control"
              id="Package_Name"
              name="Package_Name"
              value={formData.Package_Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Teachers_ID">Select Teacher</label> &nbsp;&nbsp;
            {teachers?.map((values) => (
              <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.Teachers_ID.includes(values._id)}
                  onChange={() => handleCheckboxChange(values._id, 'Teachers_ID')}
                  className="form-check-input"
                />
                <label htmlFor={values._id} className="form-check-label">
                  {values.Username}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="Course_Name">Select Course</label> &nbsp;&nbsp;
            {courses?.map((values) => (
              <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.Course_ID.includes(values._id)}
                  onChange={() => handleCheckboxChange(values._id, 'Course_ID')}
                  className="form-check-input"
                />
                <label htmlFor={values._id} className="form-check-label">
                  {values.Course_Name}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="Amount">Purchase Price</label>
            <input
              type="number"
              className="form-control"
              id="Package_Amount"
              name="Package_Amount"
              value={formData.Package_Amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Number_of_Lectures">Number of Lectures</label>
            <input
              type="number"
              className="form-control"
              id="Number_of_Lectures"
              name="Number_of_Lectures"
              value={formData.Number_of_Lectures}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-outline-success mt-3 btn-course">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAddPackage;
