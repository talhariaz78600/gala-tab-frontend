import React from "react";
import { Link } from "react-router";
import callIcons from "../../assets/img/callIcons.png";
import BlackCheckbox from "../VendorDashboard/BlackCheckbox";

export default function UserPrivacyAndSharing() {
  return (
    <div>
      <p className="sm:text-[28px] text-xl font-semibold">Privacy and sharing</p>
      <div className="border-b border-[#CDCDCD] pb-5 mt-4">
        <p className="font-semibold sm:text-[20px]">Activity sharing</p>
        <p className="sm:text-lg mt-3">
          Decide how your profile and activity are shown to others.
        </p>
      </div>
      <div className="border-b border-[#CDCDCD] pb-5 mt-4 flex justify-between items-center gap-4 flex-wrap-reverse">
        <div>
          <p className="font-semibold sm:text-[20px]">Read Receipts</p>
          <p className="sm:text-lg mt-3">
            When this is on, we’ll show people that you’ve read their messages.
          </p>
        </div>
        <div className="ms-auto">
          <BlackCheckbox />
        </div>
      </div>
      <div className="border-b border-[#CDCDCD] pb-5 mt-4 flex justify-between items-center gap-4 flex-wrap-reverse">
        <div>
          <p className="font-semibold sm:text-[20px]">
            Include my listing(s) in search engines
          </p>
          <p className="sm:text-lg mt-3">
            Turning this on means search engines, like Google, will display your
            listing page(s) in search results.
          </p>
        </div>
        <div className="ms-auto">
          <BlackCheckbox />
        </div>
      </div>
      <div className="border-b border-[#CDCDCD] pb-5 mt-4 flex justify-between items-center gap-4 flex-wrap-reverse">
        <div>
          <p className="font-semibold sm:text-[20px]">Reviews</p>
          <p className="sm:text-lg mt-3">
            Choose what’s shared when you write a review. Updating this setting
            will change what’s displayed for all past reviews.
          </p>
        </div>
        <div className="ms-auto">
          <BlackCheckbox />
        </div>
      </div>
      <div className="border-b border-[#CDCDCD] pb-5 mt-4 flex justify-between items-center gap-4 flex-wrap-reverse">
        <div>
          <p className="font-semibold sm:text-[20px]">
            Show my Service Listing city and country
          </p>
          <p className="sm:text-lg mt-3">
            When this is on, your home location (ex: city and country) may be
            included with your reviews.
          </p>
        </div>
        <div className="ms-auto">
          <BlackCheckbox />
        </div>
      </div>
      <div className="flex my-8">
        <div className="ms-auto">
          <Link className="flex items-center text-[14px] font-medium text-white bg-black py-3 px-6 rounded-full">
            <img className="size-5 max-w-5 me-2" src={callIcons} alt="img" />
            <span>Help</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
