import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom"; // fixed router
import CarateDark from "../../assets/img/CarateDark.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  useDiscountCreateMutation,
  useDiscountUpdateMutation,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function VendorAddDiscount({ mode = "new" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location?.state || {};
  console.log("data", data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setError,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...data,
      startDate: data?.startDate ? data.startDate.split("T")[0] : "",
      endDate: data?.endDate ? data.endDate.split("T")[0] : "",
    },
  });

  const discountType = watch("discountType");

  const [createDiscount, { isLoading: isCreating }] =
    useDiscountCreateMutation();

  const [updateDiscount, { isLoading: isUpdating }] =
    useDiscountUpdateMutation();

  const onSubmit = async (data) => {
    const cleanedData = { ...data };

    // Remove irrelevant field
    if (cleanedData.discountType === "Percentage") {
      delete cleanedData.maxDiscount;
    } else if (cleanedData.discountType === "Fixed") {
      delete cleanedData.percentage;
    }

    try {
      const response =
        mode === "edit"
          ? await updateDiscount({ id: data._id, data: cleanedData }).unwrap()
          : await createDiscount(cleanedData).unwrap();

      if (response.status === "success") {
        toast.success(
          `${mode === "edit" ? "Updated" : "Created"} successfully!`
        );
        navigate("/vendor-dashboard/promo-discount");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.data?.error && typeof error.data.error === "object") {
        Object.entries(error.data.error).forEach(([field, message]) => {
          if (field !== "Error" && field !== "MongoServerError") {
            setError(field, { type: "manual", message });
          }
        });
      }

      const errorMessage =
        error.data?.message ||
        error.data?.error?.Error ||
        error.error ||
        "Login failed. Please try again.";
      toast.error(errorMessage);

      setError("root", { type: "manual", message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100vh-130px)] rounded-[20px] p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/vendor-dashboard/promo-discount">
              <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
            </Link>
            <p className="text-[24px] font-semibold">
              {mode === "new" ? "Add" : "Edit"} Promo Discount Code
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-5 max-w-[1000px]">
            {/* Discount Name */}
            <div>
              <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                Discount Name
              </label>
              <input
                type="text"
                {...register("discountName", {
                  required: "Discount Name is required",
                })}
                placeholder="Type here"
                className="input-style text-black"
              />
              {errors.discountName && (
                <p className="text-red-500 text-sm pl-4">
                  {errors.discountName.message}
                </p>
              )}
            </div>

            {/* Discount Type */}
            <div>
              <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                Discount Type
              </label>
              <select
                {...register("discountType", {
                  required: "Discount Type is required",
                })}
                className="input-style pe-8 bg-no-repeat appearance-none text-black"
                style={{
                  backgroundImage: `url(${CarateDark})`,
                  backgroundPosition: "calc(100% - 10px) center",
                }}
              >
                <option value="" hidden>
                  Select Here
                </option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
              {errors.discountType && (
                <p className="text-red-500 text-sm pl-4">
                  {errors.discountType.message}
                </p>
              )}
            </div>

            {/* Conditional: Percentage or Fixed */}
            {discountType === "Percentage" && (
              <div>
                <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                  Percentage
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("percentage", {
                    required: "Percentage is required",
                    min: { value: 0, message: "Must be at least 0" },
                    max: { value: 100, message: "Must be <= 100" },
                  })}
                  placeholder="Enter percentage"
                  className="input-style text-black"
                />
                {errors.percentage && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.percentage.message}
                  </p>
                )}
              </div>
            )}

            {discountType === "Fixed" && (
              <div>
                <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                  Allowed Maximum Discount
                </label>
                <input
                  type="number"
                  {...register("maxDiscount", {
                    required: "Allowed Maximum Discount is required",
                    min: { value: 0, message: "Must be at least 0" },
                  })}
                  placeholder="Enter Fixed amount"
                  className="input-style text-black"
                />
                {errors.maxDiscount && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.maxDiscount.message}
                  </p>
                )}
              </div>
            )}

            {/* Start Date */}
            <div>
              <label className="pl-4 text-lg font-medium text-[#202529]  dark:text-white">
                Start Date
              </label>
              <input
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                {...register("startDate", {
                  required: "Start Date is required",
                  validate: (value) => {
                    const today = format(new Date(), "yyyy-MM-dd");
                    return value >= today || "Start Date cannot be in the past";
                  },
                })}
                className="input-style text-black"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm pl-4">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                End Date
              </label>
              <input
                type="date"
                min={watch("startDate") || format(new Date(), "yyyy-MM-dd")}
                {...register("endDate", {
                  required: "End Date is required",
                  validate: (value) => {
                    const startDate = watch("startDate");
                    const today = format(new Date(), "yyyy-MM-dd");
                    if (value < today) return "End Date cannot be in the past";
                    if (startDate && value < startDate)
                      return "End Date cannot be earlier than Start Date";
                    return true;
                  },
                })}
                className="input-style text-black"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm pl-4">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            {/* Minimum Booking Amount */}
            <div>
              <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                Minimum Booking Amount
              </label>
              <input
                type="number"
                {...register("minAmountInCart", {
                  required: "Minimum Booking Amount is required",
                  validate: (value) => {
                    const maxDiscount = watch("maxDiscount");
                    const discountType = watch("discountType");

                    if (
                      discountType === "Fixed" &&
                      maxDiscount !== undefined &&
                      Number(value) <= Number(maxDiscount)
                    ) {
                      return "Minimum booking amount must be greater than the fixed discount";
                    }

                    return true;
                  },
                })}
                placeholder="Type here"
                className="input-style text-black"
              />

              {errors.minAmountInCart && (
                <p className="text-red-500 text-sm pl-4">
                  {errors.minAmountInCart.message}
                </p>
              )}
            </div>

            {/* Maximum Total Usage */}
            <div>
              <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                Maximum Total Usage
              </label>
              <input
                type="number"
                {...register("maxTotalUsage", {
                  required: "Maximum Total Usage is required",
                })}
                placeholder="Type here"
                className="input-style text-black"
              />
              {errors.maxTotalUsage && (
                <p className="text-red-500 text-sm pl-4">
                  {errors.maxTotalUsage.message}
                </p>
              )}
            </div>

            {/* Discount Code */}
            <div>
              <label className="pl-4 text-lg font-medium text-[#202529] dark:text-white">
                Discount Code
              </label>
              <input
                type="text"
                {...register("discountCode", {
                  required: "Discount Code is required",
                  maxLength: {
                    value: 10,
                    message: "Discount Code cannot exceed 10 characters",
                  },
                  minLength: {
                    value: 4,
                    message: "Discount Code must be at least 4 characters",
                  },
                })}
                placeholder="Type here"
                className="input-style text-black"
              />
              {errors.discountCode && (
                <p className="text-red-500 text-sm pl-4">
                  {errors.discountCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
          <Link
            to="/vendor-dashboard/promo-discount"
            className="flex justify-center text-black bg-[#E7E7E7] py-2 rounded-full px-6 border w-52"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="text-white bg-black py-2 px-6 border w-52 rounded-full"
          >
            Save
          </button>
        </div>
      </div>

      {/* Tailwind class shortcut for input */}
      <style>{`
        .input-style {
          background-color: white;
          box-shadow: 0px 8px 24px 0px #00000012;
          border-radius: 10px;
          padding: 1rem;
          width: 100%;
        }
      `}</style>

      <Loader loading={isCreating || isUpdating} />
    </form>
  );
}
