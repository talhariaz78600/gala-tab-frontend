import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import edit from "../../assets/img/edit-icon.png";
import ToggleSwitch from "./ToggleSwitch";
import { Modal } from "@mui/material";
import AddAmenities from "./AddAmenities";
import AddIcon from "../../assets/img/add-icon.png";
import {
  useGetServiceDetailsQuery,
  useServiceUpdateMutation,
} from "@/api/apiSlice";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import SetPrice from "@/layouts/VendorDashboard/StepperService/SetPrice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function SetPricing() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  const { id } = params;
  const { data: currentService, isLoading: isServiceLoading } =
    useGetServiceDetailsQuery(id, {
      skip: !id,
    });

  const methods = useForm({ values: currentService?.data });
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = methods;

  const { dirtyFields } = useFormState({ control });
  const [open, setOpen] = React.useState(false);

  const getFormAction = () => {
    if (location.pathname === "/admin-dashboard/service-detail") {
      return "/admin-dashboard/service-management";
    } else if (location.pathname === "/vendor-dashboard/services") {
      return "/vendor-dashboard/service-listing";
    }
    return "#";
  };

  const [serviceUpdate, { isLoading: isServiceUpdateLoading }] =
    useServiceUpdateMutation();

  const onSubmit = async (data) => {
    try {
      let patchData = Object.keys(dirtyFields).reduce((acc, field) => {
        acc[field] = data[field];
        return acc;
      }, {});

      // Only update if there are changes
      if (Object.keys(patchData).length > 0) {
        try {
          await serviceUpdate({
            id,
            data: patchData,
          }).unwrap();

          toast.success("Data updated successfully!");
          if (user?.role === "vendor") {
            navigate("/vendor-dashboard/service-listing");
          } else {
            navigate("/admin-dashboard/service-management");
          }
          console.log("Update successful");
        } catch (error) {
          console.error("Error updating data:", error);
          toast.error("Failed to update data. Please try again.");
        }
      } else {
        console.log("No changes detected. Skipping update.");
        toast.info("No changes detected.");
      }
    } catch (error) {
      console.error("Unexpected error in onSubmit:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <div>
          <div className="bg-[#F7F7F7] dark:bg-[#1E293B] p-4 mt-6 rounded-[20px]">
            <div className="bg-black flex items-center justify-between flex-wrap gap-4 shadow-[0px_14px_34px_0px_#00000014] p-4 rounded-[10px]">
              <h3 className="font-semibold text-white text-lg">
                Set Service Pricing
              </h3>
              {/* <div className="flex flex-wrap items-center ms-auto">
              <p className="font-semibold text-white md:text-lg">
                Addition Time Per Hour:
              </p>
              <div className="ms-auto">
                <ToggleSwitch />
              </div>
            </div> */}
            </div>
            <div>
              <SetPrice mode="edit" />
            </div>

            <div className="mt-16 flex justify-center sm:justify-start items-center gap-x-8 gap-y-4 flex-wrap">
              <Link
                to={getFormAction()}
                className="min-w-[150px] flex justify-center bg-[#E7E7E7] border border-[#D5D5D5] rounded-full p-3 font-medium"
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={Object.keys(dirtyFields).length === 0}
                className={`min-w-[150px] rounded-full p-3 font-semibold shadow-[0px_10px_17px_0px_#FD636312] transition 
    ${
      Object.keys(dirtyFields).length === 0
        ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[#000000] border-[#000000] text-white hover:bg-[#1a1a1a] cursor-pointer"
    }
  `}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
