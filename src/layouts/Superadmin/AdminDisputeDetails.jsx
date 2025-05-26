import React, { useRef } from "react";
import PersonalInfo from "../../components/adminDashboard/PersonalInfo";
import Profile from "../../assets/img/profile.png";
import elipsis from "../../assets/img/elipsis.png";
import PrintIcon from "../../assets/img/PrintIcon.png";
import { Link, useLocation } from "react-router";
import {
  useGetAdminDisputeDetailsQuery,
  useUpdateAdminDisputeMutation,
} from "@/api/apiSlice";
import { Avatar } from "@mui/material";
import Loader from "@/components/loader/Loader";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);

export default function AdminDisputeDetails() {
  const location = useLocation();
  const componentRef = useRef();
  const { id } = location.state;
  const { data, isLoading } = useGetAdminDisputeDetailsQuery(id);
  const [updateAdminDispute] = useUpdateAdminDisputeMutation();

  const handleStatusChange = async (status) => {
    try {
      const response = await updateAdminDispute({ id, data: { status } });

      if (response?.data.status === "success") {
        toast.success(`Dispute successfully marked as ${status}`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(
          response?.message || "Something went wrong while updating status",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Dispute update error:", error);
      toast.error("Failed to update dispute status", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Vendor Report",
  });

  return (
    <>
      <div
        ref={componentRef}
        className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100dvh-130px)] rounded-[20px]"
      >
        <div className="p-5 border-b border-[#D6D6D6]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h4 className="font-semibold sm:text-[28px] text-[24px] text-black dark:text-white">
              Dispute Detail
            </h4>
            <div className="flex items-center gap-4 ms-auto">
              <button onClick={handlePrint}>
                <img src={PrintIcon} alt="img" />
              </button>
              {/* <img src={elipsis} alt="img" /> */}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 border rounded-xl shadow-sm mt-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar
                      src={data?.data?.disputeBy?.profileUrl}
                      alt=""
                      sx={{ width: 56, height: 56 }}
                    />
                    <div className="absolute bottom-0 right-1 w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
                  </div>
                  <div>
                    <h5 className="font-semibold sm:text-xl text-sm text-black dark:text-white">
                      {data?.data?.disputeBy?.firstName}{" "}
                      {data?.data?.disputeBy?.lastName}
                    </h5>
                    <p className="text-base font-medium text-[#202224] dark:text-white">
                      {data?.data?.disputeBy?.role}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-wrap justify-end w-full sm:w-auto gap-2 ms-auto">
                <button
                  onClick={() => handleStatusChange("Review")}
                  className="text-white font-medium bg-[#3551B6] border border-black p-3 w-full sm:w-auto min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                >
                  Review
                </button>
                <button
                  onClick={() => handleStatusChange("Accept")}
                  className="text-white font-medium bg-[#34A853] border border-black p-3 w-full sm:w-auto min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange("Reject")}
                  className="text-white font-medium bg-[#D92D20] border border-black p-3 w-full sm:w-auto min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <PersonalInfo data={data?.data?.disputeBy} />
          </div>
        </div>
        <div className="py-8 px-5 border-b border-[#D6D6D6]">
          <div className="flex flex-wrap gap-y-6 items-center justify-between max-w-[600px]">
            <div className="flex w-full md:w-fit">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-lg font-semibold">Company Name:</p>
                  <p className="text-lg mt-2">
                    {data?.data?.disputeBy?.companyName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold">Name of Report:</p>
                  <p className="text-lg mt-2">Gala Tab Enterprises</p>
                </div>
              </div>
            </div>
            <div className="w-[1px] h-[120px] bg-[#0000001A] hidden md:block"></div>
            <div className="flex w-full md:w-fit">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-lg font-semibold">Report Date:</p>
                  <p className="text-lg mt-2">
                    {dayjs(data?.data?.disputeBy?.createdAt).format(
                      "dddd, MMMM D, YYYY"
                    )}
                  </p>
                </div>
                {/* <div>
                <p className="text-lg font-semibold">Last Compiled Date:</p>
                <p className="text-lg mt-2">Monday, September 16,2024</p>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-8">
          <p className="text-[20px] text-[#303C6C] font-bold dark:text-white">
            Dispute Detail
          </p>
          <div className="mt-4 flex justify-between max-w-[500px]">
            <div>
              <p className="text-lg font-medium text-[#303C6C] dark:text-white">
                Booking ID
              </p>
              <p className="font-medium text-[#484848] dark:text-white">
                {data?.data?.propertyID}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-[#303C6C] dark:text-white">
                Booking Service Name
              </p>
              <p className="font-medium text-[#484848] dark:text-white">
                {data?.data?.property?.service?.title}
              </p>
            </div>
          </div>
          <div className="mt-4 max-w-[500px]">
            <p className="text-lg font-medium text-[#303C6C] dark:text-white">
              Description for Dispute
            </p>
            <p className="font-medium text-[#202224] dark:text-white mt-3">
              {data?.data?.description}
            </p>
          </div>
        </div>
      </div>
      <Loader loading={isLoading} />
    </>
  );
}
