import React from "react";
import Profile from "../../assets/img/profile.png";
import ProfileName from "../../assets/img/profile-name.png";
import { Link, useLocation } from "react-router";
import { IoPencil } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import MailAddressOne from "../../assets/img/mail-address-1.png";
import MailAddressTwo from "../../assets/img/mail-address-2.png";
import MailAddressThree from "../../assets/img/mail-address-3.png";
import MailAddressFour from "../../assets/img/mail-address-4.png";
import MailAddressFive from "../../assets/img/mail-address-5.png";
import HelpButton from "../../components/VendorDashboard/HelpButton";
import ProfileDetails from "@/components/adminDashboard/ProfileDetails";

export default function VendorAccountProfile() {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100dvh-130px)] p-5 rounded-[20px] flex flex-col">
      <div>
        <h4 className="font-semibold sm:text-3xl text-lg">
          About Your Profile
        </h4>
        <ProfileDetails data={data} />
      </div>
      <div className="flex justify-end mt-auto">
        <div className="mt-8">
          <HelpButton path="/admin-dashboard/contact-support" />
        </div>
      </div>
    </div>
  );
}
