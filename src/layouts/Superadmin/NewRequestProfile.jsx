import React from "react";
import Profile from "../../assets/img/profile.png";
import { Link, useLocation, useNavigate } from "react-router";
import { IoCheckmark, IoPencil } from "react-icons/io5";
import PersonalInfo from "../../components/adminDashboard/PersonalInfo";
import { useUpdateAccountUserMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";

export default function NewRequestProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  console.log("data", data);

  const [updateAccountUser, { isLoading: isUpdating }] =
    useUpdateAccountUserMutation();

  const handleStatusChange = async (userId, status) => {
    const loadingToast = toast.loading("Updating status...");

    try {
      if (!userId || !status) {
        throw new Error("Invalid user ID or status");
      }

      const response = await updateAccountUser({
        id: userId,
        data: { status },
      }).unwrap();

      toast.update(loadingToast, {
        render: response?.message || `User status updated to ${status}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.update(loadingToast, {
        render:
          err?.data?.message ||
          "Failed to update user status. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#202224] flex flex-col justify-between p-5 min-h-[calc(100vh-130px)] rounded-[20px]">
      <div>
        <div className="flex items-center flex-wrap justify-between gap-4">
          <p className="text-[25px] font-semibold">Profile Details</p>
          <div className="flex flex-wrap justify-end gap-4 ms-auto">
            <button
              onClick={() => {
                handleStatusChange(data._id, "Active");
              }}
              className="bg-[#34A853] text-[#ffffff] font-medium min-w-[150px] p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
            >
              Approve
            </button>
            <button
              onClick={() => {
                handleStatusChange(data._id, "Rejected");
              }}
              className="bg-[#D92D20] text-[#ffffff] font-medium min-w-[150px] p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
            >
              Reject
            </button>
          </div>
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
                      {data?.fullName}
                    </h5>
                    <p className="text-base font-medium text-[#202224] dark:text-white">
                      {data?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <PersonalInfo data={data} />
        </div>
      </div>
    </div>
  );
}
