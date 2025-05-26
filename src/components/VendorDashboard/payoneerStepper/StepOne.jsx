import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import questionIcon from "../../../assets/img/questionIcon.png";
import CalenderIconBlack from "../../../assets/img/CalenderIconBlack.png";
import { Link } from "react-router";

export default function StepOne() {
  const [selectedDate, setSelectedDate] = useState(null);
  const datePickerRef = useRef(null);

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus(); // Programmatically focus the DatePicker
    }
  };

  return (
    <div>
      <div>
        <label className="text-[14px] font-medium ps-3" htmlFor="FName">
          First Name
        </label>
        <div className="flex items-center gap-2">
          <input
            className="w-full p-4 shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] border border-[#D5D5D5]"
            type="text"
            name="FName"
            id="FName"
            title="First name used in your government-issued ID, written in English characters. If your name contains digits, type them in words."
          />
          <img src={questionIcon} alt="img" />
        </div>
      </div>
      <div className="mt-2">
        <label className="text-[14px] font-medium ps-3" htmlFor="LName">
          Last Name
        </label>
        <div className="flex items-center gap-2">
          <input
            className="w-full p-4 shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] border border-[#D5D5D5]"
            type="text"
            name="LName"
            id="LName"
          />
          <img src={questionIcon} alt="img" />
        </div>
      </div>
      <div className="mt-2">
        <label className="text-[14px] font-medium ps-3" htmlFor="Email">
          Email
        </label>
        <div className="flex items-center gap-2">
          <input
            className="w-full p-4 shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] border border-[#D5D5D5]"
            type="email"
            name="Email"
            id="Email"
          />
          <img src={questionIcon} alt="img" />
        </div>
      </div>
      <div className="mt-2">
        <label className="text-[14px] font-medium ps-3" htmlFor="ConfirmEmail">
          Re-enter email address
        </label>
        <div className="flex items-center gap-2">
          <input
            className="w-full p-4 shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] border border-[#D5D5D5]"
            type="email"
            name="ConfirmEmail"
            id="ConfirmEmail"
          />
          <img src={questionIcon} alt="img" />
        </div>
      </div>
      <div className="mt-2">
        <label className="text-[14px] font-medium ps-3" htmlFor="DOB">
          Date of birth
        </label>
        <div className="flex items-center gap-2">
          <div className="w-full p-4 shadow-[0px_8px_24px_0px_#00000012] bg-white rounded-[10px] border border-[#D5D5D5]">
            <div className="flex items-center">
              <div className="w-full">
                <DatePicker
                  ref={datePickerRef}
                  className="w-full"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Choose a date"
                />
              </div>
              <button type="button" onClick={openDatePicker}>
                <img
                  className="size-6 shadow-[0px_0px_14px_0px_#0000001A]"
                  src={CalenderIconBlack}
                  alt="img"
                />
              </button>
            </div>
          </div>
          <img src={questionIcon} alt="img" />
        </div>
      </div>
      <div className="mt-3 mx-4">
        <p className="text-lg text-[#9A9A9A] ">
          By Clicking <span className="text-[#000000]">“NEXT”</span>, You
          confirm that you have read and understood the Payoneer{" "}
          <Link className="text-[#3551B6]">Privacy Policy</Link>, and agree to
          it's terms.
        </p>
      </div>
    </div>
  );
}
