import React from "react";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import Closebtn from "../../assets/img/close-btn-red.png";
import VendorSteps from "../../components/vendorstepper/VendorSteps";

export default function RequestDataProgress() {
  return (
    <div>
      <VendorTopBar />
      <div className="mt-12">
        <div className="mycontainer">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-[#CDCDCD] pb-4">
            <div className="order-2 md:order-1">
              <div className="flex items-center">
                <Link
                  to="/vendor-dashboard/vendor-account"
                  className="text-[28px] leading-normal font-semibold"
                >
                  Account
                </Link>
                <FaChevronRight className="mx-2 leading-normal" />
                <Link className="text-[#3551B6] font-medium text-lg">
                  Privacy and sharing
                </Link>
              </div>
              <p className="font-semibold text-[28px] mt-4">
                We’ve received your data request
              </p>
              <p className="sm:text-[18px] mt-4 text-[#171717]">
                We’ll create a file with your personal data and email you at{" "}
                <Link className="text-[#3551B6] font-semibold">
                  Kevin@gmail.com
                </Link>
                 when it’s ready.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Link to="/manage-account">
                <img
                  className="size-[24px] object-contain ms-auto"
                  src={Closebtn}
                  alt="img"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="mycontainer">
          <h4 className="font-semibold text-[28px] text-center mt-6">
            Summary
          </h4>
          <div className="mt-6 pb-6">
            <div className="flex justify-between items-center max-w-[600px] mx-auto">
              <div className="data-progress-bullet active bullet-one"></div>
              <div className="w-full h-1 bg-black max-w-[350px]"></div>
              <div className="data-progress-bullet bullet-two"></div>
              <div className="w-full h-1 bg-black max-w-[350px]"></div>
              <div className="data-progress-bullet bullet-three"></div>
            </div>
          </div>
          <div className="mt-16">
            <VendorSteps
              title="Data request received"
              desc="November 22nd, 2024, at 09:05:31 PM"
            />
          </div>
          <div className="my-10">
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/manage-account" className="border flex justify-center border-black shadow-[0px_10px_20px_0px_#0000001A] py-3 rounded-full text-[#000000] font-medium px-8 min-w-[200px]">
                Cancel Request
              </Link>
              <Link to="/manage-account" className="border flex justify-center border-black bg-black shadow-[0px_10px_17px_0px_#FD636312] py-3 rounded-full text-[#ffffff] font-medium px-8 min-w-[200px]">
                Done
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
