import React, { useState } from "react";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import { Link } from "react-router";
import PromoDiscountTable from "../../components/VendorDashboard/PromoDiscountTable";
import { IoSearch } from "react-icons/io5";
import {
  useDiscountDeleteMutation,
  useGetDiscountVendorListQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import DeletePopup from "@/components/DeletePopup";
import PaginationComponent from "@/components/Pagination/TablePagination";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { format } from "date-fns";

const formatDate = (date) => {
  if (!date) return;
  return format(new Date(date), "yyyy-MM-dd");
};

export default function VendorPromoDiscount() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const { data, isLoading } = useGetDiscountVendorListQuery({
    page: page + 1,
    limit,
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
      <div className="flex justify-between items-center flex-wrap border-b border-[#D6D6D6] p-5 gap-5 w-full">
        <div className="">
          <p className="text-[28px] leading-normal font-semibold">
            Promo Discount Codes
          </p>
        </div>
        <div className="flex flex-wrap-reverse items-center justify-end gap-4 ms-auto">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />
          <Link
            to="/vendor-dashboard/add-discount"
            className="font-medium border border-black bg-white dark:bg-gray-800 p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          >
            Add New Discount Code
          </Link>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-end">
          <label className="w-full max-w-[500px]" htmlFor="search">
            <div className="flex items-center bg-white dark:bg-gray-800  p-3 border rounded-[10px]">
              <IoSearch />
              <input
                className="w-full px-2 dark:bg-gray-800 "
                type="search"
                name="search"
                id="search"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </label>
        </div>
        <PromoDiscountTable data={data?.data} />
      </div>
      <PaginationComponent
        currentPage={page}
        totalPages={data?.totalDiscounts}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <Loader loading={isLoading} />
    </div>
  );
}
