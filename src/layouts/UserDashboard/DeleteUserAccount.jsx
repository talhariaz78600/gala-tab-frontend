import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import UserTopBar from "../../components/UserDashboard/UserTopBar";

export default function DeleteUserAccount() {
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
              <p className="sm:text-[28px] text-lg font-semibold">Delete your account</p>
              <Link to="/user-manage-account" className="ms-auto">
                <AiFillCloseCircle className="text-[24px] text-[#C13515]" />
              </Link>
            </div>
            <p className="sm:text-lg mt-3 max-w-[1100px]">
              Submit a request to delete your personal data. To confirm you're
              the true owner of this account, we may contact you at
              designer@gmail.com. We will only be able to proceed with your
              request once you follow the steps set out in the email.
            </p>
          </div>
          <div>
            <form action="User-Delete-Confirmation">
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
                  <label className="sm:text-lg font-medium" htmlFor="Reason">
                    Why are you deleting your account?
                  </label>
                  <select
                    className="block border w-full sm:px-4 sm:py-6 p-3 border-[#D4D7E3] bg-[#F3F3F3] rounded-[10px] focus:outline-none"
                    name="Reason"
                    id="Reason"
                  >
                    <option disabled hidden selected value="Select reason">
                      Select reason
                    </option>
                    <option value="Unsatisfied">
                      I’m not satisfied with my experience on Gala Tab
                    </option>
                    <option value="Unconfident">
                      I’m not confident about how Gala Tab treats my private
                      data
                    </option>
                    <option value="duplicate">
                      I want to delete a duplicate acount
                    </option>
                    <option value="Unused">I don't use Gala Tab enough</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-16 flex justify-between items-center flex-wrap gap-4">
                <Link className=" inline-block bg-[#E7E7E7] py-3 px-8 rounded-full font-medium border border-[#D5D5D5]">
                  Back
                </Link>
                <button
                  className="font-medium bg-black py-3 px-8 rounded-full text-white"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
