import React from "react";
import { Link, useNavigate } from "react-router";
import CardDetailsModal from "./CardDetailsModal";
import { useStripeConnectMutation } from "@/api/apiSlice";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "@/api/auth";

export default function ManagePayments() {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: userLoading,
    isError,
    error: queryError,
    refetch,
  } = useGetMeQuery();

  const accountStatus = user?.data?.accountStatus;
  const [connectStripe, { isLoading }] = useStripeConnectMutation();

  const handleStripeConnect = async () => {
    try {
      const response = await connectStripe().unwrap();

      if (response?.url) {
        window.open(response.url, "_blank", "noopener,noreferrer");
      } else {
        console.error("Stripe URL not returned.");
      }
    } catch (error) {
      console.error("Stripe connection failed:", error);
    }
  };

  const renderButton = () => {
    switch (accountStatus) {
      case "active":
        return (
          <div className="flex flex-col items-center text-green-600 mt-4">
            <button
              onClick={handleStripeConnect}
              className="bg-green-600 text-white font-medium py-3 px-8 rounded-full shadow-md text-sm transition-all duration-300 ease-in-out hover:bg-green-700"
            >
              Account Connected
            </button>
            <p className="text-sm mt-2 text-gray-600">
              Your Stripe account is already connected.
            </p>
          </div>
        );
      case "inactive":
      case "pending":
        return (
          <button
            onClick={handleStripeConnect}
            className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 text-sm`}
          >
            {accountStatus === "inactive"
              ? "Reconnect with Stripe"
              : "Continue Connecting with Stripe"}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center flex-wrap-reverse gap-3 justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div>
          <p className="font-semibold sm:text-[28px] text-lg">Your payments</p>
          <p className="text-lg mt-3">
            Keep track of all your payments and refunds.
          </p>
        </div>
        <div className="ms-auto">
          <button
            onClick={() => navigate("/vendor-dashboard/PayOut-Details")}
            className="inline-block bg-black text-white sm:text-lg text-sm py-3 px-4 rounded-[10px] opacity-50"
          >
            Manage Payments
          </button>
        </div>
      </div>
      <div className="flex items-center flex-wrap-reverse gap-6 justify-between border-b border-[#E0E0E0] pb-8 mt-6 p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-white rounded-lg shadow-lg">
        <div className="flex flex-col">
          <p className="font-semibold sm:text-[32px] text-2xl text-[#2D2D2D]">
            Connect with Stripe
          </p>
          <p className="text-lg mt-3 text-[#4B5563] max-w-xl">
            Securely connect your Stripe account to receive payments for your
            services. Once connected, you’ll be able to manage payouts and track
            your earnings directly.
          </p>
        </div>

        <div className="ms-auto flex justify-end items-center">
          {renderButton()}
        </div>
      </div>

      <div className="sm:mt-[100px] mt-5">
        <div className="max-w-[800px] bg-[#f7f7f7] dark:bg-gray-800 p-6 mx-auto rounded-[10px]">
          <p className="sm:text-[24px] font-semibold">
            Make all payments through Gala Tab
          </p>
          <p className="text-lg mt-3">
            Always pay and communicate through Gala Tab to ensure you're
            protected under our cancellation,
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div>
              <Link className="w-full flex justify-center border border-black underline rounded-[8px] font-medium p-3 shadow-[0px_10px_17px_0px_#FD636312] bg-white text-black">
                Terms of Service
              </Link>
            </div>
            <div>
              <Link className="w-full flex justify-center border border-black underline rounded-[8px] font-medium p-3 shadow-[0px_10px_17px_0px_#FD636312] bg-white text-black">
                Payments Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Loader loading={isLoading || userLoading} />
    </div>
  );
}
