import React from "react";
import PrintIcon from "../../assets/img/PrintIcon.png";
import { Link } from "react-router";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import Profile from "../../assets/img/profile.png";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import PersonalInfo from "../../components/adminDashboard/PersonalInfo";
import ReportChart from "../../components/adminDashboard/ReportChart";
import ReportsTable from "../../components/adminDashboard/ReportsTable";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";

export default function VenueReportsDetails() {
  return (
    <div className="bg-[#f7f7f7] rounded-[20px]">
      <div className="p-5 border-b flex items-center justify-between flex-wrap gap-4">
        <p className="font-semibold text-[28px]">Venue Reports</p>
        <div className="ms-auto">
          <DateRangePicker />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex ms-auto items-center justify-end flex-wrap gap-4">
            <button>
              <img src={PrintIcon} alt="img" />
            </button>
            <div>
              <Link to='/admin-dashboard/export-venue-reports' className="p-3 bg-white border text-[#979797] border-[#D3D3D3] rounded-[5px] flex items-center gap-2">
                <MdOutlineFileUpload className="text-[24px]" /> Export Report{" "}
                <FaCaretDown />
              </Link>
            </div>
            <BasicSelect />
          </div>
        </div>
        <div className="bg-white p-3 border rounded-[20px] shadow-[0px_0px_24px_0px_#00000012] mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    className="size-[100px] max-w-[100px] rounded-full"
                    src={Profile}
                    alt=""
                  />
                  <div className="absolute bottom-[5px] right-[9px] w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
                </div>
                <div>
                  <h5 className="font-semibold sm:text-xl text-sm">
                    Kevin full name here
                  </h5>
                  <p className="text-base font-medium text-[#202224]">Vendor</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 ms-auto justify-end">
              <Link
                to="#"
                className="flex items-center gap-2 border border-[#000000] text-[#ffffff] px-4 py-2 rounded-[8px] bg-black shadow-[0px_10px_20px_0px_#0000001A]"
              >
                Jump to Inbox
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-b border-[#D6D6D6] pb-6">
          <PersonalInfo />
        </div>
        <div className="my-6">
          <div className="grid xl:grid-cols-2">
            <div className="grid gap-6 md:divide-x md:grid-cols-2">
              <div className="flex">
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
              <div className="flex md:justify-center">
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
            <div className="w-[99%]">
              <ReportChart />
            </div>
          </div>
        </div>
        <div>
          <ReportsTable />
        </div>
      </div>
    </div>
  );
}
