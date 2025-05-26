import React from "react";
import DashboardOne from "../../assets/img/dashboard-img1.png";
import DashboardTwo from "../../assets/img/dashboard-img2.png";
import DashboardThree from "../../assets/img/dashboard-img3.png";
import AccountDetail from "../../assets/img/account-detail.png";
import LineChart from "../../components/VendorDashboard/LineChart";
import ExportSelect from "../../components/VendorDashboard/ExportSelect";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import AdvertisementSlider from "../../components/UserDashboard/AdvertisementSlider";
import TabCardImg from "../../assets/img/tabcard-img.png";
import {
  useGetAdvertisementListQuery,
  useGetVendorDashboardAnalyticsQuery,
} from "@/api/apiSlice";
import totalookings from "../../assets/img/totalookings.png";
import Loader from "@/components/loader/Loader";
import { useSelector } from "react-redux";
import { useState } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatDate = (date) => {
  if (!date) return;
  return format(new Date(date), "yyyy-MM-dd");
};

export default function VendorDash() {
  const user = useSelector((state) => state.auth.user);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { data, isLoading } = useGetVendorDashboardAnalyticsQuery({
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const { data: advertisement, isLoading: advertisementLoading } =
    useGetAdvertisementListQuery({
      page: page + 1,
      limit,
    });

  const dashboardData = [
    {
      title: "Total Customer",
      value: data?.data?.totalUniqueUsers || 0,
      image: DashboardOne,
    },
    {
      title: "Total Staff",
      value: data?.data?.totalStaff || 0,
      image: DashboardOne,
    },
    {
      title: "Total Bookings",
      value: data?.data?.totalBookings || 0,
      image: totalookings,
    },
    {
      title: "Total Service Listings",
      value: data?.data?.totalServiceListings || 0,
      image: DashboardThree,
    },
    {
      title: "Total Service Revenue",
      value: data?.data?.TotalServiceRevenue || 0,
      image: AccountDetail,
    },
    {
      title: "Confirm Bookings",
      value: data?.data?.confirmedBookings || 0,
      image: totalookings,
    },
    {
      title: "Pending Bookings",
      value: data?.data?.pendingBookings || 0,
      image: totalookings,
    },
    {
      title: "Cancelled Bookings",
      value: data?.data?.CancelledBookings || 0,
      image: totalookings,
    },
    {
      title: "Rejected Bookings",
      value: data?.data?.RejectedBookings || 0,
      image: totalookings,
    },
  ];

  const handleExportChange = async (type) => {
    console.log("Selected export type:", type);

    const bookingData = data?.chartdata || [];
    const summaryData = data?.data || {};

    if (type === "excel") {
      // --- Summary Sheet ---
      const summarySheet = XLSX.utils.aoa_to_sheet([
        ["Gala Tab Vendor Dashboard Report"],
        [""],
        ["Key", "Value"],
        ...Object.entries(summaryData).map(([key, value]) => [key, value]),
      ]);

      // --- Booking Sheet ---
      const bookingSheet = XLSX.utils.aoa_to_sheet([
        ["Gala Tab Vendor Dashboard Report"],
        [""],
        ["Date", "Booking Count"],
        ...bookingData.map((item) => [item._id, item.count]),
      ]);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
      XLSX.utils.book_append_sheet(workbook, bookingSheet, "Bookings");

      XLSX.writeFile(workbook, "analytics-bookings.xlsx");
    }

    if (type === "pdf") {
      const doc = new jsPDF();

      // Add bold title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Gala Tab Vendor Dashboard Report", 105, 10, {
        align: "center",
      });

      // --- Summary Table ---
      const summaryRows = Object.entries(summaryData).map(([key, value]) => [
        key,
        value,
      ]);
      autoTable(doc, {
        head: [["Key", "Value"]],
        body: summaryRows,
        startY: 20,
        theme: "striped",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [52, 152, 219] },
      });

      // --- Booking Table ---
      autoTable(doc, {
        head: [["Date", "Booking Count"]],
        body: bookingData.map((item) => [item._id, item.count]),
        startY: doc.lastAutoTable.finalY + 10,
        theme: "striped",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [46, 204, 113] },
      });

      doc.save("analytics-bookings.pdf");
    }
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#202224] min-h-[calc(100dvh-130px)] sm:p-5 p-3 rounded-[20px] flex flex-col justify-between">
      <div>
        <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-3">
          <div>
            <h4 className="font-semibold text-[#303C6C] dark:text-white text-2xl">
              Welcome to Your Dashboard!
            </h4>
            <p>Hi {user?.firstName}, 👋</p>
            <p>We’re glad to see you! </p>
          </div>
          <div className="flex md:flex-row flex-col gap-3 md:items-center justify-end">
            <div className="">
              <ExportSelect onChange={handleExportChange} />
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-4 gap-4">
          {dashboardData?.map((item, index) => {
            const numericValue = Number(item.value) || 0;
            const formattedValue = numericValue.toLocaleString();

            const displayValue =
              item?.title === "Total Service Revenue"
                ? `$${formattedValue}`
                : formattedValue;

            return (
              <div
                key={index}
                className="bg-white dark:bg-[#1f2937] shadow-sm rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold sm:text-base text-xs text-[#202224] dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-2xl font-semibold dark:text-white">
                    {displayValue}
                  </p>
                </div>
                <div className="p-2 rounded-md bg-transparent dark:bg-white">
                  <img
                    src={item.image}
                    alt=""
                    className="w-[20px] h-[20px] max-w-[20px] object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-12">
        <AdvertisementSlider advertisements={advertisement?.data || []} />
      </div>
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-3 mt-4 mx-2">
        <div>
          <h4 className="font-semibold text-[#303C6C] text-2xl dark:text-white">
            Bookings
          </h4>
        </div>
        <div className="flex md:flex-row flex-col gap-3 md:items-center justify-end">
          <div>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
            />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1f2937] mt-5 w-full h-[300px] md:h-[400px] p-5 rounded-[10px] shadow-[0px_0px_34px_0px_#00000014]">
        <LineChart data={data?.chartdata || []} />
      </div>
      <Loader loading={isLoading || advertisementLoading} />
    </div>
  );
}
