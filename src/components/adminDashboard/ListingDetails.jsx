import React, { useState } from "react";
import Profile from "../../assets/img/profile.png";
import { Link, useParams } from "react-router";
import { IoPencil } from "react-icons/io5";
import BasicSelect from "../VendorDashboard/BasicSelect";
import DateRangePicker from "../DatePicker/DateRangePicker";
import PersonalInfo from "./PersonalInfo";
import BookingService from "../../layouts/Superadmin/BookingService";
import deleteIcon from "../../assets/img/delete-icon.png";
import {
  useDeleteServiceMutation,
  useGetVendorServiceListQuery,
} from "@/api/apiSlice";
import { format } from "date-fns";
import PaginationComponent from "../Pagination/TablePagination";
import DeletePopup from "../DeletePopup";
import Loader from "../loader/Loader";
import TableMui from "@/mui/TableMui";

export default function ListingDetails() {
  const params = useParams();
  const { id } = params;
  const [startDate, setStartDate] = useState();
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const formatDate = (date) => {
    if (!date) return;
    return format(new Date(date), "yyyy-MM-dd");
  };

  const { data, isLoading } = useGetVendorServiceListQuery({
    id,
    params: {
      page: page + 1,
      limit,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      serviceTypeId: selectedType,
    },
  });

  const [deleteService, { isLoading: isDeleteLoading }] =
    useDeleteServiceMutation();

  const handleDelete = async () => {
    try {
      await deleteService(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap border-b border-[#D6D6D6] pb-5 gap-5 mt-12">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <p className="text-[28px] leading-normal font-semibold">
            Services Listings
          </p>
          <div className="ms-auto">
            <BasicSelect
              onSelect={(selectedType) => setSelectedType(selectedType)}
            />
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-end ms-auto gap-4">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />
        </div>
      </div>
      <div className="mt-3">
        {/* <ServicesListingTable /> */}
        <TableMui
          loading={isLoading}
          th={{
            title: "Service Name",
            serviceTypeId: "Vendor Type",
            totalPrice: "Total Cost",
            totalBookings: "Total Booking",
            status: "Status",
            action: "Action",
          }}
          td={data?.data || []}
          customFields={[
            {
              name: "serviceTypeId",
              data: (value, data) => {
                return (
                  <>
                    <p className="text-[16px]">{value?.name || "N/A"}</p>
                  </>
                );
              },
            },
            {
              name: "action",
              data: (value, task) => (
                <div className="flex items-center gap-2">
                  <button onClick={() => setDeleteOpen(task._id)}>
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={deleteIcon}
                      alt="Delete"
                    />
                  </button>
                </div>
              ),
            },
          ]}
        />

        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalCount}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <DeletePopup
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />
        <Loader loading={isLoading || isDeleteLoading} />
      </div>
    </div>
  );
}
