import React, { useState } from "react";
import addicon from "../../assets/img/add-icon.png";
import { Link } from "react-router";
import ServicesListingTable from "../../components/VendorDashboard/ServicesListingTable";
import AddNewService from "../../components/VendorDashboard/AddNewService";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import FilterButton from "@/components/CustomFilters/FilterButton";
import useFilters from "@/components/hooks/useFilter";
import CustomFilterDialog from "@/components/CustomFilters/CustomFiltersDialog";
import { vendorType } from "@/components/enums/enum";

import Loader from "@/components/loader/Loader";
import { useGetServiceTypeQuery } from "@/api/apiSlice";
export default function ServiceListings() {
  const {
    modalFilters,
    setModalFilters,
    selectedFilters,
    setSelectedFilters,
    handleFiltersApply,
  } = useFilters();
  const [startDate, setStartDate] = useState();
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState();
  const { data, isLoading } = useGetServiceTypeQuery();

  return (
    <>
      <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] dark:bg-gray-800 rounded-[20px]">
        <div className="border-b p-5 flex xl:flex-row flex-col xl:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <h4 className="text-[28px] font-medium dark:text-white">
                Services Listings
              </h4>
            </div>
            <div className="ms-auto flex items-center gap-4">
              <div>
                <Loader loading={isLoading} />
                <FilterButton
                  setOpen={setOpen}
                  selectedFilters={selectedFilters}
                  modalFilters={modalFilters}
                  setSelectedFilters={setSelectedFilters}
                  setModalFilters={setModalFilters}
                />
                <CustomFilterDialog
                  open={open}
                  onClose={() => setOpen(false)}
                  onApply={handleFiltersApply}
                  filtersConfig={[
                    {
                      label: "Vendor Type",
                      data:
                        data?.data?.map((item) => ({
                          label: item.name,
                          value: item._id,
                          ...item,
                        })) || [],
                      type: "checkbox",
                    },
                    {
                      label: "Status",
                      data: [
                        { label: "Available", value: "Available" },
                        { label: "Booked", value: "Booked" },
                        { label: "In Progress", value: "In Progress" },
                        { label: "Active", value: "Active" },
                        { label: "Cancelled", value: "Cancelled" },
                      ],
                      type: "checkbox",
                    },
                    {
                      label: "Date",
                      data: [
                        { label: "Today", value: "today" },
                        { label: "This Week", value: "thisWeek" },
                        { label: "Last Week", value: "lastWeek" },
                        { label: "Next Month", value: "nextMonth" },
                        { label: "Last Month", value: "lastMonth" },
                      ],
                      type: "radio",
                    },
                  ]}
                  modalFilters={modalFilters}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="hidden xl:block">
              {/* <Link to="/Add-New-Listing">
                <img src={addicon} alt="add" className="sm:max-w-10" />
              </Link> */}
            </div>
            <div>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
              />
            </div>
            <div>
              <AddNewService />
            </div>
          </div>
        </div>
        <div className="p-5">
          <ServicesListingTable
            startDate={startDate}
            endDate={endDate}
            modalFilters={modalFilters}
          />
        </div>
      </div>
    </>
  );
}
