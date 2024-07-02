import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { async_removeuser } from "../../store/actions/studentsActions";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuInactive, setMenuInactive] = useState(false);
  const [currentLanguage, setcurrentLanguage] = useState("Language");
  const [t, i18n] = useTranslation("global");

  const logoutHandler = () => {
    dispatch(async_removeuser());
    // console.log("logout ----------")
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
      <div
        className={`col-md-12 Admin-Dashboard_main_div ${
          menuInactive ? "inactive" : ""
        }`}
      >
        <div className="Admin-Dashboard_main_left_div">
          <NavLink
            to="/Admin-Dashboard/Dashboard"
            className="Admin-Dashboard_main_left_header_div"
          >
            <h5 style={{textAlign:"center"}}> {t("AdminDashboard.heading")}</h5>
            <span>{t("AdminDashboard.panel")}</span>
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
                to="/Admin-Dashboard/Dashboard"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Dashboard"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-speedometer2"></i>
                </span>
                <span>{t("AdminDashboard.subheading1")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Teachers"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Teachers" ||
                  location.pathname === "/Admin-Dashboard/Teachers/add-teacher"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-person-fill-add"></i>
                </span>
                <span>{t("AdminDashboard.subheading2")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Students"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Students"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-person-fill-gear"></i>
                </span>
                <span>{t("AdminDashboard.subheading3")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Courses"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Courses"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-box-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading4")}</span>
              </NavLink>

              <NavLink
                to="/Admin-Dashboard/Bookings"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Bookings"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-bookmark-dash-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading5")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Enquirys"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Enquirys"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-chat-right-quote-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading6")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Payments"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Payments"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-currency-dollar"></i>
                </span>
                <span>{t("AdminDashboard.subheading7")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Packages"
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Packages"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-basket3-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading8")}</span>
              </NavLink>
              <NavLink
                onClick={logoutHandler}
                className={`Admin-Dashboard_router_col_ ${
                  location.pathname === "/Admin-Dashboard/Logout"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-box-arrow-right"></i>
                </span>
                <span>{t("AdminDashboard.subheading9")}</span>
              </NavLink>
              <NavLink
                className="Admin-Dashboard_router_col_2"
                onClick={menuHandler}
              >
                <span>
                  <i class="bi bi-list"></i>
                </span>
                <span>{t("AdminDashboard.subheading10")}</span>
              </NavLink>
            </div>
          ) : (
            <div className="Admin-Dashboard_main_left_router_div_2">
              <NavLink
                to="/Admin-Dashboard/Dashboard"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Dashboard"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-speedometer2"></i>
                </span>
                <span>{t("AdminDashboard.subheading1")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Teachers"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Teachers" ||
                  location.pathname === "/Admin-Dashboard/Teachers/add-teacher"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-person-fill-add"></i>
                </span>
                <span>{t("AdminDashboard.subheading2")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Students"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Students"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-person-fill-gear"></i>
                </span>
                <span>{t("AdminDashboard.subheading3")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Courses"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Courses"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-box-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading4")}</span>
              </NavLink>
              {/* <NavLink
                to="/Admin-Dashboard/Meetings"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Meetings"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-clipboard-check-fill"></i>
                </span>
                <span>Meetings</span>
              </NavLink> */}
              <NavLink
                to="/Admin-Dashboard/Bookings"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Bookings"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-bookmark-dash-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading5")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Enquirys"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Enquirys"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-chat-right-quote-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading6")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Payments"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Payments"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-currency-dollar"></i>
                </span>
                <span>{t("AdminDashboard.subheading7")}</span>
              </NavLink>
              <NavLink
                to="/Admin-Dashboard/Packages"
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Packages"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-basket3-fill"></i>
                </span>
                <span>{t("AdminDashboard.subheading8")}</span>
              </NavLink>
              <NavLink
                onClick={logoutHandler}
                className={`Admin-Dashboard_router_col_3 ${
                  location.pathname === "/Admin-Dashboard/Logout"
                    ? "active"
                    : "inactive"
                }`}
              >
                <span>
                  <i class="bi bi-box-arrow-right"></i>
                </span>
                <span>{t("AdminDashboard.subheading9")}</span>
              </NavLink>
              <NavLink
                className="Admin-Dashboard_router_col_2"
                onClick={closeMenuHandler} // Handle close button click
              >
                <span>
                  <i class="bi bi-x-square"></i>
                </span>
                <span>{t("AdminDashboard.subheading11")}</span>
              </NavLink>
            </div>
          )}
        </div>
        <div className="Admin-Dashboard_main_right_div">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
