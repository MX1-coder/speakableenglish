import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Delete_Package,
  fetchAllpackages,
} from "../../store/actions/packagesActions";
import { useTranslation } from "react-i18next";

const AdminPackages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.packages.packageslist);
  console.log(packages);
  const [searchInput, setSearchInput] = useState("");
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    dispatch(fetchAllpackages());
  }, [dispatch]);

  const DeletePackage = (id) => {
    dispatch(Delete_Package(id));
    // dispatch(fetchAllpackages())
  };

  const EditPackage = (PackageID) => {
    navigate(`/Admin-Dashboard/Packages/edit-package/${PackageID}`);
  };

  const filteredPackages = packages.filter((ele) =>
    ele.Package_Name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <AdminNav
        value={searchInput}
        setValue={setSearchInput}
        placeholder={t("AdminPackages.placeholder")}
      />
      <div className="Packages_mainPage_style">
        <div className="Packages_header_style">
          <h6 className="text-dark">{t("AdminPackages.heading")}</h6>
          <button className="btn btn-outline-success">
            <Link
              style={{ textDecoration: "none", color: "initial" }}
              to="/Admin-Dashboard/Packages/add-package"
            >
              {t("AdminPackages.AddPackage")}
            </Link>
          </button>
        </div>
        <div className="Packages_list_style d-flex flex-wrap flex-row">
          {filteredPackages && filteredPackages.length > 0 ? (
            <table className="table table-hover table-responsive table-borderless">
              <thead className="table-transparent">
                <tr>
                  <th className="th"> {t("AdminPackages.subheading1")}</th>
                  <th className="th">{t("AdminPackages.subheading2")}</th>
                  <th className="th">{t("AdminPackages.subheading3")}</th>
                  <th className="th">{t("AdminPackages.subheading4")}</th>
                  <th className="th">{t("AdminPackages.subheading5")}</th>
                  <th className="th">{t("AdminPackages.subheading6")}</th>
                  <th className="th">{t("AdminPackages.subheading7")}</th>
                  <th className="th">{t("AdminPackages.subheading8")} </th>
                  <th className="th">{t("AdminPackages.subheading9")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages?.map((pack) => (
                  <tr
                    style={{
                      boxShadow:
                        "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                    }}
                    key={pack._id}
                  >
                    <td className="td">{pack.Package_Name}</td>
                    <td className="td">
                      {pack?.Teacher_IDs?.map((teacher, index) => (
                        <span key={index}>
                          {`${teacher._id}${
                            index !== pack.Teacher_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>

                    <td className="td">
                      {pack?.Teacher_IDs?.map((teacher, index) => (
                        <span key={index}>
                          {`${teacher.Username}${
                            index !== pack.Teacher_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>
                    <td className="td">
                      {pack?.Course_IDs?.map((course, index) => (
                        <span key={index}>
                          {`${course._id}${
                            index !== pack.Course_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>
                    <td className="td">
                      {pack?.Course_IDs?.map((course, index) => (
                        <span key={index}>
                          {`${course.Course_Name}${
                            index !== pack.Course_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>
                    <td className="td">{pack?.Package_Amount}</td>
                    <td className="td">{pack?.Number_of_Lectures}</td>
                    <td className="td">
                      {pack?.Free_Package ? "true" : "false"}
                    </td>
                    <td className="td">
                      <button
                        className="mx-2"
                        onClick={() => EditPackage(pack?._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i className="bi bi-pen-fill"></i>
                      </button>
                      <button
                        onClick={() => DeletePackage(pack?._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p>{t("AdminPackages.footer")}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPackages;
