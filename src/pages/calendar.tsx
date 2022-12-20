

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

const events = [
    
    {
        title: "Big Meeting",
        start: new Date(2023, 0, 12, 10, 30, 0, 0),
        end: new Date(2023, 0, 12, 12, 30, 0, 0),
    },
    {
        title: "Vacation",
        start: new Date(2023, 1, 5,10, 30, 0, 0),
        end: new Date(2023, 1, 5,12, 30, 0, 0),
    },
    {
        title: "Conference",
        start: new Date(2023, 1, 23,10, 30, 0, 0),
        end: new Date(2023, 1, 23,12, 30, 0, 0),
    },
];


const TermCalendar = () => {
    return ( <div>
        <Calendar className="text-emerald-200" localizer={localizer} startAccessor="start"
        endAccessor="end" events={events} style={{ height: 500, margin: "50px" }} />
    </div> );
}
 
export default TermCalendar;