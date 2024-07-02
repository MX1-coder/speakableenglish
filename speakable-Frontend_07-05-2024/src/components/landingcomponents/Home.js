import React from "react";
import Slider from "react-slick";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const Home = ({ onLetsChatClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [t, i18n] = useTranslation("global");

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    prevArrow: <></>, // Removing previous arrow
    nextArrow: <></>,
  };
  
  const scrollTo = (elementId) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      scroll.scrollTo(targetElement.offsetTop - 70, {
        smooth: true,
        duration: 500,
      });
    }
  };
  const handleLinkClick = (elementId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollTo(elementId);
      }, 100);
    } else {
      scrollTo(elementId);
    }
  };

  return (
    <div className="Home_main_div col-md-12" id="Home">
      <dispatchEvent>
        <Slider {...settings}>
          {/* Add your carousel slides here */}
          <div className="top-sliderMain">
            <div className="Home_main_upper_div_col1">
              {/* <div className="col-md-10  Home_text_div_col1 "> */}
              <div className="bannereDiv">
                <h2>{t("Home.header")}</h2>
                <h6>{t("Home.headerpara1")}</h6>
                <div className="bannerScroll">
                  <ScrollLink
                    to="Chatbox"
                    onClick={() => handleLinkClick("Chatbox")}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    style={{ cursor: "pointer" }}
                    // className="d_center text-decoration-none Navlink "
                    activeClass="active"
                  >
                    <button
                      className="btn btn-outline-light   rounded-5 banner-Btn"
                      onClick={onLetsChatClick}
                    >
                      {t("Home.headerbtn1")}
                    </button>
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
          <div className="top-sliderMain">
            <div className="Home_main_upper_div_col2">
              <div className="bannereDiv">
                <h2>{t("Home.headerhead1")}</h2>
                <h6>{t("Home.headerpara2")}</h6>
                <div className="bannerScroll">
                  <ScrollLink
                    to="About"
                    onClick={() => handleLinkClick("About")}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    style={{ cursor: "pointer" }}
                    // className="d_center text-decoration-none Navlink "
                    activeClass="active"
                  >
                    <button className="btn btn-outline-light   rounded-5 banner-Btn">
                      {t("Home.headerbtn2")}
                    </button>
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>

          <div className="top-sliderMain">
            <div className="Home_main_upper_div_col3">
              <div className="bannereDiv">
                <h2>{t("Home.headerhead2")}</h2>
                <h6>{t("Home.headerpara3")}</h6>

                <div className="bannerScroll">
                  <ScrollLink
                    to="Courses"
                    onClick={() => handleLinkClick("Courses")}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    style={{ cursor: "pointer" }}
                    activeClass="active"
                  >
                    <button className="btn btn-outline-light   rounded-5 banner-Btn">
                      {t("Home.headerbtn3")} 
                    </button>
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </dispatchEvent>
    </div>
  );
};

export default Home;
