import React from "react";
import questionIcon from "../../../assets/img/questionIcon.png";
import { Link } from "react-router";

export default function StepTwo() {
  return (
    <div>
      <div>
        <label className="text-[14px] font-medium ps-3" htmlFor="Country">
          Country
        </label>
        <div className="flex items-center gap-2">
          <select
            className="w-full focus:outline-none p-4 shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] border border-[#D5D5D5]"
            type="text"
            name="Country"
            id="Country"
            title="First name used in your government-issued ID, written in English characters. If your name contains digits, type them in words."
          >
            <option value="Pakistan">Pakistan</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Pakistan">Pakistan</option>
          </select>
          <img src={questionIcon} alt="img" />
        </div>
      </div>
      <div className="mt-2">
        <label className="text-[14px] font-medium ps-3" htmlFor="StreetNO">
          Street and Number
        </label>
        <div className="flex items-center gap-2">
          <input
            className="w-full p-4 shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] border border-[#D5D5D5]"
            type="text"
            name="StreetNO"
            id="StreetNO"
            placeholder="Type here"
            title="First name used in your government-issued ID, written in English characters. If your name contains digits, type them in words."
          />
          <img src={questionIcon} alt="img" />
        </div>
      </div>
      <div className="mt-2">
        <label
          className="text-[14px] font-medium ps-3"
          htmlFor="addressdetails"
        >
          More address details (optional)
        </label>
        <div className="flex items-center gap-2">
          <input
            className="w-full p-4 shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] border border-[#D5D5D5]"
            type="text"
            name="addressdetails"
            id="addressdetails"
            placeholder="Type here"
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
