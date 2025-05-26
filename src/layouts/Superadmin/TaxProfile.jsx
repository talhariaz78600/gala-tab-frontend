import React from "react";
import Profile from "../../assets/img/profile.png";
import { Link, useLocation } from "react-router";
import { IoCheckmark, IoPencil } from "react-icons/io5";
import PersonalInfo from "../../components/adminDashboard/PersonalInfo";

export default function TaxProfile() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log("data", data);

  const taxDetails = [
    {
      label: "Country Name",
      value: `${data?.vendorId?.country?.country || "N/A"}`,
    },
    {
      label: "Business Name",
      value: `${data?.businessName || "N/A"}`,
    },
    {
      label: "Tax Classification",
      value: `${data?.taxClassification || "N/A"}`,
    },
    {
      label: "Tax ID",
      value: `${data?.taxId || "N/A"}`,
    },
    {
      label: "Delivery Form",
      value: `${
        data?.deliveryForm
          ? "Delivered by Email"
          : "Electronically Only" || "N/A"
      }`,
    },
    {
      label: "Status",
      value: (() => {
        const status = data?.status?.toLowerCase() ?? "pending";

        switch (status) {
          case "approved":
            return "Approved";
          case "rejected":
            return "Rejected";
          case "pending":
            return "Pending";
          case "inprogress":
            return "In Progress";
          default:
            return "Unknown";
        }
      })(),
    },
  ];
  return (
    <>
      <div className="bg-[#F7F7F7] dark:bg-[#202224] p-5 rounded-[20px]">
        <div>
          <div>
            <p className="text-[25px] font-semibold">Profile Details</p>
          </div>
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 p-3 border rounded-[20px] shadow-[0px_0px_24px_0px_#00000012] mt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img
                        className="size-[100px] rounded-full"
                        src={Profile}
                        alt=""
                      />
                      <div className="absolute bottom-[5px] right-[9px] w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
                    </div>
                    <div>
                      <h5 className="font-semibold sm:text-xl text-sm">
                        {data?.vendorId?.fullName || "N/A"}
                      </h5>
                      <p className="text-base font-medium text-[#202224] dark:text-white">
                        Vendor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <PersonalInfo data={data?.vendorId} />
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F7] dark:bg-[#202224] p-5 rounded-[20px] mt-5">
        <div>
          <h4 className="text-[#303C6C] font-bold text-[20px] dark:text-white">
            Tax Information
          </h4>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 gap-4 mt-4">
            {taxDetails.map((detail, index) => (
              <div key={index}>
                <h6 className="text-[#303C6C] text-lg font-medium dark:text-white">
                  {detail.label}
                </h6>
                <div className="mt-2">
                  <p className="text-[#202224] font-medium text-base dark:text-white">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
            <div>
              <h6 className="text-[#303C6C] text-lg font-medium dark:text-white">
                Tax Document
              </h6>

              <div className="mt-2">
                {data?.taxDocument ? (
                  <a
                    href={data.taxDocument}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-[#34A853] font-semibold text-white px-6 py-2 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]">
                      Download
                    </button>
                  </a>
                ) : (
                  <p className="text-red-600 font-medium">Not Attached</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
