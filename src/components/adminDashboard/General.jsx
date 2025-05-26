import React from "react";
import { Link } from "react-router";
import { IoPencil } from "react-icons/io5";
import Profile from "../../assets/img/profile.png";
import { useSelector } from "react-redux";

const General = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={user?.profilePicture || Profile}
              alt="User profile"
              className="w-[65px] h-[65px] max-w-[65px] rounded-full"
            />
          </div>
          <div>
            <p className="text-[#171717] dark:text-white font-semibold text-xl">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            to="/admin-dashboard/edit-profile"
            className="border-black border bg-white dark:bg-gray-800 dark:border-gray-600 font-medium text-base flex items-center gap-2 py-2 px-6 rounded-lg shadow-xl text-black dark:text-white"
          >
            <IoPencil />
            Edit
          </Link>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 py-3">
        <h5 className="font-semibold text-xl text-gray-900 dark:text-white">
          Global preferences
        </h5>
        <p className="text-[#3551B6] dark:text-blue-400 font-medium text-lg">
          Preferred language
        </p>
        <p className="text-[#484848] dark:text-gray-300">English</p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 py-3">
        <p className="text-[#3551B6] dark:text-blue-400 font-medium text-lg">
          Preferred currency
        </p>
        <p className="text-[#484848] dark:text-gray-300">
          United States dollar
        </p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 py-3">
        <p className="text-[#3551B6] dark:text-blue-400 font-medium text-lg">
          Time zone
        </p>
        <p className="text-[#484848] dark:text-gray-300">
          (GMT-05:00) Eastern Time (US & Canada)
        </p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 py-3">
        <p className="text-[#3551B6] dark:text-blue-400 font-medium text-lg">
          Calendar Start of Week
        </p>
        <p className="text-[#484848] dark:text-gray-300">Sunday</p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 py-3">
        <p className="text-[#3551B6] dark:text-blue-400 font-medium text-lg">
          Initial # of Listings to Display on Calendar
        </p>
        <p className="text-[#484848] dark:text-gray-300">20 Listings</p>
      </div>
    </div>
  );
};

export default General;
