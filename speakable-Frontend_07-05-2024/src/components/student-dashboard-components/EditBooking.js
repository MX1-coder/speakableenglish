


import AdminNav from "../admin-dashboard-components/AdminNav";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GetExistingTeacherAvailability,
  Updatebooking,
  fetchAllbookings,
} from "../../store/actions/bookingActions";
import { parseISO, format } from "date-fns";
import { toZonedTime, format as formatTz } from "date-fns-tz";
import { useTranslation } from "react-i18next";

const EditBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BookingID } = useParams();
  const [status, setStatus] = useState("");
  const booking = useSelector((state) => state.bookings.Allbookinglist);
  const CurrentAvailableSlots = useSelector(
    (state) => state.bookings.Teacher_Availabile_Booking_Slots
  );
   const [t, i18n] = useTranslation("global");
  const currentbooking = booking.find((booking) => booking?._id === BookingID);
  const [SelectedSlot, setSelectedSlot] = useState([]);
  const [Availability, setAvailability] = useState([]);

  useEffect(() => {
    dispatch(fetchAllbookings());
    dispatch(GetExistingTeacherAvailability(BookingID));
  }, []);

  useEffect(() => {
    if (currentbooking) {
      setStatus(currentbooking.Status);
      setAvailability(CurrentAvailableSlots);
    }
  }, [currentbooking, CurrentAvailableSlots]);

  // const handleSlotSelection = (date, slot) => {
  //   console.log(date, slot);
  //   setSelectedSlot({
  //     [date]: [slot]
  //   });
  //   setSelectedSlot([SelectedSlot])
  // };
  const handleSlotSelection = (date, slot) => {
    const newSelectedSlot = { [date]: [slot] };
  
    // Check if the selected slot is already in the state
    const isSelected = Object.keys(SelectedSlot).some(
      (dateKey) => dateKey === date
    );
  
    // If the selected slot is already in the state, deselect it
    if (isSelected) {
      setSelectedSlot({});
    } else {
      // If not, select the new slot
      setSelectedSlot([newSelectedSlot]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = "Rescheduled";
    const updatedData = { status, SelectedSlot };
    try {
      console.log(updatedData);
      await dispatch(Updatebooking({ BookingID, updatedData }));
      navigate("/Student-dashboard/Bookings");
    } catch (error) {
      console.error("Error updating meeting status:", error);
    }
  };

  // console.log(Availability);

  
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
          <h6 className="text-dark">{t("EditBooking.heading")}</h6>
        </div>
        <div className="Student_list_style mt-3">
          <form onSubmit={handleSubmit}>
            {Availability?.map((dateSlots, index) => {
              // console.log(dateSlots);
              return (
                <div key={index}>
                  {Object.entries(dateSlots).map(
                    ([date, slots], innerIndex) => (
                      <div key={innerIndex}>
                        <h4>{date}</h4>
                        {slots.map((slot, slotIndex) => (
                          <div key={slotIndex}>
                            <input
                              type="checkbox"
                              id={`${index}-${slotIndex}`}
                              onChange={() => handleSlotSelection(date, slot)}
                            />
                            {/* <label htmlFor={`${index}-${slotIndex}`}>
                              {slot.start} - {slot.end}
                            </label> */}
                            <label
                              style={{
                                marginLeft: "10px",
                                marginBottom: "10px",
                              }}
                              htmlFor={`${index}-${slotIndex}`}
                            >
                              {convertToUserTimezone(slot.start)} -{" "}
                              {convertToUserTimezone(slot.end)}
                            </label>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              );
            })}
            <button type="submit" className="btn btn-outline-success">
              {t("EditBooking.Submit")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBooking;
