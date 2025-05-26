import React from "react";
import BookingCalender from "./Calender/BookingCalender";
import { useLocation } from "react-router";

const CalendarVendor = () => {
  const location = useLocation();
  const date = location.state?.date || new Date();
  return (
    <div>
      <BookingCalender date={date} />
    </div>
  );
};

export default CalendarVendor;
