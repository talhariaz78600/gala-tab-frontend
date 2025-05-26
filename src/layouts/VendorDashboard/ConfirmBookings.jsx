import React from "react";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import { Link } from "react-router";
import ConfirmBookingTable from "../../components/VendorDashboard/ConfirmBookingTable";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import { useState } from "react";
import { useGetBookingsListVendorQuery } from "@/api/apiSlice";
import PaginationComponent from "@/components/Pagination/TablePagination";
import Loader from "@/components/loader/Loader";
import { format } from "date-fns";
import { IoSearch } from "react-icons/io5";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";

const formatDate = (date) => {
  if (!date) return;
  return format(new Date(date), "yyyy-MM-dd");
};

export default function ConfirmBookings({ mode = "booked" }) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetBookingsListVendorQuery({
    page: page + 1,
    limit,
    serviceTypeId: selectedType,
    status: mode,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    search: delayedSearch,
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-[20px]">
      <div className="flex justify-between xl:items-center xl:flex-row flex-col border-b border-[#D6D6D6] p-5 gap-5">
        <div className="flex flex-wrap items-center gap-10">
          <p className="text-[28px] leading-normal font-semibold">
            {mode === "booked" ? "Confirmed Bookings" : "Completed Bookings"}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end ms-auto gap-4">
          <BasicSelect
            onSelect={(selectedType) => setSelectedType(selectedType)}
          />
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap justify-end gap-4">
          <label className="w-full md:max-w-[450px]" htmlFor="search">
            <div className="flex items-center bg-white dark:bg-gray-800 p-3 border rounded-[10px]">
              <IoSearch />
              <input
                className="w-full px-2 dark:bg-gray-800"
                type="search"
                name="search"
                id="search"
                placeholder="Search Keyword"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </label>
        </div>
        <ConfirmBookingTable data={data?.bookings} />
        <PaginationComponent
          currentPage={page}
          totalPages={data?.total}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <Loader loading={isLoading} />
    </div>
  );
}
