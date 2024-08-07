import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate, Outlet } from "react-router-dom";
import { async_removeuser } from "../../store/actions/studentsActions";
import { useTranslation } from "react-i18next";

const AccontantDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(async_removeuser());
    // console.log('---------------------logout accountant -------')
  };
  const [menuInactive, setMenuInactive] = useState(false);
    const [t, i18n] = useTranslation("global");
    const [currentLanguage, setcurrentLanguage] = useState("Language");

  useEffect(() => {
    navigate("/Accontant-Dashboard/dash");
  }, []);

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
          to="/Accontant-Dashboard/dash"
          className="Admin-Dashboard_main_left_header_div"
        >
          <h5 style={{ textAlign: "center" }}>
            {t("AccontantDashboard.header")}
          </h5>
          <h6 style={{ fontSize: "12px" }}>{t("AccontantDashboard.panel")}</h6>
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
              to="/Accontant-Dashboard/dash"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Accontant-Dashboard/dash"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>{t("AccontantDashboard.Dashboard")}</span>
            </NavLink>
            <NavLink
              to="/Accontant-Dashboard/Payments"
              className={`Admin-Dashboard_router_col_ ${
                location.pathname === "/Accontant-Dashboard/Payments"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-currency-dollar"></i>
              </span>
              <span>{t("AccontantDashboard.Payments")}</span>
            </NavLink>
            <NavLink
              onClick={logoutHandler}
              className={`Admin-Dashboard_router_col_ inactive `}
            >
              <span>
                <i className="bi bi-box-arrow-right"></i>
              </span>
              <span>{t("AccontantDashboard.Logout")}</span>
            </NavLink>
            <NavLink
              className="Admin-Dashboard_router_col_2"
              onClick={menuHandler}
            >
              <span>
                <i class="bi bi-list"></i>
              </span>
              <span>{t("AccontantDashboard.Menu")}</span>
            </NavLink>
          </div>
        ) : (
          <div className="Admin-Dashboard_main_left_router_div_2">
            <NavLink
              to="/Accontant-Dashboard/dash"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Accontant-Dashboard/dash"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-person-fill-gear"></i>
              </span>
              <span>{t("AccontantDashboard.Dashboard")}</span>
            </NavLink>
            <NavLink
              to="/Accontant-Dashboard/Payments"
              className={`Admin-Dashboard_router_col_3 ${
                location.pathname === "/Accontant-Dashboard/Payments"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span>
                <i className="bi bi-currency-dollar"></i>
              </span>
              <span>{t("AccontantDashboard.Payments")}</span>
            </NavLink>
            <NavLink
              onClick={logoutHandler}
              className={`Admin-Dashboard_router_col_3 inactive `}
            >
              <span>
                <i className="bi bi-box-arrow-right"></i>
              </span>
              <span>{t("AccontantDashboard.Logout")}</span>
            </NavLink>
            <NavLink
              className="Admin-Dashboard_router_col_3"
              onClick={closeMenuHandler}
            >
              <span>
                <i class="bi bi-x-square"></i>
              </span>
              <span>{t("AccontantDashboard.Close")}</span>
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

export default AccontantDashboard;
