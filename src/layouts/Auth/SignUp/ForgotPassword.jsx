import { useForgetPasswordMutation } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./New folder/Modal";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sendLink, { isLoading }] = useForgetPasswordMutation();
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const response = await sendLink({ email: email });
      if (response?.data) {
        toast.success(
          response.message || "Reset Password Link sent successfully!"
        );
        setShowModal(true);
      } else {
        toast.error(response?.error || "faild to send reset link");
      }
    } catch (error) {
      if (error.data?.error && typeof error.data.error === "object") {
        const apiErrors = error.data.error;
        Object.keys(apiErrors)
          .filter((key) => key !== "Error")
          .forEach((field) => {
            setError(field, {
              type: "manual",
              message: apiErrors[field],
            });
          });
        const firstError = Object.values(apiErrors).find(
          (msg) => msg !== apiErrors.Error
        );
        if (firstError) {
          toast.error(firstError);
        }
      } else {
        setError("root", {
          type: "manual",
          message: error?.data?.message || "An unexpected error occurred.",
        });

        toast.error(
          error?.data?.message ||
            error?.error ||
            "Failed to send OTP. Please try again."
        );
      }
    }
  };

  return (
    <>
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
            <form onSubmit={handleSubmit}>
              <div className="max-w-screen-sm mx-auto px-9">
                <p className="text-center xl:text-2xl md:text-lg my-8 text-[#313957] dark:text-white">
                  Enter Email to continue
                </p>
                <div>
                  <label className="text-base font-normal" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF] text-black"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    required
                  />
                </div>
              </div>
              <div className="my-9 max-w-screen-sm mx-auto px-9">
                <button
                  type="submit"
                  className="font-medium text-white bg-[#1C1C1C] drop-shadow-2xl w-full block text-center py-3 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="py-5 bg-[#E7E7E9] dark:bg-gray-800 rounded-b-lg">
              <p className="text-center font-medium xs:text-sm text-xs">
                Designed By Fabulous Technology Solutions
              </p>
            </div>
          </div>
        </div>
        <Loader loading={isLoading} />
        <Modal open={showModal} setOpen={() => setShowModal(!showModal)} />
      </div>
    </>
  );
}
