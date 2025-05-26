import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { IoCloseCircle } from "react-icons/io5";
import Quality from "../../../assets/img/quality.png";
import { useForm } from "react-hook-form";
import {
  useSendEmailOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyEmailOtpMutation,
  useVerifyPhoneOtpMutation,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";

const EmailConfirmation = ({ onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const type = state?.type;

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [verifySignupOtp, { isLoading: isVerifyEmailLoading }] =
    useVerifyEmailOtpMutation();
  const [verifyPhoneOtp, { isLoading: isVerifyPhoneLoading }] =
    useVerifyPhoneOtpMutation();
  const [resendSignupOtp, { isLoading: isResendEmailLoading }] =
    useSendEmailOtpMutation();
  const [resendPhoneOtp, { isLoading: isResendPhoneLoading }] =
    useSendPhoneOtpMutation();

  // Combined loading states
  const isLoading =
    isVerifyEmailLoading ||
    isVerifyPhoneLoading ||
    isResendEmailLoading ||
    isResendPhoneLoading;
  const handleOTPChange = (otp) => {
    setOtp(otp);
  };
  const onSubmit = async () => {
    try {
      let response;
      const verificationData = { otp };
      switch (type) {
        case "email":
          response = await verifySignupOtp({
            ...verificationData,
            email: state.email,
          }).unwrap();
          break;

        case "phone": // Phone verification
          response = await verifyPhoneOtp({
            ...verificationData,
            phone: state.contact,
          }).unwrap();
          break;
        default:
          throw new Error("Invalid verification type");
      }
      if (response) {
        toast.success(response?.message || "OTP Verified!");
        if (onSuccess) {
          onSuccess(response);
        } else {
          navigate("/auth/welcome/login");
        }
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  // Handle OTP Resend
  const handleResendOTP = async () => {
    try {
      switch (type) {
        case "email":
          await resendSignupOtp({ email: state.email }).unwrap();
          break;
        case "phone":
          await resendPhoneOtp({ contact: state.contact }).unwrap();
          break;
        default:
          throw new Error("Invalid verification type");
      }

      toast.success("OTP sent successfully!");
      setIsResendDisabled(true);
      setTimer(30);
    } catch (error) {
      if (error.data?.error && typeof error.data.error === "object") {
        const apiErrors = error.data.error; // Renamed correctly
        Object.keys(apiErrors)
          .filter((key) => key !== "Error")
          .forEach((field) => {
            setError(field, {
              type: "manual",
              message: apiErrors[field],
            });
          });
      } else {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);
  return (
    <div className="h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-sm mx-auto px-5">
        <div className="w-full border rounded-xl shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div></div>
            <div>
              <h2 className="font-semibold sm:text-2xl text-lg">
                Identify Verification
              </h2>
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <IoCloseCircle className="text-3xl text-slate-500" />
            </div>
          </div>
          <div className="py-3 mt-7">
            <img
              src={Quality}
              alt=""
              className="mx-auto rounded-lg w-20 h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <h5 className="font-semibold text-2xl text-center">
              {type === "phone" ? " Phone Verification " : "Email Verification"}
            </h5>
            <p className="text-center text-sm text-[#484848]">
              A code was sent to {state?.email || state?.contact}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center mt-9">
              <OtpInput
                value={otp}
                onChange={handleOTPChange}
                numInputs={6}
                separator={<span style={{ width: "10px" }}></span>}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.5rem",
                  fontSize: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
                shouldAutoFocus
                renderInput={(inputProps, index) => (
                  <input {...inputProps} key={index} required />
                )}
              />
            </div>
            <div className="mt-16">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResendDisabled}
                className={`text-center w-full text-base font-medium ${
                  isResendDisabled ? "text-gray-400" : "text-sky-500"
                }`}
              >
                {isResendDisabled ? `Resend OTP in ${timer}s` : "Send again"}
              </button>
            </div>
            <div className="mb-9 mt-7 max-w-screen-sm mx-auto px-9">
              <button
                type="submit"
                className="font-medium text-white bg-gray-950 drop-shadow-2xl w-full block text-center py-3 rounded-lg"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
      <Loader loading={isLoading} />
    </div>
  );
};

export default EmailConfirmation;
