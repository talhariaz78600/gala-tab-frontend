import React, { useState } from "react";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import VenueReportsTable from "../../components/adminDashboard/VenueReportsTable";
import LineChart from "../../components/VendorDashboard/LineChart";
import DashboardTwo from "../../assets/img/dashboard-img2.png";
import AccountDetail from "../../assets/img/account-detail.png";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import ExportSelect from "../../components/VendorDashboard/ExportSelect";
import Vendor from "../../assets/img/vendorsmanagemnet.png";
import {
  useGetAdminDashboardAnalyticsQuery,
  useGetAllVendorsServicesReportQuery,
} from "@/api/apiSlice";
import DashboardThree from "../../assets/img/dashboard-img3.png";
import Loader from "@/components/loader/Loader";
import { format } from "date-fns";
import PaginationComponent from "@/components/Pagination/TablePagination";

const formatDate = (date) => {
  if (!date) return;
  return format(new Date(date), "yyyy-MM-dd");
};

export default function ReportsAndAnalytics() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedType, setSelectedType] = useState("");
  const { data, isLoading } = useGetAdminDashboardAnalyticsQuery({
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  });

  const { data: vendorData } = useGetAllVendorsServicesReportQuery({
    serviceTypeId: selectedType,
  });

  const dashboardData = [
    {
      title: "Total Venues",
      value: data?.data?.serviceListings || 0,
      image: DashboardThree,
    },

    {
      title: "Total Users",
      value: data?.data?.totalUsers || 0,
      image: Vendor,
    },
    {
      title: "Total Vendors",
      value: data?.data?.totalVendors || 0,
      image: Vendor,
    },
    {
      title: "Total Active Vendors",
      value: data?.data?.totalVerifiedVendors || 0,
      image: Vendor,
    },
    {
      title: "Total In-Active Vendors",
      value: data?.data?.totalUnverifiedVendors || 0,
      image: Vendor,
    },
    {
      title: "Total Customers",
      value: data?.data?.totalCustomers || 0,
      image: Vendor,
    },
    {
      title: "Total Active Customers",
      value: data?.data?.totalActiveCustomers || 0,
      image: Vendor,
    },
    {
      title: "Total In-Active Customers",
      value: data?.data?.totalInactiveCustomers || 0,
      image: Vendor,
    },

    {
      title: "Total Revenue",
      value: data?.data?.totalServiceRevenue || 0,
      image: AccountDetail,
    },
    // {
    //   title: "Total Net",
    //   value: "$ 324,3400",
    //   image: AccountDetail,
    // },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100dvh-130px)] p-5 rounded-[20px] flex flex-col justify-between">
      <div className="">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold sm:text-3xl text-xl">
                Reports and Analytics
              </h4>
            </div>
            <div className="flex flex-wrap justify-end items-center ms-auto gap-2">
              <div>
                <ExportSelect />
              </div>
            </div>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-4 gap-4">
            {dashboardData.map((item, index) => {
              const numericValue = Number(item.value) || 0;
              const formattedValue = numericValue.toLocaleString();

              const displayValue =
                item?.title === "Total Revenue"
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
        <div className="bg-white dark:bg-[#1f2937] mt-5 w-full h-[300px] md:h-[400px] p-5 rounded-[10px] shadow-[0px_0px_34px_0px_#00000014]">
          <LineChart data={data?.barchartdata || []} label="Revenue" />
        </div>
      </div>
      <div className="">
        <div className="flex items-center flex-wrap justify-between p-5 border-b">
          <p className="text-[28px] leading-normal font-semibold">
            Venue Reports
          </p>
          <div className="flex items-center flex-wrap-reverse gap-4 justify-end ms-auto">
            <BasicSelect
              onSelect={(selectedType) => setSelectedType(selectedType)}
            />
          </div>
        </div>
        <div className="p-5">
          <VenueReportsTable
            mode="admin"
            data={vendorData?.data?.serviceListings || []}
          />
          <PaginationComponent
            currentPage={page}
            totalPages={vendorData?.data?.totalCount}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
      <Loader loading={isLoading} />
    </div>
  );
}
