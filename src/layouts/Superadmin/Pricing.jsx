import React, { useState } from "react";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import BookingRequestTable from "../../components/VendorDashboard/BookingRequestTable";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import PricingTable from "../../components/adminDashboard/PricingTable";
import PaginationComponent from "@/components/Pagination/TablePagination";
import Loader from "@/components/loader/Loader";
import {
  useGetDefaultPricingListQuery,
  useGetPricingListQuery,
} from "@/api/apiSlice";
import DefaultPriceModal from "@/components/adminDashboard/DefaultPriceModal";
import { IoSearch } from "react-icons/io5";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";

export default function Pricing() {
  const [defaultPriceModal, setDefaultPriceModal] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetPricingListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });
  const { data: defaultPriceData, isLoading: defaultPricingLoading } =
    useGetDefaultPricingListQuery();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-[20px]">
      <div className="flex justify-between flex-wrap items-center border-b border-[#D6D6D6] p-5 gap-4 w-full">
        <div className="">
          <p className="text-[20px] sm:text-[26px] md:text-[28px] leading-normal font-semibold">
            Vendor pricing and percentages
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4 ms-auto">
          <button
            className="bg-black text-white py-2 px-5 rounded-md"
            onClick={() => setDefaultPriceModal(true)}
          >
            Set Default Pricing
          </button>

          {defaultPriceModal && (
            <DefaultPriceModal
              handleClose={() => setDefaultPriceModal(false)}
              currentDafaultID={defaultPriceData?.data?._id}
              currentDefaultPrice={defaultPriceData?.data?.pricingPercentage}
            />
          )}
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
        <PricingTable
          data={data?.data}
          defaultPriceData={defaultPriceData?.data?.pricingPercentage}
        />
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalVendors}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <Loader loading={isLoading || defaultPricingLoading} />
      </div>
    </div>
  );
}
