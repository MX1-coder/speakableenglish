import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingsByStudentID } from "../../store/actions/bookingActions";
// import {Link } from 'react-router-dom'
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { toZonedTime, format as formatTz } from "date-fns-tz";
import { useTranslation } from "react-i18next";

const Bookings = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.students.user);
  const Bookings = useSelector((state) => state.bookings.StudentID_Booking);
  const navigate = useNavigate();
  console.log(Bookings);

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    dispatch(GetBookingsByStudentID(student?._id));
  }, [student._id, dispatch]);

  const roomHandler = (id) => {
    navigate(`/room/meeting/${id}`);
  };

  const EditBooking = (id) => {
    navigate(`/Student-dashboard/Bookings/edit-Booking/${id}`);
  };

  function convertToUserTimezone(dateString) {
    // Split the input date string
    const [datePart, timePartWithZone] = dateString.split(" at ");
    const [timePart, timeZonePart] = timePartWithZone.split(" GMT");

    // Convert the date part from "July 4, 2024" to "2024-07-04"
    console.log(datePart, "-----------before the converetion onto the dateobj");
    const dateObj = new Date(datePart);
    console.log(dateObj, "------AFTER the converetion onto the dateobj");
    const formattedDatePart = dateObj.toISOString().split("T")[0];

    // Format the timeZonePart correctly by adding a colon
    const formattedTimeZonePart =
      timeZonePart.slice(0, 3) + ":" + timeZonePart.slice(3);

    // Convert AM/PM time to 24-hour format
    const [time, period] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // Create ISO formatted date string
    const isoString = `${formattedDatePart}T${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:00${formattedTimeZonePart}`;

    console.log(isoString, "ISO formatted date string");

    // Parse the ISO formatted date string to a Date object
    const parsedDate = parseISO(isoString.trim());

    console.log(parsedDate, "Parsed Date");

    // Convert the parsed date to the user's local timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(parsedDate, timeZone);

    console.log(zonedDate, "Zoned Date");

    // Format the zoned date to a readable string in the user's local timezone
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const lastformatteddate = formatTz(zonedDate, "PPPPpppp", { timeZone });
    console.log(lastformatteddate, "-*------lastformatteddate");
    const lasttimePart = lastformatteddate.split(" at ")[1].split(" GMT")[0];
    return lasttimePart;
  }

  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">{t("StudentBooking.header")}</h6>
        </div>
        <div className="Student_list_style mt-3">
          <table className="table table-hover table-responsive table-borderless">
            <thead className="table-transparent">
              <tr>
                <th className="th">#</th>
                <th className="th">{t("StudentBooking.PackageName")}</th>
                <th className="th">{t("StudentBooking.TeacherName")}</th>
                <th className="th">{t("StudentBooking.Scheduled_Dates")}</th>
                <th className="th">{t("StudentBooking.Status")}</th>
                <th className="th">{t("StudentBooking.JoinButton")}</th>
                <th className="th">{t("StudentBooking.Action")}</th>
              </tr>
            </thead>
            <tbody>
              {Bookings?.length > 0 ? (
                Bookings?.map((Booking, index) => (
                  <tr
                    style={{
                      boxShadow:
                        "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                    }}
                    key={Booking?._id}
                  >
                    <td className="td">{index + 1}</td>
                    <td className="td">{Booking?.Package_ID?.Package_Name}</td>
                    <td className="td">
                      {Booking?.Teacher_ID?.map((teacher, index) => {
                        return teacher?.Username;
                      })}
                    </td>
                    <td className="td">
                      {/* {Booking?.Scheduled_Dates?.map((dateObj, index) => {
                        if (dateObj !== null && dateObj.length > 0) {
                          const date = Object?.keys(dateObj)[0]; // Extracting the date
                          const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
                          return (
                            <div key={index}>
                              {Object?.keys(timeSlots)?.map((date) => (
                                <div key={date}>
                                  <p>Date: {date}</p>
                                  <ul>
                                    {timeSlots[date]?.map((slot, index) => (
                                      <li key={index}>
                                        {slot?.start} - {slot?.end}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        }
                      })} */}
                      {Booking?.Scheduled_Dates?.map((dateObj, dateIndex) => {
                        if (dateObj !== null && dateObj.length > 0) {
                          const date = Object?.keys(dateObj)[0];
                          const timeSlots = dateObj[date];

                          return (
                            <div key={dateIndex}>
                              {Object?.keys(timeSlots)?.map((date) => (
                                <div key={date}>
                                  <p>Date: {date}</p>
                                  <ul>
                                    {timeSlots[date]?.map((slot, index) => {
                                      const startLocal = convertToUserTimezone(
                                        slot?.start
                                      );
                                      const endLocal = convertToUserTimezone(
                                        slot?.end
                                      );

                                      return (
                                        <li key={index}>
                                          {console.log(
                                            slot,
                                            " ------- at the point of rendering --------"
                                          )}
                                          {startLocal} - {endLocal}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </td>
                    <td className="td">{Booking?.Status}</td>
                    <td
                      onClick={() => roomHandler(Booking?._id)}
                      className="td"
                    >
                      {Booking.Status === "Cancelled" ? (
                        ""
                      ) : (
                        <button className="btn btn-outline-success meetingbtn">
                          {t("StudentBooking.JoinRoom")}
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="mx-1"
                        onClick={() => EditBooking(Booking?._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i class="bi bi-pen-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">{t("StudentBooking.footer")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bookings;
