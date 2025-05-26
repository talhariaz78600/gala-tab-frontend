import React from "react";
import Profile from "../../assets/img/profile.png";
import ProfileName from "../../assets/img/profile-name.png";
import { Link } from "react-router";
import { IoPencil } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import MailAddressOne from "../../assets/img/mail-address-1.png";
import MailAddressTwo from "../../assets/img/mail-address-2.png";
import MailAddressThree from "../../assets/img/mail-address-3.png";
import MailAddressFour from "../../assets/img/mail-address-4.png";
import MailAddressFive from "../../assets/img/mail-address-5.png";
import HelpButton from "../../components/VendorDashboard/HelpButton";

export default function AccountsProfile() {
  const userDetails = [
    {
      label: "First Name",
      value: "Naseeb Zulfiqar",
      icon: MailAddressOne,
    },
    {
      label: "Last Name",
      value: "Designer",
      icon: MailAddressOne,
    },
    {
      label: "Email",
      value: "client@gmail.com",
      icon: MailAddressTwo,
    },
    {
      label: "Office Number",
      value: "+21 315 909 909",
      icon: MailAddressThree,
    },
    {
      label: "Mobile Number",
      value: "+21 315 909 909",
      icon: MailAddressThree,
    },
    {
      label: "Emergency Number",
      value: "+21 315 909 909",
      icon: MailAddressThree,
    },
    {
      label: "Company Name",
      value: "Company Name",
      icon: MailAddressFour,
    },
    {
      label: "Mailing Address",
      value: "Mailing Address",
      icon: MailAddressFive,
    },
    {
      label: "Mailing City",
      value: "Mailing Address",
      icon: MailAddressFive,
    },
    {
      label: "Mailing State",
      value: "54000",
      icon: MailAddressFive,
    },
    {
      label: "Mailing Zip",
      value: "54000",
      icon: MailAddressFive,
    },
  ];
  return (
    <div className="bg-[#F7F7F7] min-h-[calc(100dvh-130px)] p-5 rounded-[20px] flex flex-col">
      <div>
        <h4 className="font-semibold sm:text-3xl text-lg">
          About Your Profile
        </h4>
        <div className="bg-white p-3 border rounded-xl shadow-sm mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img src={Profile} alt="" />
                  <div className="absolute bottom-0 right-1 w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
                </div>
                <div>
                  <h5 className="font-semibold sm:text-xl text-sm">
                    Kevin full name here
                  </h5>
                  <p className="sm:text-base font-medium text-[#202224]">
                    Vendor
                  </p>
                </div>
              </div>
              <div className="relative">
                <button className="text-[#34A853] border border-[#3551B6] py-2 rounded-full px-7 text-sm font-medium ">
                  Verified
                </button>
                <div className="absolute -top-3 left-10">
                  <img
                    src={ProfileName}
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="ms-auto flex items-center gap-4 flex-wrap justify-end">
              <button className="border border-[#EA3548] text-[#EA3548] px-4 py-2 rounded-lg bg-white shadow-[0px_10px_20px_0px_#0000001A]">
                Suspend
              </button>
              <Link
                to="/admin-dashboard/Add-New-user"
                className="flex items-center gap-2 border border-[#3551B6] text-[#043B6A] px-4 py-2 rounded-lg bg-white shadow-[0px_10px_17px_0px_#FD636312]"
              >
                <IoPencil className="text-[#000]" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 mt-4">
          <div>
            <div className="border bg-white shadow-xl rounded-xl p-3">
              <div className="bg-[#F7F7F7] p-3 rounded-xl flex flex-col gap-2">
                <h4 className="text-[#303C6C] font-semibold">
                  Kevin Confirmed Information
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <IoCheckmark className="text-[#3551B6]" />
                  <p className="text-[#202224] sm:text-base text-sm">
                    Email address
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <IoCheckmark className="text-[#3551B6]" />
                  <p className="text-[#202224] sm:text-base text-sm">
                    Phone Number
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <IoCheckmark className="text-[#3551B6]" />
                  <p className="text-[#202224] sm:text-base text-sm">
                    Government ID
                  </p>
                </div>
              </div>
              <div className="border rounded-xl p-3 mt-3">
                <h4 className="text-[#303C6C] font-semibold">
                  Verify your identity
                </h4>
                <p className="mt-2 text-[#202224]">
                  Before you as a vendor on Gala Tab you’’ll need to complete
                  this step.
                </p>
                <div className="mt-4">
                  <Link
                    className="flex item justify-center w-full bg-white border border-black p-2 rounded-[10px] font-medium shadow-[0px_10px_17px_0px_#FD636312]"
                    to="/admin-stepper"
                  >
                    Get verified
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-start-2 xl:col-end-5 p-3">
            <h4 className="text-[#303C6C] font-bold text-xl">
              Personal Information
            </h4>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 min-[380px]:grid-cols-2 lg:gap-8 gap-3 mt-4">
              {userDetails.map((detail, index) => (
                <div key={index}>
                  <h6 className="text-[#303C6C] sm:text-lg text-sm font-medium">
                    {detail.label}
                  </h6>
                  <div className="flex items-center gap-1">
                    <img
                      src={detail.icon}
                      alt=""
                      className="w-4 h-4 object-contain"
                    />
                    <p className="text-[#202224] font-medium sm:text-base text-xs">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-auto">
        <div className="mt-8">
          <HelpButton path="/admin-dashboard/contact-support" />
        </div>
      </div>
    </div>
  );
}
