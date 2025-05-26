import React, { useState } from "react";
import MailAddressOne from "../../assets/img/mail-address-1.png";
import MailAddressTwo from "../../assets/img/mail-address-2.png";
import MailAddressThree from "../../assets/img/mail-address-3.png";
import MailAddressFour from "../../assets/img/mail-address-4.png";
import MailAddressFive from "../../assets/img/mail-address-5.png";
import DashboardOne from "../../assets/img/dashboard-img1.png";
import DashboardTwo from "../../assets/img/dashboard-img2.png";
import DashboardThree from "../../assets/img/dashboard-img3.png";
import AccountDetail from "../../assets/img/account-detail.png";
import Profile from "../../assets/img/profile.png";
import { IoPencil } from "react-icons/io5";
import {
  useGetAdminDashboardAnalyticsQuery,
  useGetAdminDashboardDetailsQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import DateRangePicker from "@/components/DatePicker/DateRangePicker";
import ExportSelect from "@/components/VendorDashboard/ExportSelect";
import LineChart from "@/components/VendorDashboard/LineChart";
import { format } from "date-fns";
import TableMui from "@/mui/TableMui";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatDate = (date) => {
  if (!date) return;
  return format(new Date(date), "yyyy-MM-dd");
};

const AdminDashboard = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { data, isLoading } = useGetAdminDashboardDetailsQuery();
  const user = data?.data;
  const { data: analytics, isLoading: analyticsLoading } =
    useGetAdminDashboardAnalyticsQuery({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  const userDetails = [
    {
      label: "First Name",
      value: user?.firstName || "N/A",
      icon: MailAddressOne,
    },
    {
      label: "Last Name",
      value: user?.lastName || "N/A",
      icon: MailAddressOne,
    },
    {
      label: "Email",
      value: user?.email || "N/A",
      icon: MailAddressTwo,
      verified: user?.emailVerified,
    },
    {
      label: "Mobile Number",
      value: user?.contact || "N/A",
      icon: MailAddressThree,
      verified: user?.contactVerified,
    },
  ];

  const dashboardData = [
    {
      title: "Total Venues",
      value: analytics?.data?.serviceListings || 0,
      image: DashboardThree,
    },
    {
      title: "Total Vendors",
      value: analytics?.data?.totalVendors || 0,
      image: DashboardOne,
    },
    {
      title: "Total Verified Vendors",
      value: analytics?.data?.totalVerifiedVendors || 0,
      image: DashboardOne,
    },
    {
      title: "Total Customer",
      value: analytics?.data?.totalCustomers || 0,
      image: DashboardOne,
    },
    {
      title: "Total Staff",
      value: analytics?.data?.totalStaff || 0,
      image: DashboardOne,
    },

    {
      title: "Total Service Revenue",
      value: analytics?.data?.totalServiceRevenue || 0,
      image: AccountDetail,
    },
    {
      title: "Total Net Revenue",
      value: analytics?.data?.totalNetRevenue || 0,
      image: AccountDetail,
    },
  ];

  const handleExportChange = async (type) => {
    console.log("Selected export type:", type);

    const userData = analytics?.lastLoginUsers || [];
    const summaryData = analytics?.data || {};
    const revenueData = analytics?.barchartdata || {};

    if (type === "excel") {
      const titleRow = [["Gala Tab Admin Dashboard Report"]];
      const emptyRow = [""];

      // 1. Summary Sheet
      const summarySheet = XLSX.utils.aoa_to_sheet([
        ...titleRow,
        emptyRow,
        ["Key", "Value"],
        ...Object.entries(summaryData),
      ]);

      // 2. Users Sheet
      const userSheet = XLSX.utils.aoa_to_sheet([
        ...titleRow,
        emptyRow,
        ["First Name", "Last Name", "Email", "Last Login"],
        ...userData.map((user) => [
          user.firstName,
          user.lastName,
          user.email,
          new Date(user.lastLoginAt).toLocaleString(),
        ]),
      ]);

      // 3. Revenue Sheet
      const revenueSheet = XLSX.utils.aoa_to_sheet([
        ...titleRow,
        emptyRow,
        ["Date", "Revenue"],
        ...revenueData.map((item) => [item._id, item.count]),
      ]);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
      XLSX.utils.book_append_sheet(workbook, userSheet, "Last Login Users");
      XLSX.utils.book_append_sheet(workbook, revenueSheet, "Revenue");

      XLSX.writeFile(workbook, "analytics-data.xlsx");
    }

    if (type === "pdf") {
      const doc = new jsPDF();

      // Add bold title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Gala Tab Admin Dashboard Report", 105, 10, { align: "center" });

      // 1. Summary Table
      const summaryRows = Object.entries(summaryData);
      autoTable(doc, {
        head: [["Key", "Value"]],
        body: summaryRows,
        startY: 20,
        theme: "striped",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [52, 152, 219] },
      });

      // 2. Users Table
      autoTable(doc, {
        head: [["First Name", "Last Name", "Email", "Last Login"]],
        body: userData.map((user) => [
          user.firstName,
          user.lastName,
          user.email,
          new Date(user.lastLoginAt).toLocaleString(),
        ]),
        startY: doc.lastAutoTable.finalY + 10,
        theme: "striped",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [46, 204, 113] },
      });

      // 3. Revenue Table
      autoTable(doc, {
        head: [["Date", "Revenue"]],
        body: revenueData.map((item) => [item._id, item.count]),
        startY: doc.lastAutoTable.finalY + 10,
        theme: "striped",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [241, 196, 15] },
      });

      doc.save("analytics-data.pdf");
    }
  };

  return (
    <>
      <div className="bg-[#F7F7F7] dark:bg-[#202224] min-h-[calc(100dvh-130px)] sm:p-5 p-3 rounded-[20px] flex flex-col">
        {user?.adminRole == "admin" && (
          <>
            {" "}
            <div>
              <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-[#303C6C] dark:text-white text-2xl">
                    Welcome to Your Dashboard!
                  </h4>
                  <p className=" text-[#303C6C] dark:text-white text-lg">
                    Hi {data?.data?.fullName}, 👋
                  </p>
                  <p className=" text-[#303C6C] dark:text-white text-sm">
                    We’re glad to see you!{" "}
                  </p>
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
                    item?.title === "Total Service Revenue" ||
                    item?.title === "Total Net Revenue"
                      ? `$${formattedValue}`
                      : formattedValue;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-[#1f2937] shadow-sm dark:shadow-md rounded-xl p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold sm:text-base text-xs text-[#202224] dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-2xl font-semibold text-black dark:text-white">
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
            <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-3 mt-4 mx-2">
              <div>
                <h4 className="font-semibold text-[#303C6C] text-2xl dark:text-white">
                  Revenue
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
            <div className="bg-white dark:bg-[#1f2937] w-full mt-12  h-[300px] md:h-[400px] p-5 rounded-[10px] shadow-[0px_0px_34px_0px_#00000014]">
              <LineChart data={analytics?.barchartdata || []} label="Revenue" />
            </div>
            <div className="p-5">
              <h4 className="font-semibold text-[#303C6C] text-2xl dark:text-white">
                Last Login Users
              </h4>

              <TableMui
                loading={analyticsLoading}
                th={{
                  firstName: "Full Name",
                  email: "Email",
                  lastLoginAt: "Login At",
                }}
                td={analytics?.lastLoginUsers || []}
                customFields={[
                  {
                    name: "firstName",
                    data: (value, data) => {
                      return (
                        <div className="flex items-center gap-2">
                          <img
                            className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                            src={data?.profilePicture || Profile}
                            alt=""
                            onError={(e) => {
                              e.target.src = Profile;
                            }}
                          />
                          <p className="text-[16px]">
                            {data?.firstName} {data?.lastName}
                          </p>
                        </div>
                      );
                    },
                  },
                  {
                    name: "lastLoginAt",
                    data: (value, data) => {
                      return (
                        <div className="flex items-center gap-2">
                          <p className="text-[16px]">
                            {dayjs(value).format("DD-MM-YYYY HH:mm")}
                          </p>
                        </div>
                      );
                    },
                  },
                ]}
              />
            </div>
          </>
        )}

        {user?.adminRole !== "admin" && (
          <>
            <div>
              <h4 className="font-semibold text-[#303C6C] dark:text-white text-2xl">
                Welcome to Your Dashboard!
              </h4>
              <p>Hi {data?.data?.fullName}, 👋</p>
              <p>We’re glad to see you! </p>
            </div>
            {/* Profile Section */}
            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img
                        src={user?.profilePicture || Profile}
                        alt=""
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-1 w-4 h-4 bg-[#0A8A01] rounded-full border border-white"></div>
                    </div>
                    <div>
                      <h5 className="font-semibold sm:text-lg text-[#303C6C] dark:text-white text-sm">
                        {data?.data?.fullName}
                      </h5>
                      <p className="text-base font-medium text-[#202224] dark:text-white">
                        {data?.data?.adminRole}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mt-6">
              <h4 className="text-[#303C6C] dark:text-white font-medium text-lg">
                Personal Information
              </h4>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 gap-3 mt-4">
                {userDetails.map((detail, index) => (
                  <div key={index} className="">
                    <h6 className="text-[#303C6C] dark:text-white text-lg font-medium mb-2">
                      {detail.label}
                    </h6>
                    <div className="flex items-center gap-2">
                      <img
                        src={detail.icon}
                        alt=""
                        className="w-4 h-4 object-contain dark:invert"
                      />
                      <p className="text-[#202224] dark:text-white font-medium text-base">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {user?.tasks?.length > 0 && (
              <div className="mt-8 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h4 className="text-[#303C6C] dark:text-white font-medium text-lg mt-6">
                  Tasks
                </h4>

                {user?.tasks?.map((template) => (
                  <div key={template._id}>
                    {template.tasks.map((task) => (
                      <div
                        key={task._id}
                        className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <ul className="list-disc pl-6 space-y-1 text-[#202224] dark:text-gray-200 text-base">
                          <li>
                            <strong className="text-[#303C6C] dark:text-gray-100">
                              Task Name:
                            </strong>{" "}
                            {task.taskName}
                          </li>
                          <li>
                            <strong className="text-[#303C6C] dark:text-gray-100">
                              Assigned By:
                            </strong>{" "}
                            {template.assignedby?.fullName}
                          </li>
                        </ul>
                        <h4 className="text-[#303C6C] dark:text-white font-medium text-base mt-3">
                          Task Description
                        </h4>
                        <p className="text-[#202224] dark:text-gray-300 text-base mt-1">
                          {task.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Loader loading={isLoading} />
    </>
  );
};

export default AdminDashboard;
