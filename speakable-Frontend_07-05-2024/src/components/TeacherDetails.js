import React, { useEffect } from "react";
import Navbar from "./landingcomponents/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherDetails } from "../store/actions/teachersActions";
import noimage from "../assets/No-Image-Placeholder.svg.webp";

const TeacherDetails = () => {
  const navigate = useNavigate();
  const { TeacherID } = useParams();
  const dispatch = useDispatch();
  const teacherData = useSelector((state) => state.teachers.TeacherDetails);

  useEffect(() => {
    // Dispatch the action to fetch teacher details
    dispatch(fetchTeacherDetails(TeacherID));
  }, [dispatch, TeacherID]);


    const isAuthenticated = useSelector(
      (state) => state.students.isAuthenticated
    );
    const userType = useSelector((state) => state.students.userType);

    useEffect(() => {
      if (isAuthenticated > 0) {
        switch (userType) {
          case "student":
            navigate("/Student-dashboard/dash");
            break;
          case "teacher":
            navigate("/Teacher-dashboard/dash");
            break;
          case "admin":
            navigate("/Admin-Dashboard/Dashboard");
            break;
          case "accountant":
            navigate("/Accontant-Dashboard/dash");
            break;
          default:
            // navigate("/");
        }
      } else {
        // navigate("/");
      }
    }, [isAuthenticated, userType, navigate]);



  return (
    <>
      <Navbar />
      {/* <br />
      <br />
      <br /> */}
      {teacherData ? (
        <div className="TeacherDetails_main_div">
          <div className="TeacherDetails_left_col">
            <div className="TeacherDetails_left_img_col">
              {/* Update the image source with the actual image URL from your data */}
              <img
                src={
                  teacherData?.Profile_Image &&
                  teacherData?.Profile_Image?.length > 0
                    ? `https://ik.imagekit.io/8s3jwexmv/${teacherData?.Profile_Image}`
                    : noimage
                }
                alt={teacherData?.Profile_Image || "Teacher Image"}
              />
            </div>
          </div>
          <div className="TeacherDetails_right_col">
            <div>
              <span>Experience</span>
              <h2>{teacherData?.Username?.split(" ")[0]}</h2>
              <div className="TeacherDetails_right_col_line"></div>
            </div>
            <p>{teacherData.Description}</p>
            {/* <button
              onClick={() => NavigationHandler(teacherData?._id)}
              className="btn btn-outline-success p-2 w-25 mt-3"
            >
              Book Now
            </button> */}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TeacherDetails;
