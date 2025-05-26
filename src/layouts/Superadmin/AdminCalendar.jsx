import React from "react";
import BookingCalendar from "../VendorDashboard/Calender/BookingCalender";
import { useLocation } from "react-router";

const AdminCalendar = () => {
  const location = useLocation();
  const date = location.state?.date || new Date();
  return (
    <div>
      <BookingCalendar date={date} />
    </div>
  );
};

export default AdminCalendar;
