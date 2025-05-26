import React, { useCallback, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import EventHub from "../../../assets/img/step-verification.png";
import EmailImg from "../../../assets/img/email.png";
import PhoneCall from "../../../assets/img/phone-call.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useSendEmailOtpMutation,
  useSendPhoneOtpMutation,
} from "../../../api/apiSlice";
import Loader from "@/components/loader/Loader";

const SelectVerification = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [sendOTP, { isLoading }] = useSendEmailOtpMutation();
  const [sendOTPPhone, { isLoading: isLoadingPhone }] =
    useSendPhoneOtpMutation();
  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleContinue = useCallback(async () => {
    if (!selectedOption) {
      toast.info("Please select a verification method to continue.");
      return;
    }

    const verificationMethods = {
      email: {
        field: "email",
        type: "email",
        errorMessage: "Email is missing. Please try again.",
        successPath: "/auth/welcome/email-verification",
        payloadField: "email",
      },
      phoneCall: {
        field: "contact",
        type: "phone",
        errorMessage: "Phone number is missing. Please try again.",
        successPath: "/auth/welcome/email-verification",
        payloadField: "contact",
      },
    };

    const method = verificationMethods[selectedOption];
    if (!method) {
      toast.error("Invalid verification method selected.");
      return;
    }

    if (!state?.[method.field]) {
      toast.error(method.errorMessage);
      return;
    }

    try {
      const payload = { [method.payloadField]: state[method.field] };
      console.log("payload", payload);

      const response = payload?.contact
        ? await sendOTPPhone(payload)
        : await sendOTP(payload);
      if (response?.data) {
        toast.success(
          response.data.message || "Verification code sent successfully!"
        );
        navigate(method.successPath, {
          state: {
            [method.field]: state[method.field],
            expiresIn: response.data.expiresIn,
            type: method.type,
          },
        });
      } else {
        toast.error(
          response?.data?.error ||
            "Failed to send verification code. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong. Please try again."
      );
    }
  }, [selectedOption, state, sendOTP, navigate]);

  console.log("state", state);

  return (
    <div className="h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-sm mx-auto px-5">
        <div className="w-full border rounded-xl shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div></div>
            <div>
              <h2 className="font-semibold sm:text-2xl text-lg">
                Select Verification
              </h2>
            </div>
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer focus:outline-none"
            >
              <IoCloseCircle className="text-3xl text-slate-500" />
            </button>
          </div>

          <div className="py-3 mt-7">
            <img
              src={EventHub}
              alt="Verification illustration"
              className="mx-auto rounded-lg md:w-28 w-20 h-full object-cover"
            />
          </div>

          <div className="sm:px-9 px-4 mt-5">
            {!state?.emailVerified && (
              <div
                className={`border py-2 px-5 rounded-lg flex items-center justify-between cursor-pointer ${
                  selectedOption === "email"
                    ? "border-blue-600"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
                onClick={() => handleOptionSelect("email")}
              >
                <label
                  htmlFor="email"
                  className="flex items-center cursor-pointer"
                >
                  <div>
                    <img
                      src={EmailImg}
                      alt="Email icon"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="ps-2">
                    <h6 className="text-lg font-semibold">Email</h6>
                    <p className="text-xs text-gray-500">
                      Select Email Verification
                    </p>
                  </div>
                </label>
                <div>
                  <input
                    type="radio"
                    id="email"
                    name="verify"
                    checked={selectedOption === "email"}
                    onChange={() => handleOptionSelect("email")}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
            )}
            {!state?.contactVerified && (
              <div
                className={`border py-2 px-5 rounded-lg flex items-center justify-between mt-4 cursor-pointer ${
                  selectedOption === "phoneCall"
                    ? "border-blue-600"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
                onClick={() => handleOptionSelect("phoneCall")}
              >
                <label
                  htmlFor="phoneCall"
                  className="flex items-center cursor-pointer"
                >
                  <div>
                    <img
                      src={PhoneCall}
                      alt="Phone icon"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="ps-2">
                    <h6 className="text-lg font-semibold">Phone</h6>
                    <p className="text-xs text-gray-500">
                      Select Phone Call Verification
                    </p>
                  </div>
                </label>
                <div>
                  <input
                    type="radio"
                    id="phoneCall"
                    checked={selectedOption === "phoneCall"}
                    onChange={() => handleOptionSelect("phoneCall")}
                    name="verify"
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="my-9 max-w-screen-sm mx-auto px-9">
            <button
              onClick={handleContinue}
              className="font-medium text-white bg-[#1C1C1C] drop-shadow-[0px 16px 24px 0px #00000033] w-full block text-center py-3 rounded-lg hover:bg-[#2C2C2C] transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <Loader loading={isLoading || isLoadingPhone} />
    </div>
  );
};

export default React.memo(SelectVerification);
