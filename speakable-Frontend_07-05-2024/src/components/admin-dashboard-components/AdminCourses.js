import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCourses, Getcourses } from '../../store/actions/coursesActions';
import AdminNav from './AdminNav';
import { useTranslation } from "react-i18next";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.AllCourseslist);
 const [searchInput, setSearchInput] = useState("");
  const [t, i18n] = useTranslation("global");
console.log(courses);
  useEffect(() => {
    dispatch(Getcourses());
  }, [dispatch]);

  const DeleteCourse = (courseID) => {
    console.log(courseID , "courseID");
    dispatch(DeleteCourses(courseID));
    // window.location.reload();
  };

  

  const EditCourse = (e) => {
    navigate(`/Admin-Dashboard/Courses/edit-Courses/${e}`);
  };

   const filteredCourses = courses?.filter((co) =>
     co?.Course_Name?.toLowerCase()?.includes(searchInput?.toLowerCase())
   );

  return (
    <>
      <AdminNav
        value={searchInput}
        setValue={setSearchInput}
        placeholder={t("AdminCourses.placeholder")}
      />

      <div className="Course_mainPage_style">
        <div className="Course_header_style">
          <h6 className="text-dark"> {t("AdminCourses.heading")}</h6>
          <Link to="/Admin-Dashboard/Courses/add-courses">
            <button className="btn btn-outline-success">
              {t("AdminCourses.Addcourses")}
            </button>
          </Link>
        </div>
        <div className="Course_list_style mt-3">
          {filteredCourses?.length > 0 ? (
            filteredCourses?.map((Courses) => (
              <div key={Courses?._id} className="Courses_card p-2">
                <div className="Courses_card_img_div">
                  <img
                    src={`https://ik.imagekit.io/8s3jwexmv/${Courses?.Course_Images}`}
                    alt=""
                  />
                </div>
                <h5>{Courses?.Course_Name}</h5>
                <p>{Courses?.Description}</p>
                <span>PLN{Courses?.Purchase_Price}</span>
                <h6>{t("AdminCourses.teachers")}</h6>
                <div className="d-flex flex-wrap justify-content-center w-100">
                  {Courses?.Teachers_Details?.map((teacher) => (
                    <span
                      className="Courses_card_teacher_span mx-1"
                      key={teacher?._id}
                    >
                      {teacher?.Username}
                    </span>
                  ))}
                </div>
                <div className="w-100 d-flex justify-content-center admincoursetbn_div">
                  <button
                    onClick={(e) => EditCourse(Courses._id)}
                    className="btn btn-outline-success mx-3"
                  >
                    {t("AdminCourses.editcourses")}
                  </button>
                  <button
                    onClick={(e) => DeleteCourse(Courses._id)}
                    className="btn btn-outline-danger"
                  >
                    {t("AdminCourses.deletecourses")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>{t("AdminCourses.footer")}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCourses;
