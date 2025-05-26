import React, { useState } from "react";
import { Link } from "react-router";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import PayoutCard from "../../components/VendorDashboard/PayoutCard";
import revenueIcon from "../../assets/img/revenue-icon.png";
import PayOutTable from "../../components/VendorDashboard/PayOutTable";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import { useGetVendorPayoutsListQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";

export default function PayOutDetails() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetVendorPayoutsListQuery({
    page: page + 1,
    limit,
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const payoutData = [
    {
      img: revenueIcon,
      title: "Earning",
      amount: data?.totalEarnings || 0,
    },
  ];

  return (
    <>
      <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-[20px]">
        <div className="flex justify-between items-center flex-wrap border-b border-[#D6D6D6] p-5 gap-5">
          <div className="flex flex-wrap items-center gap-x-10">
            <p className="text-[28px] leading-normal font-semibold">
              Payout Details
            </p>
          </div>
          <div className="flex flex-wrap-reverse items-center ms-auto gap-4 justify-end">
            <DateRangePicker />
            {/* <Link
              to="/vendor-dashboard/PayOut"
              className="font-medium border border-black bg-white py-3 px-5 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
            >
              Add Payment
            </Link> */}
          </div>
        </div>
        <div className="flex flex-wrap-reverse gap-4 justify-between p-5">
          <div className="w-full grid md:grid-cols-2 max-w-[700px] gap-4">
            {payoutData.map((data, index) => (
              <PayoutCard
                key={index}
                img={data.img}
                title={data.title}
                amount={data.amount}
              />
            ))}
          </div>
          <div className="ms-auto">
            <BasicSelect />
          </div>
        </div>
        <div className="p-5 mt-8">
          <PayOutTable data={data?.data} />
          <PaginationComponent
            currentPage={page}
            totalPages={data?.totalPayments}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <Loader loading={isLoading} />
        </div>
      </div>
    </>
  );
}
