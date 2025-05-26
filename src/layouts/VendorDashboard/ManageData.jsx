import React from "react";
import { Link } from "react-router";
import { CiCircleChevRight } from "react-icons/ci";
import { LuClock7 } from "react-icons/lu";

export default function ManageData() {
  return (
    <div>
      {/* <p className="text-[28px] font-semibold leading-normal">
        Manage your account data
      </p> */}
      {/* <div className="flex items-center justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div className="w-[calc(100%-50px)] flex justify-between items-center flex-wrap-reverse">
          <div>
            <p className="font-semibold text-[20px]">
              Request your personal data
            </p>
            <p className="text-lg mt-3">
              We’ll create a file for you to download your personal data.
            </p>
          </div>
          <div className="flex items-center ms-auto">
            <LuClock7 className="text-[#FF9900] text-[24px] me-2" />
            <p className="text-[#3551B6] text-[20px] font-semibold">
              Data request received
            </p>
          </div>
        </div>
        <div>
          <Link to="/request-data" className="inline-block rounded-full">
            <CiCircleChevRight className="text-[40px]" />
          </Link>
        </div>
      </div> */}
      <div className="flex items-center justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div>
          <p className="font-semibold text-[20px] text-[#C13515]">
            Delete your account
          </p>
          <p className="text-lg mt-3">
            This will permanently delete your account and your data, in
            accordance with applicable law.
          </p>
        </div>
        <div>
          <Link to="/delete-account" className="inline-block rounded-full">
            <CiCircleChevRight className="text-[40px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
