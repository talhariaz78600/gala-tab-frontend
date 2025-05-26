import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "../../assets/img/PrintIcon.png";
import { Link, useParams } from "react-router";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import BasicSelect from "../VendorDashboard/BasicSelect";
import Profile from "../../assets/img/profile.png";
import PersonalInfo from "./PersonalInfo";
import ReportChart from "./ReportChart";
import ReportsTable from "./ReportsTable";
import { useGetSingleVendorReportAnalyticsQuery } from "@/api/apiSlice";
import Loader from "../loader/Loader";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

export default function Reports({ userData }) {
  const componentRef = useRef();
  const params = useParams();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { id } = params;
  const { data, isLoading } = useGetSingleVendorReportAnalyticsQuery({
    id,
    params: {
      year: selectedYear,
    },
  });

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Vendor Report",
  });

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <p className="font-semibold text-[28px]">Venue Reports</p>
        <div className="flex ms-auto items-center justify-end flex-wrap gap-4">
          <button onClick={handlePrint}>
            <img src={PrintIcon} alt="img" />
          </button>
        </div>
      </div>
      <div className="p-6" ref={componentRef}>
        <div className="grid gap-6 md:divide-x md:grid-cols-2 mt-6">
          <div>
            <p className="text-lg font-semibold">Name of Report:</p>
            <p className="text-lg mt-2">Gala Tab Enterprises</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-[20px] shadow-[0px_0px_24px_0px_#00000012] mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    className="size-[100px] max-w-[100px] rounded-full"
                    src={userData?.profilePicture || Profile}
                    alt=""
                  />
                  <div className="absolute bottom-[5px] right-[9px] w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
                </div>
                <div>
                  <h5 className="font-semibold sm:text-xl text-sm">
                    {userData?.fullName}
                  </h5>
                  <p className="text-base font-medium text-[#202224] dark:text-white">
                    {" "}
                    {userData?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-b border-[#D6D6D6] pb-6">
          <PersonalInfo data={userData} />
        </div>
        <div className="my-6">
          <div className="w-full">
            <div>
              <div className="flex flex-wrap items-center justify-between my-2 mb-4">
                <p className="font-semibold text-[28px] text-gray-800 dark:text-white">
                  Revenue Report
                </p>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-base focus:outline-none bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-100"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[99%]">
                <ReportChart chartData={data?.data || []} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReportsTable data={data?.data || []} />
        </div>
      </div>

      <Loader loading={isLoading} />
    </div>
  );
}
