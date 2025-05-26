import React from "react";
import { Link } from "react-router";
import { CiCircleChevRight } from "react-icons/ci";

export default function UserManageData() {
  return (
    <div>
      <p className="sm:text-[28px] text-lg font-semibold leading-normal">
        Manage your account data
      </p>
      <div className="flex items-center justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div>
          <p className="font-semibold sm:text-[20px]">
            Request your personal data
          </p>
          <p className="sm:text-lg mt-3">
            We’ll create a file for you to download your personal data.
          </p>
        </div>
        <div>
          <Link to="/Request-User-Data" className="inline-block rounded-full">
            <CiCircleChevRight className="sm:text-[40px] text-2xl" />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div>
          <p className="font-semibold sm:text-[20px] text-[#C13515]">
            Delete your account
          </p>
          <p className="sm:text-lg mt-3">
            This will permanently delete your account and your data, in
            accordance with applicable law.
          </p>
        </div>
        <div>
          <Link to="/delete-user-account" className="inline-block rounded-full">
            <CiCircleChevRight className="sm:text-[40px] text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}
