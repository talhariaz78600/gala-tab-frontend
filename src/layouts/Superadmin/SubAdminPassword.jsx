import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSubAdminPasswordUpdateMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";

const SubAdminPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [changePasswordSubAdmin] = useSubAdminPasswordUpdateMutation();

  const onSubmit = async (data) => {
    try {
      console.log("Submitted Passwords:", data);
      const { newPassword } = data;

      const response = await changePasswordSubAdmin({
        id,
        data: { password: newPassword },
      });

      if (response?.data?.success) {
        toast.success("Password updated successfully!");
        navigate(-1);
      } else {
        toast.error(response?.data?.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div className="p-6 max-w-xl ">
      <div className="flex  items-center mb-8 gap-2">
        <button
          onClick={() => navigate(-1)}
          className="text-lg text-black dark:text-white flex items-center gap-1"
        >
          <IoMdArrowRoundBack className="text-2xl" />
        </button>
        <h2 className="text-2xl font-semibold">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          <label
            htmlFor="newPassword"
            className="pl-4 w-full text-base font-medium text-[#202529] dark:text-white"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Type here"
              className={`bg-white text-black shadow-lg rounded-lg py-3 px-4 w-full pr-10 ${
                errors.newPassword ? "border border-red-500" : ""
              }`}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1 pl-4">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="mt-5">
          <label
            htmlFor="confirmPassword"
            className="pl-4 w-full text-base font-medium text-[#202529] dark:text-white"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Type here"
              className={`bg-white text-black shadow-lg rounded-lg py-3 px-4 w-full pr-10 ${
                errors.confirmPassword ? "border border-red-500" : ""
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 pl-4">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 max-w-[500px] gap-3 mt-12">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-[#E7E7E7] text-black py-2 rounded-full px-6 border"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`text-white py-2 px-6 border rounded-full ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubAdminPassword;
