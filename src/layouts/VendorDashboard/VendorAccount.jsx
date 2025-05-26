import React from "react";
import { Link, useNavigate } from "react-router";
import Profile from "../../assets/img/profile.png";
import ProfileName from "../../assets/img/verify.png";
import { FaUserCircle } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { MdPolicy } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function VendorAccount() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const sections = [
    {
      id: 1,
      title: "Personal Info",
      description: "Provide personal details and how we can reach you.",
      icon: (
        <FaUserCircle className="bg-[#EBEBEB] text-[#3551B6] p-4 rounded-full text-5xl" />
      ),
      path: "/vendor-dashboard/Vendor-Profile",
    },
    {
      id: 2,
      title: "Payments & payouts",
      description: "Review payment, payouts and Connect Account",
      icon: (
        <MdPayments className="bg-[#EBEBEB] text-[#3551B6] p-4 rounded-full text-5xl" />
      ),
      path: "/vendor-dashboard/payments-and-Payouts",
    },
    {
      id: 3,
      title: "Global preferences and Theme",
      description:
        "Set your default language, currency, theme and time zone for Gala Tab",
      icon: (
        <CiGlobe className="bg-[#EBEBEB] text-[#3551B6] p-4 rounded-full text-5xl" />
      ),
      path: "/global-preferences",
    },
    {
      id: 4,
      title: "Privacy and sharing",
      description: "Set your default language, currency, and timezone.",
      icon: (
        <MdPolicy className="bg-[#EBEBEB] text-[#3551B6] p-4 rounded-full text-5xl" />
      ),
      path: "/manage-account",
    },
    // {
    //   id: 5,
    //   title: "Tax Forums",
    //   description: "Review payments, payouts, coupons and Invoices.",
    //   icon: (
    //     <FaRegFileLines className="bg-[#EBEBEB] text-[#3551B6] p-4 rounded-full text-5xl" />
    //   ),
    //   path: "/tax-forums",
    // },
  ];

  const isKycApproved = user?.kyc?.status === "approved";
  return (
    <div>
      <h4 className="md:text-3xl text-xl font-semibold">Account Dashboard</h4>
      <p className="sm:text-2xl">Welcome to Gala Tab {user?.fullName}</p>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 mt-6">
        <div>
          <h6 className="sm:text-lg text-base font-semibold text-[#0C1421] mb-3">
            Go to Profile
          </h6>

          <div className="border border-gray-200 dark:bg-gray-800 p-4 rounded-xl flex items-center gap-4 relative shadow-sm bg-white">
            {/* Profile Picture */}
            <img
              src={user.profilePicture || "/default-image.jpg"}
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              alt="User Profile"
              onClick={() => navigate("/vendor-dashboard/Vendor-Profile")}
            />

            {/* User Info */}
            <div className="flex-1">
              <p className="text-[#043B6A] dark:text-white font-medium truncate">
                {user?.fullName}
              </p>
            </div>

            {/* KYC Badge */}
            <div className="absolute -top-4 right-4">
              <div className="relative">
                <button className="text-[#34A853] border border-[#3551B6] py-1.5 px-6 rounded-full text-sm font-semibold bg-white shadow">
                  {isKycApproved ? "Verified" : "Not Verified"}
                </button>
                {isKycApproved && (
                  <img
                    src={ProfileName}
                    alt="Verified Icon"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full object-contain shadow"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="font-medium text-lg text-center">
            Need to deactivate your account?
          </p>
          <Link
            to="#"
            className="font-medium text-lg underline block text-center"
          >
            Take care of that now
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold sm:text-3xl text-xl">Settings</h4>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border border-dashed rounded-2xl bg-[#FDFDFD] dark:bg-gray-800 p-5 hover:bg-white hover:shadow-lg hover:border-solid cursor-pointer"
              onClick={() => navigate(section.path)}
            >
              <div className="flex items-center gap-2">
                <div>{section.icon}</div>
                <div>
                  <h6 className="font-semibold sm:text-lg text-black dark:text-white">
                    {section.title}
                  </h6>
                </div>
              </div>
              <p className="sm:text-base font-medium mt-3 text-[#6A6A6A]">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
