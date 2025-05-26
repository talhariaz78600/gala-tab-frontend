import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import confirmDelete from "../../assets/img/confirmDelete.png";
import UserTopBar from "../../components/UserDashboard/UserTopBar";

export default function UserDeleteConfirmation() {
  return (
    <div>
      <UserTopBar />
      <div className="sm:mt-16 mt-5">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link
              to="/User-dashboard/User-account"
              className="sm:text-[28px] text-lg leading-normal font-semibold"
            >
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium sm:text-lg">
              Privacy and sharing
            </Link>
          </div>
          <div className="mt-6 border-b pb-5 border-[#CDCDCD]">
            <div className="flex gap-4 flex-wrap-reverse justify-between items-center">
              <p className="sm:text-[28px] text-xl font-semibold">Delete your account</p>
              <Link to="/user-manage-account" className="ms-auto">
                <AiFillCloseCircle className="text-[24px] text-[#C13515]" />
              </Link>
            </div>
          </div>
          <div>
            <form action="/User-dashboard/User-account">
              <div className="max-w-[770px] mx-auto mt-3">
                <p className="sm:text-[28px] text-xl text-center font-semibold">
                  Delete account?
                </p>
                <p className="sm:text-lg text-center">
                  Requesting deletion of your account means that you will no
                  longer be able to use your Gala Tab account, and your account
                  will be permanently closed.
                </p>
                <p className="sm:text-lg text-center mt-2">
                  If you’d prefer to close your account temporarily,
                  deactivating your Gala Tab account is a better option.
                </p>
                <div className="mt-12 flex flex-col items-center">
                  <img
                    className="w-full max-w-[300px] mx-auto"
                    src={confirmDelete}
                    alt="img"
                  />
                  <button className="font-medium border border-black sm:p-4 p-3 w-full rounded-full max-w-[600px] shadow-[0px_10px_20px_0px_#0000001A]">
                    Deactivate instead
                  </button>
                  <button className="font-medium border border-black sm:p-4 p-3 w-full sm:max-w-[280px] rounded-full mt-8 bg-black text-white shadow-[0px_10px_17px_0px_#FD636312]">
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
