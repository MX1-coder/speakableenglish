import React, { useEffect, useState } from "react";
import AdminNav from "../admin-dashboard-components/AdminNav";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllpayments } from "../../store/actions/paymentActions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccontantDash = () => {
  const dispatch = useDispatch();
  const PaymentData = useSelector((state) => state.payments.Allpaymentlist);
  const [totalIncome, setTotalIncome] = useState(0);
  const [Bookings, setBookings] = useState([]);
  const [fillterBookingData, setFillterBookingData] = useState(false);
  const [fillterDataValue, setFillterDataValue] = useState();
  const [date, setDate] = useState(new Date());
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllpayments());
  }, [dispatch]);

  useEffect(() => {
    if (PaymentData !== null && PaymentData.length > 0) {
      const AllBookings = PaymentData.map((payment, index) => {
        return payment.Booking_ID;
      });
      console.log(AllBookings);
      setBookings(AllBookings);
    }
  }, [PaymentData]);

  useEffect(() => {
    const total = PaymentData.reduce(
      (acc, payment) => acc + payment.Purchase_Amount,
      0
    );
    setTotalIncome(total);
  });

  const handleDownloadInvoice = (payment) => {
    if (payment._id) {
      navigate(`/Accontant-Dashboard/Payments/Invoice/${payment._id}`, {
        state: payment,
      });
    } else {
      console.error("Payment ID is undefined");
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date?.toDateString();
      if (Bookings !== null && Bookings !== undefined) {
        for (const booking of Bookings) {
          if (booking?.Scheduled_Dates) {
            if (booking?.Scheduled_Dates[0] !== null) {
              for (const scheduledDateObj of booking?.Scheduled_Dates) {
                for (const scheduledDates of scheduledDateObj) {
                  const scheduledDate = Object?.keys(scheduledDates);
                  for (const Dates of scheduledDate) {
                    const scheduledDateString = new Date(Dates)?.toDateString();
                    if (scheduledDateString === dateString) {
                      return <p className="bg-success text-white">L</p>;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return null;
  };

  const handleCalendarClick = (value) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const formattedDate = value.toLocaleDateString("en-US", options);
    const formattedDateWithoutComma = formattedDate.replace(/,/g, "");
    setFillterBookingData(true);
    setFillterDataValue(formattedDateWithoutComma);
  };

  return (
    <>
      <AdminNav />
      <div className="Dash_mainPage_style">
        <h6> {t("AccontantDash.header")}</h6>
        <div className="Admin-Dash_contnet_box">
          <div className="Teacher-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("AccontantDash.TotalIncome")}
            </span>
            <span style={{ color: "grey" }}>{totalIncome}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("AccontantDash.PackagesIncome")}
            </span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("AccontantDash.SessionIncome")}
            </span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("AccontantDash.TodysIncome")}
            </span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("AccontantDash.MonthIncome")}
            </span>
          </div>
        </div>
        <div className="Admin-Dash_list_box">
          <div className="Admin-Dash_student_list_box">
            <h6>{t("AccontantDash.Payments")}</h6>
            <div className="Admin-Dash_student_list_div">
              <table className="table table-hover table-responsive table-borderless">
                <thead className="table-transparent">
                  <tr>
                    <th className="th">{t("AccontantDash.pl1")}</th>
                    <th className="th">{t("AccontantDash.pl2")}</th>
                    <th className="th">{t("AccontantDash.pl3")}</th>
                    <th className="th">{t("AccontantDash.pl4")}</th>
                    <th className="th">{t("AccontantDash.pl5")}</th>
                    <th className="th">{t("AccontantDash.pl6")}</th>
                    <th className="th">{t("AccontantDash.pl7")}</th>
                    <th className="th">{t("AccontantDash.pl8")}</th>
                  </tr>
                </thead>
                <tbody>
                  {fillterBookingData ? (
                    <>
                      {PaymentData.length > 0 ? (
                        PaymentData?.map((payment, index) => {
                          const isDateMatched =
                            payment?.Booking_ID?.Scheduled_Dates?.some(
                              (dateObj) => {
                                if (dateObj) {
                                  for (const [key, value] of Object.entries(
                                    dateObj
                                  )) {
                                    for (const innerKey in value) {
                                      if (typeof value[innerKey] === "object") {
                                        if (innerKey === fillterDataValue) {
                                        }
                                      }
                                      return innerKey === fillterDataValue;
                                    }
                                  }
                                }
                              }
                            );
                          if (isDateMatched) {
                            return (
                              <tr
                                style={{
                                  boxShadow:
                                    "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                                }}
                                key={payment?._id}
                              >
                                <td className="td">{index + 1}</td>
                                <td className="td">
                                  {payment?.Package_ID?.Course_IDs?.map(
                                    (course, index) => {
                                      return (
                                        <div key={index}>
                                          <span>{course.Course_Name}</span>
                                        </div>
                                      );
                                    }
                                  )}
                                </td>
                                <td className="td">
                                  {payment?.Package_ID?.Teacher_IDs?.map(
                                    (teacher, index) => {
                                      return (
                                        <div key={index}>
                                          <span>{teacher.Username}</span>
                                        </div>
                                      );
                                    }
                                  )}
                                </td>
                                <td className="td">
                                  <span>{payment.Student_ID.Username}</span>
                                </td>
                                <td className="td">
                                  <span>{payment.Status}</span>
                                </td>
                                <td className="td">
                                  <span>{payment.Purchase_Amount}</span>
                                </td>
                                <td className="td">
                                  <span>{payment.Method}</span>
                                </td>
                                <td className="td">
                                  <button
                                    className="btn btn-outline-success"
                                    onClick={() =>
                                      handleDownloadInvoice(payment)
                                    }
                                  >
                                    {t("AccontantDash.pl8")}
                                  </button>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })
                      ) : (
                        <tr>
                          <td colSpan="4">{t("AccontantDash.footer")}</td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <>
                      {PaymentData?.length > 0 ? (
                        PaymentData?.map((payment, index) => (
                          <tr
                            style={{
                              boxShadow:
                                "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                            }}
                            key={payment?._id}
                          >
                            <td className="td">{index + 1}</td>
                            <td className="td">
                              {payment?.Package_ID?.Course_IDs?.map(
                                (course, index) => {
                                  return (
                                    <div key={index}>
                                      <span>{course.Course_Name}</span>
                                    </div>
                                  );
                                }
                              )}
                            </td>
                            <td className="td">
                              {payment?.Package_ID?.Teacher_IDs?.map(
                                (teacher, index) => {
                                  return (
                                    <div key={index}>
                                      <span>{teacher.Username}</span>
                                    </div>
                                  );
                                }
                              )}
                            </td>
                            <td className="td">
                              <span>{payment.Student_ID.Username}</span>
                            </td>
                            <td className="td">
                              <span>{payment.Status}</span>
                            </td>
                            <td className="td">
                              <span>{payment.Purchase_Amount}</span>
                            </td>
                            <td className="td">
                              <span>{payment.Method}</span>
                            </td>
                            <td className="td">
                              <button
                                className="btn btn-outline-success"
                                onClick={() => handleDownloadInvoice(payment)}
                              >
                                {t("AccontantDash.pl8")}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">{t("AccontantDash.footer")}</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Admin-Dash_student_calender_box">
            <h6>{t("AccontantDash.Event")}</h6>
            <br />
            <Calendar
              value={date}
              prev2Label={false}
              next2Label={false}
              tileContent={tileContent}
              onChange={handleCalendarClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccontantDash;
