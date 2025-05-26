import { useGetStaffListQuery } from "@/api/apiSlice";
import StaffFilter from "@/components/adminDashboard/StaffFilter";
import StaffTable from "@/components/adminDashboard/StaffTable";
import DateRangePicker from "@/components/DatePicker/DateRangePicker";
import DeletePopup from "@/components/DeletePopup";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const Staff = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading } = useGetStaffListQuery({
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
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap border-b border-[#D6D6D6] pb-5 gap-5">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <p className="text-[28px] leading-normal font-semibold">Staff List</p>
        </div>
        <div className="flex items-center flex-wrap justify-end ms-auto gap-4">
          <button
            onClick={() =>
              navigate(
                `${
                  user?.role === "admin"
                    ? "/admin-dashboard/Add-New-Staff"
                    : user?.role === "vendor"
                    ? "/vendor-dashboard/Add-New-Staff"
                    : "/user-dashboard/Add-New-Staff"
                }`
              )
            }
            className="font-medium border inline-block cursor-pointer border-black bg-white dark:bg-gray-800 py-3 px-5 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          >
            Add Staff Member
          </button>
        </div>
      </div>
      <div className="mt-3">
        <StaffTable data={data?.data || []} />
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalStaff}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      <Loader loading={isLoading} />
    </div>
  );
};

export default Staff;
