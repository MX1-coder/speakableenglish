import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { async_removeuser } from "../../store/actions/studentsActions";
import { useTranslation } from "react-i18next";

const TeacherDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuInactive, setMenuInactive] = useState(false);
      const [currentLanguage, setcurrentLanguage] = useState("Language");
      const [t, i18n] = useTranslation("global");
  // console.log(menuInactive);
  useEffect(() => {
    navigate("/Teacher-dashboard/dash");
  }, []);

  const logoutHandler = () => {
    dispatch(async_removeuser());
    // console.log(" --------------------Teacher logout")
  };

  const menuHandler = () => {
    // Toggle menu's inactive/active status
    setMenuInactive(!menuInactive);
  };

  const closeMenuHandler = (e) => {
    e.preventDefault(); // Prevent default behavior of NavLink
    setMenuInactive(!menuInactive); // Close the menu
  };

      const handleChangeLanguage = (lang) => {
        if (lang === "pl") {
          setcurrentLanguage("Polsku");
        }
        if (lang === "en") {
          setcurrentLanguage("English");
        }
        i18n.changeLanguage(lang);
      };


  return (
    <div className="col-md-12  Admin-Dashboard_main_div">
      <div className="Admin-Dashboard_main_left_div">
        <NavLink
          to="/Teacher-dashboard/dash"
          className="Admin-Dashboard_main_left_header_div"
        >
          <h5 style={{textAlign:"center"}}>{t("TeacherDashboard.head")}</h5>
          <h6 style={{ fontSize: "12px" }}>{t("TeacherDashboard.panel")}</h6>
        </NavLink>
        <div className="dropdown">
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i class="bi bi-globe-central-south-asia mx-2"></i>
            {currentLanguage}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleChangeLanguage("en")}
              >
                {" "}
                <img
                  style={{
                    border: "0.01px solid rgb(8 8 8 / 46%)",
                    marginRight: "15px",
                  }}
                  width={25}
                  height={15}
                  src={require("../../assets/English.webp")}
                  alt="English"
                />{" "}
                English
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleChangeLanguage("pl")}
              >
                {" "}
                <img
                  style={{
                    border: "0.01px solid rgb(8 8 8 / 46%)",
                    marginRight: "15px",
                  }}
                  width={25}
                  height={15}
                  src={require("../../assets/Polish.png")}
                  alt="polish"
                />{" "}
                Polish
              </a>
            </li>
          </ul>
        </div>
        {!menuInactive ? (
          <div className="Admin-Dashboard_main_left_router_div">
            <NavLink
              to="/Teacher-dashboard/dash"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/dash"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span> {t("TeacherDashboard.subhead1")}</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/profile"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/profile"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>{t("TeacherDashboard.subhead2")}</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/Courses"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/Courses"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>{t("TeacherDashboard.subhead3")}</span>
            </NavLink>
            {/* <NavLink
              to="/Teacher-dashboard/Packages"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/Packages"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-basket3-fill"></i>
              </span>
              <span>Packages</span>
            </NavLink> */}
            <NavLink
              to="/Teacher-dashboard/Bookings"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Teacher-dashboard/Bookings"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-bookmark-dash-fill"></i>
              </span>
              <span>{t("TeacherDashboard.subhead4")} </span>
            </NavLink>

            <NavLink
              onClick={logoutHandler}
              className={`Admin-Dashboard_router_col_ inactive `}
            >
              <span>
                <i className="bi bi-box-arrow-right"></i>
              </span>
              <span>{t("TeacherDashboard.subhead5")}</span>
            </NavLink>
            <NavLink
              className="Admin-Dashboard_router_col_2"
              onClick={menuHandler}
            >
              <span>
                <i class="bi bi-list"></i>
              </span>
              <span>{t("TeacherDashboard.subhead5")}</span>
            </NavLink>
          </div>
        ) : (
          <div className="Admin-Dashboard_main_left_router_div_2">
            <NavLink
              to="/Teacher-dashboard/dash"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/dash"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>{t("TeacherDashboard.subhead1")}</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/profile"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/profile"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>{t("TeacherDashboard.subhead2")}</span>
            </NavLink>
            <NavLink
              to="/Teacher-dashboard/Courses"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/Courses"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>{t("TeacherDashboard.subhead3")}</span>
            </NavLink>
            {/* <NavLink
              to="/Teacher-dashboard/Packages"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/Packages"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-basket3-fill"></i>
              </span>
              <span>Packages</span>
            </NavLink> */}
            <NavLink
              to="/Teacher-dashboard/Bookings"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Teacher-dashboard/Bookings"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-bookmark-dash-fill"></i>
              </span>
              <span>{t("TeacherDashboard.subhead4")}</span>
            </NavLink>

            <NavLink
              onClick={logoutHandler}
              className={`Admin-Dashboard_router_col_3 inactive `}
            >
              <span>
                <i className="bi bi-box-arrow-right"></i>
              </span>
              <span>{t("TeacherDashboard.subhead5")}</span>
            </NavLink>
            <NavLink
              className="Admin-Dashboard_router_col_2"
              onClick={closeMenuHandler}
            >
              <span>
                <i class="bi bi-x-square"></i>
              </span>
              <span>{t("TeacherDashboard.Close")}</span>
            </NavLink>
          </div>
        )}
      </div>
      <div className="Admin-Dashboard_main_right_div">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard;
