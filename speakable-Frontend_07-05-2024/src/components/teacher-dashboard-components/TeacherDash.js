// import React, { useEffect } from "react";
// import AdminNav from "../admin-dashboard-components/AdminNav";
// import Calendar from "react-calendar";
// import { useDispatch, useSelector } from "react-redux";
// import { GetPackageByTeacherID } from "../../store/actions/packagesActions";
// import { GetBookingsByTeacherID } from "../../store/actions/bookingActions";
// import { useNavigate } from "react-router-dom";

// const TeacherDash = () => {
//   const teacher = useSelector((state) => state.students.user);
//   const packages = useSelector((state) => state.packages.Teacher_Packages);
//   const Bookings = useSelector((state) => state.bookings.Teacher_Bookings);
//   // console.log(packages)
//   // console.log(teacher)
//   // console.log(teacher._id)
//   console.log(Bookings);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(GetBookingsByTeacherID(teacher._id));
//     dispatch(GetPackageByTeacherID(teacher._id));
//   }, [dispatch]);

//   const totalLectures = packages.reduce((total, pack) => {
//     return total + (pack.Number_of_Lectures || 0);
//   }, 0);

//   // Function to count completed sessions
//   function countCompletedSessions(Bookings) {
//     if (!Bookings) {
//       return 0;
//     }

//     let completedSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Completed"
//       if (Booking.Status === "Completed") {
//         completedSessionsCount++;
//       }
//     }
//     return completedSessionsCount;
//   }

//   const completedSessions = countCompletedSessions(Bookings);

//   // Function to count sessions with "Pending" or "Scheduled" status
//   function countPendingOrScheduledSessions(Bookings) {
//     if (!Bookings) {
//       return 0;
//     }

//     let pendingOrScheduledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is either "Pending" or "Scheduled"
//       if (Booking.Status === "Pending" || Booking.Status === "Scheduled") {
//         pendingOrScheduledSessionsCount++;
//       }
//     }
//     return pendingOrScheduledSessionsCount;
//   }

//   // Call the function with your bookings data
//   const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);

//   // Function to count sessions with "Cancelled" status
//   function countCancelledSessions(Bookings) {
//     if (!Bookings) {
//       return 0;
//     }

//     let cancelledSessionsCount = 0;
//     // Iterate through each booking
//     for (const Booking of Bookings) {
//       // Check if the status is "Cancelled"
//       if (Booking.Status === "Cancelled") {
//         cancelledSessionsCount++;
//       }
//     }
//     return cancelledSessionsCount;
//   }

//   // Call the function with your bookings data
//   const cancelledSessions = countCancelledSessions(Bookings);

//   // -------------------------------------------------------------------------------------------------------------------------------------------

//   const roomHandler = (id) => {
//     navigate(`/room/meeting/${id}`);
//   };

//   return (
//     <>
//       <AdminNav />
//       <div className="Dash_mainPage_style">
//         <h6>Teacher Dashboard</h6>
//         <div className="Admin-Dash_contnet_box">
//           <div className="Teacher-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Total Income
//             </span>
//             <span style={{ color: "grey" }}>2038</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_div_img"
//               src="https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Total Lectures
//             </span>
//             <span style={{ color: "grey" }}>{totalLectures}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Complete Sessions
//             </span>
//             <span style={{ color: "grey" }}>{completedSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Remaining Sessions
//             </span>
//             <span style={{ color: "grey" }}>{pendingOrScheduledSessions}</span>
//           </div>
//           <div className="Admin-Dash_contnet_section_div">
//             <img
//               className="Admin-Dash_contnet_head_div_img"
//               src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
//               alt=""
//             />
//             <span className="Admin-Dash_contnet_head_div_span">
//               Cancelled Sessions
//             </span>
//             <span style={{ color: "grey" }}>{cancelledSessions}</span>
//           </div>
//         </div>
//         <div className="Admin-Dash_list_box">
//           <div className="Admin-Dash_student_list_box">
//             <h6>Meetings</h6>
//             <div className="Admin-Dash_student_list_div">
//               {/* <table className="table table-hover table-responsive table-borderless">
//                 <thead className="table-transparent">
//                   <tr>
//                     <th className="th">#</th>
//                     <th className="th">Package Name</th>
//                     <th className="th">Student Name</th>
//                     <th className="th">Joining_Url</th>
//                     <th className="th">Scheduled_Date</th>
//                     <th className="th">Start_time</th>
//                     <th className="th">End_time</th>
//                     <th className="th">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Bookings !== undefined && Bookings?.length > 0 ? (
//                     Bookings?.map((Booking, index) => (
//                       <tr
//                         style={{
//                           boxShadow:
//                             "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                         }}
//                         key={Booking?._id}
//                       >
//                         <td className="td">{index + 1}</td>
//                         <td className="td">
//                           {Booking?.Package_ID?.Package_Name}
//                         </td>
//                         <td className="td">{Booking?.Student_ID?.Username}</td>
//                         <td
//                           style={{ cursor: "pointer", color: "royalblue" }}
//                           className="td"
//                         >
//                           {Booking?.Meeting_ID?.Joining_Url?.substring(0, 10)}
//                         </td>
//                         <td className="td">{Booking?.Scheduled_Date}</td>
//                         <td className="td">{Booking?.Time_Slot?.Start_time}</td>
//                         <td className="td">{Booking?.Time_Slot?.End_time}</td>
//                         <td className="td">{Booking?.Status}</td>
//                         <td onClick={() => roomHandler(Booking._id)} className='td'><button className='btn btn-outline-success meetingbtn'>Join Room</button></td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4">No Bookings available</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table> */}
//               <table className="table table-hover table-responsive table-borderless">
//                 <thead className="table-transparent">
//                   <tr>
//                     <th className="th">#</th>
//                     <th className="th">Student Name</th>
//                     <th className="th">Scheduled_Dates</th>
//                     <th className="th">Status</th>
//                     <th className="th">Join Button</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Bookings?.length > 0 ? (
//                     Bookings?.map((Booking, index) => (
//                       <tr
//                         style={{
//                           boxShadow:
//                             "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
//                         }}
//                         key={Booking?._id}
//                       >
//                         <td className="td">{index + 1}</td>
//                         <td className="td">
//                           {Booking?.Teacher_ID?.map((teacher, index) => {
//                             return teacher.Username;
//                           })}
//                         </td>
//                         <td className="td">
//                           {Booking?.Scheduled_Dates?.map((dateObj, index) => {
//                             if(dateObj !== null){
//                               const date = Object.keys(dateObj)[0]; // Extracting the date
//                               const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
//                                     return (
//                                       <div key={index}>
//                                         {Object.keys(timeSlots).map((date) => (
//                                           <div key={date}>
//                                             <p>Date: {date}</p>
//                                             <ul>
//                                               {timeSlots[date].map(
//                                                 (slot, index) => (
//                                                   <li key={index}>
//                                                     {slot.start} - {slot.end}
//                                                   </li>
//                                                 )
//                                               )}
//                                             </ul>
//                                           </div>
//                                         ))}
//                                       </div>
//                                     );
//                             }
//                           })}
//                         </td>
//                         <td className="td">{Booking?.Status}</td>
//                         <td
//                           onClick={() => roomHandler(Booking._id)}
//                           className="td"
//                         >
//                           <button className="btn btn-outline-success meetingbtn">
//                             Join Room
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4">No Bookings available</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="Admin-Dash_student_calender_box">
//             <h6>Events - 2023 to 2024</h6>
//             <br />
//             <Calendar />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherDash;

//=======================================================================================================================================================================new

import React, { useEffect, useState } from "react";

import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { GetPackageByTeacherID } from "../../store/actions/packagesActions";
import { GetBookingsByTeacherID } from "../../store/actions/bookingActions";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import { parseISO, format } from "date-fns";
import { toZonedTime, format as formatTz } from "date-fns-tz";
import { useTranslation } from "react-i18next";

const TeacherDash = () => {
  const teacher = useSelector((state) => state.students.user);
  const packages = useSelector((state) => state.packages.Teacher_Packages);
  const Bookings = useSelector((state) => state.bookings.Teacher_Bookings);
  console.log(packages);
  const [date, setDate] = useState(new Date());
  const [fillterBookingData, setFillterBookingData] = useState(false);
  const [fillterDataValue, setFillterDataValue] = useState("");
  console.log(Bookings);
  const [totalLectures, setTotalLectures] = useState(0);
  console.log(teacher.Purchase_Price);
  const PurchasePrice = teacher.Purchase_Price;
  const [incomeOfTeacher, setIncomeOfTeacher] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [cancelledSessions, setCancelledSessions] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledStartTime, setScheduledStartTime] = useState("");
  const [scheduledEndTime, setScheduledEndTime] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonStates, setButtonStates] = useState([]);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    dispatch(GetBookingsByTeacherID(teacher._id));
    dispatch(GetPackageByTeacherID(teacher._id));
  }, [dispatch]);

  useEffect(() => {
    const newButtonStates = Bookings?.map((booking) => {
      let isEnabled = false;
      for (let dateArray of booking?.Scheduled_Dates) {
        for (let dateObj of dateArray) {
          const date = Object?.keys(dateObj)[0];
          const timeSlots = dateObj[date];
          if (timeSlots && timeSlots?.length > 0) {
            const slot = timeSlots[0];
            if (slot && slot?.start && slot?.end) {
              if (isWithinScheduledTime(date, slot?.start, slot?.end)) {
                isEnabled = true;
                break;
              }
            }
          }
        }
        if (isEnabled) break;
      }
      return isEnabled;
    });
    setButtonStates(newButtonStates);
  }, [Bookings]);
  // const totalLectures = packages.reduce((total, pack) => {
  //   return total + (pack.Number_of_Lectures || 0);
  // }, 0);

  // Function to count completed sessions
  function countCompletedSessions(Bookings) {
    if (!Bookings) {
      return 0;
    }

    let completedSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Bookings) {
      // Check if the status is "Completed"
      if (Booking.Status === "Completed") {
        completedSessionsCount++;
      }
    }
    return completedSessionsCount;
  }

  // Function to count sessions with "Pending" or "Scheduled" status
  function countPendingOrScheduledSessions(Bookings) {
    if (!Bookings) {
      return 0;
    }

    let pendingOrScheduledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Bookings) {
      // Check if the status is either "Pending" or "Scheduled"
      if (Booking.Status === "Rescheduled" || Booking.Status === "Scheduled") {
        pendingOrScheduledSessionsCount++;
      }
    }
    return pendingOrScheduledSessionsCount;
  }

  // Call the function with your bookings data
  const pendingOrScheduledSessions = countPendingOrScheduledSessions(Bookings);

  // Function to count sessions with "Cancelled" status
  function countCancelledSessions(Bookings) {
    if (!Bookings) {
      return 0;
    }

    let cancelledSessionsCount = 0;
    // Iterate through each booking
    for (const Booking of Bookings) {
      // Check if the status is "Cancelled"
      if (Booking.Status === "Cancelled") {
        cancelledSessionsCount++;
      }
    }
    return cancelledSessionsCount;
  }

  // Call the function with your bookings data

  // -------------------------------------------------------------------------------------------------------------------------------------------

  const roomHandler = (id) => {
    navigate(`/room/meeting/${id}`);
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

  console.log(fillterBookingData);
  console.log(fillterDataValue);

  Bookings?.Scheduled_Dates?.map((ele, indx) => console.log(ele));

  useEffect(() => {
    if (Bookings && Bookings.length > 0) {
      setTotalLectures(Bookings.length);
      setCompletedSessions(countCompletedSessions(Bookings));
      setCancelledSessions(countCancelledSessions(Bookings));
    }
  }, [Bookings]);

  useEffect(() => {
    const totalIncomeOfTeacher = () => {
      setIncomeOfTeacher(completedSessions * PurchasePrice);
    };

    totalIncomeOfTeacher();
  }, [completedSessions, PurchasePrice]);
  console.log(completedSessions, PurchasePrice);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update current time every minute

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (Bookings?.length > 0) {
      // Extract the first available date and slot for demo purposes
      for (let booking of Bookings) {
        for (let dateObj of booking?.Scheduled_Dates) {
          const date = Object.keys(dateObj)[0];
          const timeSlots = dateObj[date];
          for (let slot of Object.values(timeSlots)) {
            setScheduledDate(date);
            setScheduledStartTime(slot[0]?.start);
            setScheduledEndTime(slot[0]?.end);
            return; // Exit after the first set of values is found
          }
        }
      }
    }
  }, [Bookings]);

  const isWithinScheduledTime = (scheduledDate, startTime, endTime) => {
    const [startHour, startMinute] = startTime?.split(":")?.map(Number);
    const [endHour, endMinute] = endTime?.split(":")?.map(Number);
    const scheduledDateTimeStart = new Date(scheduledDate);
    const scheduledDateTimeEnd = new Date(scheduledDate);

    scheduledDateTimeStart.setHours(startHour, startMinute);
    scheduledDateTimeEnd.setHours(endHour, endMinute);

    const tenMinutesBefore = new Date(scheduledDateTimeStart);
    tenMinutesBefore.setMinutes(tenMinutesBefore.getMinutes() - 10);

    return (
      currentTime >= tenMinutesBefore && currentTime <= scheduledDateTimeEnd
    );
  };

  const isButtonEnabled = isWithinScheduledTime(
    scheduledDate,
    scheduledStartTime,
    scheduledEndTime
  );

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
      <div className="Dash_mainPage_style">
        <h6>{t("TeacherDash.head")}</h6>
        <div className="Admin-Dash_contnet_box">
          <div className="Teacher-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("TeacherDash.Subhead1")}
            </span>
            <span style={{ color: "grey" }}>{incomeOfTeacher}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_div_img"
              src="https://img.freepik.com/free-vector/university-student-cap-mortar-board-diploma_3446-334.jpg?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=sph"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("TeacherDash.Subhead2")}
            </span>
            <span style={{ color: "grey" }}>{totalLectures}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/9517/9517233.png?uid=R132339509&ga=GA1.1.1941482743.1703671287&semt=ais"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("TeacherDash.Subhead3")}
            </span>
            <span style={{ color: "grey" }}>{completedSessions}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/609/609183.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("TeacherDash.Subhead4")}
            </span>
            <span style={{ color: "grey" }}>{pendingOrScheduledSessions}</span>
          </div>
          <div className="Admin-Dash_contnet_section_div">
            <img
              className="Admin-Dash_contnet_head_div_img"
              src="https://cdn-icons-png.flaticon.com/128/1329/1329416.png?uid=R132339509&ga=GA1.2.1941482743.1703671287"
              alt=""
            />
            <span className="Admin-Dash_contnet_head_div_span">
              {t("TeacherDash.Subhead5")}
            </span>
            <span style={{ color: "grey" }}>{cancelledSessions}</span>
          </div>
        </div>
        <div className="Admin-Dash_list_box">
          <div className="Admin-Dash_student_list_box">
            <h6>{t("TeacherDash.Meetings")}</h6>
            <div className="Admin-Dash_student_list_div">
              <table className="table table-hover table-responsive table-borderless">
                <thead className="table-transparent">
                  <tr>
                    <th className="th">#</th>
                    <th className="th">{t("TeacherDash.Meetingshead1")}</th>
                    <th className="th">{t("TeacherDash.Meetingshead2")}</th>
                    <th className="th"> {t("TeacherDash.Meetingshead3")}</th>
                    <th className="th">{t("TeacherDash.Meetingshead4")}</th>
                  </tr>
                </thead>
                <tbody>
                  {fillterBookingData ? (
                    <>
                      {/* here */}
                      {Bookings?.length > 0 ? (
                        Bookings?.map((Booking, index) => {
                          const isDateMatched = Booking?.Scheduled_Dates?.some(
                            (dateObj) => {
                              if (dateObj) {
                                // Check if dateObj is not null
                                // Iterate over the entries of dateObj
                                for (const [key, value] of Object.entries(
                                  dateObj
                                )) {
                                  // Iterate over the properties of value
                                  for (const innerKey in value) {
                                    // Check if the value is an object
                                    if (typeof value[innerKey] === "object") {
                                      // If the key matches filterDataValue, do something
                                      if (innerKey === fillterDataValue) {
                                        // Do something if key matches filterDataValue
                                      }
                                      // Recursively call the function for nested objects if needed
                                      // iterate(obj[key]);
                                    }
                                    // If the innerKey matches filterDataValue, return true
                                    return innerKey === fillterDataValue;
                                  }
                                }
                              }
                              // Assuming fillterDataValue is defined elsewhere
                            }
                          );

                          // console.log(isDateMatched);
                          // If any date matches, render the booking
                          if (isDateMatched) {
                            return (
                              <tr
                                style={{
                                  boxShadow:
                                    "0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
                                }}
                                key={Booking?._id}
                              >
                                <td className="td">{index + 1}</td>
                                <td className="td">
                                  {Booking?.Student_ID?.Username}
                                </td>
                                <td className="td">
                                  {Booking?.Scheduled_Dates?.map(
                                    (dateObj, index) => {
                                      const date = Object.keys(dateObj)[0]; // Extracting the date
                                      const timeSlots = dateObj[date]; // Extracting the array of time slots for the date

                                      // return (
                                      //   <div key={index}>
                                      //     {Object?.keys(timeSlots).map(
                                      //       (date) => (
                                      //         <div key={date}>
                                      //           <p>Date: {date}</p>
                                      //           <ul>
                                      //             {timeSlots[date].map(
                                      //               (slot, index) => (
                                      //                 <li key={index}>
                                      //                   {slot.start} -{" "}
                                      //                   {slot.end}
                                      //                 </li>
                                      //               )
                                      //             )}
                                      //           </ul>
                                      //         </div>
                                      //       )
                                      //     )}
                                      //   </div>
                                      // );
                                      return (
                                        <div key={index}>
                                          {Object?.keys(timeSlots)?.map(
                                            (date) => (
                                              <div key={date}>
                                                <p>Date: {date}</p>
                                                <ul>
                                                  {timeSlots[date]?.map(
                                                    (slot, index) => {
                                                      const startLocal =
                                                        convertToUserTimezone(
                                                          slot?.start
                                                        );
                                                      const endLocal =
                                                        convertToUserTimezone(
                                                          slot?.end
                                                        );

                                                      return (
                                                        <li key={index}>
                                                          {console.log(
                                                            slot,
                                                            " ------- at the point of rendering --------"
                                                          )}
                                                          {startLocal} -{" "}
                                                          {endLocal}
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </td>
                                <td className="td">{Booking?.Status}</td>
                                <td className="tdexternal">
                                  <div
                                    key={Booking?._id}
                                    className="d-flex flex-row-reverse gap-1 align-items-center"
                                  >
                                    <button
                                      onClick={() => roomHandler(Booking?._id)}
                                      className={`btn meetingbtn w-100 ${
                                        buttonStates[index] // Check individual button's state
                                          ? "btn-outline-success" // Green outline if enabled
                                          : "btn-secondary" // Grey background if disabled
                                      }`}
                                      disabled={!buttonStates[index]}
                                    >
                                      {t("TeacherDash.JoinRoom")}
                                    </button>
                                    {Booking.Status !== "Cancelled" &&
                                      !buttonStates[index] && (
                                        <Tooltip title="The Join Room button will be enabled 10 minutes before the meeting starts.">
                                          <FaRegQuestionCircle
                                            className="fs-5"
                                            data-tip
                                            data-for="joinRoomTooltip"
                                          />
                                        </Tooltip>
                                      )}
                                  </div>
                                  <button
                                    // onClick={() => DispatchHandler()}
                                    className="btn btn-outline-warning meetingbtn mt-2"
                                  >
                                    {t("TeacherDash.YourMaterial")}
                                  </button>
                                </td>
                              </tr>
                            );
                          } else {
                            return null; // If no date matches, return null
                          }
                        })
                      ) : (
                        <tr>
                          <td colSpan="4"> {t("TeacherDash.footer")}</td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <>
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
                            <td className="td">
                              {/* {Booking?.Teacher_ID?.map((teacher, index) => {
                            return teacher.Username;
                          })} Student_ID*/}
                              {Booking?.Student_ID?.Username}
                            </td>
                            <td className="td">
                              {Booking?.Scheduled_Dates?.map(
                                (dateObj, index) => {
                                  if (dateObj !== null) {
                                    const date = Object.keys(dateObj)[0]; // Extracting the date
                                    const timeSlots = dateObj[date]; // Extracting the array of time slots for the date
                                    // return (
                                    //   <div key={index}>
                                    //     {Object.keys(timeSlots).map((date) => (
                                    //       <div key={date}>
                                    //         <p>Date: {date}</p>
                                    //         <ul>
                                    //           {timeSlots[date].map(
                                    //             (slot, index) => (
                                    //               <li key={index}>
                                    //                 {slot.start} - {slot.end}
                                    //               </li>
                                    //             )
                                    //           )}
                                    //         </ul>
                                    //       </div>
                                    //     ))}
                                    //   </div>
                                    // );

                                    return (
                                      <div key={index}>
                                        {Object?.keys(timeSlots)?.map(
                                          (date) => (
                                            <div key={date}>
                                              <p>Date: {date}</p>
                                              <ul>
                                                {timeSlots[date]?.map(
                                                  (slot, index) => {
                                                    const startLocal =
                                                      convertToUserTimezone(
                                                        slot?.start
                                                      );
                                                    const endLocal =
                                                      convertToUserTimezone(
                                                        slot?.end
                                                      );

                                                    return (
                                                      <li key={index}>
                                                        {console.log(
                                                          slot,
                                                          " ------- at the point of rendering --------"
                                                        )}
                                                        {startLocal} -{" "}
                                                        {endLocal}
                                                      </li>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    );
                                  }
                                }
                              )}
                            </td>
                            <td className="td">{Booking?.Status}</td>
                            <td className="td">
                              <div
                                key={Booking?._id}
                                className="d-flex flex-row-reverse gap-1 align-items-center"
                              >
                                <button
                                  onClick={() => roomHandler(Booking?._id)}
                                  className={`btn meetingbtn w-100 ${
                                    buttonStates[index] // Check individual button's state
                                      ? "btn-outline-success" // Green outline if enabled
                                      : "btn-secondary" // Grey background if disabled
                                  }`}
                                  disabled={!buttonStates[index]} // Disable button based on individual state
                                >
                                  {t("TeacherDash.JoinRoom")}
                                </button>
                                {Booking.Status !== "Cancelled" &&
                                  !buttonStates[index] && (
                                    <Tooltip title="The Join Room button will be enabled 10 minutes before the meeting starts.">
                                      <FaRegQuestionCircle
                                        className="fs-5"
                                        data-tip
                                        data-for="joinRoomTooltip"
                                      />
                                    </Tooltip>
                                  )}
                              </div>
                              <button
                                // onClick={() => DispatchHandler()}
                                className="btn btn-outline-warning meetingbtn mt-2 w-100"
                              >
                                {t("TeacherDash.YourMaterial")}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">{t("TeacherDash.footer")}</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Admin-Dash_student_calender_box">
            <h6>{t("TeacherDash.Events")}</h6>
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

export default TeacherDash;
