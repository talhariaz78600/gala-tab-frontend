import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import UserTopBar from "../../components/UserDashboard/UserTopBar";

export default function RequestUserData() {
  return (
    <div>
      <UserTopBar />
      <div className="sm:mt-16 mt-5">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link
              to="/user-dashboard/user-account"
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
              <p className="sm:text-[28px] text-lg font-semibold">
                Request your personal data
              </p>
              <Link to="/user-manage-account" className="ms-auto">
                <AiFillCloseCircle className="text-[24px] text-[#C13515]" />
              </Link>
            </div>
            <p className="sm:text-lg mt-3">
              Before we get you a copy of your data, we’ll just need you to
              answer a few questions.
            </p>
          </div>
          <div>
            <form action="">
              <div className="max-w-[650px] mx-auto">
                <div className="mt-10">
                  <label className="sm:text-lg font-medium" htmlFor="reside">
                    Where do you reside?
                  </label>
                  <select
                    className="block border w-full sm:px-4 sm:py-6 p-3 border-[#D4D7E3] bg-[#F3F3F3] rounded-[10px] focus:outline-none"
                    name="reside"
                    id="reside"
                  >
                    <option
                      disabled
                      hidden
                      selected
                      value="Select country/region"
                    >
                      Select country/region
                    </option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="sm:text-lg font-medium" htmlFor="format">
                    In what format do you want your data?
                  </label>
                  <select
                    className="block border w-full sm:px-4 sm:py-6 p-3 border-[#D4D7E3] bg-[#F3F3F3] rounded-[10px] focus:outline-none"
                    name="format"
                    id="format"
                  >
                    <option disabled hidden selected value="Select format">
                      Select format
                    </option>
                    <option value="HTML">
                      Interactive web-context format (HTML)
                    </option>
                    <option value="Machine-readable format (JSON)">
                      Machine-readable format (JSON)
                    </option>
                    <option value="Excel worksheet">Excel worksheet</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="sm:text-lg font-medium" htmlFor="format">
                    Why are you requesting a copy of your data?
                  </label>
                  <select
                    className="block border w-full sm:px-4 sm:py-6 p-3 border-[#D4D7E3] bg-[#F3F3F3] rounded-[10px] focus:outline-none"
                    name="format"
                    id="format"
                  >
                    <option
                      disabled
                      hidden
                      selected
                      value="Select reason (optional)"
                    >
                      Select reason (optional)
                    </option>
                    <option value="I want to know Gala Tab Knows about me">
                      I want to know Gala Tab Knows about me
                    </option>
                    <option value="I want to file a support ticket">
                      I want to file a support ticket
                    </option>
                    <option value="I Want to move my data to another service">
                      I Want to move my data to another service
                    </option>
                    <option value="I Plan to delete or deactivate my account soon">
                      I Plan to delete or deactivate my account soon
                    </option>
                    <option value="I Need to access specific data for legal reasons">
                      I Need to access specific data for legal reasons
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mt-16">
                  <button
                    className="font-medium bg-black py-3 px-8 rounded-full text-white"
                    type="submit"
                  >
                    Request Data
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
