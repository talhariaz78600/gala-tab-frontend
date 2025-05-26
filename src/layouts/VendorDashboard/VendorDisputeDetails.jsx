import React from "react";
import PersonalInfo from "../../components/adminDashboard/PersonalInfo";
import Profile from "../../assets/img/profile.png";
import elipsis from "../../assets/img/elipsis.png";
import PrintIcon from "../../assets/img/PrintIcon.png";
import { Link } from "react-router";

export default function VendorDisputeDetails() {
  return (
    <div className="bg-[#F7F7F7] min-h-[calc(100dvh-130px)] rounded-[20px]">
      <div className="p-5 border-b border-[#D6D6D6]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="font-semibold sm:text-[28px] text-[24px] text-black">
            Dispute Detail
          </h4>
          <div className="flex items-center gap-4 ms-auto">
            <img src={PrintIcon} alt="img" />
            <img src={elipsis} alt="img" />
          </div>
        </div>
        <div className="bg-white p-3 border rounded-xl shadow-sm mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img src={Profile} alt="" />
                  <div className="absolute bottom-0 right-1 w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
                </div>
                <div>
                  <h5 className="font-semibold sm:text-xl text-sm text-black">
                    Kevin full name here
                  </h5>
                  <p className="text-base font-medium text-[#202224]">Vendor</p>
                </div>
              </div>
            </div>
            <div>
              <Link
                to="/vendor-inbox"
                className="flex items-center border border-[#000000] text-[#ffffff] px-4 py-2 rounded-lg bg-black shadow-[0px_10px_20px_0px_#0000001A]"
              >
                Jump to Inbox
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <PersonalInfo />
        </div>
      </div>
      <div className="py-8 px-5 border-b border-[#D6D6D6]">
        <div className="flex flex-wrap gap-y-6 items-center justify-between max-w-[600px]">
          <div className="flex w-full md:w-fit">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-lg font-semibold">Company Name:</p>
                <p className="text-lg mt-2">Gala Tab Enterprises</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Name of Report:</p>
                <p className="text-lg mt-2">Gala Tab Enterprises</p>
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[120px] bg-[#0000001A] hidden md:block"></div>
          <div className="flex w-full md:w-fit">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-lg font-semibold">Report Date:</p>
                <p className="text-lg mt-2">Monday, September 16,2024</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Last Compiled Date:</p>
                <p className="text-lg mt-2">Monday, September 16,2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-8">
        <p className="text-[20px] text-[#303C6C] font-bold">Dispute Detail</p>
        <div className="mt-4 flex justify-between max-w-[500px]">
          <div>
            <p className="text-lg font-medium text-[#303C6C]">Booking ID</p>
            <p className="font-medium text-[#484848]">9090</p>
          </div>
          <div>
            <p className="text-lg font-medium text-[#303C6C]">Booking Name</p>
            <p className="font-medium text-[#484848]">Booking name here</p>
          </div>
        </div>
        <div className="mt-4 max-w-[500px]">
          <p className="text-lg font-medium text-[#303C6C]">
            Description for Dispute
          </p>
          <p className="font-medium text-[#202224] mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </div>
  );
}
