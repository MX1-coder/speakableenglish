import React from "react";
import { useTranslation } from "react-i18next";
import Review1_image from "../../assets/Review1_image.png";
import Review2_image from "../../assets/Review2_image.png"


const Reviews = () => {
  const [t, i18n] = useTranslation("global");


  return (
    <div className="  reviews_main_page_div" id="Reviews">
      <div className="reviews_main_upper_div">
        <h2>{t("Reviews.heading")}</h2>
        <small>{t("Reviews.subheading")}</small>
      </div>
      <div className="reviews_main_lower_div col-md-12">
        <div className=" reviews_main_lower_box">
          <div className="reviews_main_lower_box_header">
            <div className="reviews_main_lower_box_header_circle">
              <img src={Review1_image} alt={Review1_image} />
            </div>
            <div className="reviews_main_lower_box_header_heading">
              <h4>{t("Reviews.Review1_Name")}</h4>
              <span>{t("Reviews.Review1_Designation")}</span>
            </div>
          </div>
          <p>{t("Reviews.Review1_Content")}</p>
          <div className="reviews_main_lower_box_footer">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
        </div>
        <div className=" reviews_main_lower_box">
          <div className="reviews_main_lower_box_header">
            <div className="reviews_main_lower_box_header_circle">
              <img src={Review2_image} alt={Review2_image} />
            </div>
            <div className="reviews_main_lower_box_header_heading">
              <h4>{t("Reviews.Review2_Name")}</h4>
              <span>{t("Reviews.Review2_Designation")}</span>
            </div>
          </div>
          <p>{t("Reviews.Review2_Content")}</p>
          <div className="reviews_main_lower_box_footer">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
        </div>
        <div className=" reviews_main_lower_box">
          <div className="reviews_main_lower_box_header">
            <div className="reviews_main_lower_box_header_circle">
              <img
                src="https://themewagon.github.io/known/images/tst-image3.jpg"
                alt=""
              />
            </div>
            <div className="reviews_main_lower_box_header_heading">
              <h4>{t("Reviews.Review3_Name")}</h4>
              <span>{t("Reviews.Review3_Designation")}</span>
            </div>
          </div>
          <p>{t("Reviews.Review3_Content")}</p>
          <div className="reviews_main_lower_box_footer">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
