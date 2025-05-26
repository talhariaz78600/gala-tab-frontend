import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/api/apiSlice";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

const AdminNotification = () => {
  const { data, isLoading } = useGetNotificationSettingsQuery();
  const [notifications, setNotifications] = useState([]);

  const [updateNotificationSettings, { isLoading: isUpdating }] =
    useUpdateNotificationSettingsMutation();

  // Initialize local state from API response
  useEffect(() => {
    if (data?.data) {
      const formatted = data.data.map((item) => ({
        _id: item._id,
        title: item.title,
        type: item.type,
        admin: item.admin,
        subadmin: item.subadmin,
        mobile: item.mobile,
        email: item.email,
        sms: item.sms,
      }));
      setNotifications(formatted);
    }
  }, [data]);

  const handleCheckboxChange = (index, field) => {
    const updated = [...notifications];
    updated[index][field] = !updated[index][field];
    setNotifications(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await updateNotificationSettings({
        updates: notifications,
      }).unwrap();

      if (response?.status === "success") {
        toast.success(response.message || "Notification settings updated.");
      } else {
        toast.error("Failed to update settings. Please try again.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error?.data?.message || "An error occurred while saving settings."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start p-3 bg-black text-white rounded-l-md">
                    Notification Type
                  </th>
                  <th className="p-3 bg-black text-white">Subadmin</th>
                  <th className="p-3 bg-black text-white">Admin</th>
                  <th className="p-3 bg-black text-white">Mobile App</th>
                  <th className="p-3 bg-black text-white">Email</th>
                  <th className="p-3 bg-black text-white rounded-r-md">SMS</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((item, index) => (
                  <tr key={item._id}>
                    <td className="border-b p-3">{item.title}</td>
                    <td className="text-center border-b p-3">
                      <input
                        type="checkbox"
                        className="accent-black w-5 h-5"
                        checked={item.subadmin}
                        onChange={() => handleCheckboxChange(index, "subadmin")}
                      />
                    </td>
                    <td className="text-center border-b p-3">
                      <input
                        type="checkbox"
                        className="accent-black w-5 h-5"
                        checked={item.admin}
                        onChange={() => handleCheckboxChange(index, "admin")}
                      />
                    </td>
                    <td className="text-center border-b p-3">
                      <input
                        type="checkbox"
                        className="accent-black w-5 h-5"
                        checked={item.mobile}
                        onChange={() => handleCheckboxChange(index, "mobile")}
                      />
                    </td>
                    <td className="text-center border-b p-3">
                      <input
                        type="checkbox"
                        className="accent-black w-5 h-5"
                        checked={item.email}
                        onChange={() => handleCheckboxChange(index, "email")}
                      />
                    </td>
                    <td className="text-center border-b p-3">
                      <input
                        type="checkbox"
                        className="accent-black w-5 h-5"
                        checked={item.sms}
                        onChange={() => handleCheckboxChange(index, "sms")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col items-center justify-end gap-3 mt-9">
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-3xl px-12"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
      <Loader loading={isLoading || isUpdating} />
    </div>
  );
};

export default AdminNotification;
