import React, { useEffect, useState } from "react";
import {
  useGetnewsletterSettingsQuery,
  useUpdateNewsLetterSettingsMutation,
} from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";

const NewsLetterSettings = () => {
  const { data, isLoading } = useGetnewsletterSettingsQuery();
  const [updateNewsletterSetting, { isLoading: isUpdating }] =
    useUpdateNewsLetterSettingsMutation();

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    if (data) {
      setSettings(data?.data);
    }
  }, [data]);

  const handleToggle = (index) => {
    const updated = settings.map((item, i) =>
      i === index ? { ...item, status: !item.status } : item
    );
    setSettings(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateNewsletterSetting({
        permissions: settings,
      }).unwrap();
      if (response.status === "success") {
        toast.success("Newsletter settings updated successfully!");
      } else {
        toast.error(response.message || "Update failed.");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Error updating settings.");
    }
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start p-3 bg-black text-white rounded-l-md">
                    Permission
                  </th>
                  <th className="text-center p-3 bg-black text-white rounded-r-md">
                    Newsletter Enabled
                  </th>
                </tr>
              </thead>
              <tbody>
                {settings.map((item, index) => (
                  <tr key={item._id}>
                    <td className="border-b p-3 capitalize">
                      {item.permission}
                    </td>
                    <td className="text-center border-b p-3">
                      <input
                        type="checkbox"
                        className="accent-black w-5 h-5"
                        checked={item.status}
                        onChange={() => handleToggle(index)}
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
    </>
  );
};

export default NewsLetterSettings;
