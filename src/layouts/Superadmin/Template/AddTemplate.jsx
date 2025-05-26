import React, { useEffect } from "react";
import { RiCloseCircleFill, RiEdit2Fill } from "react-icons/ri";
import { Modal } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import {
  useTemplatesCreateMutation,
  useTemplatesUpdateMutation,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { useLocation, useNavigate, useParams } from "react-router";

const permissions = [
  { id: "dashboard", label: "Dashboard", default: true },
  { id: "inbox", label: "Inbox" },
  { id: "calendar", label: "Calendar" },
  { id: "serviceManagement", label: "Service Management" },
  { id: "vendorManagement", label: "Vendor Management" },
  { id: "subAdmins", label: "Sub Admins" },
  { id: "template", label: "Template" },
  { id: "totalBookings", label: "Total Booking" },
  { id: "finance", label: "Finance" },
  { id: "pricing", label: "Pricing" },
  { id: "notification", label: "Notification", default: true },
  { id: "paymentGateway", label: "Payment Gateway" },
  { id: "manageCountry", label: "Manage Country" },
  { id: "manageCity", label: "Manage City" },
  { id: "review", label: "Review List" },
  { id: "reports", label: "Report & Analytics" },
  { id: "accounts", label: "Accounts" },
  { id: "disputes", label: "Dispute" },
  { id: "advertisement", label: "Promo Discount Code" },
  { id: "newsletter", label: "News Letter" },
  { id: "help", label: "Help & Support" },
  { id: "settings", label: "Settings" },
];

const AddTemplate = ({ mode = "new" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const { id } = param;
  const { data } = location.state || { data: null };
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [templateName, setTemplateName] = useState("");

  const [templatesCreate, { isLoading: isCreating }] =
    useTemplatesCreateMutation();
  const [templatesUpdate, { isLoading: isUpdating }] =
    useTemplatesUpdateMutation();

  const handlePermissionToggle = (perm) => {
    const isSelected = selectedPermissions.includes(perm.id);
    let updatedPermissions = isSelected
      ? selectedPermissions.filter((id) => id !== perm.id)
      : [...selectedPermissions, perm.id];

    setSelectedPermissions(updatedPermissions);
  };

  const handleSave = async () => {
    const payload = {
      templateName,
      tabPermissions: selectedPermissions,
    };

    try {
      const response =
        mode === "edit"
          ? await templatesUpdate({ id, data: payload }).unwrap()
          : await templatesCreate(payload).unwrap();

      if (response.success) {
        toast.success(
          `Template ${mode === "edit" ? "Updated" : "Created"} successfully!`
        );
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save Permission Template.");
      }
    } catch (error) {
      toast.error(error?.data?.error.templateName || "Something went wrong.");
      console.error("Save error:", error);
    }
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      setTemplateName(data.templateName || "");
      setSelectedPermissions(data.tabPermissions || []);
    }
  }, [mode, data]);

  useEffect(() => {
    if (!selectedPermissions.includes("dashboard")) {
      setSelectedPermissions((prev) => [...prev, "dashboard"]);
    }
    if (!selectedPermissions.includes("notification")) {
      setSelectedPermissions((prev) => [...prev, "notification"]);
    }
  }, []);

  return (
    <>
      <div className="bg-[#F7F7F7]  dark:bg-[#1E1E1E]  rounded-[20px] p-5 flex flex-col ">
        <h3 className="text-[28px]  font-semibold">
          {mode === "edit" ? "Update" : "Create"} Permission Template
        </h3>
        <div className="grid xl:grid-cols-2 gap-4 mt-9">
          <div>
            <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
              Template Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="bg-white shadow-lg text-black
               rounded-lg py-3 px-4 w-full"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-[28px]  font-semibold">Permissions</h3>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 items-center gap-x-9 gap-y-5 mt-4">
            {permissions.map((checkbox) => {
              const isDefault = checkbox.default === true;
              const isChecked = selectedPermissions.includes(checkbox.id);

              return (
                <div key={checkbox.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    className="accent-black min-w-4 w-4 h-4"
                    checked={isChecked}
                    disabled={isDefault}
                    onChange={() => {
                      if (!isDefault) handlePermissionToggle(checkbox);
                    }}
                  />
                  <label
                    htmlFor={checkbox.id}
                    className={`pointer md:text-sm text-x`}
                  >
                    {checkbox.label}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
          <div>
            <button className="flex justify-center bg-[#E7E7E7] text-black py-2 rounded-full px-6 border w-52">
              Cancel
            </button>
          </div>
          <div>
            <button
              className="text-white bg-black py-2 px-6 border w-52 rounded-full"
              onClick={handleSave}
            >
              {mode === "edit" ? "Update" : "Create"} Template
            </button>
          </div>
        </div>
      </div>
      <Loader loading={isCreating || isUpdating} />
    </>
  );
};

export default AddTemplate;
