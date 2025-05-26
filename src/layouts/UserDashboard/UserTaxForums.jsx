import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import TaxPayers from "../../components/VendorDashboard/TaxPayers";
import TaxDocuments from "../../components/VendorDashboard/TaxDocuments";
import UserTopBar from "../../components/UserDashboard/UserTopBar";

export default function UserTaxForums() {
  return (
    <div>
      <UserTopBar />
      <div className="mt-8">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link to="/user-dashboard/user-account" className="sm:text-[28px] text-lg leading-normal font-semibold">
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium sm:text-lg">
              Tax Forums
            </Link>
          </div>
          <div className="mt-5">
            <TaxPayers />
          </div>
          <div className="mt-5">
            <TaxDocuments />
          </div>
          <div className="my-16">
            <div className="bg-[#F7F7F7] max-w-[700px] p-5 mx-auto flex items-center justify-between flex-wrap-reverse gap-4 rounded-[10px]">
              <div>
                <p className="text-[24px] font-semibold">Are you need help?</p>
                <p className="text-lg">
                  {"Get answers to questions about taxes in our >>>"}
                </p>
              </div>
              <div className="ms-auto">
                <Link to="/user-dashboard/user-help" className="py-3 px-6 inline-block bg-white rounded-[8px] border border-black shadow-[0px_10px_17px_0px_#FD636312]">
                  Go Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
