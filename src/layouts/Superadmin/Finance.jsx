import React, { useState } from "react";
import ExportSelect from "../../components/VendorDashboard/ExportSelect";
import FinanceTable from "../../components/adminDashboard/FinanceTable";
import {
  useGetPayOutsListQuery,
  useLazyExportAllPayOutsFileQuery,
} from "@/api/apiSlice";
import PaginationComponent from "@/components/Pagination/TablePagination";
import Loader from "@/components/loader/Loader";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { IoSearch } from "react-icons/io5";

export default function Finance() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetPayOutsListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [
    triggerfile,
    { data: pdfData, error: pdfError, isLoading: isPdfLoading },
  ] = useLazyExportAllPayOutsFileQuery();

  const handleExportChange = async (type) => {
    console.log("Selected export type:", type);

    try {
      const response = await triggerfile({ type });

      if (response?.data?.status === "success" && response.data.dataUrl) {
        const dataUrl = response.data.dataUrl;

        const link = document.createElement("a");
        link.href = dataUrl;

        const fileName = type === "pdf" ? "export.pdf" : "export.xlsx";
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("File downloaded:", fileName);
      } else {
        console.error("Export failed or no data URL received.");
      }
    } catch (error) {
      console.error("Error while exporting file:", error);
    }
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100dvh-130px)] rounded-[20px]">
      <div className="p-5 border-b border-[#D6D6D6] flex flex-wrap gap-4 justify-between items-center">
        <p className="text-[28px] font-semibold">Finance List</p>

        <div className="flex flex-row items-center gap-4">
          <label className="w-full md:min-w-[450px]" htmlFor="search">
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
          <ExportSelect onChange={handleExportChange} />
        </div>
      </div>
      <div className="p-5">
        <FinanceTable data={data?.data} />
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalpayouts}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />

        <Loader loading={isLoading || isPdfLoading} />
      </div>
    </div>
  );
}
