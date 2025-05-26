import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Security = () => {
  const navigate = useNavigate();

  const goto = (path) => {
    navigate(path); // Navigate to the dynamic path
  };
  return (
    <div className="h-full">
      <form className="h-full" action="/user-dashboard/user-Profile">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2">
              <div>
                <Link to="/user-dashboard/user-profile"><IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" /></Link>
              </div>
              <h4 className="text-[#000] text-[24px] font-semibold">
                Login and Security Password
              </h4>
            </div>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-5">
              <div>
                <div className="mt-5">
                  <label
                    htmlFor=""
                    className="pl-4 w-full text-base font-medium text-[#202529]"
                  >
                    Current password
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  />
                </div>
                <div className="mt-5">
                  <h5 className="w-full text-lg font-medium text-[#202529]">
                    Forgot your password?
                  </h5>
                  <Link to="#" className="text-[#3551B6] text-xs">
                    Reset password via email
                  </Link>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor=""
                    className="pl-4 w-full text-base font-medium text-[#202529]"
                  >
                    New password
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  />
                </div>
                <div className="mt-3">
                  <label
                    htmlFor=""
                    className="pl-4 w-full text-base font-medium text-[#202529]"
                  >
                    Confirm password
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 max-w-[500px] gap-3 mt-12">
            <button
              onClick={() => goto("/user-dashboard/user-Profile")}
              type="button"
              className="bg-[#E7E7E7] py-2 rounded-full px-6 border"
            >
              Cancel
            </button>
            <button className="text-white bg-black py-2 px-6 border rounded-full">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;
