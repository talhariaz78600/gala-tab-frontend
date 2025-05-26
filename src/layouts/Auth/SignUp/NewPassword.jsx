import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/api/apiSlice";
import { Eye, EyeOff } from "lucide-react";
import Loader from "@/components/loader/Loader";

export default function NewPassword() {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = async (data) => {
    if (!token) {
      setTokenError(true);
      toast.error("Invalid or missing token");
      return;
    }
    try {
      const response = await resetPassword({
        password: data?.newPassword,
        token: token,
      });

      if (response?.data) {
        toast.success(
          response?.data?.message || "Password reset successfully!"
        );
        navigate("/auth/welcome/login");
      } else {
        const errorMessage =
          response?.error?.data.error.Error ||
          "Failed to reset password. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(
        error?.data?.error?.Error ||
          "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <div className="py-5 md:h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-lg mx-auto px-5">
        <div className="w-full border rounded-xl shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div></div>
            <div>
              <h2 className="font-semibold sm:text-2xl text-lg">
                Forgot Password
              </h2>
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <IoCloseCircle className="text-3xl text-slate-400" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-screen-sm mx-auto px-9">
              <p className="text-center xl:text-2xl md:text-lg my-8 text-[#313957]">
                Enter Password to continue
              </p>

              {/* New Password Field */}
              <div>
                <label className="text-base font-normal" htmlFor="newPassword">
                  New Password
                </label>
                <div className="relative w-full">
                  <input
                    className={`border w-full rounded-lg p-2 pr-10 bg-[#F7FBFF] ${
                      errors.newPassword ? "border-red-500" : "border-gray-200"
                    }`}
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mt-6">
                <label
                  className="text-base font-normal"
                  htmlFor="confirmNewPassword"
                >
                  Confirm New Password
                </label>
                <div className="relative w-full">
                  <input
                    className={`border w-full rounded-lg p-2 pr-10 bg-[#F7FBFF] ${
                      errors.confirmNewPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    {...register("confirmNewPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-9 max-w-screen-sm mx-auto px-9">
              <button
                type="submit"
                disabled={isLoading || tokenError}
                className={`font-medium text-white bg-[#1C1C1C] drop-shadow-2xl w-full block text-center py-3 rounded-lg ${
                  isLoading || tokenError ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Submit"}
              </button>

              {/* Token error message */}
              {tokenError && (
                <p className="text-red-500 text-center text-sm mt-2">
                  Invalid token
                </p>
              )}
            </div>
          </form>

          <div className="py-5 bg-[#E7E7E9] rounded-b-lg">
            <p className="text-center font-medium xs:text-sm text-xs">
              Designed By Fabulous Technology Solutions
            </p>
          </div>
        </div>
      </div>
      <Loader loading={isLoading} />
    </div>
  );
}
