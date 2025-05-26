import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import confirmDelete from "../../assets/img/confirmDelete.png";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";

export default function DeleteConfirmation() {
  return (
    <div>
      <VendorTopBar />
      <div className="mt-16">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link to="/vendor-dashboard/vendor-account" className="text-[28px] leading-normal font-semibold">
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium text-lg">
              Privacy and sharing
            </Link>
          </div>
          <div className="mt-6 border-b pb-5 border-[#CDCDCD]">
            <div className="flex gap-4 flex-wrap-reverse justify-between items-center">
              <p className="text-[28px] font-semibold">Delete your account</p>
              <Link to="/manage-account" className="ms-auto">
                <AiFillCloseCircle className="text-[24px] text-[#C13515]" />
              </Link>
            </div>
          </div>
          <div>
            <form action="">
              <div className="max-w-[770px] mx-auto mt-8">
                <p className="text-[28px] text-center font-semibold">
                  Delete account?
                </p>
                <p className="text-lg text-center mt-2">
                  Requesting deletion of your account means that you will no
                  longer be able to use your Gala Tab account, and your account
                  will be permanently closed.
                </p>
                <p className="text-lg text-center mt-4">
                  If you’d prefer to close your account temporarily,
                  deactivating your Gala Tab account is a better option.
                </p>
                <div className="mt-12 flex flex-col items-center">
                  <img
                    className="w-full max-w-[300px] mx-auto"
                    src={confirmDelete}
                    alt="img"
                  />
                  <button className="font-medium border border-black p-4 w-full rounded-full max-w-[600px] shadow-[0px_10px_20px_0px_#0000001A]">
                    Deactivate instead
                  </button>
                  <button className="font-medium border border-black p-4 w-full max-w-[280px] rounded-full mt-8 bg-black text-white shadow-[0px_10px_17px_0px_#FD636312]">
                    Delete account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
