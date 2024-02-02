import React, { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import AdminNav from '../AdminNav';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./App.css";
import {useNavigate } from "react-router-dom";

const AdminEditTeacherEditAvailability = () => {
    const {id} = useParams()
    const location = useLocation();
    const formDataFromPreviousComponent = location.state.formData;

    const locales = {
        "en-US": require("date-fns/locale/en-US"),
      };
      const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      });
      
      const [newEvent, setNewEvent] = useState({ start: null, end: null });
      const navigate = useNavigate();
    
      const handleAddEvent = () => {
        navigate(`/Admin-Dashboard/Teachers/add-teacher/add-availability/add-time/${id}`, { state: { formDataFromPreviousComponent, newEvent  } });
      }

    return (
        <>
        <AdminNav/>
        {/* <div>{JSON.stringify(formDataFromPreviousComponent, null, 2)}</div> */}
        <div className='Add_Teachers_main_div d-flex flex-column align-items-center'>
        <div className="w-50  d-flex justify-content-around align-items-center">
          <DatePicker
            placeholderText="Start Date"
            className="date-picker-style"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
          <DatePicker
            placeholderText="End Date"
            className="date-picker-style"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
          <button
            className="btn btn-outline-success "
            style={{fontSize:'10px'}}
            onClick={handleAddEvent}
          >
            Add Event & NEXT
          </button>
        </div>
        <Calendar
          localizer={localizer}
          views={['month']}
          events={[newEvent]} // Assuming allEvents is an array
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px",width:1000 ,zIndex:'-1'}}
        />
      </div>
        </>
    );
}

export default AdminEditTeacherEditAvailability