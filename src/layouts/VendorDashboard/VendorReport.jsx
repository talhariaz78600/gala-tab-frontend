import { useGetVendorReportAnalyticsQuery } from "@/api/apiSlice";
import VenueReportsTable from "../../components/adminDashboard/VenueReportsTable";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import React, { useState } from "react";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";

const VendorReport = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedType, setSelectedType] = useState("");
  const { data, isLoading } = useGetVendorReportAnalyticsQuery({
    serviceTypeId: selectedType,
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
      <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100dvh-130px)] p-5 rounded-[20px] flex flex-col justify-between">
        <div className="">
          <div className="flex items-center flex-wrap justify-between p-5 border-b">
            <p className="text-[28px] leading-normal font-semibold">Reports</p>
            <div className="flex items-center flex-wrap-reverse gap-4 justify-end ms-auto">
              <BasicSelect
                onSelect={(selectedType) => setSelectedType(selectedType)}
              />
            </div>
          </div>
          <div className="p-5">
            <VenueReportsTable data={data?.data?.serviceListings || []} />
            <PaginationComponent
              currentPage={page}
              totalPages={data?.data?.totalCount}
              itemsPerPage={limit}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
            <Loader loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorReport;
