import React, { useState } from "react";
import BasicSelect from "../VendorDashboard/BasicSelect";
import DateRangePicker from "../DatePicker/DateRangePicker";
import { Link, useParams } from "react-router";
import StaffTable from "./StaffTable";
import StaffFilter from "./StaffFilter";
import { useGetVendorStaffListQuery } from "@/api/apiSlice";
import PaginationComponent from "../Pagination/TablePagination";
import Loader from "../loader/Loader";

export default function StaffList() {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { id } = params;

  const { data, isLoading } = useGetVendorStaffListQuery({
    id,
    params: {
      page: page + 1,
      limit,
    },
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
        <div className="flex items-center flex-wrap justify-end ms-auto gap-4"></div>
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
        <Loader loading={isLoading} />
      </div>
    </div>
  );
}
